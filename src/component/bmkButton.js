import React, { useState, useEffect } from 'react';
import './Bookmark.css';

export function BookmarkButton({ id }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setIsBookmarked(bookmarks.includes(id));
  }, [id]);

  const handleBookmarkClick = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    let updatedBookmarks;

    if (isBookmarked) {
      updatedBookmarks = bookmarks.filter(bookmark => bookmark !== id);
    } else {
      updatedBookmarks = [...bookmarks, id];
    }

    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  return (
    <button 
      className={`bookmark-button ${isBookmarked ? 'active' : ''}`} 
      onClick={handleBookmarkClick}
    >
      <div className="bookmark-icon">
        <img src={isBookmarked ? './SVG/bookmark_clicked.svg' : './SVG/bookmark.svg'} alt="bookmark" />
      </div>
    </button>
  );
}
