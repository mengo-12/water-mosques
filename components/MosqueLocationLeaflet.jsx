'use client'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { useState } from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// تصحيح أيقونات Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function LocationMarker({ onSelect }) {
    const [position, setPosition] = useState(null)

    useMapEvents({
        click(e) {
            setPosition(e.latlng)
            onSelect(e.latlng)
        },
    })

    return position === null ? null : <Marker position={position} />
}

export default function MosqueLocationLeaflet({ onSelect }) {
    return (
        <MapContainer
            center={[21.3891, 39.8579]} // إحداثيات مكة المكرمة
            zoom={12}
            style={{ height: '400px', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <LocationMarker onSelect={onSelect} />
        </MapContainer>
    )
}
