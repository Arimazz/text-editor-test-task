import { createStore } from 'redux';

const initialState = {
  selectedColor: 'black',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_SELECTED_COLOR':
    return {
      selectedColor: action.payload,
    };
  
  default:
    return state;
  }
};

export const store = createStore(reducer);
