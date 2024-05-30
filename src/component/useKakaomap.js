import { useCallback } from 'react';
import axios from 'axios';
import { createMarkerContent } from './markerContents';

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

      // async 키워드 추가하여 비동기 함수로 변경
      window.kakao.maps.event.addListener(map, 'idle', async function() {
        const bound = map.getBounds();
        const swLatlng = bound.getSouthWest();
        const neLatlng = bound.getNorthEast();

        console.log(`<p>남서쪽 위경도 : ${swLatlng.toString()}, 북동쪽 위경도 : ${neLatlng.toString()}</p>`);

        const url = `/charger/search/marker?swLat=${swLatlng.getLat()}&swLng=${swLatlng.getLng()}&neLat=${neLatlng.getLat()}&neLng=${neLatlng.getLng()}`;
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

      function moveToCurrentLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const locPosition = new window.kakao.maps.LatLng(lat, lng);
            const message = '<div style="padding:5px;">내 현재 위치</div>';

            displayMarker(locPosition, message);
            map.setCenter(locPosition);
          }, () => {
            const defaultPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);
            const message = 'geolocation을 사용할수 없어요..';
            displayMarker(defaultPosition, message);
            map.setCenter(defaultPosition);
          });
        } else {
          const defaultPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);
          const message = 'geolocation을 사용할수 없어요..';
          displayMarker(defaultPosition, message);
          map.setCenter(defaultPosition);
        }
      }

      function displayMarker(locPosition, message) {
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: locPosition
        });

        const infowindow = new window.kakao.maps.InfoWindow({
          content: message,
          removable: true
        });

        infowindow.open(map, marker);
      }

      // 현재 위치로 이동하는 버튼 추가
      const moveToLocationButton = document.createElement('button');
      moveToLocationButton.innerText = '내 위치';
      moveToLocationButton.style.position = 'absolute';
      moveToLocationButton.style.bottom = '10px';
      moveToLocationButton.style.right = '10px';
      moveToLocationButton.style.zIndex = '10';
      moveToLocationButton.addEventListener('click', moveToCurrentLocation);

      document.body.appendChild(moveToLocationButton);

      // 초기 로딩 시 현재 위치로 이동
      moveToCurrentLocation();
    }
  }, []);
};
