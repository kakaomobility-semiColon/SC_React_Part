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

    // 북마크에 현재 페이지 추가
    bookmarks.push(currentPageUrl);

    // 로컬 스토리지에 업데이트된 북마크 목록 저장
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // 사용자에게 성공적으로 추가되었음을 알림
    alert('북마크에 추가되었습니다.');
}

// 북마크 버튼 클릭 이벤트 핸들러 등록
document.getElementById('bookmarkButton').addEventListener('click', addBookmark);
