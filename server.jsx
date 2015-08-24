'use strict';

var express = require('express');
var morgan = require('morgan');

var app = express();

function template() {
    return [
        '<!DOCTYPE html>',
        '   <html>',
        '       <head>',
        '           <meta charset="utf-8">',
        '           <title>Isomorphic Redux Demo</title>',
        '       </head>',
        '       <body>',
        '           <div id="react-view"></div>',
        '           <script src="/bundle.js"></script>',
        '       </body>',
        '</html>'
    ].join('\n');
}

app.use(morgan('dev'));
app.use(function(req, res) {
    res.end(template());
});

module.exports = app;

