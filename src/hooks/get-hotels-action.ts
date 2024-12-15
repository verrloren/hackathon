/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '@/lib/db';

export async function getHotelsAction({ userId }: { userId: string }) {
  if (!userId) {
    throw new Error("User ID is required")
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

    return hotels
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch hotels: ${error.message}`)
    }
    throw new Error('Failed to fetch hotels')
  }
}