const express = require('express');
const { getAllFromDatabase, deleteAllFromDatabase, createMeeting, addToDatabase } = require('./db');
const meetingsRouter = express.Router();

meetingsRouter.get('/', (req, res, next) => {
    const allMeetings = getAllFromDatabase('meetings');
    
    if (allMeetings) {
        res.send(allMeetings);
    } else {
        res.status(404).send('Resource Not Found');
    }
})

meetingsRouter.post('/', (req, res, next) => {
    const createNewMeeting = createMeeting();
    const addedMeeting = addToDatabase('meetings', createNewMeeting);
    res.status(201).send(addedMeeting);
})

meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send('All Meetings Deleted');
})

module.exports = meetingsRouter;