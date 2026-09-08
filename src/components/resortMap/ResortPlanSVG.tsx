import React from 'react';
import { Accommodation } from '../../types/hotel';

interface ResortPlanSVGProps {
  villas: Accommodation[];
  selectedVillaId: string | null;
  hoveredVillaId: string | null;
  filteredVillaIds: string[];
  unavailableVillaIds: string[];
  onSelectVilla: (villa: Accommodation) => void;
  onHoverVilla: (villaId: string | null) => void;
  zoomLevel: number;
  panOffset: { x: number; y: number };
  blueprintMode?: boolean;
  highlightPlungePools?: boolean;
  currencySymbol?: string;
}

export const ResortPlanSVG: React.FC<ResortPlanSVGProps> = ({
  villas,
  selectedVillaId,
  hoveredVillaId,
  filteredVillaIds,
  unavailableVillaIds,
  onSelectVilla,
  onHoverVilla,
  zoomLevel,
  panOffset,
  blueprintMode = false,
  highlightPlungePools = false,
  currencySymbol = '$'
}) => {
  return (
    <div className={`relative w-full h-full overflow-hidden select-none transition-colors duration-300 ${
      blueprintMode ? 'bg-[#15232D]' : 'bg-[#E5ECE4]'
    }`}>
      <svg
        viewBox="0 0 1000 650"
        className="w-full h-full transition-transform duration-100 ease-out cursor-grab active:cursor-grabbing"
        style={{
          transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
          transformOrigin: 'center center'
        }}
        aria-label="Interactive resort site plan"
      >
        <defs>
          {/* Subtle garden foliage patterns */}
          <pattern id="citrus-orchard" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="14" fill={blueprintMode ? '#1C2F3D' : '#D2DDD0'} opacity="0.6" />
            <circle cx="20" cy="20" r="3" fill={blueprintMode ? '#38BDF8' : '#A8842C'} opacity="0.4" />
          </pattern>
          <pattern id="olive-grove" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="10" fill={blueprintMode ? '#1A2C38' : '#CBD6C9'} opacity="0.7" />
            <circle cx="15" cy="15" r="2" fill={blueprintMode ? '#64748B' : '#5C6660'} opacity="0.4" />
          </pattern>
          {/* Water reflection */}
          <linearGradient id="pool-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14657E" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0E4C5F" stopOpacity="0.95" />
          </linearGradient>
          {/* Blueprint grid */}
          <pattern id="blueprint-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#253E52" strokeWidth="0.75" />
          </pattern>
        </defs>

        {/* Base Ground Texture */}
        <rect x="0" y="0" width="1000" height="650" fill={blueprintMode ? '#15232D' : '#E2EAE0'} />
        {blueprintMode && <rect x="0" y="0" width="1000" height="650" fill="url(#blueprint-grid)" opacity="0.8" />}

        {/* Landscaping Zones (Shade #14261F tints) */}
        {/* North Orchard Grove */}
        <rect x="40" y="40" width="440" height="240" rx="16" fill="url(#citrus-orchard)" />
        <path d="M 50 50 Q 250 30 450 60 Q 480 200 460 260 Q 250 280 50 260 Z" fill="#14261F" fillOpacity="0.06" />

        {/* Historic Olive Grove (Northeast) */}
        <rect x="580" y="40" width="380" height="240" rx="16" fill="url(#olive-grove)" />
        <path d="M 600 50 Q 800 30 940 70 Q 960 220 920 260 Q 750 280 600 250 Z" fill="#14261F" fillOpacity="0.07" />

        {/* South Garden Enclave */}
        <rect x="40" y="420" width="520" height="200" rx="16" fill="url(#citrus-orchard)" />

        {/* Pathways (Canvas #F2F4F1 & Hairline #D9DED8) */}
        {/* Main West-East Arterial Path */}
        <path
          d="M 20 340 L 980 340"
          stroke="#F2F4F1"
          strokeWidth="32"
          strokeLinecap="round"
        />
        <path
          d="M 20 340 L 980 340"
          stroke="#D9DED8"
          strokeWidth="32"
          strokeDasharray="4 12"
          fill="none"
        />

        {/* North-South Garden Promenade */}
        <path
          d="M 520 40 L 520 620"
          stroke="#F2F4F1"
          strokeWidth="28"
          strokeLinecap="round"
        />

        {/* Winding pathways connecting villas to pool */}
        <path
          d="M 220 540 Q 340 460 520 440 Q 640 430 680 360"
          stroke="#F2F4F1"
          strokeWidth="18"
          fill="none"
        />
        <path
          d="M 280 220 Q 380 300 520 340 Q 660 330 740 220"
          stroke="#F2F4F1"
          strokeWidth="18"
          fill="none"
        />

        {/* Main Hotel Pavilion & Lobby (Center-North) */}
        <g transform="translate(430, 240)">
          <rect
            x="0"
            y="0"
            width="180"
            height="90"
            rx="6"
            fill="#14261F"
            fillOpacity="0.92"
            stroke="#D9DED8"
            strokeWidth="2"
          />
          <text
            x="90"
            y="42"
            fill="#F2F4F1"
            fontSize="12"
            fontFamily="'Newsreader', serif"
            textAnchor="middle"
            letterSpacing="0.5"
          >
            Main Pavilion & Lobby
          </text>
          <text
            x="90"
            y="60"
            fill="#A8842C"
            fontSize="9"
            fontFamily="'Geist Mono', monospace"
            textAnchor="middle"
          >
            Floors 1–2 & Penthouse 8
          </text>
        </g>

        {/* The Citrus Terrace Restaurant (West of lobby) */}
        <g transform="translate(240, 260)">
          <rect
            x="0"
            y="0"
            width="130"
            height="70"
            rx="4"
            fill="#FFFFFF"
            stroke="#D9DED8"
            strokeWidth="1.5"
          />
          <text
            x="65"
            y="35"
            fill="#1A211D"
            fontSize="11"
            fontFamily="'Newsreader', serif"
            textAnchor="middle"
          >
            The Citrus Terrace
          </text>
          <text
            x="65"
            y="50"
            fill="#5C6660"
            fontSize="8"
            fontFamily="'Instrument Sans', sans-serif"
            textAnchor="middle"
          >
            Al Fresco Dining
          </text>
        </g>

        {/* The 75-Foot Resort Pool (East of lobby) */}
        <g transform="translate(650, 310)">
          {/* Pool deck */}
          <rect
            x="-20"
            y="-20"
            width="250"
            height="110"
            rx="12"
            fill="#F2F4F1"
            stroke="#D9DED8"
            strokeWidth="2"
          />
          {/* Water */}
          <rect
            x="0"
            y="0"
            width="210"
            height="70"
            rx="6"
            fill="url(#pool-gradient)"
          />
          {/* Water lane marks */}
          <line x1="15" y1="35" x2="195" y2="35" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="6 4" />
          <text
            x="105"
            y="41"
            fill="#FFFFFF"
            fontSize="10"
            fontFamily="'Instrument Sans', sans-serif"
            textAnchor="middle"
            letterSpacing="1"
          >
            RESORT POOL (75 FT)
          </text>
          {/* Shade Poolside Lounge */}
          <rect
            x="60"
            y="76"
            width="90"
            height="22"
            rx="2"
            fill="#14261F"
          />
          <text
            x="105"
            y="91"
            fill="#F2F4F1"
            fontSize="8"
            fontFamily="'Instrument Sans', sans-serif"
            textAnchor="middle"
          >
            Shade Lounge
          </text>
        </g>

        {/* Garden Cabana & Wellness Spa (South-East) */}
        <g transform="translate(720, 480)">
          <rect
            x="0"
            y="0"
            width="150"
            height="75"
            rx="4"
            fill="#FFFFFF"
            stroke="#D9DED8"
            strokeWidth="1.5"
          />
          <text
            x="75"
            y="38"
            fill="#1A211D"
            fontSize="11"
            fontFamily="'Newsreader', serif"
            textAnchor="middle"
          >
            Botanical Spa Cabanas
          </text>
          <text
            x="75"
            y="54"
            fill="#5C6660"
            fontSize="8"
            fontFamily="'Instrument Sans', sans-serif"
            textAnchor="middle"
          >
            Citrus Hydrotherapy
          </text>
        </g>

        {/* Main Entrance & Gated Motor Court (South) */}
        <g transform="translate(440, 585)">
          <rect
            x="0"
            y="0"
            width="160"
            height="45"
            rx="4"
            fill="#FFFFFF"
            stroke="#D9DED8"
            strokeWidth="1.5"
          />
          <text
            x="80"
            y="25"
            fill="#1A211D"
            fontSize="10"
            fontFamily="'Instrument Sans', sans-serif"
            fontWeight="500"
            textAnchor="middle"
          >
            Valet Motor Court · Entrance
          </text>
          <text
            x="80"
            y="38"
            fill="#A8842C"
            fontSize="8"
            fontFamily="'Geist Mono', monospace"
            textAnchor="middle"
          >
            W Riverside Dr
          </text>
        </g>

        {/* Tree and Landscaping Embellishments */}
        <g fill="#14261F" fillOpacity="0.12">
          {/* North trees */}
          <circle cx="120" cy="110" r="16" />
          <circle cx="190" cy="80" r="14" />
          <circle cx="370" cy="100" r="18" />
          <circle cx="700" cy="120" r="15" />
          <circle cx="850" cy="100" r="16" />
          {/* South trees */}
          <circle cx="140" cy="510" r="18" />
          <circle cx="310" cy="570" r="14" />
          <circle cx="610" cy="560" r="16" />
          <circle cx="910" cy="460" r="20" />
        </g>

        {/* Villa Building Footprints under markers */}
        {villas.map((villa) => {
          if (villa.mapX === undefined || villa.mapY === undefined) return null;
          const posX = (villa.mapX / 100) * 1000;
          const posY = (villa.mapY / 100) * 650;
          return (
            <g key={`footprint-${villa.id}`}>
              <rect
                x={posX - 24}
                y={posY - 18}
                width="48"
                height="36"
                rx="3"
                fill="#FFFFFF"
                stroke="#D9DED8"
                strokeWidth="1.2"
                opacity="0.9"
              />
              {villa.features.includes('private plunge pool') && (
                <rect
                  x={posX + 12}
                  y={posY - 10}
                  width="14"
                  height="18"
                  rx="2"
                  fill="#14657E"
                  opacity="0.75"
                />
              )}
            </g>
          );
        })}

        {/* Interactive Villa Markers */}
        {villas.map((villa) => {
          if (villa.mapX === undefined || villa.mapY === undefined) return null;
          const posX = (villa.mapX / 100) * 1000;
          const posY = (villa.mapY / 100) * 650;

          const isSelected = selectedVillaId === villa.id;
          const isHovered = hoveredVillaId === villa.id;
          const isFilteredOut = !filteredVillaIds.includes(villa.id);
          const isUnavailable = unavailableVillaIds.includes(villa.id);

          // Marker color per Prompt 3:
          // water (#14657E) for available
          // hairline grey (#9AA59C) for unavailable
          // brass (#A8842C) for currently selected
          let markerFill = '#14657E';
          let textColor = '#FFFFFF';
          if (isSelected) {
            markerFill = '#A8842C';
            textColor = '#FFFFFF';
          } else if (isUnavailable) {
            markerFill = '#9AA59C';
            textColor = '#F2F4F1';
          }

          // Filtered out villas fade to 20% opacity rather than disappearing
          const markerOpacity = isFilteredOut ? 0.2 : 1.0;
          const scale = isSelected || isHovered ? 1.28 : 1.0;

          // Unit number label (e.g., '1', '2', 'P8')
          const unitNumber = villa.slug.includes('penthouse')
            ? 'P8'
            : villa.name.replace(/[^0-9]/g, '') || 'V';

          return (
            <g
              key={`marker-${villa.id}`}
              transform={`translate(${posX}, ${posY}) scale(${scale})`}
              className="cursor-pointer transition-all duration-150"
              style={{ opacity: markerOpacity }}
              onClick={() => onSelectVilla(villa)}
              onMouseEnter={() => onHoverVilla(villa.id)}
              onMouseLeave={() => onHoverVilla(null)}
              tabIndex={0}
              role="button"
              aria-label={`${villa.name}, ${villa.bedrooms} Bedroom, Sleeps ${villa.sleeps}, from $${villa.basePrice} per night. ${
                isUnavailable ? 'Currently unavailable' : 'Available'
              }`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectVilla(villa);
                }
              }}
            >
              {/* Plunge Pool highlight ring when toggled */}
              {highlightPlungePools && villa.amenities.some(a => a.toLowerCase().includes('pool')) && (
                <circle
                  cx="0"
                  cy="0"
                  r="26"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                  className="animate-spin origin-center"
                  style={{ animationDuration: '8s' }}
                />
              )}

              {/* Outer halo when selected or hovered */}
              {(isSelected || isHovered) && (
                <circle
                  cx="0"
                  cy="0"
                  r="22"
                  fill={isSelected ? '#A8842C' : '#14657E'}
                  fillOpacity="0.25"
                  className="animate-pulse"
                />
              )}

              {/* Pin Base Circle */}
              <circle
                cx="0"
                cy="0"
                r="15"
                fill={markerFill}
                stroke={blueprintMode ? '#38BDF8' : '#FFFFFF'}
                strokeWidth="2.5"
                className="shadow-sm"
              />

              {/* Pin Number */}
              <text
                x="0"
                y="4.5"
                fill={textColor}
                fontSize="11"
                fontFamily="'Geist Mono', monospace"
                fontWeight="600"
                textAnchor="middle"
              >
                {unitNumber}
              </text>

              {/* Tooltip on hover/selected */}
              {(isHovered || isSelected) && (
                <g transform="translate(0, -26)">
                  <rect
                    x="-70"
                    y="-20"
                    width="140"
                    height="22"
                    rx="2"
                    fill="#14261F"
                    stroke="#D9DED8"
                    strokeWidth="0.8"
                  />
                  <text
                    x="0"
                    y="-5"
                    fill="#F2F4F1"
                    fontSize="9"
                    fontFamily="'Instrument Sans', sans-serif"
                    fontWeight="500"
                    textAnchor="middle"
                  >
                    {villa.name} · {currencySymbol}{villa.basePrice}/nt
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Orientation Note / Compass */}
        <g transform="translate(930, 600)">
          <circle cx="0" cy="0" r="16" fill="#FFFFFF" stroke="#D9DED8" strokeWidth="1" />
          <path d="M 0 -11 L 3 -2 L -3 -2 Z" fill="#A8842C" />
          <path d="M 0 11 L 3 2 L -3 2 Z" fill="#5C6660" />
          <text x="0" y="-13" fill="#A8842C" fontSize="7" fontFamily="'Geist Mono', monospace" textAnchor="middle" fontWeight="bold">N</text>
        </g>
      </svg>
    </div>
  );
};
