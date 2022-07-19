const express = require('express');
const { getAllFromDatabase, addToDatabase, createWork, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');
const workRouter = express.Router({mergeParams: true});

workRouter.use((req, res, next) => {
    const allWork = getAllFromDatabase('work');
    const minionId = req.params.minionId;
    const specifiedMinionWork = allWork.filter(work => work.minionId === minionId);
    
    req.specifiedMinionWork = specifiedMinionWork;
    next();
})

const validateWorkId = (req, res, next) => {
    let specificMinionWorks = req.specifiedMinionWork;
    let validMinionId = specificMinionWorks.find(work => work.id === req.params.workId);
    if (!validMinionId) {
        return res.status(400).send('Bad Info Match')
    }
    next();
}



workRouter.get('/', (req, res, next) => {
    const allWork = req.specifiedMinionWork;
    res.status(200).send(allWork);
})

workRouter.post('/', (req, res, next) => {
    const newWork = req.body;
    newWork.minionId = req.params.minionId;

    if (newWork.title && newWork.description && newWork.hours) {
        const createdWork = addToDatabase('work', newWork)
        res.status(201).send(createdWork);
    } else {
        res.status(400).send('Provide all info');
    }
})

workRouter.put('/:workId', validateWorkId, (req, res, next) => {
    const newInfo = req.body;
    newInfo.id = req.params.workId;
    newInfo.minionId = req.params.minionId;
    const updatedWorkResponse = updateInstanceInDatabase('work', newInfo);

    if (updatedWorkResponse) {
        res.status(200).send(updatedWorkResponse)
    } else {
        res.status(404).send();
    }
})

workRouter.delete('/:workId', (req, res, next) => {
    const workDeleted = deleteFromDatabasebyId('work', req.params.workId);

    if (workDeleted) {
        res.status(204).send('Work Deleted Successfully')
    } else {
        res.sendStatus(404);
    }
})

module.exports = workRouter;