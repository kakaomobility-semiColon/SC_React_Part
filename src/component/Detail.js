import React from 'react';
import './Detail.css'; 
import {BookmarkButton} from './bmkButton';

function Detail({ item, onClose }) {
  if (!item) {
    return null;
  }

  return (
    <div className="detail-block"> {/* 검색 결과와 같은 레벨에 나타나도록 수정 */}
      <div className="detail">
        <button className="detail-close" onClick={onClose}></button> {/* 닫기 버튼 추가 */}
        <br></br>
        <img id="detail-img" alt='detail-img' src='https://www.carguy.kr/news/photo/201804/32027_6843_1617.jpg'></img>
        <h1>{item.name}</h1>
        <p>{item.address}</p>
        <div className='detail-icon'>
            <span>
                <BookmarkButton />
                <p>북마크하기</p>
            </span>
            <span>
                <button id='detail-shareicon' />
                <p>공유하기</p>
            </span>
        </div>
        <hr />
        <p>운영자: {item.operatorName}</p>
        <p>출력: {item.output}</p>
        <p>종류: {item.chargerTypeName}</p>
        <p>{item.kindDetailName}</p>
        <p id='update'>업데이트 날짜: {item.updatedAt}</p>
      </div>
    </div>
  );
}

export default Detail;
