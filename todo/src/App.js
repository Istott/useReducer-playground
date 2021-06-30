import React, {useState, useReducer, useLayoutEffect, useEffect} from 'react';
import './App.css';

import TodoState from './context/state';

import TodoInput from './components/input';
import TodoList from './components/list';

const ACTIONS = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  STATUS: 'status',
  ACTIONS: 'reset',
  FRED: 'fred',
  BOB: 'bob',
  JIMMY: 'jimmy',
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
        return { ...counter, message: 'pending'}
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

const nameReducer = (nameState, action) => {

  switch(action.type) {
    case ACTIONS.FRED:
      return {...nameState, fred: action.payload}
    case ACTIONS.BOB:
      return {...nameState, bob: action.payload}
    case ACTIONS.JIMMY:
      return {...nameState, jimmy: action.payload}
    default:
      return nameState
  }
}

const initialName = {
  fred: '',
  bob: '',
  jimmy: ''
}

function App() {
  const [counter, dispatch] = useReducer(countReducer, initialCount);
  const [name, nameDispatch] = useReducer(nameReducer, initialName);
  const [ title, setTitle] = useState('')

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

  const fredHandler = (e) => {
    e.preventDefault()

    nameDispatch({
      type: ACTIONS.FRED,
      payload: title
    })
    setTitle('')
  }
  const bobHandler = (e) => {
    e.preventDefault()

    nameDispatch({
      type: ACTIONS.BOB,
      payload: title
    })
    setTitle('')
  }
  const jimmyHandler = (e) => {
    e.preventDefault()

    nameDispatch({
      type: ACTIONS.JIMMY,
      payload: title
    })
    setTitle('')
  }

  return (
    <div className="App">
      <header className="App-header">
        <TodoState>
          <TodoInput />

          <TodoList />
        </TodoState>

        <div className="counter">
          <div>
            <button onClick={increment}>+</button>
            <span>{counter.count}</span>
            <button onClick={decrement} >-</button>
          </div>
          <div><button onClick={reset} >reset</button></div>
          <div className="status">
            <p>{counter.message}</p>
          </div>
        </div>

        <form>
          <input 
              type="text" 
              placeholder="add title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={fredHandler} >fred</button>
          <button onClick={bobHandler} >bob</button>
          <button onClick={jimmyHandler} >jimmy</button>
        </form>

        <p>fred {name.fred}</p>
        <p>bob {name.bob}</p>
        <p>jimmy {name.jimmy}</p>

      </header>
    </div>
  );
}

export default App;
