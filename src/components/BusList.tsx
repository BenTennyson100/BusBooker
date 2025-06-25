import React, { useState } from 'react';
import { Bus } from '../types/bus';
import BusCard from './BusCard';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface BusListProps {
  buses: Bus[];
  onSelectBus: (bus: Bus) => void;
  searchCriteria: { from: string; to: string; date: string };
}

const BusList: React.FC<BusListProps> = ({ buses, onSelectBus, searchCriteria }) => {
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'rating' | 'departure'>('price');
  const [filterBy, setFilterBy] = useState<{
    priceRange: [number, number];
    busTypes: string[];
    amenities: string[];
  }>({
    priceRange: [0, 3000],
    busTypes: [],
    amenities: []
  });
  const [showFilters, setShowFilters] = useState(false);

  const allBusTypes = [...new Set(buses.map(bus => bus.busType))];
  const allAmenities = [...new Set(buses.flatMap(bus => bus.amenities))];

  const filteredBuses = buses.filter(bus => {
    const priceInRange = bus.price >= filterBy.priceRange[0] && bus.price <= filterBy.priceRange[1];
    const busTypeMatch = filterBy.busTypes.length === 0 || filterBy.busTypes.includes(bus.busType);
    const amenitiesMatch = filterBy.amenities.length === 0 || 
      filterBy.amenities.every(amenity => bus.amenities.includes(amenity));
    
    return priceInRange && busTypeMatch && amenitiesMatch;
  });

  const sortedBuses = [...filteredBuses].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'duration':
        return parseInt(a.duration) - parseInt(b.duration);
      case 'rating':
        return b.rating - a.rating;
      case 'departure':
        return a.departureTime.localeCompare(b.departureTime);
      default:
        return 0;
    }
  });

  const toggleBusType = (busType: string) => {
    setFilterBy(prev => ({
      ...prev,
      busTypes: prev.busTypes.includes(busType)
        ? prev.busTypes.filter(type => type !== busType)
        : [...prev.busTypes, busType]
    }));
  };

  const toggleAmenity = (amenity: string) => {
    setFilterBy(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Summary */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {searchCriteria.from} → {searchCriteria.to}
        </h2>
        <p className="text-gray-600">
          {new Date(searchCriteria.date).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })} • {sortedBuses.length} buses available
        </p>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
            </button>

            <div className="flex items-center space-x-2">
              <ArrowUpDown className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="price">Price (Low to High)</option>
                <option value="duration">Duration</option>
                <option value="rating">Rating</option>
                <option value="departure">Departure Time</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Showing {sortedBuses.length} of {buses.length} buses
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    step="100"
                    value={filterBy.priceRange[1]}
                    onChange={(e) => setFilterBy(prev => ({
                      ...prev,
                      priceRange: [0, parseInt(e.target.value)]
                    }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹0</span>
                    <span>₹{filterBy.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Bus Types */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Bus Type</h3>
                <div className="space-y-2">
                  {allBusTypes.map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filterBy.busTypes.includes(type)}
                        onChange={() => toggleBusType(type)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Amenities</h3>
                <div className="space-y-2">
                  {allAmenities.slice(0, 6).map(amenity => (
                    <label key={amenity} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filterBy.amenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bus List */}
      <div className="space-y-4">
        {sortedBuses.length === 0 ? (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No buses found</h3>
            <p className="text-gray-600">Try adjusting your filters or search criteria</p>
          </div>
        ) : (
          sortedBuses.map(bus => (
            <BusCard key={bus.id} bus={bus} onSelect={onSelectBus} />
          ))
        )}
      </div>
    </div>
  );
};

export default BusList;