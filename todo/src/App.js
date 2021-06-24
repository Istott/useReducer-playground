import React, {useState, useReducer, useLayoutEffect} from 'react';
import './App.css';

const ACTIONS = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  ADD_TASK: 'add_task',
  TOGGLE_COMPLETED: 'toggle_completed',
  CLEAR_COMPLETED: 'clear_completed',
  STATUS: 'status',
  ACTIONS: 'reset',
}

const countReducer = (counter, action) => {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return action.payload
    case ACTIONS.DECREMENT:
      return { count: counter.count - 1 }
    case ACTIONS.STATUS:
      if(counter.count > 1) { 
        return { 
          ...counter, 
          message: 'winning'
        }
      } else if (counter.count < 0) {
        return { ...counter, message: 'losing'}
      } else {
        return { ...counter, message: 'status pending'}
      }
    case ACTIONS.RESET:
      return { ...counter, count: 0}
    default:
      return counter
  }
}

const initialCount = {
  count: 0,
  message: 'status pending'
};


const todoReducer = (task, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return [
        ...task, 
      {
        task: action.payload.task,
        id: Date.now(), 
        completed: false
      }
    ]
    case ACTIONS.TOGGLE_COMPLETED:
      return action.payload

    case ACTIONS.CLEAR_COMPLETED:
      return action.payload

    default: 
      return task
  }

}

const initialTaskList = [
  {
    task: 'create reducer for todo list',
    id: 565468452131,
    completed: false
  }
]

function App() {
  const [task, setDispatch] = useReducer(todoReducer, initialTaskList);
  const [counter, dispatch] = useReducer(countReducer, initialCount);
  const [item, setItem] = useState('');

  console.log(task)

  useLayoutEffect(() => {
    dispatch({
      type: ACTIONS.STATUS
    })
  }, [counter.count]);


  const increment = () => {
    dispatch({ 
      type: ACTIONS.INCREMENT,
      payload: {
        count: counter.count + 1
      }
    })
  }

  const decrement = () => {
    dispatch({ 
      type: ACTIONS.DECREMENT })
  }

  const reset = () => {
    dispatch({
      type: ACTIONS.RESET
    })
  }


  const addTask = (e) => {
    e.preventDefault();

    setDispatch({
      type: ACTIONS.ADD_TASK,
      payload: {
        task: item
      }
    })
    setItem('')
  }

  const toggleCompleted = (clickedItemId) => {
    setDispatch({
      type: ACTIONS.TOGGLE_COMPLETED,
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
      type: ACTIONS.CLEAR_COMPLETED,
      payload:
        task.filter((item) => item.completed !== true)
    })

  }

  return (
    <div className="App">
      <header className="App-header">
        <form>
          <input 
            type="text" 
            placeholder="add task"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button onClick={addTask} >submit</button>
        </form>

        {
          task.map(item => {
            return (
              <>
              <button 
                key={item.id} 
                onClick={() => toggleCompleted(item.id)} 
                className={`item${item.completed === true ? ' completed' : ''}`} 
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

        <div>
          <button onClick={increment}>+</button>
          <span>{counter.count}</span>
          <button onClick={decrement} >-</button>
        </div>
        <div><button onClick={reset} >reset</button></div>
        <div className="status">
          <p>{counter.message}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
