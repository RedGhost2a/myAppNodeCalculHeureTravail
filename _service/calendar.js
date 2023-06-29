const db = require('../db');

async function getAll() {
    return await db.Calendar.findAll();
}

async function getById(id) {
    return await db.Calendar.findByPk(id);
}

async function create(params) {
    return await db.Calendar.create(params);
}

async function update(id, params) {
    const calendar = await db.Calendar.findByPk(id);

    // valider
    if (!calendar) throw 'Calendar not found';

    // copier params à calendar et sauvegarder
    Object.assign(calendar, params);
    await calendar.save();

    return calendar.get();
}

async function remove(id) {
    const calendar = await db.Calendar.findByPk(id);
    if (!calendar) throw 'Calendar not found';
    await calendar.destroy();
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
