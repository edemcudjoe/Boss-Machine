const checkMillionDollarIdea = (req, res, next) => {
    const numOfWeeks = req.body.numWeeks;
    const weeklyRevenue = req.body.weeklyRevenue;
    const isMillionDollarIdea = numOfWeeks * weeklyRevenue;

    if (typeof numOfWeeks !== 'number' || typeof weeklyRevenue !== 'number') {
        return res.sendStatus(400);
    } 
    
    if (isMillionDollarIdea < 1000000) {
        return res.sendStatus(400);
    } else {
        next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
