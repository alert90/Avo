// src/components/booking/BookingForm.tsx
import { useState, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/utils/api';

interface BookingFormProps {
  serviceId: number;
  serviceType: 'hotel' | 'tour' | 'space' | 'car' | 'event' | 'boat' | 'flight';
}

interface BookingData {
  service_id: number;
  service_type: string;
  start_date: string;
  end_date?: string;
  adults?: number;
  children?: number;
  person_types?: Array<{
    name: string;
    desc: string;
    min: string;
    max: string;
    price: string;
    display_price: string;
    number: string;
  }>;
  extra_price?: Array<{
    name: string;
    price: string;
    type: string;
    number: number;
    enable: boolean | string;
    price_html: string;
    price_type: string;
  }>;
  hour?: string;
  day?: string;
  start_time?: string;
}

export default function BookingForm({ serviceId, serviceType }: BookingFormProps) {
  const { token } = useAuth();
  const [bookingData, setBookingData] = useState<BookingData>({
    service_id: serviceId,
    service_type: serviceType,
    start_date: '',
    adults: 1,
    children: 0,
    extra_price: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError('You must be logged in to book');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.post<{ url: string; booking_code: string; status: number }>(
        '/api/booking/addToCart',
        bookingData,
        token
      );
      
      if (response.data?.status === 1 && response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields with proper TypeScript typing */}
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Book Now'}
      </button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
}