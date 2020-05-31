const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:4000/fruitsDB", {useNewUrlParser: true, useUnifiedTopology: true});

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified."]
    },
    rating:  {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);
const fruit = new Fruit({
    name: "Apple",
    rating: 10 ,
    review: "Pretty solid as a fruit."
});

//fruit.save();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
    name: "Pineapple",
    score: 9,
    review: "Great Fruit"
});

const person = new Person({
    name: "Amy",
    age: 37,
    favoriteFruit: pineapple
});

//person.save();

const kiwi = new Fruit({
    name: "Kiwi",
    score: 10,
    review: "The best fruit!"
});

const orange = new Fruit({
    name: "Orange",
    score: 10,
    review: "Too sour for me"
});

const banana = new Fruit({
    name: "Banana",
    score: 10,
    review: "Weird texture"
});

// Fruit.insertMany([kiwi, orange, banana], function(err) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("Successfully saved all the fruits to fruitsDB!")
//     }
// });

//fruit.save();

Fruit.find(function(err, fruits) {
    if (err) {
        console.log(err);
    } else {
        mongoose.connection.close();
        fruits.forEach(function(fruit){
            console.log(fruit.name);
        });
    };
});

// Updating a document in database
Fruit.updateOne({_id: "5ed1b8da572d58151ea8f5df"}, {name: "First Apple"}, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Successfully updated the document.")
    };
});

Fruit.deleteOne({name: "First Apple"}, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Deleted Document.")
    };
});

Person.deleteMany({name: "John"}, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Succesfully deleted all documents.")
    }
})
