import React, {useState, useReducer, useEffect} from 'react';

import logo from './logo.svg';
import './App.css';

const ACTIONS = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  ADD_TASK: 'add_task',
  TOGGLE_COMPLETED: 'toggle_completed',
  CLEAR_COMPLETED: 'clear_completed'
}

const todoReducer = (task, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return [
        ...initialState,
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

// const newTodo = (name) => {
//   return { id: Date.now(), name: name, complete: false}
// }

const countReducer = (counter, action) => {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { count: counter.count + 1 }
    case ACTIONS.DECREMENT:
      return { count: counter.count - 1 }
    default:
      return counter
  }
}

const initialState = [
  {
  task: 'create multiple reducers',
  id: Date.now(),
  completed: false
}
]

const initialCount = {
  count: 0
};

function App() {
  const [task, setDispatch] = useReducer(todoReducer, initialState)
  const [counter, dispatch] = useReducer(countReducer, initialCount)

  const [item, setItem] = useState('')

  console.log(initialState)

  const addTask = e => {
    e.preventDefault();

    setDispatch({
      type: ACTIONS.ADD_TASK,
      payload: {
        task: item
      }
    });
    setItem('')

  }

  const increment = () => {
    dispatch({ type: ACTIONS.INCREMENT })
  }

  const decrement = () => {
    dispatch({ type: ACTIONS.DECREMENT })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form>
          <input type="text" className="todoInput" placeholder="add task" value={item} onChange={e => setItem (e.target.value)} />
          <button onClick={addTask}>submit</button>
        </form>

        <div>
          {task.map(item => (
            <p key={item.id}>{item.task}</p>
          ))}
        </div>

        <div>
          <button onClick={increment}>like</button>
          <span>{counter.count}</span>
          <button onClick={decrement} >dislike</button>
        </div>
      </header>
    </div>
  );
}

export default App;
