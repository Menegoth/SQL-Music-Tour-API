//DEPENDENCIES
const events = require("express").Router();
const db = require("../models");
const { Event } = db;
const { Op } = require("sequelize");

//find all events
events.get("/", async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [ [ "start_time", "ASC" ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ""}%` }
            }
        });
        res.status(200).json(foundEvents);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get event by id
events.get("/:id", async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { event_id: req.params.id }
        });
        res.status(200).json(foundEvent);
    } catch (err) {
        res.status(500).json(err);
    }
});

//add new event
events.post("/", async (req, res) => {
    try {
        const newEvent = await Event.create(req.body);
        res.status(200).json({
            message: "Succesfuly inserted a new event",
            data: newEvent
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//update event info
events.put("/:id", async (req, res) => {
    try {
        const updateEvents = await Event.update(req.body, {
            where: { event_id: req.params.id }
        });
        res.status(200).json({
            message: `Succesfuly updated ${updateEvents} event(s)`
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete event
events.delete("/:id", async (req, res) => {
    try {
        const deletedEvents = await Event.destroy({
            where: { event_id: req.params.id }
        });
        res.status(200).json({
            message: `Succesfuly deleted ${deletedEvents} event(s)`
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//export
module.exports = events;