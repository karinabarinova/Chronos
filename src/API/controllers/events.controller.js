const express = require('express')
const router = express.Router()
const Joi = require('joi')
const validateRequest = require('../middleware/validate-request')
const authorize = require('../middleware/authorize')
const eventsService = require('../services/events.service')

module.exports = router

router.get('/:id', authorize(), getById) //get specific event
router.patch('/:id', authorize(), updateSchema, update) //update calendar
router.delete('/:id', authorize(), _delete) //delete

function getById(req, res, next) {
    eventsService.getById(req.params.id, req.user.id)
        .then(data => res.json(data))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().empty(''),
		description: Joi.string().empty(''),
        participants: Joi.string().empty(''),
        start: Joi.string().empty(''),
        end: Joi.string().empty('')
    })
    validateRequest(req, next, schema)
}

function update(req, res, next) {
    eventsService.update(req.body, req.params.id, req.user.id)
        .then((data) => res.json(data))
        .catch(next)
}

function _delete(req, res, next) {
    eventsService.delete(req.params.id, req.user.id)
        .then(() => res.json({message: "Event deleted successfully"}))
        .catch(next)
}
