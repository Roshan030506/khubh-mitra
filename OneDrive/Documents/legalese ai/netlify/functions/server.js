// Netlify Serverless Function Wrapper for LegalEase AI Express Server
const serverless = require("serverless-http");
const app = require("../../server");

module.exports.handler = serverless(app);
