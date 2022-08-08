const Sequelize = require("sequelize");
const { DataTypes } = Sequelize
const { DATABASE, USER_NAME, PASSWORD, HOST } = require("./constant");

const sequelize = new Sequelize(
    DATABASE,
    USER_NAME,
    PASSWORD,
    {
        host: HOST,
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});


const Dictionary = sequelize.define("dictionary", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    word: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_date: {
        type: DataTypes.DATE,
    }
});


sequelize.sync().then(() => {
    console.log('Book table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports.syncDataConfig = sequelize
module.exports.Dictionary = Dictionary