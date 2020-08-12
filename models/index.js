const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config");


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

sequelize.authenticate()
.then(res=>console.log('Connection has been established successfully.'))
.catch(err=>console.log('Unable to connect to the database:', err));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model")(sequelize, Sequelize);

module.exports = db;