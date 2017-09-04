"use strict";

var React = require('react');
var AuthorStore = require('../../stores/authorStore');
var AuthorActions = require('../../actions/authorActions');
var AuthorList = require('./authorList');
var Router = require('react-router');
var Link = Router.Link;
var AuthorPage = React.createClass({
    getInitialState: function() {
        return {
            authors: AuthorStore.getAllAuthors()
        };
    },
    _onChanges: function() {
        this.setState({
            authors: AuthorStore.getAllAuthors()
        });
    },
    
     componentWillMount: function() {
       AuthorStore.addChangeListener(this._onChanges);
     },

     componentWillUnmount: function() {
       AuthorStore.removeChangeListener(this._onChanges);
     },

    render: function() {
        return (
            <div>
              <h1>Authors</h1>
              <Link to="addAuthor" className="btn btn-default">Add Author</Link>  
              <AuthorList authors={this.state.authors}/>
           </div>
        );
    }
});

module.exports = AuthorPage;
