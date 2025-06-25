import React from 'react';
import { Bus } from '../types/bus';
import { Star, Wifi, Clock, Users, Zap, Droplets, Tv } from 'lucide-react';

interface BusCardProps {
  bus: Bus;
  onSelect: (bus: Bus) => void;
}

const BusCard: React.FC<BusCardProps> = ({ bus, onSelect }) => {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="h-4 w-4" />;
      case 'charging point': return <Zap className="h-4 w-4" />;
      case 'water bottle': return <Droplets className="h-4 w-4" />;
      case 'entertainment': return <Tv className="h-4 w-4" />;
      default: return <div className="h-4 w-4 bg-green-500 rounded-full" />;
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.0) return 'bg-green-500';
    if (rating >= 3.5) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Bus Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{bus.operator}</h3>
              <p className="text-sm text-gray-600">{bus.busType}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`${getRatingColor(bus.rating)} text-white px-2 py-1 rounded-md text-sm font-semibold flex items-center`}>
                <Star className="h-3 w-3 mr-1 fill-current" />
                {bus.rating}
              </div>
            </div>
          </div>

          {/* Time and Duration */}
          <div className="flex items-center space-x-6 mb-4">
            <div className="text-center">
              <p className="text-xl font-bold text-gray-900">{bus.departureTime}</p>
              <p className="text-sm text-gray-600">{bus.route.from}</p>
            </div>
            <div className="flex-1 flex items-center">
              <div className="border-t-2 border-dashed border-gray-300 flex-1"></div>
              <div className="px-3 text-center">
                <Clock className="h-4 w-4 text-gray-400 mx-auto mb-1" />
                <p className="text-xs text-gray-600">{bus.duration}</p>
              </div>
              <div className="border-t-2 border-dashed border-gray-300 flex-1"></div>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-900">{bus.arrivalTime}</p>
              <p className="text-sm text-gray-600">{bus.route.to}</p>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-4">
            {bus.amenities.slice(0, 5).map((amenity, index) => (
              <div key={index} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-md">
                {getAmenityIcon(amenity)}
                <span className="text-xs text-gray-700">{amenity}</span>
              </div>
            ))}
            {bus.amenities.length > 5 && (
              <div className="bg-gray-100 px-2 py-1 rounded-md">
                <span className="text-xs text-gray-700">+{bus.amenities.length - 5} more</span>
              </div>
            )}
          </div>
        </div>

        {/* Price and Booking */}
        <div className="flex flex-col lg:items-end">
          <div className="text-right mb-4">
            <p className="text-2xl font-bold text-red-600">₹{bus.price}</p>
            <p className="text-sm text-gray-600">per seat</p>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {bus.availableSeats} seats available
            </span>
          </div>

          <button
            onClick={() => onSelect(bus)}
            disabled={bus.availableSeats === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              bus.availableSeats === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
          >
            {bus.availableSeats === 0 ? 'Sold Out' : 'Select Seats'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusCard;