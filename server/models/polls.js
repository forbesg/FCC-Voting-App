import mongoose from 'mongoose';

const Poll = mongoose.model('Poll', {
  owner: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  question: {
    type: String,
    required: true
  },
  answers: [
    {
      answer: {
        type: String
      },
      votes: {
        type: Number,
        default: 0
      }
    }
  ]
});

export default Poll
