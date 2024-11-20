import React, { useState } from 'react';
import './Join.css';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from './assets/logo.svg';

function Join() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pwcheck, setPWcheck] = useState('');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate(); // navigate 초기화

  return (
    <div className="login-container">
      <div className="login-logo-text" onClick={() => navigate('/')}>
        <span className="login-ele">Ele</span>
        <span className="login-car">car</span>
        <Logo className="login-logo" />
      </div>

      <div className="input-group">
        <label htmlFor="username">아이디</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="이메일을 입력하세요"
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="영문, 숫자, 특수문자 포함 8자 이상 입력하세요"
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">비밀번호 확인</label>
        <input
          type="password"
          id="pwcheck"
          value={pwcheck}
          onChange={(e) => setPWcheck(e.target.value)}
          placeholder="비밀번호를 다시 한번 입력하세요"
        />
      </div>
      <div className="input-group">
        <label htmlFor="nickname">닉네임</label>
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력하세요"
        />
      </div>
      <button type="submit" className="join-button">
        회원가입
      </button>
    </div>
  );
}

export default Join;
