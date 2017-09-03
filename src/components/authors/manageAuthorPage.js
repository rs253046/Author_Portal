"use strict";
var React = require('react');
var AuthorForm = require('./authorForm');
var AuthorApi = require('../../api/authorApi');
var Router = require('react-router');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
    mixins: [
        Router.Navigation
    ],

    statics: {
        willTransitionFrom: function(transition, component) {
            if (component.state.dirty && !confirm('Leave withour saving?')) {
                transition.abort();
            }
        }
    },

    getInitialState: function() {
        return {
            author: {
                id: '',
                firstName: '',
                lastName: ''
            },
            dirty: false,
            errors: {}
        };
    },

    componentWillMount: function() {
        var authorId = this.props.params.id; // from the pathh '/authur: id'
        if (authorId) {
            this.setState({
                author: AuthorApi.getAuthorById(authorId)
            });
        }
    },

    authorFormIsVaild: function() {
        var formIsValid = true;
        this.state.errors = {};
        if (this.state.author.firstName.length < 3) {
            formIsValid = false;
            this.state.errors.firstName = "First name must be at least 3 characters.";
        }
        if (this.state.author.lastName.length < 3) {
            formIsValid = false;
            this.state.errors.lastName = "Last name must be at least 3 characters.";
        }
        this.setState({
            errors: this.state.errors
        });
        return formIsValid;
    },

    setAuthorState: function(event) {
        this.setState({
            dirty: true
        });
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        return this.setState({
            author: this.state.author
        });
    },

    saveAuthor: function(event) {
        this.setState({
            dirty: false
        });
        event.preventDefault();
        if (!this.authorFormIsVaild()) {
            return;
        }
        AuthorApi.saveAuthor(this.state.author);
        toastr.success('Author saved.');
        this.transitionTo('authors');
    },

    render: function() {
        return (
            <AuthorForm 
               author={this.state.author}
               onChange={this.setAuthorState}
               onSave={this.saveAuthor}
               errors= {this.state.errors}
            />
        );
    }
});

module.exports = ManageAuthorPage;
