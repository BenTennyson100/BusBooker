import { Bus, Seat } from '../types/bus';

export const buses: Bus[] = [
  {
    id: '1',
    operator: 'SRM Travels',
    busType: 'AC Sleeper (2+1)',
    departureTime: '20:30',
    arrivalTime: '06:30',
    duration: '10h 00m',
    price: 1200,
    availableSeats: 15,
    totalSeats: 40,
    rating: 4.2,
    amenities: ['AC', 'WiFi', 'Blanket', 'Water Bottle', 'Charging Point'],
    route: {
      from: 'Bangalore',
      to: 'Chennai'
    }
  },
  {
    id: '2',
    operator: 'VRL Travels',
    busType: 'Multi-Axle AC Semi Sleeper (2+2)',
    departureTime: '22:15',
    arrivalTime: '07:45',
    duration: '9h 30m',
    price: 800,
    availableSeats: 8,
    totalSeats: 35,
    rating: 4.0,
    amenities: ['AC', 'Blanket', 'Water Bottle', 'Charging Point'],
    route: {
      from: 'Bangalore',
      to: 'Chennai'
    }
  },
  {
    id: '3',
    operator: 'Orange Travels',
    busType: 'Volvo Multi-Axle AC Sleeper (2+1)',
    departureTime: '21:00',
    arrivalTime: '06:00',
    duration: '9h 00m',
    price: 1500,
    availableSeats: 25,
    totalSeats: 40,
    rating: 4.5,
    amenities: ['AC', 'WiFi', 'Blanket', 'Water Bottle', 'Charging Point', 'Entertainment'],
    route: {
      from: 'Bangalore',
      to: 'Chennai'
    }
  },
  {
    id: '4',
    operator: 'KPN Travels',
    busType: 'AC Seater (2+2)',
    departureTime: '08:00',
    arrivalTime: '15:30',
    duration: '7h 30m',
    price: 600,
    availableSeats: 12,
    totalSeats: 45,
    rating: 3.8,
    amenities: ['AC', 'Water Bottle', 'Charging Point'],
    route: {
      from: 'Bangalore',
      to: 'Chennai'
    }
  },
  {
    id: '5',
    operator: 'RedBus Express',
    busType: 'Volvo AC Sleeper (2+1)',
    departureTime: '19:45',
    arrivalTime: '05:15',
    duration: '9h 30m',
    price: 1350,
    availableSeats: 18,
    totalSeats: 42,
    rating: 4.3,
    amenities: ['AC', 'WiFi', 'Blanket', 'Water Bottle', 'Charging Point', 'Reading Light'],
    route: {
      from: 'Mumbai',
      to: 'Pune'
    }
  },
  {
    id: '6',
    operator: 'Shatabdi Travels',
    busType: 'AC Semi Sleeper (2+2)',
    departureTime: '23:30',
    arrivalTime: '03:00',
    duration: '3h 30m',
    price: 450,
    availableSeats: 22,
    totalSeats: 40,
    rating: 4.1,
    amenities: ['AC', 'Water Bottle', 'Charging Point'],
    route: {
      from: 'Mumbai',
      to: 'Pune'
    }
  },
  {
    id: '7',
    operator: 'RSRTC',
    busType: 'Volvo AC Seater (2+2)',
    departureTime: '06:00',
    arrivalTime: '11:30',
    duration: '5h 30m',
    price: 750,
    availableSeats: 28,
    totalSeats: 49,
    rating: 4.0,
    amenities: ['AC', 'Water Bottle', 'Charging Point', 'GPS Tracking'],
    route: {
      from: 'Delhi',
      to: 'Jaipur'
    }
  },
  {
    id: '8',
    operator: 'Raj National Express',
    busType: 'AC Sleeper (2+1)',
    departureTime: '22:00',
    arrivalTime: '05:30',
    duration: '7h 30m',
    price: 950,
    availableSeats: 16,
    totalSeats: 36,
    rating: 4.2,
    amenities: ['AC', 'WiFi', 'Blanket', 'Water Bottle', 'Charging Point'],
    route: {
      from: 'Delhi',
      to: 'Jaipur'
    }
  },
  {
    id: '9',
    operator: 'Jabbar Travels',
    busType: 'Multi-Axle AC Sleeper (2+1)',
    departureTime: '21:30',
    arrivalTime: '07:00',
    duration: '9h 30m',
    price: 1100,
    availableSeats: 20,
    totalSeats: 41,
    rating: 4.4,
    amenities: ['AC', 'WiFi', 'Blanket', 'Water Bottle', 'Charging Point', 'Entertainment'],
    route: {
      from: 'Hyderabad',
      to: 'Bangalore'
    }
  },
  {
    id: '10',
    operator: 'Konduskar Travels',
    busType: 'AC Semi Sleeper (2+2)',
    departureTime: '20:00',
    arrivalTime: '06:30',
    duration: '10h 30m',
    price: 850,
    availableSeats: 14,
    totalSeats: 38,
    rating: 3.9,
    amenities: ['AC', 'Blanket', 'Water Bottle', 'Charging Point'],
    route: {
      from: 'Hyderabad',
      to: 'Bangalore'
    }
  }
];

export const generateSeatLayout = (busId: string): Seat[] => {
  const seats: Seat[] = [];
  const totalSeats = buses.find(bus => bus.id === busId)?.totalSeats || 40;
  
  for (let i = 1; i <= totalSeats; i++) {
    const seatNumber = i.toString().padStart(2, '0');
    const isBooked = Math.random() < 0.3; // 30% chance of being booked
    
    seats.push({
      id: `${busId}-${i}`,
      number: seatNumber,
      type: i % 4 === 1 || i % 4 === 0 ? 'window' : i % 4 === 2 ? 'aisle' : 'middle',
      level: i <= totalSeats / 2 ? 'lower' : 'upper',
      status: isBooked ? 'booked' : 'available',
      price: buses.find(bus => bus.id === busId)?.price || 1000
    });
  }
  
  return seats;
};