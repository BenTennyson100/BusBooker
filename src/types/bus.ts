export interface Bus {
  id: string;
  operator: string;
  busType: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  rating: number;
  amenities: string[];
  route: {
    from: string;
    to: string;
  };
}

export interface Seat {
  id: string;
  number: string;
  type: 'window' | 'aisle' | 'middle';
  level: 'lower' | 'upper';
  status: 'available' | 'booked' | 'selected';
  price: number;
}

export interface Passenger {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  seatNumber: string;
}

export interface Booking {
  id: string;
  busId: string;
  passengers: Passenger[];
  totalAmount: number;
  contactDetails: {
    email: string;
    phone: string;
  };
  journeyDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}