import { db } from "@/lib/db"
import { Hotel } from "@/lib/types"


export const hotelsActions = {
	baseKey: 'hotels',
	getHotels: async (userId: string): Promise<Hotel[]> => {
		console.log('GetHotels called with userId:', userId); // Debug input

		if (!userId) {
			console.error('No userId provided');
			return [];
		}
		try {
			const hotels = await db.hotel.findMany({
				where: {
					userId: userId
				},
				include: {
					user: {
						select: {
							id: true,
							name: true,
							email: true
						}
					}
				},
				orderBy: {
					createdAt: 'desc'
				}
			})

			console.log('Found hotels:', hotels); // Debug output
			return hotels
		} catch (error) {
			console.error('Error fetching hotels:', error); // Debug errors
			return [];
		}
	},

	getHotel: async (hotelId: string) => {
		if (!hotelId) {
			throw new Error("Hotel ID is required")
		}
		try {
			const hotel = await db.hotel.findUnique({
				where: {
					index: hotelId
				}
			})

			return hotel
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to fetch hotel: ${error.message}`)
			}
			throw new Error('Failed to fetch hotel')
		}
	},
	
}