const express = require('express');
const router = express.Router();
const totalService = require('../_service/total');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    totalService.getAll()
        .then(total => res.json(total))
        .catch(next);
}

function getById(req, res, next) {
    totalService.getById(req.params.id)
        .then(total => total ? res.json(total) : res.sendStatus(404))
        .catch(next);
}

function create(req, res, next) {
    totalService.create(req.body)
        .then(total => res.json(total))
        .catch(next);
}

function update(req, res, next) {
    totalService.update(req.params.id, req.body)
        .then(total => res.json(total))
        .catch(next);
}

function _delete(req, res, next) {
    totalService.remove(req.params.id)
        .then(() => res.json({}))
        .catch(next);
}
