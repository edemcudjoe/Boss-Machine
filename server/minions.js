const express = require('express');
const minionsRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db.js');
const workRouter = require('./work.js');


minionsRouter.use((req, res, next) => {
    const allMinions = getAllFromDatabase('minions');
    if (allMinions) {
        req.minions = allMinions;
        next();
    }
    else {
        res.status(404).send('Request not found');
    }
})

minionsRouter.param('minionId', (req, res, next, minionId) => {
    const minionWithId = getFromDatabaseById('minions', minionId);
    if (!minionWithId) {
        return res.status(404).send('Minion With Specified Id Does Not Exist')
    }
    req.body.id = minionId;
    req.minionId = minionId;
    req.minionWithId = minionWithId;
    next();
})

minionsRouter.get('/', (req, res, next) => {
    const allMinions = req.minions;
    res.send(allMinions);
})

minionsRouter.get('/:minionId', (req, res, next) => {
    const minionIdExists = req.minionWithId;
    res.send(minionIdExists); 
})

minionsRouter.post('/', (req, res, next) => {
    const newMinion = req.body;

    if (newMinion.name || newMinion.title || newMinion.weaknesses || newMinion.salary) {
        const newMinionAdded = addToDatabase('minions', newMinion);
        res.status(201).send(newMinionAdded);
    } else {
        res.status(400).send('Bad New Minion Info');
    }
})

minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion)
})

minionsRouter.delete('/:minionId', (req, res, next) => {
    const minionDeleted = deleteFromDatabasebyId('minions', req.minionId)

    if (minionDeleted) {
        return res.status(204).send('Minion Deleted Successfully')
    } else {
        res.status(404)
    }
})

minionsRouter.use('/:minionId/work', workRouter)


module.exports = minionsRouter;