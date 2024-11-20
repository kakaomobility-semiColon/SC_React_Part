import React from 'react';
import './Footer.css';
import { ReactComponent as LogoGray } from '../assets/logo_gray.svg';
import { ReactComponent as GooglePlay } from '../assets/google_play.svg';

function Footer() {
  return (
    <footer className="App-footer">
  <div className="footer-line"></div>
  <div className="footer">
    <div className="footer-text">
      <p>사업자 등록번호: 012-34-56789&nbsp;&nbsp;&nbsp;&nbsp;사업자 신고번호: J0123456789&nbsp;&nbsp;&nbsp;&nbsp;지도: 카카오맵 © Kakao Mobility Corp.</p>
      <p>한국외국어대학교 컴퓨터공학전공: 장무영 고서영 김응진 홍석준&nbsp;&nbsp;&nbsp;&nbsp;경기도 용인시 처인구 모현읍 외대로81 한국외국어대학교 글로벌캠퍼스</p>
      <p>Copyright © SemiColon Inc. All right reserved.</p>
    </div>
    <div className="footer-play">
    <div className="footer-elecar-logo">
    <span className="footer-elecar">Elecar</span>
    <LogoGray className="footer-logo" />
  </div>
      <GooglePlay className="google-play-logo" />
    </div>
  </div>
</footer>
  );
}

export default Footer;
