import React, { useState, useEffect } from 'react';
import { Bus, Seat } from '../types/bus';
import { generateSeatLayout } from '../data/buses';
import { ArrowLeft, Users, Car } from 'lucide-react';

interface SeatSelectionProps {
  bus: Bus;
  onBack: () => void;
  onProceed: () => void;
  selectedSeats: Seat[];
  onSeatSelect: (seat: Seat) => void;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({
  bus,
  onBack,
  onProceed,
  selectedSeats,
  onSeatSelect
}) => {
  const [seatLayout, setSeatLayout] = useState<Seat[]>([]);

  useEffect(() => {
    setSeatLayout(generateSeatLayout(bus.id));
  }, [bus.id]);

  const getSeatColor = (seat: Seat) => {
    const isSelected = selectedSeats.some(s => s.id === seat.id);
    if (isSelected) return 'bg-red-600 text-white border-red-600';
    if (seat.status === 'booked') return 'bg-gray-400 text-white cursor-not-allowed';
    return 'bg-white text-gray-700 border-gray-300 hover:border-red-500 hover:bg-red-50';
  };

  const lowerDeckSeats = seatLayout.filter(seat => seat.level === 'lower');
  const upperDeckSeats = seatLayout.filter(seat => seat.level === 'upper');

  const renderSeatGrid = (seats: Seat[], title: string) => {
    const rows = [];
    for (let i = 0; i < seats.length; i += 4) {
      rows.push(seats.slice(i, i + 4));
    }

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Car className="h-4 w-4 mr-2" />
          {title}
        </h3>
        <div className="space-y-2">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center space-x-2">
              {row.map((seat, seatIndex) => (
                <React.Fragment key={seat.id}>
                  <button
                    onClick={() => onSeatSelect(seat)}
                    disabled={seat.status === 'booked'}
                    className={`w-10 h-10 border-2 rounded-md text-xs font-semibold transition-all ${getSeatColor(seat)}`}
                    title={`Seat ${seat.number} - ${seat.type} - ₹${seat.price}`}
                  >
                    {seat.number}
                  </button>
                  {seatIndex === 1 && <div className="w-4" />} {/* Aisle gap */}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-red-600 hover:text-red-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to bus list</span>
        </button>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{bus.operator}</h2>
          <p className="text-gray-600 mb-4">{bus.busType}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Departure:</span>
              <p className="font-semibold">{bus.departureTime} - {bus.route.from}</p>
            </div>
            <div>
              <span className="text-gray-600">Arrival:</span>
              <p className="font-semibold">{bus.arrivalTime} - {bus.route.to}</p>
            </div>
            <div>
              <span className="text-gray-600">Duration:</span>
              <p className="font-semibold">{bus.duration}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seat Layout */}
        <div className="lg:col-span-2 space-y-6">
          {renderSeatGrid(lowerDeckSeats, 'Lower Deck')}
          {upperDeckSeats.length > 0 && renderSeatGrid(upperDeckSeats, 'Upper Deck')}
          
          {/* Legend */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Seat Legend</h3>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-600 border-2 border-red-600 rounded"></div>
                <span>Selected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-400 border-2 border-gray-400 rounded"></div>
                <span>Booked</span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Selected Seats ({selectedSeats.length})
            </h3>
            
            {selectedSeats.length === 0 ? (
              <p className="text-gray-600 text-sm">Please select seats to continue</p>
            ) : (
              <div className="space-y-3 mb-6">
                {selectedSeats.map(seat => (
                  <div key={seat.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">Seat {seat.number}</span>
                    <span className="text-sm text-gray-600">₹{seat.price}</span>
                  </div>
                ))}
              </div>
            )}
            
            {selectedSeats.length > 0 && (
              <>
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Amount:</span>
                    <span className="text-xl font-bold text-red-600">₹{totalAmount}</span>
                  </div>
                </div>
                
                <button
                  onClick={onProceed}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Proceed to Passenger Details
                </button>
              </>
            )}
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                💡 You can select up to 6 seats. Window seats are marked with 'W' and are usually preferred.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;