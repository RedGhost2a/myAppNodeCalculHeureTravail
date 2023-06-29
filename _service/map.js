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

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
