import React from 'react';
import { Booking, Bus } from '../types/bus';
import { CheckCircle, Download, Mail, Calendar, Clock, Users, MapPin } from 'lucide-react';

interface BookingConfirmationProps {
  booking: Booking;
  bus: Bus;
  onNewBooking: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  booking,
  bus,
  onNewBooking
}) => {
  const handleDownloadTicket = () => {
    // In a real app, this would generate and download a PDF ticket
    alert('Ticket download would start in a real application');
  };

  const handleEmailTicket = () => {
    // In a real app, this would send the ticket via email
    alert('Ticket would be sent to your email in a real application');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600">Your ticket has been booked successfully</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden mb-8">
        {/* Ticket Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold mb-1">BusBooker</h2>
              <p className="text-red-100">Booking ID: {booking.id}</p>
            </div>
            <div className="text-right">
              <p className="text-red-100">Status</p>
              <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                CONFIRMED
              </span>
            </div>
          </div>
        </div>

        {/* Journey Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Journey Details
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">From:</span>
                  <span className="font-medium">{bus.route.from}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">To:</span>
                  <span className="font-medium">{bus.route.to}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{new Date(booking.journeyDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Departure:</span>
                  <span className="font-medium">{bus.departureTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Arrival:</span>
                  <span className="font-medium">{bus.arrivalTime}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Bus Details
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Operator:</span>
                  <span className="font-medium">{bus.operator}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bus Type:</span>
                  <span className="font-medium">{bus.busType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{bus.duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Passengers */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Passenger Details</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Name</th>
                    <th className="text-left py-2">Age</th>
                    <th className="text-left py-2">Gender</th>
                    <th className="text-left py-2">Seat</th>
                  </tr>
                </thead>
                <tbody>
                  {booking.passengers.map((passenger, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 font-medium">{passenger.name}</td>
                      <td className="py-2">{passenger.age}</td>
                      <td className="py-2 capitalize">{passenger.gender}</td>
                      <td className="py-2">{passenger.seatNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Contact Details */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{booking.contactDetails.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">{booking.contactDetails.phone}</span>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Payment Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount Paid:</span>
                <span className="text-xl font-bold text-green-600">₹{booking.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Status:</span>
                <span className="text-green-600 font-semibold">Confirmed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleDownloadTicket}
          className="flex items-center justify-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
        >
          <Download className="h-4 w-4" />
          <span>Download Ticket</span>
        </button>
        
        <button
          onClick={handleEmailTicket}
          className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          <Mail className="h-4 w-4" />
          <span>Email Ticket</span>
        </button>
        
        <button
          onClick={onNewBooking}
          className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
        >
          <span>Book Another Ticket</span>
        </button>
      </div>

      {/* Important Notes */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-800 mb-2">Important Notes:</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Please carry a valid ID proof during your journey</li>
          <li>• Arrive at the boarding point at least 15 minutes before departure</li>
          <li>• Contact the operator for any queries or changes</li>
          <li>• Keep your ticket/booking confirmation handy</li>
        </ul>
      </div>
    </div>
  );
};

export default BookingConfirmation;