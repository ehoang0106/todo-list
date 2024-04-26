const TodoItem = (props) => {
    return (
        <div className="ToDoItem">
            <li>
                {props.text} 
                <span>
                    <button style={{color: "red"}} onClick={() => props.onChecked(props.id)}>x</button>
                </span>
            </li>
        </div>
    );
}

export default TodoItem;