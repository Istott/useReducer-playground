import React, { useState, useContext } from "react";

import TodoContext from "../context/context";

const TodoInput = () => {

    const [item, setItem] = useState('');
    const { addTask } = useContext(TodoContext);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        addTask(item)

        setItem('')
    }

    return (
        <>
            <form>
                <input 
                    type="text" 
                    placeholder="add task"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                />
                <button onClick={onSubmitHandler} >submit</button>
            </form>
        </>
    )
}

export default TodoInput;

