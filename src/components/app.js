/*eslint-disable strict*/ //Disabling check because we can't run strict mode. Need global vars
$ = JQuery = require('Jquery');
var React = require('react');
var Header = require('./common/header');
var RouteHandler = require('react-router').RouteHandler;

var App = React.createClass({
    render: function() {
        return (
            <div>
               <Header/>
               <div className="container-fluid">
                 <RouteHandler/>
               </div>
            </div>
        );
    }
});

module.exports = App;
