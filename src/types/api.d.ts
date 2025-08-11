// src/types/api.d.ts
export interface ApiResponse<T> {
  status: number;
  data?: T;
  message?: string;
  error?: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar_id?: number;
  // Add other user fields from your API
}

export interface AuthResponse {
  status: number;
  access_token: string;
  token_type: string;
  expires_in: number;
  user?: User;
}

export interface Service {
  id: number;
  name: string;
  type: 'hotel' | 'tour' | 'space' | 'car' | 'event' | 'boat' | 'flight';
  price: number;
  review_score: number;
  // Add other service fields
}

export interface Booking {
  id: number;
  service_id: number;
  service_type: string;
  start_date: string;
  end_date: string;
  status: string;
  // Add other booking fields
}

export interface WishlistItem {
  id: number;
  object_id: number;
  object_model: string;
  service: Service;
}