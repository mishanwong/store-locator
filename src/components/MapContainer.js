import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import style from "../styles/components/MapContainer.module.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const MapContainer = (props) => {
  const mapContainerRef = useRef(null);

  //Initialize map when component mounts

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [props.coordinate.lng, props.coordinate.lat],
      zoom: 12,
    });

    var marker = new mapboxgl.Marker({ color: "#0000FF" })
      .setLngLat([props.coordinate.lng, props.coordinate.lat])
      .addTo(map);

    //Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl());

    //Clean up on unmount
    return () => map.remove();
  }, [props.coordinate.lat, props.coordinate.lng]);

  return <div className={style.map} ref={mapContainerRef}></div>;
  //################################################################################################################
  // const [viewWidth, setViewWidth] = useState(window.innerWidth);
  // const [isMobile, setIsMobile] = useState(null);

  // useEffect(() => {
  //   function handleResize() {
  //     setViewWidth(window.innerWidth);
  //     if (viewWidth < 768) {
  //       setIsMobile(true);
  //     } else {
  //       setIsMobile(false);
  //     }
  //   }
  //   window.addEventListener("resize", handleResize);

  //   return (_) => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // });

  // const navControlStyle = {
  //   right: 10,
  //   top: 10,
  // };

  // const [viewport, setViewport] = useState({
  //   latitude: props.userLocation,
  //   longitude: props.userLocation,
  //   zoom: 12,
  // });

  // useEffect(() => {
  //   setViewport({
  //     latitude: props.coordinate.lat,
  //     longitude: props.coordinate.lng,
  //     zoom: 12,
  //   });
  // }, [props.coordinate.lat, props.coordinate.lng]);

  // return (
  //   <div>
  //     <ReactMapGL
  //       {...viewport}
  //       width={isMobile ? "400px" : "90%"}
  //       height={isMobile ? "400px" : "90%"}
  //       onViewportChange={setViewport}
  //       mapStyle="mapbox://styles/mishan995/ckl76biof1uil17mr9oka8yl9"
  //       mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
  //     >
  //       <NavigationControl style={navControlStyle} />
  //       <Marker
  //         latitude={props.coordinate.lat}
  //         longitude={props.coordinate.lng}
  //       >
  //         <FontAwesomeIcon
  //           icon={faMapMarkerAlt}
  //           className="text-blue-500 text-4xl"
  //         />
  //       </Marker>
  //     </ReactMapGL>
  //   </div>
  // );
};

export default MapContainer;
