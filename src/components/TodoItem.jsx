
const TodoItem = (props) => {


    return (  
        <div className="ToDoItem" onClick={() => {
            props.onChecked(props.id);
        }}>
            <li>
                {props.text} <span><button style={{color: "red"}}>x</button></span>
                
            </li>
        </div>
    );
}

export default TodoItem;