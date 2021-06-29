import React, { useReducer } from 'react';
import TodoContext from './context';
import todoReducer from './reducer';

import { ADD_TASK, TOGGLE_COMPLETED, CLEAR_COMPLETED} from './actions';

const TodoState = (props) => {
    const initialTaskList = [
        {
          task: 'create reducer for todo list',
          id: 565468452131,
          completed: false
        }
    ]

    const [task, setDispatch] = useReducer(todoReducer, initialTaskList);

    const addTask = (taskName) => {
        setDispatch({
          type: ADD_TASK,
          payload: {
            task: taskName
          }
        })
      }
    
      const toggleCompleted = (clickedItemId) => {
        setDispatch({
          type: TOGGLE_COMPLETED,
          payload: 
            task.map((item) => {
              if (item.id === clickedItemId) {
                return {
                  ...item,
                  completed: !item.completed
                }
              } else {
                return item
              }
            })
          
        })
      }
    
      const clearCompleted = () => {
        setDispatch({
          type: CLEAR_COMPLETED,
          payload:
            task.filter((item) => item.completed !== true)
        })
      }

      return (
          <TodoContext.Provider
              value={{
                  task,
                  addTask,
                  toggleCompleted,
                  clearCompleted
              }}
            >
              {props.children}
          </TodoContext.Provider>
      )
}

export default TodoState;