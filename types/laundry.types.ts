export interface LaundryServicesOption {
  fullService: boolean;
  dropOff: boolean;
  pickup: boolean;
}

export interface Service {
  name: string;
  image: string;
  price: string;
}

export interface StoreHour {
  weekday: string;
  time: string;
}

export interface Laundry {
  id: string;
  name: string;
  rating: number;
  distance: string;
  description: string;
  price: string;
  turnaround: string;
  hours: string;
  image: string;
  location?: string;
  infoAlert?: string;
  services: Service[];
  storeHours: StoreHour[];
  serviceOptions: LaundryServicesOption; // ✅ added new object
}
