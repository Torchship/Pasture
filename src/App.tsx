import React from 'react';
import ReactDOM from 'react-dom';
import Main from './views/Main';
// import { Toolbar } from './components/Toolbar';
import './App.css';
import { Header } from './components/Header';

const App: React.FC = () => {

  return (
    <div className="mainDiv">
      {/* <Toolbar/> */}
      <Main/>
    </div>
  );
}
export default App;

ReactDOM.render(<App />, document.getElementById('root'));
