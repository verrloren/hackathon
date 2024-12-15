'use server'

import { auth } from "../../../auth"

export async function getAuthSession() {
  try {
    const session = await auth()
    return {
      userId: session?.user?.id ?? '',
      user: session?.user ?? null,
      isAuthenticated: !!session?.user
    }
  } catch (error) {
    console.error('Auth error:', error)
    return {
      userId: '',
      user: null,
      isAuthenticated: false
    }
  }
}
