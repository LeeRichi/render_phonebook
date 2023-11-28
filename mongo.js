const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('Usage: node mongo.js <password> for all data or node mongo.js <password> <name> <number> for adding a person');
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3];
const number = process.argv[4];

const url =`mongodb+srv://applerich0306:${password}@cluster0.ts6vlph.mongodb.net/personApp?retryWrites=true&w=majority`
mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
    date: { type: Date, default: Date.now }
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log('phonebook:');
  Person.find({}).then(persons => {
    persons.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });

    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const newPerson = new Person({
    id: Math.floor(Math.random() * 1000),
    name: name,
    number: number
  });

  newPerson.save().then(result => {
    console.log(`Added ${name} ${number} to phonebook!`);
    mongoose.connection.close();
  });
} else {
  console.log('Invalid number of arguments.');
  process.exit(1);
}