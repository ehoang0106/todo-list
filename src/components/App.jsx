import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import axios from "axios";

function App() {
    const [inputText, setInputText] = useState("");
    const [items, setItems] = useState([]);

    function handleChange(event) {
        const newValue = event.target.value;
        setInputText(newValue);
    }

    function addItem() {
        axios.post('http://localhost:3000/items', { name: inputText })
            .then((response) => {
                console.log(response);
                setInputText('');
                fetchItems();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function deleteItem(id) {
        axios.delete(`http://localhost:3000/items/${id}`)
            .then(() => {
                fetchItems();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function fetchItems() {
        axios.get('http://localhost:3000/items')
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div className="container">
            <div className="heading">
                <h1>To-Do List</h1>
            </div>
            <div className="form">
                <input type="text" value={inputText} onChange={handleChange} />
                <button onClick={addItem}>
                    <span>Add</span>
                </button>
            </div>
            <div>
                <ul>
                    {items.map((todoItem) => (
                        <TodoItem
                            key={todoItem._id}
                            id={todoItem._id}
                            text={todoItem.name}
                            onChecked={deleteItem}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;