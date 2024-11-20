import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from './assets/logo.svg';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
          placeholder="비밀번호를 입력하세요"
        />
      </div>
      <button type="submit" className="login-button">
        로그인
      </button>
      <div className="footer-buttons">
        <div className="find-buttons">
          <button className="find-button">아이디 찾기</button>
          <span className="login-divider"></span>
          <button className="find-button">비밀번호 찾기</button>
        </div>
        <button
          className="signup-button"
          onClick={() => navigate('/join')} // 클릭 시 /join 경로로 이동
        >
          Elecar 회원가입
        </button>
      </div>
    </div>
  );
}

export default Login;
