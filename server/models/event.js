import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        title: {   
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        
        },
        streetAddress: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true     
        },
        state: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        },
        organizer: {
            type: String,
            required: true
        },
        cost: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        startTime: {
            type: String,
        required: true
        },

        endTime: {
            type: String
        }
        
        },
    {
        timestamps: true
    }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;