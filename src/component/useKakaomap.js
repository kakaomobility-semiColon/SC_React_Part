import { useCallback } from "react";
import axios from "axios";

export const useKakaomap = () => {
  return useCallback(() => {
    if (window.kakao && window.kakao.maps) {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(37.336382765356035, 127.26531823399158),
        level: 3
      };
      const map = new window.kakao.maps.Map(container, options);

      map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC);
      const mapTypeControl = new window.kakao.maps.MapTypeControl();
      map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.RIGHT);
      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

      const overlays = [];

      function closeOverlays() {
        overlays.forEach(function(overlay) {
          overlay.setMap(null);
        });

        const searchBar = document.querySelector('.search-block');
        if (searchBar) {
          searchBar.classList.add('fade-out');
          setTimeout(() => {
            searchBar.style.display = 'none';
            searchBar.classList.remove('fade-out');
          }, 500); // 애니메이션 지속 시간과 동일하게 설정
        }
      }

      window.kakao.maps.event.addListener(map, 'idle', async function() {
        const bound = map.getBounds();
        const swLatlng = bound.getSouthWest();
        const neLatlng = bound.getNorthEast();

        console.log(`<p>남서쪽 위경도 : ${swLatlng.toString()}, 북동쪽 위경도 : ${neLatlng.toString()}</p>`);

        const url = `${process.env.REACT_APP_SERVER_URL}/charger/search/marker?swLat=${swLatlng.getLat()}&swLng=${swLatlng.getLng()}&neLat=${neLatlng.getLat()}&neLng=${neLatlng.getLng()}`;
        console.log('Request URL:', url);

        try {
          const response = await axios.get(url);
          const markerData = response.data.result; // 서버 응답에서 마커 데이터 가져오기
          
          // 마커 데이터를 바탕으로 지도에 마커 추가
          markerData.forEach((data) => {
            const position = new window.kakao.maps.LatLng(data.lat, data.lng);
            const content = `<div class="wrap"> 
                              <div class="info"> 
                                  <div class="title"> 
                                      ${data.name}  
                                  </div> 
                                  <div class="body"> 
                                      <div class="desc"> 
                                          <div class="ellipsis">${data.address}</div> 
                                          <div class="jibun ellipsis">${data.name}는</div> 
                                          <div class="jibun ellipsis">${data.operatorName}회사에서 만든 충전기이다.</div> 
                                      </div> 
                                      <button class="img" id="bookmarkButton"></button> 
                                  </div> 
                              </div> 
                          </div>`;

            const marker = new window.kakao.maps.Marker({
              position: position,
              map: map
            });

            const overlay = new window.kakao.maps.CustomOverlay({
              position: position,
              content: content,
              yAnchor: 1
            });

            window.kakao.maps.event.addListener(marker, "click", function () {
              closeOverlays();
              overlay.setMap(map);
            });

            overlays.push(overlay);
          });

          console.log('서버 응답', response.data);
        } catch (error) {
          console.error('GET 요청 에러', error);
        }
      });

      // 지도 클릭 시 오버레이와 검색 블록을 닫는 이벤트 리스너 추가
      window.kakao.maps.event.addListener(map, 'click', function () {
        closeOverlays();
      });

// Resize handle 추가
const searchBar = document.querySelector('.search-block');
if (searchBar) {
  const resizeHandle = document.createElement('div');
  resizeHandle.className = 'resize-handle';
  searchBar.appendChild(resizeHandle);

  let isResizing = false;
  let startX = 0;
  let startWidth = 0;

  resizeHandle.addEventListener('mousedown', (e) => {
    isResizing = true;
    startX = e.clientX;
    startWidth = searchBar.offsetWidth;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function onMouseMove(e) {
    if (!isResizing) return;
    const newWidth = startWidth + (e.clientX - startX);
    if (newWidth < 435) return; // 최소 너비 설정
    searchBar.style.width = `${newWidth}px`;
  }

  function onMouseUp() {
    isResizing = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
}
    }
  }, []);
};
