//DEPENDENCIES
const events = require("express").Router();
const db = require("../models");
const { Event, Meet_Greet, Band, Set_Time, Stage, Stage_Event } = db;
const { Op } = require("sequelize");
const bands = require("./bands_controller");

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
events.get("/:name", async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { name: req.params.name },
            include: [
                {
                    model: Meet_Greet,
                    as: "meet_greets",
                    include: {
                        model: Band,
                        as: "bands"
                    }
                },
                {
                    model: Set_Time,
                    as: "set_times",
                    include: [
                        {
                            model: Band,
                            as: "bands"
                        },
                        {
                            model: Stage,
                            as: "stages"
                        }
                    ]
                },
                {
                    model: Stage,
                    as: "stages",
                    include: {
                        model: Stage_Event,
                        as: "stage_event"
                    }
                }
            ]
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