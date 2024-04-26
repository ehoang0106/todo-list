require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const MongoClient = require('mongodb').MongoClient;

const uri = process.env.MONGO_URI;



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let todoData;

async function run() {
    try {
        await client.connect();
        const database = client.db('test');
        const todos = database.collection('todos');
        //write a todo to the database
        
        const todo = {
            text: 'Learn MongoDB',
            completed: false
        };
        const result = await todos.insertOne(todo);
        console.log(`New todo created with the following id: ${result.insertedId}`);

        //read all todos from the database
        const query = {};
        const todosList = await todos.find(query).toArray();
        console.log(todosList);
        todoData = todosList;
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

app.get('/todos', (req, res) => {
    res.json(todoData);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});