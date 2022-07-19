const express = require('express');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const { getAllFromDatabase, getFromDatabaseById, updateInstanceInDatabase, addToDatabase, deleteFromDatabasebyId } = require('./db');
const ideasRouter = express.Router();

ideasRouter.get('/', (req, res, next) => {
    const allIdeas = getAllFromDatabase('ideas');
    res.send(allIdeas);
})

ideasRouter.get('/:ideaId', (req, res, next) => {
    const ideaWithId = getFromDatabaseById('ideas', req.params.ideaId);
    
    if (ideaWithId) {
        res.send(ideaWithId);
    } else {
        res.status(404).send('Idea With Specified Id Not Found');
    }
})

ideasRouter.put('/:ideaId', (req, res, next) => {
    const newIdea = req.body;
    newIdea.id = req.params.ideaId;
    const updatedIdea = updateInstanceInDatabase('ideas', newIdea);

    if (updatedIdea) {
        res.send(updatedIdea)
    } else {
        res.status(404).send('Idea With Specified Id Not Found')
    }
})

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = req.body;
    const newIdeaAdded = addToDatabase('ideas', newIdea);
    res.status(201).send(newIdeaAdded);
})

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deletedIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);

    if (deletedIdea) {
        res.status(204).send('Idea Deleted Successfully');
    } else {
        res.status(404).send('Deletion Failed! Idea Not Found!')
    }
})

module.exports = ideasRouter;