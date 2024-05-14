import React, { useState, useEffect } from 'react';
import Header from './component/Header';
import Kakao from './component/Kakao';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

function App() {
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (searching) {
      // 검색 시작 시 필요한 로직 작성
      console.log('Searching...');
    }
  }, [searching]);

  return (
    <Router>
      <div className='App'>
        <Header onSearch={() => setSearching(true)} />  
        <Kakao />
      </div>
    </Router>
  );
}

export default App;
