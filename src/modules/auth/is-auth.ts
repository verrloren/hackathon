import { User } from "@prisma/client"
import { auth } from "../../../auth"

interface IsAuthReturn {
  userId: string
  user: User | null
  isAuthenticated: boolean
}

export async function isAuth(): Promise<IsAuthReturn> {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return {
        userId: '',
        user: null,
        isAuthenticated: false
      };
    }

    return {
      userId,
      user: session.user as User,
      isAuthenticated: true
    };
  } catch (error) {
    console.error('Auth error:', error);
    return {
      userId: '',
      user: null,
      isAuthenticated: false
    };
  }
}