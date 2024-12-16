import { db } from "@/lib/db"
import { Hotel } from "@/lib/types"

export const hotelsService = {
  queryKeys: {
    all: ['hotels'] as const,
    list: (userId: string) => [...hotelsService.queryKeys.all, userId] as const,
  },

  getHotels: async (userId: string): Promise<Hotel[]> => {
    if (!userId) return [];
    
    return db.hotel.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
