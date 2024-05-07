import React from 'react';
import Header from './component/Header';
import Kakao from './component/Kakao';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header /> {/* Header를 먼저 렌더링 */}
        <Kakao />  {/* 그 다음 Kakao를 렌더링 */}
      </div>
    </Router>
  );
}

export default App;
