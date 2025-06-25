import React, { useState } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import BusList from './components/BusList';
import SeatSelection from './components/SeatSelection';
import BookingForm from './components/BookingForm';
import BookingConfirmation from './components/BookingConfirmation';
import Footer from './components/Footer';
import { useBooking } from './hooks/useBooking';
import { useAuth } from './hooks/useAuth';
import { buses } from './data/buses';
import { Booking } from './types/bus';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const { isLoading } = useAuth();
  
  const {
    selectedBus,
    selectedSeats,
    passengers,
    currentStep,
    searchCriteria,
    setSearchCriteria,
    selectBus,
    selectSeat,
    proceedToDetails,
    updatePassenger,
    confirmBooking,
    resetBooking
  } = useBooking();

  const handleSearch = (criteria: { from: string; to: string; date: string }) => {
    setSearchCriteria(criteria);
  };

  const handleConfirmBooking = (contactDetails: { email: string; phone: string }) => {
    const booking = confirmBooking(contactDetails);
    setConfirmedBooking(booking);
  };

  const handleNewBooking = () => {
    setConfirmedBooking(null);
    resetBooking();
  };

  // Filter buses based on search criteria
  const filteredBuses = buses.filter(bus => {
    if (!searchCriteria.from || !searchCriteria.to) return false;
    return bus.route.from.toLowerCase().includes(searchCriteria.from.toLowerCase()) &&
           bus.route.to.toLowerCase().includes(searchCriteria.to.toLowerCase());
  });

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      );
    }

    if (confirmedBooking && selectedBus) {
      return (
        <BookingConfirmation
          booking={confirmedBooking}
          bus={selectedBus}
          onNewBooking={handleNewBooking}
        />
      );
    }

    switch (currentStep) {
      case 'search':
        return (
          <>
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-red-600 via-red-500 to-orange-500 text-white py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Book Your Bus Journey
                </h1>
                <p className="text-xl md:text-2xl text-red-100 mb-8">
                  Safe, comfortable, and affordable bus tickets across India
                </p>
                <div className="flex justify-center items-center space-x-8 text-red-100">
                  <div className="text-center">
                    <div className="text-2xl font-bold">1000+</div>
                    <div className="text-sm">Routes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm">Operators</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm">Support</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto relative">
              <SearchForm
                onSearch={handleSearch}
                searchCriteria={searchCriteria}
                setSearchCriteria={setSearchCriteria}
              />
            </div>

            {searchCriteria.from && searchCriteria.to && searchCriteria.date && (
              <BusList
                buses={filteredBuses}
                onSelectBus={selectBus}
                searchCriteria={searchCriteria}
              />
            )}
          </>
        );

      case 'select':
        return selectedBus ? (
          <SeatSelection
            bus={selectedBus}
            onBack={resetBooking}
            onProceed={proceedToDetails}
            selectedSeats={selectedSeats}
            onSeatSelect={selectSeat}
          />
        ) : null;

      case 'details':
      case 'payment':
        return (
          <BookingForm
            passengers={passengers}
            onPassengerUpdate={updatePassenger}
            onBack={() => selectBus(selectedBus!)}
            onConfirm={handleConfirmBooking}
            totalAmount={selectedSeats.reduce((sum, seat) => sum + seat.price, 0)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
      <main className="min-h-screen">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;