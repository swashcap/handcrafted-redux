'use strict';

var express = require('express');
var morgan = require('morgan');
var Location = require('react-router/lib/Location');
var React = require('react');
var Router = require('react-router').Router;

var routes = require('./shared/routes');

var app = express();

function template(content) {
    var componentHTML = content.componentHTML || '';
    return [
        '<!DOCTYPE html>',
        '   <html>',
        '       <head>',
        '           <meta charset="utf-8">',
        '           <title>Isomorphic Redux Demo</title>',
        '       </head>',
        '       <body>',
        '           <div id="react-view">' + componentHTML + '</div>',
        '           <script src="/bundle.js"></script>',
        '       </body>',
        '</html>'
    ].join('\n');
}

app.use(morgan('dev'));
app.use(function(req, res) {
    var location = new Location(req.path, req.query);

    Router.run(routes, location, function(err, routeState) {
        if (err) {
            return console.error(err);
        } else if (!routeState) {
            console.error('No routeState:', req.path, req.query);
            return res.status(404).end('404');
        }

        var InitialComponent = (
            <Router {...routeState} />
        );
        var componentHTML = React.renderToString(InitialComponent);
        
        res.end(template({ componentHTML }));
    });
});

module.exports = app;

