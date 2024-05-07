import React, { useEffect } from "react";
import { markerdata } from "./Data/markerData";

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
        if (window.kakao && window.kakao.maps) {
            var container = document.getElementById('map');
            var options = {
                center: new window.kakao.maps.LatLng(37.336382765356035, 127.26531823399158),
                level: 3
            };
            const map = new window.kakao.maps.Map(container, options);

            markerdata.forEach((el) => {
                const marker = new window.kakao.maps.Marker({
                    map: map,
                    position: new window.kakao.maps.LatLng(el.lat, el.lng),
                });

                var infowindow = new window.kakao.maps.InfoWindow({
                    content: el.title,
                });

                window.kakao.maps.event.addListener(marker, "mouseover", () => {
                    infowindow.open(map, marker);
                });

                window.kakao.maps.event.addListener(marker, "mouseout", () => {
                    infowindow.close();
                });
            });
        }
    };

    return (
        <div id="map" style={{ width: "1194px", height: "834px" }}></div>
    );
}

export default Kakao;
