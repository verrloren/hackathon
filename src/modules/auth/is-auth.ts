import { User } from "@prisma/client"
import { auth } from "../../../auth"
import { redirect } from "next/navigation"

interface IsAuthReturn {
  userId: string
  user: User | null
  isAuthenticated: boolean
}

export async function isAuth(): Promise<IsAuthReturn> {
  try {
    const session = await auth();
    console.log('Auth session:', session); // Debug session

    const userId = session?.user?.id;

    if (!userId) {
      console.log('No userId found in session'); // Debug auth failure
      redirect('/auth/login');
    }

    return {
      userId,
      user: session.user as User,
      isAuthenticated: true
    };
  } catch (error) {
    console.error('Auth error:', error); // Debug auth errors
    return {
      userId: '',
      user: null,
      isAuthenticated: false
    };
  }
}