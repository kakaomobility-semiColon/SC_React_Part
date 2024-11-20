import React from 'react';
import './Header.css';
import { ReactComponent as Logo } from '../assets/logo.svg';

function Header() {
  return (
    <header className="App-header">
      <div className="header-logo-text">
        <span className="header-ele">Ele</span>
        <span className="header-car">car</span>
        <Logo className="header-logo" />
      </div>
      <nav className="nav">
        <a href="/login">로그인</a>
        <span className="header-divider"></span>
        <a href="/join">회원가입</a>
      </nav>
    </header>
  );
}

export default Header;

