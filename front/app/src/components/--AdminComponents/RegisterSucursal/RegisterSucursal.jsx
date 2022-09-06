import style from './RegisterSucursal.module.css';
import { useEffect } from 'react';
import { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

//GeoSearch - Input de búsqueda en el mapita
import { geosearch } from 'esri-leaflet-geocoder';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';







export default function RegisterSucursal () {

    const position = [0, 0]
    const mapRef = useRef()

    useEffect(() => {
        // const { current = {} } = mapRef
        // const { _map } = current
        console.log(Object.keys(mapRef).length)
        // if(!mapRef.current?._map) return;

        const control = geosearch()
        // mapRef?.current?._map?control.addTo(mapRef.current._map)
        // control.addTo(_map)
        // control.addTo(mapRef?.current?._map)
    }, [])


    return(
        <div className={style.contRegisterSucursal}>
            <button onClick={() => console.log(mapRef)}>PRUEBA</button>
            <div className={style.contMapita}>
                <MapContainer  center={position} zoom={13} scrollWheelZoom={false} className={style.leaflet_container}>
                    <TileLayer ref={mapRef} attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                </MapContainer>
            </div>
        </div>
    )
}