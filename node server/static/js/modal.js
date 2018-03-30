(function () {
    function $(selector) {
        return document.querySelector(selector);
    }

    $('.nav-signin .signin').addEventListener('click', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        modal.style.display = 'block';
    });
    var modal = $('.flip-modal');
    modal.addEventListener('click', function (ev) {
        ev.stopPropagation();
        var target = ev.target;
        if (target.classList.contains('close')) {
            ev.preventDefault();
            modal.style.display = 'none';
        } else if (target.classList.contains('tab-signin')) {
            ev.preventDefault();
            $('.modal.signup').classList.remove('active');
            $('.modal.signin').classList.add('active');
        } else if (target.classList.contains('tab-signup')) {
            ev.preventDefault();
            $('.modal.signin').classList.remove('active');
            $('.modal.signup').classList.add('active');
        }
    });
    document.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    /*certification*/


    $('.modal.signup form').addEventListener('submit', function (ev) {
        ev.preventDefault();
        var errMsg = $('.modal.signup .err-msg');
        var username = $('.modal.signup input[name=username]').value
        var password = $('.modal.signup input[name=password]').value
        var password2 = $('.modal.signup input[name=password2]').value
        if (!/^\w{3,8}$/.test(username)) {
            errMsg.innerText = '用户名需输入3-8个字符，包括字母数字下划线';
            return false;
        }
        if (!/^\w{6,10}$/.test(password)) {
            errMsg.innerText = '密码需输入6-10个字符，包括字母数字下划线';
            return false
        }
        if (password !== password2 ) {
            errMsg.innerText = '两次输入的密码不一致';
            return false
        }

        var xhr = new XMLHttpRequest()
        xhr.open('POST','/signup',true)
        xhr.send('username=' + username +'&'+ 'password=' + password)
        xhr.onload = function(){
            if ((xhr.status === 200 && xhr.status <300) || xhr.status === 304){
                var data = JSON.parse(xhr.responseText)
                if (data.isExist === true) {
                    errMsg.innerText = '用户名已存在';
                    return false
                }else{
                    $('.modal.signup form').submit()
                    location.href = '/'
                }
            }
        }
    });

    $('.modal.signin form').addEventListener('submit', function (ev) {
        ev.preventDefault();
        var username = $('.modal.signin input[name=username]').value
        var password = $('.modal.signin input[name=password]').value
        var errMsg = $('.modal.signin .err-msg');
        if (!/^\w{3,8}$/.test(username)) {
            errMsg.innerText = '用户名需输入3-8个字符，包括字母数字下划线';
            return false;
        }
        if (!/^\w{6,10}$/.test(password)) {
            errMsg.innerText = '密码需输入6-10个字符，包括字母数字下划线';
            return false;
        }

        var xhr = new XMLHttpRequest()
        xhr.open('POST','/signin',true)
        xhr.send('username=' + username +'&'+ 'password=' + password)
        xhr.onload = function(){
            if ((xhr.status === 200 && xhr.status <300) || xhr.status === 304){
                var data = JSON.parse(xhr.responseText)
                if (data.isValid === true) {
                    $('.modal.signin form').submit()
                    location.href = '/'
                }else if(data.isValid === false) {
                    errMsg.innerText = '用户不存在';
                    return false 
                }else{
                    errMsg.innerText = '用户名或密码错误'
                    return false
                }
            }
        }
    })
})();