# NODE SEQUALIZE - MYSQL CRUD

```
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "mysql2": "^2.1.0",
    "sequelize": "^6.3.4"
  }
```
## RELATIONAL DATABASE MODEL IN SEQUALIZE
### EXAMPLE :-
tutorial.model.js
```
module.exports = (sequelize, DataTypes) => {
  const Tutorial = sequelize.define("tutorial", {
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    }
  });

  return Tutorial;
};
```
comment.model.js
```
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    name: {
      type: DataTypes.STRING
    },
    text: {
      type: DataTypes.STRING
    }
  });

  return Comment;
};
```
index.js

```
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.comments = require("./comment.model.js")(sequelize, Sequelize);

db.tutorials.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.tutorials, {
  foreignKey: "tutorialId",
  as: "tutorial",
});

module.exports = db;
```
### create comment controller
```
exports.createComment = (tutorialId, comment) => {
  return Comment.create({
    name: comment.name,
    text: comment.text,
    tutorialId: tutorialId,   //(comes from req.body of router)
  })
    .then((comment) => {
      console.log(">> Created comment: " + JSON.stringify(comment, null, 4));
      return comment;
    })
    .catch((err) => {
      console.log(">> Error while creating comment: ", err);
    });
};
```
### fetch fomment by tutorial
```
exports.findTutorialById = (tutorialId) => {
  return Tutorial.findByPk(tutorialId, { include: ["comments"] })
    .then((tutorial) => {
      return tutorial;
    })
    .catch((err) => {
      console.log(">> Error while finding tutorial: ", err);
    });
};
```
### fetch the comments for a given comment id

```
exports.findCommentById = (id) => {
  return Comment.findByPk(id, { include: ["tutorial"] })
    .then((comment) => {
      return comment;
    })
    .catch((err) => {
      console.log(">> Error while finding comment: ", err);
    });
};
```
### Get all Tutorials include comments
```
exports.findAll = () => {
  return Tutorial.findAll({
    include: ["comments"],
  }).then((tutorials) => {
    return tutorials;
  });
};
```
