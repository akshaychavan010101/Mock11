const express = require("express");
require("dotenv").config();
const { Travel } = require("../models/travel.models");

const TravelRouter = express.Router();

TravelRouter.get("/api/retrieve", async (req, res) => {
  try {
    const allTravels = await Travel.find({});
    res.status(200).json({ data: allTravels, ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

TravelRouter.post("/api/post", async (req, res) => {
  try {
    const payload = req.body;
    const newTravel = new Travel(payload);
    await newTravel.save();
    res
      .status(200)
      .json({ msg: "Travel Added Successfully", ok: true, travel: newTravel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

TravelRouter.delete("/api/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Travel.findByIdAndDelete(id);
    res.status(202).json({ msg: "Travel Deleted Successfully", ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

TravelRouter.get("/api/filter/:destination", async (req, res) => {
  try {
    const destination = req.params.destination;
    let filteredTravels = [];

    if (destination !== undefined) {
      filteredTravels = await Travel.find({ destination });
    } else {
      filteredTravels = await Travel.find({});
    }

    res.status(200).json({ data: filteredTravels, ok: true });
  } catch (error) {
    res.status(500).json({ msg: "Error", error: error.message });
  }
});

TravelRouter.get("/api/sort/:type", async (req, res) => {
  try {
    const type = req.params.type;
    let sortedTravels = [];
    if (type !== undefined) {
      sortedTravels = await Travel.find({}).sort({
        budget_per_person: type,
      });
    } else {
      sortedTravels = await Travel.find({});
    }

    res.status(200).json({ data: sortedTravels, ok: true });
  } catch (error) {
    res.status(500).json({ msg: "Error", error: error.message });
  }
});

module.exports = { TravelRouter };
