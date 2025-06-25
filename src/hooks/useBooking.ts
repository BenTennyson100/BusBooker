import { useState } from 'react';
import { Bus, Seat, Passenger, Booking } from '../types/bus';

export const useBooking = () => {
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [currentStep, setCurrentStep] = useState<'search' | 'select' | 'details' | 'payment' | 'confirmation'>('search');
  const [searchCriteria, setSearchCriteria] = useState({
    from: '',
    to: '',
    date: ''
  });

  const selectBus = (bus: Bus) => {
    setSelectedBus(bus);
    setCurrentStep('select');
  };

  const selectSeat = (seat: Seat) => {
    if (seat.status === 'booked') return;
    
    const isSelected = selectedSeats.some(s => s.id === seat.id);
    
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      if (selectedSeats.length < 6) { // Max 6 seats
        setSelectedSeats([...selectedSeats, { ...seat, status: 'selected' }]);
      }
    }
  };

  const proceedToDetails = () => {
    if (selectedSeats.length > 0) {
      setCurrentStep('details');
      // Initialize passengers array
      const initialPassengers = selectedSeats.map(seat => ({
        name: '',
        age: 0,
        gender: 'male' as const,
        seatNumber: seat.number
      }));
      setPassengers(initialPassengers);
    }
  };

  const updatePassenger = (index: number, passenger: Passenger) => {
    const updated = [...passengers];
    updated[index] = passenger;
    setPassengers(updated);
  };

  const proceedToPayment = () => {
    setCurrentStep('payment');
  };

  const confirmBooking = (contactDetails: { email: string; phone: string }) => {
    const booking: Booking = {
      id: Date.now().toString(),
      busId: selectedBus?.id || '',
      passengers,
      totalAmount: selectedSeats.reduce((sum, seat) => sum + seat.price, 0),
      contactDetails,
      journeyDate: searchCriteria.date,
      status: 'confirmed'
    };
    
    setCurrentStep('confirmation');
    return booking;
  };

  const resetBooking = () => {
    setSelectedBus(null);
    setSelectedSeats([]);
    setPassengers([]);
    setCurrentStep('search');
  };

  return {
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
    proceedToPayment,
    confirmBooking,
    resetBooking
  };
};