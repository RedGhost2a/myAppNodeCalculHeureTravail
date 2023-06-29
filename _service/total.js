const db = require('../db');

async function getAll() {
    return await db.Total.findAll();
}

async function getById(id) {
    return await db.Total.findByPk(id);
}

async function create(params) {
    return await db.Total.create(params);
}

async function update(id, params) {
    const Total = await db.Total.findByPk(id);

    // valider
    if (!Total) throw 'Calendar not found';

    // copier params à calendar et sauvegarder
    Object.assign(Total, params);
    await Total.save();

    return Total.get();
}

async function remove(id) {
    const Total = await db.Total.findByPk(id);
    if (!Total) throw 'Calendar not found';
    await Total.destroy();
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
