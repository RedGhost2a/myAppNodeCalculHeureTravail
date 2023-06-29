const express = require('express');
const router = express.Router();
const workingHourService = require('../_service/workingHour');

// routes
router.get('/', getAll);
router.get('/totalHours/:month', getTotalHoursForMonth);
router.get('/totalBetween/:start/:end', getTotalHoursBetweenDates);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;


function getTotalHoursForMonth(req,res,next){
    const month = req.params.month;
    workingHourService.getTotalHoursForMonth(month)
        .then(workingHour => res.json(workingHour))
        .catch(next)
}

function getTotalHoursBetweenDates(req,res,next){
    const start = req.params.start;
    const end = req.params.end;
    workingHourService.getTotalHoursBetweenDates(start, end)
        .then(workingHour => res.json(workingHour))
        .catch(next)
}



function getAll(req, res, next) {
    workingHourService.getAll()
        .then(workingHour => res.json(workingHour))
        .catch(next);
}

function getById(req, res, next) {
    workingHourService.getById(req.params.id)
        .then(workingHour => workingHour ? res.json(workingHour) : res.sendStatus(404))
        .catch(next);
}

function create(req, res, next) {
    workingHourService.create(req.body)
        .then(workingHour => res.json(workingHour))
        .catch(next);
}

function update(req, res, next) {
    workingHourService.update(req.params.id, req.body)
        .then(workingHour => res.json(workingHour))
        .catch(next);
}

function _delete(req, res, next) {
    workingHourService.remove(req.params.id)
        .then(() => res.json({}))
        .catch(next);
}
