'use strict';

var app = app || {};

const ENV = {};
//token: 1234

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://apfly-map-up.herokuapp.com/';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;