import React from 'react';
import Header from './component/Header';
import Kakao from './component/Kakao';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Kakao />  {/* 맵이 먼저 렌더링되도록 변경 */}
        <Header /> {/* 그 다음 Header를 렌더링 */}
      </div>
    </Router>
  );
}

export default App;
