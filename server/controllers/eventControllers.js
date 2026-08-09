import Event from "../models/Event.js";

//   Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();

    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: error.message 

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

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json(event);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
