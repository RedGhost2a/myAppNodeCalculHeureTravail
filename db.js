const { Sequelize } = require('sequelize');
const models = require('./_model');  // Assurez-vous que le chemin d'accès est correct.

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './path/to/database.sqlite'
});

let db = {};

// initialiser les modèles et les ajouter à l'objet db exporté
db.Calendar = models.Calendar(sequelize);
db.Hour = models.Hour(sequelize);
db.Total = models.Total(sequelize);
db.Maps = models.Maps(sequelize);

// établir les relations entre les modèles ici si nécessaire
db.Calendar.hasOne(db.Hour, { foreignKey: 'calendarId' });
db.Calendar.hasOne(db.Total, { foreignKey: 'calendarId' });
db.Calendar.hasOne(db.Maps, { foreignKey: 'calendarId' });

db.Hour.belongsTo(db.Calendar, { foreignKey: 'calendarId' });
db.Total.belongsTo(db.Calendar, { foreignKey: 'calendarId' });
db.Maps.belongsTo(db.Calendar, { foreignKey: 'calendarId' });

// synchroniser tous les modèles avec la base de données
// sequelize.sync({ alter: true })
//     .then(() => console.log('Database & tables created!'));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
