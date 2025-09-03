import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    scientificName: {
        type: String,
        trim: true,
    },
    soilType: {
        type: String,
        required: true,
        trim: true
    },
    idealTemperature: {
        min: Number,
        max: Number
    },
    idealHumidity: {
        min: Number,
        max: Number
    },
    irrigationNeeds: {
        type: String
    },
    growthDurationDays: Number,
    pests: [String],
    diseases: [String],
    advisory: String  // Crop care advice
}, {timestamp: true} );

const Crop = mongoose.model('Crop', cropSchema);

export default Crop;