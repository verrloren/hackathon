/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/lib/db";

export interface HotelsParams {
	hotel_name: string;
  hotel_id: string;
  room_name: string;
  price: number;
  meal?: string | null;
  yandex_name: string | null;
  yandex_price?: number | null;
  price_diff?: number | null;
  percentage_price_diff?: number | null;
  checkin?: string | number | null;
  checkout?: string | number | null;
}

export default async function getHotels(params?: Partial<HotelsParams>): Promise<HotelsParams[]> {
  try {
    // Destructure the optional parameters
    const {
			hotel_name,
      hotel_id,
      room_name,
      price,
      meal,
      yandex_name,
      yandex_price,
      price_diff,
      percentage_price_diff,
      checkin,
      checkout
    } = params || {};

    // Build the query object dynamically
    const query: any = {};

    if (hotel_name) query.hotel_id = hotel_name;
    if (hotel_id) query.hotel_id = hotel_id;
    if (room_name) query.room_name = room_name;
    if (price) query.price = price;
    if (meal) query.meal = meal;
    if (yandex_name) query.yandex_name = yandex_name;
    if (yandex_price) query.yandex_price = yandex_price;
    if (price_diff) query.price_diff = price_diff;
    if (percentage_price_diff) query.percentage_price_diff = percentage_price_diff;
    if (checkin) query.checkin = checkin;
    if (checkout) query.checkout = checkout;

    // Fetch hotels from the database with the query
    const hotels = await db.hotel.findMany({
      where: query
    });

    return hotels;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch hotels");
  }
}
