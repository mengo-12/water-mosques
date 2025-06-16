'use client'

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useState } from 'react'

// إصلاح مشاكل أيقونات Leaflet في Next.js
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/leaflet/marker-icon-2x.png',
    iconUrl: '/leaflet/marker-icon.png',
    shadowUrl: '/leaflet/marker-shadow.png',
})

// مكون فرعي يلتقط حدث النقر على الخريطة
function LocationSelector({ onLocationSelect }) {
    useMapEvents({
        click(e) {
            onLocationSelect(e.latlng) // ترسل الإحداثيات عند النقر
        },
    })
    return null
}

export default function SelectMosqueMap({ onSelectMosque }) {
    const [selectedPosition, setSelectedPosition] = useState(null)

    const handleLocationSelect = (latlng) => {
        setSelectedPosition(latlng)
        onSelectMosque({
            latitude: latlng.lat,
            longitude: latlng.lng,
        })
    }

    return (
        <div className="h-80 w-full rounded overflow-hidden">
            <MapContainer
                center={[21.4225, 39.8262]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <LocationSelector onLocationSelect={handleLocationSelect} />

                {selectedPosition && (
                    <Marker position={[selectedPosition.lat, selectedPosition.lng]}>
                        <Popup>موقع المسجد المحدد</Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    )
}
