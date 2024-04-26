// require('dotenv').config();
// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3000;
// const MongoClient = require('mongodb').MongoClient;

// const uri = process.env.MONGO_URI;



// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// let todoData;

// async function run() {
//     try {
//         await client.connect();
//         const database = client.db('test');
//         const todos = database.collection('todos');
//         //write a todo to the database

//         const todo = {
//             text: 'Learn MongoDB',
//             completed: false
//         };
//         const result = await todos.insertOne(todo);
//         console.log(`New todo created with the following id: ${result.insertedId}`);

//         //read all todos from the database
//         const query = {};
//         const todosList = await todos.find(query).toArray();
//         console.log(todosList);
//         todoData = todosList;
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);

// app.get('/todos', (req, res) => {
//     res.json(todoData);
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });



// require('dotenv').config();
// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3000;
// const MongoClient = require('mongodb').MongoClient;
// const cors = require('cors');

// app.use(cors());
// app.use(express.json());

// const uri = process.env.MONGO_URI;
// const client = new MongoClient(uri);



// app.get('/items', async (req, res) => {
//     try {
//         await client.connect();
//         const database = client.db('test');
//         const todos = database.collection('todos');
//         const query = {};
//         const todosList = await todos.find(query).toArray();
//         res.json(todosList);
//     } finally {
//         await client.close();
//     }
// });

// app.post('/items', async (req, res) => {
//     const todo = {
//         text: req.body.name,
//         completed: false
//     };
//     try {
//         await client.connect();
//         const database = client.db('test');
//         const todos = database.collection('todos');
//         const result = await todos.insertOne(todo);
//         res.json(result);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'An error occurred while trying to create a new todo.' });
//     } finally {
//         await client.close();
//     }
// });

// app.delete('/items/:id', async (req, res) => {
//     const id = req.params.id;
//     try {
//         await client.connect();
//         const database = client.db('test');
//         const todos = database.collection('todos');
//         const ObjectId = require('mongodb').ObjectId;
//         const result = await todos.deleteOne({ "_id": ObjectId(id) });
//         if (result.deletedCount === 1) {
//             res.send(`Todo with id: ${id} was deleted.`);
//         } else {
//             res.send(`No todo with id: ${id} was found.`);
//         }
//     } finally {
//         await client.close();
//     }
// });


// app.listen(port, () => {
//     console.log(`Server started on port ${port}`);
// });


// Convert CommonJS module to ES module
const dotenv = require('dotenv');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// Removed unused 'req' parameter
app.get('/items', async (_, res) => {
    try {
        await client.connect();
        const database = client.db('test');
        const todos = database.collection('todos');
        const query = {};
        const todosList = await todos.find(query).toArray();
        res.json(todosList);
    } finally {
        await client.close();
    }
});

app.post('/items', async (req, res) => {
    const todo = {
        text: req.body.name,
        completed: false
    };
    try {
        await client.connect();
        const database = client.db('test');
        const todos = database.collection('todos');
        const result = await todos.insertOne(todo);
        res.json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while trying to create a new todo.' });
    } finally {
        await client.close();
    }
});

app.delete('/items/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await client.connect();
        const database = client.db('test');
        const todos = database.collection('todos');
        const result = await todos.deleteOne({ "_id": ObjectId(id) });
        if (result.deletedCount === 1) {
            res.send(`Todo with id: ${id} was deleted.`);
        } else {
            res.send(`No todo with id: ${id} was found.`);
        }
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});