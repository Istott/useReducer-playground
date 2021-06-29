import { ADD_TASK, TOGGLE_COMPLETED, CLEAR_COMPLETED} from './actions';

const todoReducer = (task, action) => {
    switch (action.type) {
      case ADD_TASK:
        return [
          ...task, 
        {
          task: action.payload.task,
          id: Date.now(), 
          completed: false
        }
      ]
      case TOGGLE_COMPLETED:
        return action.payload
  
      case CLEAR_COMPLETED:
        return action.payload
  
      default: 
        return task
    }
  
  }

  export default todoReducer;