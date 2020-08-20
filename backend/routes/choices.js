const router = require('express').Router();
const Choice = require('../models/choice.model');

router.route('/').get((req, res) => {
    Choice.find({})
        .then(choices => res.json(choices))
        .catch(err => res.status(400).json('Error ' + err));
       
});

router.route('/add').post((req, res) => {
    const tgname = req.body.tgname;
    const choice = req.body.choice;

    const newChoice = new Choice({
        tgname,
        choice,
    });

    newChoice.save()
        .then(() => res.json('Choice added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Choice.findById(req.params.id)
        .then(choice => res.json(choice))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Choice.findByIdAndDelete(req.params.id)
        .then(() => res.json('Choice deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Choice.findById(req.params.id)
        .then(choice => {
            choice.tgname = req.body.tgname;
            choice.choice = req.body.choice;

            choice.save()
                .then(() => res.json('Choice updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;