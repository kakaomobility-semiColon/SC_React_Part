import { useState, useEffect } from 'react';
import React from 'react';
import './Bookmark.css'; // 북마크 스타일시트

//header.js에 있는 북마크 여는 버튼
export function OpenBookmarkList({ id, onClick, active }) {
  return (
    <button
      className={`bookmark-button ${active ? 'active' : ''}`}
      onClick={() => onClick(id)} // id를 클릭 이벤트로 전달
    >
      <div className="bookmark-icon">북마크</div>
    </button>
  );
}

//detail.js에 있는 북마크 추가하는 버튼
export function AddBookmarkButton({ stationChargerId, name, address }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setIsBookmarked(bookmarks.includes(bookmark => bookmark.id === stationChargerId));
  }, [stationChargerId]);

  const handleAddBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    let updatedBookmarks;

    if (isBookmarked) {
      updatedBookmarks = bookmarks.filter(bookmark => bookmark !== stationChargerId);
    } else {
      updatedBookmarks = [...bookmarks, { id: stationChargerId, name, address }];
    }

    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    setIsBookmarked(!isBookmarked);
    console.log(`Bookmark updated: ${!isBookmarked}`);
  };

  return (
    <button 
      className={`isBookmark-button ${isBookmarked ? 'active' : ''}`}
      onClick={handleAddBookmark}
    />
  );
}

//bookmarklist에 있는 block
export function BookmarkList({ active, onClose }) {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(storedBookmarks);
  }, []);

  const handleRemoveBookmark = (id) => {
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };

  return (
    <div className={`bookmark-block ${active ? 'active' : ''}`}>
      <div className="bookmark-content">
        <button className="bookmark-close" onClick={onClose}>북마크 닫기</button>
        <ul className='bookmark-items'>
          {bookmarks.map((bookmark, index) => (
            <li className='bookmark-item' key={index}>
              <div className='bookmark-item-name'>{bookmark.name}</div>
              <div className='bookmark-item-address'>{bookmark.address}</div>
              <button className='bookmark-delete' onClick={() => handleRemoveBookmark(bookmark.id)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
