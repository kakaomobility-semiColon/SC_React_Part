import React, { useEffect, useCallback } from "react";
import { markerdata } from "./Data/markerData";
import './Kakao.css'
import axios from "axios";

function Kakao() {
    const mapscript = useCallback(() => {
        //지도 표시
        if (window.kakao && window.kakao.maps) {
            var container = document.getElementById('map');
            var options = {
                center: new window.kakao.maps.LatLng(37.336382765356035, 127.26531823399158),
                level: 3
            };
            const map = new window.kakao.maps.Map(container, options);

            map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC); //실시간 교통
            // map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.ROADVIEW); //로드뷰
            var mapTypeControl = new window.kakao.maps.MapTypeControl(); //type controller
            map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.RIGHT);

            // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
            var zoomControl = new window.kakao.maps.ZoomControl();
            map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
            
            var overlays = [];

            markerdata.forEach((data) => {
                var position = new window.kakao.maps.LatLng(data.lat, data.lng);
                var content = `<div class="wrap"> 
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

                // 마커를 표시할 지도
                var marker = new window.kakao.maps.Marker({
                    position: position,
                    map: map
                });
                // customize overlay
                var overlay = new window.kakao.maps.CustomOverlay({
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

            //지도 클릭 시 모든 overlay 닫기
            window.kakao.maps.event.addListener(map, "click", function () {
                closeOverlays();
            });

            function closeOverlays() {
                overlays.forEach(function(overlay) {
                    overlay.setMap(null); 
                });
                // 검색창 닫기
                const searchBar = document.querySelector('.search-block');
                if (searchBar) {
                    searchBar.style.display = 'none';
                }
            }

            //지도 범위 재설정
            var points = markerdata.map(data => new window.kakao.maps.LatLng(data.lat, data.lng));
            var bounds = new window.kakao.maps.LatLngBounds();    
            points.forEach(point => bounds.extend(point));
            map.setBounds(bounds);

            window.kakao.maps.event.addListener(map,'idle', function() {
                var bound = map.getBounds();
                var swLatlng = bound.getSouthWest();
                var neLatlng = bound.getNorthEast();
                
                console.log('<p>남서쪽 위경도 : ' + swLatlng.toString() + ',' + 
                '북동쪽 위경도 : '+ neLatlng.toString());

                //서버에 GET 요청
                const url = `${process.env.REACT_APP_SERVER_URL}/charger/search/marker?swLat=${swLatlng.getLat()}&swLng=${swLatlng.getLng()}&neLat=${neLatlng.getLat()}&neLng=${neLatlng.getLng()}`;
                axios.get(url)
                .then(response => {
                    console.log('서버 응답', response.data);
                })
                .catch(error => {
                    console.log('GET 요청 에러', error);
                });
            });
        }
    }, []);

    useEffect(() => {
        mapscript();

        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAOMAP_API_KEY}&libraries=services,drawing`;
        script.async = true;
        script.onload = () => {
            mapscript();
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [mapscript]);

    return (
        <div id="map" style={{ width: "100%", height: "100vh" }}></div>
    );
}

export default Kakao;