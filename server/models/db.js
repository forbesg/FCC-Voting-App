import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/nuxt', { promiseLibrary: global.Promise },  (err) => {
  if (err) return console.log(err);
  console.log('Connected to DB');
})
