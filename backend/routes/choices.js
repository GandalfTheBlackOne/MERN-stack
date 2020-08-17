const router = require('express').Router();
let Choice = require('../models/choice.model');
let BotCallChoice = require('../models/BotCallChoice.model');
let Exercise = require('../models/exercise.model');
let User = require('../models/user.model');

//ATLAS_URI=mongodb+srv://thomas:NhtKhfKa0U1D2TyQ@testchatbot.glo4f.mongodb.net/IWBuddy?retryWrites=true

router.route('/').get((req, res) => {
    Exercise.find()
        .then(choices => res.json(choices));
       
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