import React, { useState } from 'react';
import axios from 'axios';
import './Header.css'; // 스타일시트 임포트
import SearchBarIcon from '../component/SVG/searchbar.svg'; // 검색바 아이콘
import FavoritelocIcon from '../component/SVG/favoriteloc.svg'; // 즐겨찾기 위치 아이콘
import FavoritelocClickedIcon from '../component/SVG/favoriteloc_clicked.svg'; // 클릭된 즐겨찾기 위치 아이콘
import GlassesClickedIcon from '../component/SVG/glasses_clicked.svg'; // 클릭된 검색 아이콘

export default function Header({ onSearch }) {
  // 여러 상태 관리를 위한 useState 훅 사용
  const [favoritelocClicked, setFavoritelocClicked] = useState(false);
  const [searchBarClicked, setSearchBarClicked] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [noResults, setNoResults] = useState(false); // 검색 결과가 없음을 나타내는 상태
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 4; // 페이지당 표시할 결과 수

  const totalPages = Math.ceil(searchResults.length / resultsPerPage); // 전체 페이지 수 계산

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const visiblePages = 10; // 최대로 표시될 페이지 수

    for (let page = 1; page <= totalPages; page++) {
      pages.push(
        <button key={page} onClick={() => handlePageClick(page)} className={page === currentPage ? 'active' : ''}>
          {page}
        </button>
      );

      if (pages.length >= visiblePages) break;
    }

    return pages;
  };

  // 즐겨찾기 위치 버튼 토글 기능
  const toggleFavoriteloc = () => {
    setFavoritelocClicked(!favoritelocClicked);
  };

  // 검색바 토글 기능
  const toggleSearchBar = () => {
    setSearchBarClicked(!searchBarClicked);
  };

  // 검색 처리 기능
  const handleSearch = async () => {
    setIsSearching(true);
    setNoResults(false); // 검색 시작 시 검색 결과 없음 상태를 초기화

    console.log('Searching for:', searchKeyword); // 검색어 확인용 콘솔 로그

    // 검색 함수 호출 (외부 props로부터 받음)
    onSearch(searchKeyword);

    // 검색 결과 처리
    try {
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      if (!serverUrl) {
        throw new Error('Server URL is not defined');
      }
      console.log('Server URL:', serverUrl); // 환경 변수 로그 출력
      const requestUrl = `${serverUrl}/charger/search?keyword=${encodeURIComponent(searchKeyword)}`;
      console.log('Request URL:', requestUrl); // 요청 URL 로그 출력

      const response = await axios.get(requestUrl);
      console.log('Response:', response); // 응답 확인용 콘솔 로그

      const data = response.data;
      const results = data.result || [];
      setSearchResults(results);
      setNoResults(results.length === 0); // 검색 결과가 없으면 noResults를 true로 설정
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
      setNoResults(true); // 오류 발생 시 검색 결과 없음 상태로 설정
    }

    setSearchKeyword(''); // 검색어 초기화
    setIsSearching(false); // 검색 상태 초기화
    setCurrentPage(1); // 검색 후 페이지를 1로 초기화
  };

  // 컴포넌트 렌더링
  return (
    <header>
      <div>
        <nav>
          <ul>
            <li>
              <img src={SearchBarIcon} alt="SearchBar" onClick={toggleSearchBar} />
            </li>
            <li>
              <button className="favorite-loc-button" onClick={toggleFavoriteloc}>
                <img src={favoritelocClicked ? FavoritelocClickedIcon : FavoritelocIcon} alt="Favoriteloc" />
              </button>
            </li>
          </ul>
        </nav>
        <div className="search-block" style={{ display: searchBarClicked ? 'block' : 'none' }}>
          <div className="searchbar_clicked">
            <div className="searchbar">
              <img src={GlassesClickedIcon} alt="Search" className="glassesclicked-icon" onClick={handleSearch} />
              <input
                type="text"
                id="search-input" // 고유한 id 속성 추가
                name="search-input" // 고유한 name 속성 추가
                placeholder="장소, 위치, 대중교통 검색"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
            <div className="searching-box">
              {isSearching && <div>검색 중...</div>} {/* 검색 중 메시지 추가 */}
              {!isSearching && noResults && (
                <div>검색 결과가 없습니다.</div>
              )}
              {!isSearching && searchResults.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage).map((item, index) => (
                <div key={index} className="searching-item">
                  <p className="searching-item-name">{item.name}</p>
                  <p className="searching-item-address">{item.address}</p>
                </div>
              ))}
            </div>
            <div className="page-bar">
              <button onClick={handleFirstPage}>«</button>
              <button onClick={handlePrevPage}>‹</button>
              {renderPageNumbers()}
              <button onClick={handleNextPage}>›</button>
              <button onClick={handleLastPage}>»</button>
            </div>
          </div>
        </div> {/* 이 줄에 닫는 div 추가 */}
      </div> {/* 이 줄에 닫는 div 추가 */}
    </header>
  );
}
