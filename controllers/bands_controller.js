//DEPENDECIES
const bands = require("express").Router();
const db = require("../models");
const { Band } = db;

bands.get("/", async (req, res) => {
    try {
        const foundBands = await Band.findAll();
        res.status(200).json(foundBands);
    } catch (err) {
        res.status(500).json(err);
    }
});

bands.get("/:id", async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { band_id: req.params.id }
        });
        res.status(200).json(foundBand);
    } catch (err) {
        res.status(500).json(err);
    }
});

bands.post("/", async (req, res) => {
    try {
        const newBand = await Band.create(req.body);
        res.status(200).json({
            message: "Sucesfully inserted a new band",
            data: newBand
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

bands.put("/:id", async (req, res) => {
    try {
        const updatedBands = await Band.update(req.body, {
            where: { band_id: req.params.id }
        });
        res.status(200).json({
            message: `Succesfuly updated ${updatedBands} band(s)`
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

bands.delete("/:id", async (req, res) => {
    try {
        const deletedBands = await Band.destroy({
            where: { band_id: req.params.id }
        });
        res.status(200).json({
            message: `Succesfuly deleted ${deletedBands} band(s)`
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

//EXPORT
module.exports = bands;