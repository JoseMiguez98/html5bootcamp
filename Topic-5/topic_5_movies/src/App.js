import React from 'react';
import PrincipalContainer from './components/PrincipalContainer/PrincipalContainer';
import { Provider } from 'react-redux';
import { store } from './redux/store'

function App() {
  return (
    <div className="App">
    <Provider store={store}>
      <PrincipalContainer />
    </Provider>
    </div>
  );
}

export default App;
