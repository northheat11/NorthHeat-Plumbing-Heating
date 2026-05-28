export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  image: string;
  features: string[];
  pricing: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  service: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'boilers' | 'bathrooms' | 'emergencies';
}

export interface Project {
  id: string;
  title: string;
  category: 'boiler' | 'bathroom' | 'plumbing';
  image: string;
  description: string;
  location: string;
  completionDate: string;
}

export interface QuoteFormData {
  propertyType: string;
  bathrooms: string;
  boilerLocation: string;
  fuelType: string;
  name: string;
  email: string;
  phone: string;
}

export interface BookingRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  description: string;
  urgency: 'routine' | 'urgent' | 'emergency';
  requestedDate: string;
  status: 'pending' | 'confirmed';
}
