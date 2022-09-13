fx_version 'cerulean'
game 'gta5'

name 'TS Paradise'
description 'Typescript Core for FiveM'
version '0-5-0-development'
author '&Y'


client_script 'dist/client.js'
server_script 'dist/server.js'

ui_page 'dist/index.html'
loadscreen 'dist/loadscreen.html'

files {
    'dist/ui.js',
    'dist/style.css',
    'dist/index.html',
    'dist/assets/**/*'
}

files {
    'dist/loadscreen.js',
    'dist/loadscreen.css',
    'dist/loadscreen.html',
}