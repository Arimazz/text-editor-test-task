import React from 'react';
import { Editor } from '../Editor';
import { Provider } from 'react-redux';
import { store } from '../store';

export function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Editor />
      </div>
    </Provider>
  );
}
