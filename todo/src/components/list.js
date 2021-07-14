import React, { useState, useContext } from "react";

import TodoContext from "../context/context";

const palette = ['#FFBA08', '#FAA307', '#F48C06', '#E85D04', '#DC2F02', '#D00000', '#9D0208', '#6A040F', '#370617', '#03071E']

const TodoList = () => {
    const { task, toggleCompleted, clearCompleted} = useContext(TodoContext);
    const [color, setColor] = useState(palette);
    let x = 0;
  
   const colorFunc= () => {
      x = x + 1
  
      if (x > color.length - 1) {
        x = 0
        return x
      }
    }
  

    return (
        <>
        {
            task.map(item => {
            colorFunc()
            
            return (
                <>
                <button 
                    key={item.id} 
                    onClick={() => toggleCompleted(item.id)} 
                    className={`item${item.completed === true ? ' completed' : ''}`} 
                    style={{color: `${color[x]}`}}
                >
                {item.task}
                </button>
                </>
            )
            })
        }

        <div>
            <button onClick={clearCompleted} >erase completed</button>
        </div>


        <p>{task[0].task}</p>
        </>
    )
}

export default TodoList;
