export interface Facility {
  _id: string;
  facilityName: string;
  facilityType: string;
  imageUrl: string;
  location: string;
  pricePerHour: number;
  capacity: number;
  description: string;
  ownerEmail: string;
  availableTimeSlots?: string;
}

export interface Booking {
  _id: string;
  user_name: string;
  user_image?: string;
  user_id: string;
  user_email: string;
  facility_id: string;
  facility_name: string;
  facility_img: string;
  booking_date: string;
  time_slot: string;
  hours: number;
  total_price: number;
  status: string;
  des_name?: string;
}
