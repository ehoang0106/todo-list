import React, { useState } from "react";
import TodoItem from "./TodoItem";
function App() {

    const [inputText, setInputText] = useState("");
    const [items, setItems] = useState([]);


    function handleChange(event) {
        const newValue = event.target.value;
        setInputText(newValue);
        
    }

    function addItem() {
        setItems((prevItems) => {
            return [...prevItems, inputText];
        });

        setInputText(""); //when the item added set the inputText to empty string
    }

    function deleteItem(id) {
        setItems((prevItems) => {
            return prevItems.filter(
                (item, index) => {
                    return index !== id;
                }
            )
        })
    }

    return (
        <div className="container">
            <div className="heading">
                <h1>To-Do List</h1>
            </div>
            <div className="form">
                <input type="text" value={inputText} onChange={handleChange}/>
                <button onClick={addItem}>
                    <span>Add</span>
                </button>
            </div>
            <div>
                <ul>
                    {items.map((todoItem, index) =>  (
                    <TodoItem
                    key={index}
                    id={index} 
                    text={todoItem}
                    onChecked={deleteItem}
                    /> 
                    
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
