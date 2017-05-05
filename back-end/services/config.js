const env = process.env.NODE_ENV || 'dev';
const configDir = '../configuration/' + env;

const properties = require(configDir + '/properties.json');
const secrets = require(configDir + '/secrets.json');

module.exports = Object.assign(properties, secrets);