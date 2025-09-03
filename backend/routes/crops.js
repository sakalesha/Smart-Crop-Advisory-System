import express from 'express';
import Crop from '../models/crop.js';

const router = express.Router();

// get all crops
router.get('/', async (req, res) => {
    try {
        const crops = await Crop.find();
        res.json(crops);
    } catch (error) {
        res.status(500).json( {Message: 'Crop server error'} );
    }
});

// get crop by id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const crop = await Crop.findById(id);

        if(!crop) {
            return res.status(401).json({ Message: 'Crop not found'});
        }

        res.json(crop);
    } catch (error) {
        res.status(500).json({Message: 'Crop server error'});
    }
});

// add new crop
router.post('/', async (req, res) => {
    try {
        const crop = new Crop(req.body);
        await crop.save();
        res.status(201).json({Message: `${crop.name} added successfully`});
    } catch (error) {
        res.status(400).json({Message: 'Invalid data'});
    }
});

// update crop
router.put('/:id', async (req, res) => {
    try {
        const updatedCrop = await Crop.findByIdAndUpdate(req.params.id, req.body, {new : true});

        if(!updatedCrop) {
            return res.status(404).json({Message: 'Crop not found'});
        }

        res.json({Message: `${updatedCrop.name} updated successfully`});
    } catch (error) {
        res.status(400).json({Message: 'Invalid data'});
    }
});

// delete crop
router.delete('/:id', async (req, res) => {
    try {
        const deletedCrop = await Crop.findByIdAndDelete(req.params.id);

        if(!deletedCrop) {
            return res.status(404).json({Message: 'Crop not found'});
        }

        res.json({Message: `${deletedCrop.name} deleted successfully`});
    } catch (error) {
        res.status(500).json({Message: 'Server error'});
    }
});

export default router;