const db = require('../db');

async function getAll() {
    return await db.Maps.findAll();
}

async function getById(id) {
    return await db.Maps.findByPk(id);
}

async function create(params) {
    return await db.Maps.create(params);
}

async function update(id, params) {
    const Maps = await db.Maps.findByPk(id);

    // valider
    if (!Maps) throw 'Calendar not found';

    // copier params à calendar et sauvegarder
    Object.assign(Maps, params);
    await Maps.save();

    return Maps.get();
}

async function remove(id) {
    const Maps = await db.Maps.findByPk(id);
    if (!Maps) throw 'Calendar not found';
    await Maps.destroy();
}
async function getTotalMapsForMonth(month){
    try {
        month = month < 10 ? `0${month}` : `${month}`;

        const calendars = await db.Calendar.findAll({
            attributes: ['id'],
            where: db.sequelize.where(db.sequelize.fn('strftime', '%m', db.sequelize.col('date')), month)
        });

        const calendarIds = calendars.map(calendar => calendar.id);

        console.log(`Retrieved calendar IDs for month ${month}:`, calendarIds);

        const maps = await db.Maps.findAll({ where: { calendarId: calendarIds }});




        return { maps };

    } catch (error) {
        console.error(`Failed to retrieve total hours for month ${month}:`, error);
        throw error;
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    getTotalMapsForMonth
};
