import React from 'react';
import { Link } from 'react-router-dom';
import { Attraction } from '../../types/hotel';
import { PROPERTY_LOCATION } from '../../data/attractions';
import { Car, ExternalLink, Compass } from 'lucide-react';

interface AreaMapProps {
  attractions: Attraction[];
  selectedAttractionId: string | null;
  hoveredAttractionId: string | null;
  onSelectAttraction: (attraction: Attraction) => void;
  onHoverAttraction: (id: string | null) => void;
  showTravelTimeConnector: boolean;
}

export const AreaMap: React.FC<AreaMapProps> = ({
  attractions,
  selectedAttractionId,
  hoveredAttractionId,
  onSelectAttraction,
  onHoverAttraction,
  showTravelTimeConnector
}) => {
  // Lat/Lng bounding box for Burbank / Hollywood / LA basin:
  // North: 34.23 (North of Burbank Airport)
  // South: 33.92 (South of LAX)
  // West: -118.44 (West of Sepulveda / Santa Monica Mts)
  // East: -118.25 (East of Griffith Park / Glendale)
  const bounds = {
    minLat: 33.91,
    maxLat: 34.24,
    minLng: -118.43,
    maxLng: -118.25
  };

  const project = (lat: number, lng: number) => {
    // Map bounds to 800 x 600 SVG viewBox
    const width = 800;
    const height = 600;
    const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * width;
    // Invert latitude for SVG y-axis
    const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * height;
    return { x, y };
  };

  const propertyPos = project(PROPERTY_LOCATION.lat, PROPERTY_LOCATION.lng);
  const selectedAttraction = attractions.find((a) => a.id === selectedAttractionId);
  const selectedPos = selectedAttraction ? project(selectedAttraction.lat, selectedAttraction.lng) : null;

  return (
    <div className="relative w-full h-full min-h-[480px] bg-[#E8EDE6] rounded-[10px] border border-hairline overflow-hidden select-none">
      
      {/* SVG Map Canvas with Muted Stylized Cartography */}
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full"
        aria-label="Map of Los Angeles and Burbank attractions"
      >
        <defs>
          <linearGradient id="hill-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D9E3D6" />
            <stop offset="100%" stopColor="#C9D6C5" />
          </linearGradient>
        </defs>

        {/* Base Basin Ground */}
        <rect x="0" y="0" width="800" height="600" fill="#E8EDE6" />

        {/* Santa Monica & Hollywood Hills Topography Ridge (Center-South) */}
        <path
          d="M 100 320 Q 300 290 480 340 Q 650 360 780 400 L 780 450 Q 550 420 350 390 Q 150 370 0 380 Z"
          fill="url(#hill-grad)"
          opacity="0.85"
        />

        {/* Verdugo & San Gabriel Mountains Ridge (North-East) */}
        <path
          d="M 450 0 Q 600 60 750 30 L 800 0 L 800 160 Q 650 180 500 130 Z"
          fill="url(#hill-grad)"
          opacity="0.9"
        />

        {/* Griffith Park Green Mass */}
        <circle cx="560" cy="270" r="65" fill="#CAD7C5" opacity="0.9" />

        {/* Major Freeways & Arterials (I-5, US-101, CA-134, CA-170) */}
        {/* US-101 Hollywood Freeway */}
        <path
          d="M 120 280 Q 280 280 380 340 Q 480 410 600 480"
          stroke="#D5DCD3"
          strokeWidth="6"
          fill="none"
        />
        {/* I-5 Golden State Freeway */}
        <path
          d="M 320 20 L 520 180 Q 600 240 680 380 L 750 560"
          stroke="#D5DCD3"
          strokeWidth="6"
          fill="none"
        />
        {/* CA-134 Ventura Freeway */}
        <path
          d="M 80 240 L 780 240"
          stroke="#CBD5C8"
          strokeWidth="8"
          fill="none"
        />
        <text x="710" y="234" fill="#88958B" fontSize="9" fontFamily="'Geist Mono', monospace">CA-134</text>

        {/* Riverside Drive & Cahuenga Blvd */}
        <path
          d="M 150 255 L 620 255"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          fill="none"
        />
        <text x="210" y="250" fill="#7A877E" fontSize="8" fontFamily="'Instrument Sans', sans-serif">Riverside Dr</text>

        {/* Los Angeles River Path */}
        <path
          d="M 220 245 Q 400 250 540 220 Q 630 260 670 340"
          stroke="#BDCCD3"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* District Labels */}
        <text x="360" y="190" fill="#5C6660" fontSize="11" fontFamily="'Newsreader', serif" letterSpacing="1" opacity="0.6">
          BURBANK
        </text>
        <text x="220" y="210" fill="#5C6660" fontSize="10" fontFamily="'Newsreader', serif" letterSpacing="0.8" opacity="0.5">
          NORTH HOLLYWOOD (NoHo)
        </text>
        <text x="440" y="380" fill="#5C6660" fontSize="11" fontFamily="'Newsreader', serif" letterSpacing="1" opacity="0.6">
          HOLLYWOOD
        </text>
        <text x="560" y="260" fill="#47534B" fontSize="9" fontFamily="'Instrument Sans', sans-serif" opacity="0.7">
          Griffith Park
        </text>

        {/* Travel Time Connector: Straight line from property to selected pin with drive time at midpoint */}
        {showTravelTimeConnector && selectedPos && (
          <g>
            <line
              x1={propertyPos.x}
              y1={propertyPos.y}
              x2={selectedPos.x}
              y2={selectedPos.y}
              stroke="#A8842C"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="animate-pulse"
            />
            {/* Midpoint Label */}
            {(() => {
              const midX = (propertyPos.x + selectedPos.x) / 2;
              const midY = (propertyPos.y + selectedPos.y) / 2;
              return (
                <g transform={`translate(${midX}, ${midY})`}>
                  <rect
                    x="-42"
                    y="-12"
                    width="84"
                    height="24"
                    rx="3"
                    fill="#14261F"
                    stroke="#D9DED8"
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="4"
                    fill="#F2F4F1"
                    fontSize="10"
                    fontFamily="'Geist Mono', monospace"
                    fontWeight="500"
                    textAnchor="middle"
                  >
                    {selectedAttraction?.driveTimeMin}m drive
                  </text>
                </g>
              );
            })()}
          </g>
        )}

        {/* Permanent Property Marker in Brass (Always visible, labeled, never filtered) */}
        <g
          transform={`translate(${propertyPos.x}, ${propertyPos.y})`}
          className="z-30 cursor-pointer"
        >
          {/* Pulsing beacon */}
          <circle cx="0" cy="0" r="18" fill="#A8842C" fillOpacity="0.25" className="animate-ping" />
          <circle cx="0" cy="0" r="12" fill="#A8842C" stroke="#FFFFFF" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="4" fill="#FFFFFF" />

          {/* Persistent Label */}
          <g transform="translate(16, 4)">
            <rect x="0" y="-14" width="132" height="22" rx="2" fill="#14261F" stroke="#A8842C" strokeWidth="1" />
            <text
              x="6"
              y="1"
              fill="#F2F4F1"
              fontSize="10"
              fontFamily="'Instrument Sans', sans-serif"
              fontWeight="600"
            >
              The Tangerine Hotel
            </text>
          </g>
        </g>

        {/* Attraction Markers */}
        {attractions.map((attraction) => {
          const pos = project(attraction.lat, attraction.lng);
          const isSelected = selectedAttractionId === attraction.id;
          const isHovered = hoveredAttractionId === attraction.id;

          // Category colors
          let pinColor = '#14657E'; // default water
          if (attraction.category === 'studios') pinColor = '#5C6660';
          else if (attraction.category === 'nature') pinColor = '#2F593B';
          else if (attraction.category === 'shopping') pinColor = '#7A6038';
          else if (attraction.category === 'airports') pinColor = '#3D5466';
          else if (attraction.category === 'nightlife') pinColor = '#70435E';

          const scale = isSelected || isHovered ? 1.35 : 1.0;

          return (
            <g
              key={`pin-${attraction.id}`}
              transform={`translate(${pos.x}, ${pos.y}) scale(${scale})`}
              className="cursor-pointer transition-transform duration-150"
              onClick={() => onSelectAttraction(attraction)}
              onMouseEnter={() => onHoverAttraction(attraction.id)}
              onMouseLeave={() => onHoverAttraction(null)}
              tabIndex={0}
              role="button"
              aria-label={`${attraction.name}, ${attraction.distanceMiles} miles, ${attraction.driveTimeMin} minutes drive`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectAttraction(attraction);
                }
              }}
            >
              {/* Outer ring */}
              <circle
                cx="0"
                cy="0"
                r="10"
                fill={isSelected ? '#A8842C' : pinColor}
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <circle cx="0" cy="0" r="3" fill="#FFFFFF" />

              {/* Hover/Selected mini badge */}
              {(isHovered || isSelected) && (
                <g transform="translate(0, -18)">
                  <rect
                    x="-60"
                    y="-16"
                    width="120"
                    height="18"
                    rx="2"
                    fill="#14261F"
                    stroke="#D9DED8"
                    strokeWidth="0.8"
                  />
                  <text
                    x="0"
                    y="-4"
                    fill="#F2F4F1"
                    fontSize="9"
                    fontFamily="'Instrument Sans', sans-serif"
                    fontWeight="500"
                    textAnchor="middle"
                  >
                    {attraction.name.length > 18 ? `${attraction.name.slice(0, 18)}…` : attraction.name}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Compass */}
        <g transform="translate(750, 40)">
          <circle cx="0" cy="0" r="16" fill="#FFFFFF" stroke="#D9DED8" strokeWidth="1" />
          <path d="M 0 -10 L 3 -2 L -3 -2 Z" fill="#A8842C" />
          <path d="M 0 10 L 3 2 L -3 2 Z" fill="#5C6660" />
          <text x="0" y="-12" fill="#A8842C" fontSize="7" fontFamily="'Geist Mono', monospace" textAnchor="middle" fontWeight="bold">N</text>
        </g>
      </svg>

      {/* Selected Attraction Compact Popup at Bottom Center */}
      {selectedAttraction && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-paper border border-hairline rounded-[6px] shadow-lg p-3 z-30 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex gap-3 items-center">
            <img
              src={selectedAttraction.image}
              alt={selectedAttraction.name}
              className="w-16 h-16 rounded-[3px] object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-serif text-sm text-ink truncate">{selectedAttraction.name}</h4>
              <div className="flex items-center space-x-2 text-[11px] font-mono text-muted mt-0.5">
                <span>{selectedAttraction.distanceMiles} mi ({selectedAttraction.distanceKm} km)</span>
                <span>·</span>
                <span className="text-water font-medium flex items-center gap-0.5">
                  <Car className="w-3 h-3" /> {selectedAttraction.driveTimeMin} min
                </span>
              </div>
              <p className="text-[11px] text-ink/75 truncate mt-1">
                {selectedAttraction.oneLineDescription}
              </p>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-hairline flex items-center justify-between text-xs">
            <span className="text-[11px] font-mono text-muted">{selectedAttraction.openingHours}</span>
            <Link
              to={`/explore/${selectedAttraction.slug}`}
              className="text-water hover:underline flex items-center gap-1 font-medium"
            >
              <span>Guide</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
