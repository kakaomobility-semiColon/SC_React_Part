import React, { useEffect } from "react";
import { markerdata } from "./Data/markerData";
import './Kakao.css'

function Kakao() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAOMAP_API_KEY}&libraries=services,drawing`;
        script.async = true;
        script.onload = () => {
            mapscript();
        };
        script.onerror = (error) => {
            console.error("Error loading Kakao maps script:", error);
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const mapscript = () => {
        //지도 표시
        if (window.kakao && window.kakao.maps) {
            var container = document.getElementById('map');
            var options = {
                center: new window.kakao.maps.LatLng(37.336382765356035, 127.26531823399158),
                level: 3
            };
            const map = new window.kakao.maps.Map(container, options);

            // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
            var zoomControl = new window.kakao.maps.ZoomControl();
            map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

            var overlays = [];

            markerdata.forEach((data) => {
                var position = new window.kakao.maps.LatLng(data.lat, data.lng);
                var contentHTML = `<div class="wrap"> 
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
                // //content HTMLElement 생성
                // var content = document.createElement('div');
                // content.innerHTML = contentHTML;
                // //event 추가
                // var bookmarkBtn = document.createElement('button');
                // bookmarkBtn.appendChild(document.createTextNode(''));
                // bookmarkBtn.onclick = function () {
                //     var currentImage = bookmarkBtn.style.backgroundImage;
                //     if (currentImage.includes('bookmark_clicked.svg')) {
                //         bookmarkBtn.style.backgroundImage = 'url(./SVG/bookmark.svg)';
                //     } else {
                //         bookmarkBtn.style.backgroundImage = 'url(./SVG/bookmark_clicked.svg)';
                //     }
                // }
                // content.appendChild(bookmarkBtn);

                // 마커를 표시할 지도
                var marker = new window.kakao.maps.Marker({
                    position: position,
                    map: map
                });
                // customize overlay
                var overlay = new window.kakao.maps.CustomOverlay({
                    position: position,
                    content: contentHTML,
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
            }
            //지도 범위 재설정
            var points = markerdata.map(data => new window.kakao.maps.LatLng(data.lat, data.lng));
            var bounds = new window.kakao.maps.LatLngBounds();    
            points.forEach(point => bounds.extend(point));
            map.setBounds(bounds);

            window.kakao.maps.event.addListener(map,'bounds_changed', function() {
                var bound = map.getBounds();
                var swLatlng = bound.getSouthWest();
                var neLatlng = bound.getNorthEast();
                console.log('<p>남서쪽 위경도 : ' + swLatlng.toString() + ',' + 
                '북동쪽 위경도 : '+ neLatlng.toString());
            })
        }
    };

    return (
        <div id="map" style={{ width: "100%", height: "100vh" }}></div>
    );
}

export default Kakao;
