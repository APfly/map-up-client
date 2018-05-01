'use strict';

var app = app || {};

const ENV = {};
//token: 1234

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://apfly-map-up.herokuapp.com/';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

// wrapping all functions in an IIFE
(function(module){
  function errorCallback(err){
    console.error(err);
    module.errorView.initErrorPage(err);
  }
  // Defining Meetups constructor
  function Meetups(rawMeetupsObj){
    Object.keys(rawMeetupsObj).forEach(key => this[key] = rawMeetupsObj[key])
  }
  // creating handlebars template with Meetups data
  Meetups.prototype.toHtml = function(){
    let template = Handlebars.complile($('#meetups-template').text());
    return template(this);
  }

})(app);