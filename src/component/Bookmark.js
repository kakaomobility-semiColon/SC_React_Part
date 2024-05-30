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
export function AddBookmarkButton({ id }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setIsBookmarked(bookmarks.includes(id));
  }, [id]);

  const handleAddBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    let updatedBookmarks;

    if (isBookmarked) {
      updatedBookmarks = bookmarks.filter(bookmark => bookmark !== id);
    } else {
      updatedBookmarks = [...bookmarks, id];
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
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark !== id);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };

  return (
    <div className={`bookmark-block ${active ? 'active' : ''}`}>
      <div className="bookmark-content">
        <button className="bookmark-close" onClick={onClose}>북마크 닫기</button>
        <ul>
          {bookmarks.map((bookmark, index) => (
            <li key={index}>
              {bookmark} 
              <button onClick={() => handleRemoveBookmark(bookmark)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}