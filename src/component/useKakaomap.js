import { useCallback } from 'react';
import axios from 'axios';
import { createMarkerContent} from './markerContents';

export const useKakaomap = () => {
  return useCallback(() => {
    if (window.kakao && window.kakao.maps) {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(37.336382765356035, 127.26531823399158),
        level: 3
      };
      const map = new window.kakao.maps.Map(container, options);
      map.setMaxLevel(5);

      map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC);
      const mapTypeControl = new window.kakao.maps.MapTypeControl();
      map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.RIGHT);
      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

      const overlays = [];

      function closeOverlays() {
        overlays.forEach((overlay) => {
          overlay.setMap(null);
        });

        const searchBar = document.querySelector('.search-block');
        if (searchBar) {
          searchBar.classList.add('fade-out');
          setTimeout(() => {
            searchBar.style.display = 'none';
            searchBar.classList.remove('fade-out');
          }, 500);
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
          const markerData = response.data.result;

          markerData.forEach((data) => {
            const position = new window.kakao.maps.LatLng(data.lat, data.lng);
            const content = createMarkerContent(data);

            const marker = new window.kakao.maps.Marker({
              position: position,
              map: map
            });

            const overlay = new window.kakao.maps.CustomOverlay({
              position: position,
              content: content,
              yAnchor: 1
            });

            window.kakao.maps.event.addListener(marker, 'click', function() {
              closeOverlays();
              overlay.setMap(map);

              // Prevent overlay click event from propagating to the map
              content.addEventListener('click', (e) => {
                e.stopPropagation();
              });
            });

            overlays.push(overlay);
          });

          console.log('서버 응답', response.data);
        } catch (error) {
          console.error('GET 요청 에러', error);
        }
      });

      window.kakao.maps.event.addListener(map, 'click', function() {
        closeOverlays();
      });

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
          if (newWidth < 435) return;
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
