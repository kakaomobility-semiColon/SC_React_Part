import './Kakao.css';

export const createMarkerContent = (data, handleBookmarkClick) => {
  const handleClick = () => {
    handleBookmarkClick(data.id);
  };

  return `
    <div class="wrap"> 
      <div class="info"> 
        <div class="title">${data.name}</div> 
        <div class="body"> 
          <div class="desc"> 
            <div class="ellipsis">${data.address}</div>
            <div class="jibun ellipsis">${data.operatorName}</div> 
            <div class="jibun ellipsis">${data.output}</div> 
          </div> 
          <button class="bookmark-button" onclick="(${handleClick.toString()})()"></button> 
        </div> 
      </div> 
    </div>`;
};

export const handleBookmarkClick = (id) => {
  console.log(`Bookmark clicked for item with id: ${id}`);
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  if (!bookmarks.includes(id)) {
    bookmarks.push(id);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
};
