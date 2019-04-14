const schema = require('./Schema/schema');
const faker = require('faker');
faker.locale = "it";
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cerebrum', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connected');
});
const User = require('./Models/user');
// const personSchema = new mongoose.Schema(schema.person.data);

// const PersonModel = mongoose.model(schema.person.collection, personSchema);

// for (let index = 0; index < 100; index++) {
//     const Person = new PersonModel({
//         firstName: faker.name.firstName(),
//         lastName: faker.name.lastName(),
//         email: faker.internet.email(),
//         phone: faker.phone.phoneNumber(),
//         age: faker.random.number({
//             min: 18,
//             max: 50
//         }),
//         work: faker.name.jobTitle()
//     });

//     Person.save(function (err, person) {
//         if (err) return console.error(err);
//         console.log(person);
//     });
// }