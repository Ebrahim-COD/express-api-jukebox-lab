const express = require("express");
const router = express.Router();
const Track = require("../models/track");

router.post("/", async (req, res) => {
  try {
    const track = await Track.create(req.body);
    res.status(201).json({ track });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const tracks = await Track.find();
    res.status(200).json({ tracks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
    try {
      const foundTrack = await Track.findById(req.params.id);
      if (!foundTrack) {
        res.status(404);
        throw new Error('Track not found.');
      }
      res.status(200).json(foundTrack);
    } catch (error) {
      if (res.statusCode === 404) {
        res.json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  });
  

router.put("/:id", async (req, res) => {
  try {
    const track = await Track.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!track) res.status(404).json({ message: "Track not found" });
    else {
      res.status(200).json({ track });
    }
  } catch (error) {
    if (res.status(404).json({ error: error.message }));
    else {
      res.status(500).json({ error: error.message });
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const track = await Track.findByIdAndDelete(req.params.id);
    if (!track) res.status(404).json({ message: "Track not found" });
    else {
      res.status(200).json({ track });
    }
  } catch (error) {
    if (res.status(404).json({ error: error.message }));
    else {
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router;
