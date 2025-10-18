const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../resources.db'),
    logging: false // Set to true for SQL query logging
});

module.exports = sequelize;