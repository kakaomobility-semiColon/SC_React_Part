import React, { useState, useEffect } from 'react';
import Header from './component/Header';
import Kakao from './component/Kakao';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

console.log('Server URL:', process.env.REACT_APP_SERVER_URL);

function App() {
  const [searching, setSearching] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (searching) {
      console.log('Searching...');
      // 검색 시작 시 필요한 로직 작성
      // 여기에서는 임시로 setTimeout을 사용하여 1초 후에 검색이 완료되었다고 가정하겠습니다.
      setTimeout(() => {
        setItems(['item1', 'item2', 'item3']); // 임시로 데이터 설정
      }, 1000);
    }
  }, [searching]);

  const loadItems = (keyword) => {
    // 검색을 시작하면 searching 상태를 true로 변경하여 useEffect가 실행되도록 합니다.
    setSearching(true);
  };

  return (
    <Router>
      <div className='App'>
        <Header onSearch={(keyword) => loadItems(keyword)} />  
        <Kakao items={items}/>
      </div>
    </Router>
  );
}

export default App;
