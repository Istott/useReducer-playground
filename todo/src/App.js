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
  const [ title, setTitle] = useState('');

  const [ticker, setTicker] = useState(5);
  const [timer, setTimer] = useState(5);
  const [isActive, setIsActive] = useState(false);

  const [ person, setPerson ] = useState({
    wallet: 500,
    phones: 0,
    case: 0,
    message: ''
  });

  const cheapPhone = 39.99;
  const medPhone = 59.99;
  const highPhone= 99.99;
  const taxRate = .045;
  const phoneCase = 9.99;

  // let startTimer = false;
  console.log('ticker: ', ticker);
  console.log('timer: ', timer);

  const tikTok = () => {
    setIsActive(!isActive);
    let x = 0;

    if(isActive === true) {
      for(let i = timer; i >= 0; i--){
        console.log(i);
        (function(){
          setTimeout(function timmy() {
            setTicker(i);
          }, x*1000);
        })();
        x += 1;
      }
      setIsActive(!isActive);
    }
  };

  useEffect(() => {
    if(ticker === 0){
      setIsActive(!isActive);
    };
  }, [ticker]);



  const buyPhone = (item) => {
    console.log(person);
    if (item < person.wallet) {
      if (item < 10) {
        setPerson({...person, wallet: person.wallet - (item + (item * taxRate)), case: person.case += 1})
      } else {
        setPerson({...person, wallet: person.wallet - (item + (item * taxRate)), phones: person.phones += 1})
      }
    } else {
      setPerson({...person, message: 'sorry bro, you broke AF'})
    }
  }

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

        <span>wallet: ${person.wallet.toFixed(2)}</span>
        <span>bought phones: {person.phones}</span>
        <span>bought cases: {person.case}</span>
        <span>{person.message}</span>
        <button onClick={() => buyPhone(cheapPhone)}>buy cheap phone</button>
        <button onClick={() => buyPhone(medPhone)}>buy average phone</button>
        <button onClick={() => buyPhone(highPhone)}>buy expensive phone</button>
        <button onClick={() => buyPhone(phoneCase)}>buy phone case</button>

        <span>timer: {ticker}</span>

        <select
          onChange={(e) => (setTicker(e.target.value), setTimer(e.target.value))}
        >
          <option value='5'>5</option>
          <option value='10'>10</option>
          <option value='15'>15</option>
          <option value='30'>30</option>
        </select>
        <button onClick={tikTok}>{!isActive ? 'start' : 'stop'}</button>
        <button onClick={() => setTicker(timer)}>reset</button>

      </header>
    </div>
  );
}

export default App;
