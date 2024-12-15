export interface Hotel {
	hotel_id: string;
	hotel_name: string;
	room_name: string;
	price: number;
	meal?: string;
	yandex_name	: string;
	yandex_price?:	number;
	price_diff?:	number;
	percentage_price_diff?:	number;
	checkin?:	string;
	checkout?:	string;
}

export interface Notification {
	id: string;
	message: string;
	type: 'success' | 'error' | 'info';
	}
	