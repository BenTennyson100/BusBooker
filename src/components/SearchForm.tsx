import React, { useState } from 'react';
import { Search, ArrowLeftRight, Calendar, MapPin } from 'lucide-react';
import { indianCities, popularRoutes } from '../data/cities';

interface SearchFormProps {
  onSearch: (criteria: { from: string; to: string; date: string }) => void;
  searchCriteria: { from: string; to: string; date: string };
  setSearchCriteria: (criteria: { from: string; to: string; date: string }) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, searchCriteria, setSearchCriteria }) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { [key: string]: string } = {};
    
    if (!searchCriteria.from.trim()) {
      newErrors.from = 'Please select departure city';
    }
    if (!searchCriteria.to.trim()) {
      newErrors.to = 'Please select destination city';
    }
    if (!searchCriteria.date) {
      newErrors.date = 'Please select travel date';
    }
    if (searchCriteria.from === searchCriteria.to) {
      newErrors.to = 'Destination must be different from departure';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSearch(searchCriteria);
    }
  };

  const swapCities = () => {
    setSearchCriteria({
      ...searchCriteria,
      from: searchCriteria.to,
      to: searchCriteria.from
    });
  };

  const selectRoute = (route: { from: string; to: string }) => {
    setSearchCriteria({
      ...searchCriteria,
      from: route.from,
      to: route.to
    });
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 mx-4 lg:mx-0 -mt-20 relative z-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* From */}
          <div className="md:col-span-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              From
            </label>
            <div className="relative">
              <input
                list="from-cities"
                type="text"
                value={searchCriteria.from}
                onChange={(e) => setSearchCriteria({ ...searchCriteria, from: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${
                  errors.from ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
                placeholder="Departure city"
              />
              <datalist id="from-cities">
                {indianCities.map(city => (
                  <option key={city} value={city} />
                ))}
              </datalist>
            </div>
            {errors.from && <p className="text-red-500 text-xs mt-1">{errors.from}</p>}
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center">
            <button
              type="button"
              onClick={swapCities}
              className="p-2 rounded-full border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 transition-all group"
            >
              <ArrowLeftRight className="h-5 w-5 text-gray-600 group-hover:text-red-600 transition-colors" />
            </button>
          </div>

          {/* To */}
          <div className="md:col-span-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              To
            </label>
            <div className="relative">
              <input
                list="to-cities"
                type="text"
                value={searchCriteria.to}
                onChange={(e) => setSearchCriteria({ ...searchCriteria, to: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${
                  errors.to ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
                placeholder="Destination city"
              />
              <datalist id="to-cities">
                {indianCities.map(city => (
                  <option key={city} value={city} />
                ))}
              </datalist>
            </div>
            {errors.to && <p className="text-red-500 text-xs mt-1">{errors.to}</p>}
          </div>

          {/* Date */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Date
            </label>
            <input
              type="date"
              value={searchCriteria.date}
              min={minDate}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, date: e.target.value })}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${
                errors.date ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`}
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>

          {/* Search Button */}
          <div className="md:col-span-1">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-red-600 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </form>

      {/* Popular Routes */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Popular Routes</h3>
        <div className="flex flex-wrap gap-2">
          {popularRoutes.slice(0, 8).map((route, index) => (
            <button
              key={index}
              onClick={() => selectRoute(route)}
              className="px-4 py-2 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-full text-sm transition-all border hover:border-red-200"
            >
              {route.from} → {route.to}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchForm;