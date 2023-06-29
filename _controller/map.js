const express = require('express');
const router = express.Router();
const mapService = require('../_service/map');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    mapService.getAll()
        .then(map => res.json(map))
        .catch(next);
}

function getById(req, res, next) {
    mapService.getById(req.params.id)
        .then(map => map ? res.json(map) : res.sendStatus(404))
        .catch(next);
}

function create(req, res, next) {
    mapService.create(req.body)
        .then(map => res.json(map))
        .catch(next);
}

function update(req, res, next) {
    mapService.update(req.params.id, req.body)
        .then(map => res.json(map))
        .catch(next);
}

function _delete(req, res, next) {
    mapService.remove(req.params.id)
        .then(() => res.json({}))
        .catch(next);
}
