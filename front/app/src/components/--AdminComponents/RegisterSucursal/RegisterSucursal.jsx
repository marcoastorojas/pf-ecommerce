import style from './RegisterSucursal.module.css';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-geosearch/dist/geosearch.css";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;
function Buscador () {
    
    const map = useMap()
    
    useEffect(() => {
        const provider = new OpenStreetMapProvider()
        const searchControl = new GeoSearchControl({
            provider,
        })
        map.addControl(searchControl)
        return () => map.removeControl(searchControl)

    }, [])
    
    function searchEventHandler(result) {
        console.log(result.location); //Coordenadas al reves
        // if(marker) {
        //     map.removeControl(marker)
        // }
        // let marker = L.marker((result.location.y, result.location.x)).addTo(map)
      }

      function clickHandler(resul) {
          console.log(resul.latlng)
      }

          map.on('geosearch/showlocation', searchEventHandler);
          map.on('click', clickHandler)

    return null
}
export default function RegisterSucursal () {
    const [ position, setPosition ] = useState([-34.63703156938776, -58.39213609387755])
    // const position = [0, 0]

    

    return (
        <div>
                <MapContainer  center={position} zoom={13} scrollWheelZoom={false} className={style.leaflet_container}>
                    <TileLayer  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                    
                    <Buscador/>
                </MapContainer>
        </div>
    )
}