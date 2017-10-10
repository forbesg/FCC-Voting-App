import { Router } from 'express'
import bodyParser from 'body-parser'
// import passport from '../passport/auth'
/**
  Create Mongoose Model for Polls
  @params owner => {
    name,
    email
  }
  @params question => String
  @params answers => Array
  @params Votes => Should perhaps include a counter in the answer Array
**/
import Poll from '../models/polls'

const router = Router()

// GET all Polls from DB
router.get('/polls', (req, res) => {
  Poll.find({}, (err, docs) => {
    if (err) {
      return res.status(500)
    }
    res.send(docs)
  })
})

// Add a new Poll to BD
router.post('/polls/add', bodyParser.json(), (req, res) => {
  const answers = req.body.answers.map(answer => {
    return {
      answer,
      votes: 0
    }
  })
  const newPoll = new Poll({
    owner: req.body.owner,
    question: req.body.question,
    answers
  })
  newPoll.save((err, doc) => {
    if (err) {
      throw new Error(err)
    }
    res.status(201).send(doc)
  })
})

// GET a single Poll by ID
router.get('/polls/:id', (req, res) => {
  Poll.findOne({_id: req.params.id}, (err, docs) => {
    if (err) {
      return res.status(404)
    }
    res.send(docs)
  })
})

// Update Vote Count on existing Poll
router.put('/polls/:id', bodyParser.json(), (req, res) => {
  Poll.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, function (err, doc) {
      if (err) return res.send(err);
      res.send(doc)
  })
})

// Delete a Poll
router.delete('/polls/:id', (req, res) => {
  Poll.remove({_id: req.params.id}).then(response => {
    return res.sendStatus(200)
  }).catch(err => {
    console.log(err)
  })
})



export default router
