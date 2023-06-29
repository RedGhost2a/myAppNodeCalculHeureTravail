const express = require('express');
const router = express.Router();
const calendarService = require('../_service/calendar');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    calendarService.getAll()
        .then(calendars => res.json(calendars))
        .catch(next);
}

function getById(req, res, next) {
    calendarService.getById(req.params.id)
        .then(calendar => calendar ? res.json(calendar) : res.sendStatus(404))
        .catch(next);
}

function create(req, res, next) {
    calendarService.create(req.body)
        .then(calendar => res.json(calendar))
        .catch(next);
}

function update(req, res, next) {
    calendarService.update(req.params.id, req.body)
        .then(calendar => res.json(calendar))
        .catch(next);
}

function _delete(req, res, next) {
    calendarService.remove(req.params.id)
        .then(() => res.json({}))
        .catch(next);
}
