import React, { useState } from 'react';
import { Passenger } from '../types/bus';
import { ArrowLeft, User, Phone, Mail, CreditCard } from 'lucide-react';

interface BookingFormProps {
  passengers: Passenger[];
  onPassengerUpdate: (index: number, passenger: Passenger) => void;
  onBack: () => void;
  onConfirm: (contactDetails: { email: string; phone: string }) => void;
  totalAmount: number;
}

const BookingForm: React.FC<BookingFormProps> = ({
  passengers,
  onPassengerUpdate,
  onBack,
  onConfirm,
  totalAmount
}) => {
  const [contactDetails, setContactDetails] = useState({
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [currentStep, setCurrentStep] = useState<'details' | 'payment'>('details');

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validate passengers
    passengers.forEach((passenger, index) => {
      if (!passenger.name.trim()) {
        newErrors[`passenger-${index}-name`] = 'Name is required';
      }
      if (!passenger.age || passenger.age < 1 || passenger.age > 120) {
        newErrors[`passenger-${index}-age`] = 'Valid age is required';
      }
    });

    // Validate contact details
    if (!contactDetails.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(contactDetails.email)) {
      newErrors.email = 'Valid email is required';
    }

    if (!contactDetails.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(contactDetails.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Valid 10-digit phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToPayment = () => {
    if (validateForm()) {
      setCurrentStep('payment');
    }
  };

  const handleConfirmBooking = () => {
    onConfirm(contactDetails);
  };

  const renderPassengerDetails = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Passenger Details</h2>
      
      {passengers.map((passenger, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <User className="h-4 w-4 mr-2" />
            Passenger {index + 1} - Seat {passenger.seatNumber}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={passenger.name}
                onChange={(e) => onPassengerUpdate(index, { ...passenger, name: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                  errors[`passenger-${index}-name`] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter full name"
              />
              {errors[`passenger-${index}-name`] && (
                <p className="text-red-500 text-xs mt-1">{errors[`passenger-${index}-name`]}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age *
              </label>
              <input
                type="number"
                value={passenger.age || ''}
                onChange={(e) => onPassengerUpdate(index, { ...passenger, age: parseInt(e.target.value) || 0 })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                  errors[`passenger-${index}-age`] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter age"
                min="1"
                max="120"
              />
              {errors[`passenger-${index}-age`] && (
                <p className="text-red-500 text-xs mt-1">{errors[`passenger-${index}-age`]}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender *
              </label>
              <select
                value={passenger.gender}
                onChange={(e) => onPassengerUpdate(index, { ...passenger, gender: e.target.value as 'male' | 'female' | 'other' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>
      ))}

      {/* Contact Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Phone className="h-4 w-4 mr-2" />
          Contact Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              value={contactDetails.email}
              onChange={(e) => setContactDetails({ ...contactDetails, email: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter email address"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              value={contactDetails.phone}
              onChange={(e) => setContactDetails({ ...contactDetails, phone: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter phone number"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <CreditCard className="h-4 w-4 mr-2" />
          Payment Method
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 border-2 border-red-500 bg-red-50 rounded-lg">
            <div className="flex items-center">
              <input
                type="radio"
                id="card"
                name="payment"
                className="text-red-600 focus:ring-red-500"
                defaultChecked
              />
              <label htmlFor="card" className="ml-3 font-medium text-gray-900">
                Credit/Debit Card
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Enter cardholder name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="MM/YY"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="123"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-red-600 hover:text-red-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to seat selection</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {currentStep === 'details' ? renderPassengerDetails() : renderPayment()}
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
            <h3 className="font-semibold text-gray-900 mb-4">Booking Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-sm">Base Fare ({passengers.length} passenger{passengers.length > 1 ? 's' : ''})</span>
                <span className="text-sm">₹{totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Taxes & Fees</span>
                <span className="text-sm">₹0</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold">Total Amount</span>
                  <span className="text-xl font-bold text-red-600">₹{totalAmount}</span>
                </div>
              </div>
            </div>

            {currentStep === 'details' ? (
              <button
                onClick={handleProceedToPayment}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Proceed to Payment
              </button>
            ) : (
              <button
                onClick={handleConfirmBooking}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;