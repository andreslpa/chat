const express = require('express');
const router = express.Router();
const Joi = require('joi');
const sequelize = require('sequelize');

const Message = require('../models/message')

/* GET messages listing. */
router.get('/', function(req, res, next) {
    Message.findAll({order: sequelize.col('ts')}).then((result) => {
        res.send(result)
    } )
});

/* GET message by ts. */
router.get('/:ts', function(req, res, next) {
    Message.findByPk(req.params.ts).then((result) => {
        if(result == null)
            return res.status(400).send('The message with the given ts was not found.');
        res.send(result)
    })
});

/* POST message. */
router.post('/', function(req, res, next) {
    console.log(req.body)
    const {error} = validateMessage(req.body);

    if(error)
        return res.status(400).send(error.details[0].message);
    
    const {message, author} = req.body;

    Message.create({message, author}).then((result) => {
        res.send(result)
    })
});

/* PUT message. */
router.put('/:ts', function(req, res, next) {
    const {error} = validateMessage(req.body);

    if(error)
        return res.status(400).send(error.details[0].message);

    Message.update(req.body, {where: {ts: req.params.ts}}).then((result) => {
        if(result[0] == 0) 
            return res.status(400).send('The message with the given ts was not found.');
        res.status(200).send('Message updated.')
    })

});

/* DELETE message. */
router.delete('/:ts', function(req, res, next) {
    
    Message.destroy({where: {ts: req.params.ts}}).then((result) =>{
        if(result === 0) 
            return res.status(400).send('The message with the given ts was not found.');

        res.status(204).send()
    })

});

const validateMessage = (message) => {
    const schema = Joi.object({
        message: Joi.string()
            .min(3)
            .required(),
        author: Joi.string()
            .pattern(/^[a-z]+ [a-z]+$/, 'full name')
            .required(),
    });

    return schema.validate(message);
}

module.exports = router;