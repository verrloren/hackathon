export interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  password?: string | null;
  role?: 'ADMIN' | 'USER';
  hotels?: Hotel[];
}

export interface Hotel {
  index: string;
  hotel_id: string;
  hotel_name: string;
  room_name: string;
  price: number;
  meal: string | null;
  yandex_name: string | null;
  yandex_price: number | null;
  price_diff: number | null;
  percentage_price_diff: number | null;
  checkin: number | null;
  checkout: number | null;
  userId: string;
  user?: User;
  createdAt: Date;
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
