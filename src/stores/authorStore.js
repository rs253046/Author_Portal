"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionType = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';
var _ = require('lodash');
var _authors = [];
var AuthorStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    getAllAuthors: function() {
        return _authors;
    },

    getAuthorById: function(id) {
        return _.find(_authors, {
            id: id
        });
    }
});

Dispatcher.register(function(action) {
    switch (action.actionType) {
        case ActionType.CREATE_AUTHOR:
            _authors.push(action.author);
            AuthorStore.emitChange();
            break;
        case ActionType.INITIALIZE:
            _authors = action.initialData.authors;
            AuthorStore.emitChange();
            break
        case ActionType.UPDATE_AUTHOR:
            var existingAuthor = _.find(_authors, {
                id: action.author.id
            });
            var existingAuthorIndex = _.indexOf(_authors, existingAuthor);
            _authors.splice(existingAuthorIndex, 1, action.author);
            AuthorStore.emitChange();
            break;
        case ActionType.DELETE_AUTHOR:
            _.remove(_authors, function(author) {
                return action.id === author.id;
            });
            AuthorStore.emitChange();
            break;
        default:
    }
});

module.exports = AuthorStore;
