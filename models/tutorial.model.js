const Sequelize = require('sequelize');
const db = require('../config/db.config');

const Tutorial = db.define('tutorial', {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  published: {
    type: Sequelize.BOOLEAN
  }
});

Tutorial.sync().then(() => {
  console.log('table created');
});

module.exports = Tutorial;