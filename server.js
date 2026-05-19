const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Lead = require('./lead');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/minicrm')
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));


// CREATE LEAD
app.post('/addLead', async (req, res) => {

    try {

        const lead = new Lead(req.body);

        await lead.save();

        res.status(201).json(lead);

    } catch (error) {

        res.status(500).json({ message: error.message });
    }

});


// GET ALL LEADS
app.get('/leads', async (req, res) => {

    try {

        const leads = await Lead.find();

        res.json(leads);

    } catch (error) {

        res.status(500).json({ message: error.message });
    }

});


// UPDATE LEAD STATUS
app.put('/updateLead/:id', async (req, res) => {

    try {

        const updatedLead = await Lead.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedLead);

    } catch (error) {

        res.status(500).json({ message: error.message });
    }

});


// DELETE LEAD
app.delete('/deleteLead/:id', async (req, res) => {

    try {

        await Lead.findByIdAndDelete(req.params.id);

        res.json({ message: 'Lead Deleted Successfully' });

    } catch (error) {

        res.status(500).json({ message: error.message });
    }

});

const PORT = 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});