// Bookmark.js

// 북마크 추가 함수
function addBookmark() {
    // 현재 페이지의 URL 가져오기
    var currentPageUrl = window.location.href;

    // 로컬 스토리지에서 북마크 목록 가져오기
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

    // 이미 북마크에 추가된 페이지인지 확인
    if (bookmarks.includes(currentPageUrl)) {
        alert('이미 북마크에 추가되었습니다.');
        return;
    }
}
