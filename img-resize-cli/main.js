#! /usr/bin/env node

const sharp = require('sharp');
const {promisify} = require('util')
const del = require('del')
const process = require('process')
const fs = require('fs')
const path = require('path')

const readdir = promisify(fs.readdir)
const mkdir = promisify(fs.mkdir)
const regexp = /.png$|.jpg$|.jpeg$|.svg$|.gif$|.tiff$/
const size = process.argv.splice(2,2)

function main([width,height]) {
    width = Number(width)
    height = Number(height)
    let destDirName = getTimeStr()
    mkdir(`${destDirName}`).then(() => {
        return readdir('./')
    }).then((files) => {
        files.forEach((file) => {
            if (regexp.test(file)) {
                resize(file, width, height, destDirName)
            }
        })
    }).catch((err) => {
        console.log(err)
        del(destDirName)
    })

}

function resize(file, width, height, destDirName) {
    sharp(file)
        .resize(width, height)
        .toFile(path.join(__dirname, `${destDirName}`, `${file}`))
        .then(() => {
            console.log(`file ${file} resize finished and saved to  ${destDirName}`)
        })
        .catch((err) => {
            console.log(err)
            del(destDirName)
        })
}

function getTimeStr() {
    let date = new Date()
    let str = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`
    return str
}

main(size)



