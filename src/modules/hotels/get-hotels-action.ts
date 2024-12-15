'use server'

import { db } from "@/lib/db";
import { Hotel } from "@/lib/types";

export async function getHotelsAction(userId: string): Promise<Hotel[]> {
  if (!userId) {
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
    });

    return hotels;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return [];
  }
}
