const express = require('express')
const router = express.Router()
const Joi = require('joi')
const validateRequest = require('../middleware/validate-request')
const authorize = require('../middleware/authorize')
const calendarService = require('../services/calendar.service')
const eventsService = require('../services/events.service')
const Role = require('../helpers/role')

module.exports = router
//routers
router.get('/', authorize(), getAll) //get all calendar
router.get('/:id/events', authorize(), getAllEvents)
//TO DO: Add route to get specific event under calendar
//TO DO: Add route to get all events under calendar
router.get('/:id', authorize(), getById) //get specific calendar
// router.get('/:id/events', authorize(), getAllEvents)
router.post('/', authorize(), createSchema, create) //create calendar
router.post('/:id/events', authorize(), createSchemaEvent, createEvent)
router.patch('/:id', authorize(), updateSchema, update) //update calendar
router.delete('/:id', authorize(), _delete) //delete calendar

function getAll(req, res, next) {
    calendarService.getAll(req.user.id)
        .then(data => res.json(data))
        .catch(next);
}

function getAllEvents(req, res, next) {
    eventsService.getAll(req.user.id, req.params.id)
        .then(data => {
            res.json(data)
        })
        .catch(next);
}

function getById(req, res, next) {
    calendarService.getById(req.params.id, req.user.id)
        .then(data => res.json(data))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty('').required(),
        description: Joi.string().empty(''),
        color: Joi.string().empty('').required(),
        participants: Joi.string().empty('')
    })
    validateRequest(req, next, schema)
}

function create(req, res, next) {
    calendarService.create(req.body, req.user.id)
        .then((data) => res.json({ message: "Calendar Creation successful", data}))
        .catch(next)
}

function createSchemaEvent(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().empty('').required(),
        type: Joi.string().empty().valid('arrangement', 'task', 'reminder').required(),
        description: Joi.string().empty(''),
        start: Joi.string().empty('').required(),
        end: Joi.string().empty('')
    })
    validateRequest(req, next, schema)
}

function createEvent(req, res, next) {
    eventsService.create(req.body, req.user.id, req.params.id)
        .then((data) => res.json({ message: "Event Creation successful", data}))
        .catch(next)
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(''),
		description: Joi.string().empty(''),
		color: Joi.string().empty(''),
		participants: Joi.string().empty('')
    })
    validateRequest(req, next, schema)
}

function update(req, res, next) {
    calendarService.update(req.body, req.params.id, req.user.id)
        .then((data) => res.json({ message: "Calendar updated successfully", data}))
        .catch(next)
}

function _delete(req, res, next) {
    calendarService.delete(req.params.id, req.user.id)
        .then(() => res.json({message: "Calendar deleted successfully"}))
        .catch(next)
}
