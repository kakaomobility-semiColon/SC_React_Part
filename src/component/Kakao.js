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
            
            var infowindowArray = [];

            markerdata.forEach((data) => {
                var position = new window.kakao.maps.LatLng(data.lat, data.lng);
                var content = `<div class="wrap"> 
                                <div class="info"> 
                                    <div class="title"> 
                                        ${data.name}  
                                    </div> 
                                    <div class="body"> 
                                        <div class="img"> 
                                            <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70"> 
                                        </div> 
                                        <div class="desc"> 
                                            <div class="ellipsis">${data.address}</div> 
                                            <div class="jibun ellipsis">${data.name}는</div> 
                                            <div class="jibun ellipsis">${data.operatorName}회사에서 만든 충전기이다.</div> 
                                        </div> 
                                    </div> 
                                </div> 
                            </div>`;

                // 마커를 표시할 지도
                var marker = new window.kakao.maps.Marker({
                    position: position,
                    map: map
                });

                var infowindow = new window.kakao.maps.InfoWindow({
                    content: content,
                    disableAutoPan: true,   // 인포윈도우를 열 때 지도가 자동으로 패닝하지 않을 지 여부(default: false)
                    position: position      //인포윈도우의 위치를 마커의 위치로 설정합니다.
                });

                window.kakao.maps.event.addListener(marker, "click", function () {
                    closeInfoWindow();
                    infowindow.open(map, marker);
                });

                //인포윈도우 배열에 추가
                infowindowArray.push(infowindow);
            });

            //지도 클릭 시 모든 인포윈도우 닫기
            window.kakao.maps.event.addListener(map, "click", function () {
                closeInfoWindow();
            });
            function closeInfoWindow() {
                for (var i = 0; i < infowindowArray.length; i++) {
                    infowindowArray[i].close();
                }
            }
        }
    };

    return (
        <div id="map" style={{ width: "1194px", height: "834px" }}></div>
    );
}

export default Kakao;
