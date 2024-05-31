import React from 'react';
import './Detail.css';
import { AddBookmarkButton } from './Bookmark';

function Detail({ item, onClose }) {
  if (!item) {
    return null;
  }

  const handleGetDirections = () => {
    const mapUrl = `https://map.kakao.com/link/search/${item.name}`;
    window.location.href = mapUrl;
  };

  return (
      <div className="detail-block">
        <div className="detail">
          <button className="detail-close" onClick={onClose}></button> {/* 닫기 버튼 */}
          <br />
          <img
              id="detail-img"
              alt="detail-img"
              src="https://www.carguy.kr/news/photo/201804/32027_6843_1617.jpg"
          />
          <h1>{item.name}</h1>
          <p>{item.address}</p>
          <div className="detail-icon">
          <span>
            {item.stationChargerId && (
                <AddBookmarkButton
                    stationChargerId={item.stationChargerId}
                    name={item.name}
                    address={item.address}
                />
            )}
            <h4>북마크하기</h4>
          </span>
            <span>
            <button
                className="detail-locationicon"
                onClick={handleGetDirections}
            >
            </button>
            <h4>길찾기</h4>
          </span>
          </div>
          <hr />
          <p>운영자: {item.operatorName}</p>
          <p>출력: {item.output}</p>
          <p>종류: {item.chargerTypeName}</p>
          <p>{item.kindDetailName}</p>
          <p id="update">업데이트 날짜: {item.updatedAt}</p>
        </div>
      </div>
  );
}

export default Detail;
