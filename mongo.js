const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://param9478:${password}@cluster0.oifhlwp.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)
Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note)
  })
  mongoose.connection.close()
})

// note.save().then((result) => {
//   console.log('note saved!')
//   console.log(result)
//   mongoose.connection.close()
// })
