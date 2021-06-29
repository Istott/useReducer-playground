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




function App() {
  const [counter, dispatch] = useReducer(countReducer, initialCount);

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

  return (
    <div className="App">
      <header className="App-header">
        <TodoState>
          <TodoInput />

          <TodoList />
        </TodoState>

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
