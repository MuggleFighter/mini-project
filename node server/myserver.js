// var http = require('http')
// var path = require('path')
// var url = require('url')
// var fs = require('fs')

// //

// var server = http.createServer(function(req,res){
// 	//处理动态请求
// 	var pathObj = url.parse(req.url)

// 	switch(pathObj.pathname){
// 		case('/api/getWeather'):
// 		case('/a'):
// 		case('/b'):
// 		case('/signup'):
// 		case('signin')
// 		default:
// 	}

// 	//处理POST数据：
// 	var body = '';
// 	req.on('data',function(chunk){
// 		body += chunk
// 	})
// 	req.on('end',function(){
// 		var bodyObj = {}
// 		body.split('&').forEach(function(str){
// 			bodyObj[str.split('=')[0]] = str.split('=')[1]
// 		})
// 	})

// 	//处理静态文件
// 	var filePath = path.join(__dirname, 'static', pathObj.pathname)
// 	if (pathObj.pathname === '/'){
// 		pathObj.pathname += 'index.html'
// 	}
// 	fs.readFile(filePath,'binary',function(err,data){
// 		if(err){
// 			res.writeHead(404,'Not Found',{
// 				'Content-Type': 'text/html; charset=utf8'
// 			})
// 			res.end('<h3>source not found</h3>')
// 		}else{
// 			res.writeHead(200,'OK')
// 			res.end(data,'binary')
// 		}
// 	})
// })

// server.listen(9000)


//组合抽象：


var http = require('http')
var path = require('path')
var url = require('url')
var fs = require('fs')
var querystring = require('querystring')
var users = {} //tempusers

//routes

var routes = {
	'/api/getStuendt': function(req,res){
		res.writeHead(200,'OK',{'Content-Type': 'text/json; charset=utf-8'})
		res.end(JSON.stringify({
			born:req.query.born,
			age: 2018 - req.query.born
		})) 
	},

	'/signin': function(req,res){
		var username = req.body.username
		var password = req.body.password
		if(username in users ){
			if (password === users[username]) {
				res.writeHead(200,'OK',{'Content-Type': 'text/plain; charset=utf-8'})
				res.end(JSON.stringify({isValid:true}))
			}else{
				res.writeHead(200,'OK',{'Content-Type': 'text/plain; charset=utf-8'})
				res.end(JSON.stringify({isValid:'error'}))
			}
		}else{
			res.writeHead(200,'OK',{'Content-Type': 'text/plain; charset=utf-8'})
			res.end(JSON.stringify({isValid:false}))
		}
		
	},

	'/signup': function(req,res){
		var username = req.body.username
		var password = req.body.password
		if (username in users) {
			res.writeHead(200,'OK',{'Content-Type': 'text/plain; charset=utf-8'})
			res.end(JSON.stringify({isExist:true}))
		}else{
			users[username] = password
			res.writeHead(200,'OK',{'Content-Type': 'text/plain; charset=utf-8'})
			res.end(JSON.stringify({isExist:false}))
		}
	}
}

//static request
function staticRoot(req,res){
	filePath = path.join(__dirname, 'static', req.url)
	filePath = decodeURI(filePath)
	if (req.url === '/') {
		filePath += 'index.html'
	}
	fs.readFile(filePath,'binary',function(err,data){
		if (err){
			res.writeHead(404,'not found',{'Content-Type': 'text/html charset=utf-8'})
			res.end('<h3>source not found </h3>')
		}else{
			res.writeHead(200,'OK')
			res.end(data,'binary')
		}
	})
}

//parse post data
function parseBody(req,res,callback){
	var body = '';
	req.on('data',function(chunk){
		body += chunk
	})
	req.on('end',function(){
		req.body = querystring.parse(body)//attach the post body to request Obj
		callback(req,res)
	})
}

function routePath(req,res){
	var pathObj = url.parse(req.url,true)
	var handler = routes[pathObj.pathname]
	if(!handler) {
		staticRoot(req,res)
	}else{
		req.query = pathObj.query//attach the query to request Obj
		parseBody(req,res,handler)
	}
}

var server = http.createServer(function(req,res){
	routePath(req,res)
})

console.log('server runs at http://127.0.0.1:9000')
server.listen(9000)