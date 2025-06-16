'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// إصلاح مشاكل أيقونات Leaflet في Next.js
// تأكد من أنك نسخت ملفات الأيقونات الثلاثة إلى public/leaflet/
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/leaflet/marker-icon-2x.png',
    iconUrl: '/leaflet/marker-icon.png',
    shadowUrl: '/leaflet/marker-shadow.png',
})

export default function MosqueMap({ mosques, onSelectMosque }) {
    return (
        <div className="h-80 w-full rounded overflow-hidden">
            <MapContainer
                center={[21.4225, 39.8262]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {mosques.map((mosque) => (
                    <Marker
                        key={mosque.id}
                        position={[mosque.latitude, mosque.longitude]}
                        eventHandlers={{
                            click: () => onSelectMosque(mosque),
                        }}
                    >
                        <Popup>{mosque.name}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}
