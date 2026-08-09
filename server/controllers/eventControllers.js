import Event from "../models/eventModel.js";

//   Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();

    res.json(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message 

    });
  }
};

// POST a new event
export const createEvent = async (req, res) => {
    try {
  const event = await Event.create(req.body);
  
  res.status(201).json(event);
} catch (error) {
  res.status(400).json({ message: error.message 

  });
 }
};