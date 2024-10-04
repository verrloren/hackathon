/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/lib/db";

export interface NotificationParams {
  id: string;
  message: string;
  createdAt?: Date | string | null;
}

export default async function getNotifications(params?: Partial<NotificationParams>): Promise<NotificationParams[]> {
  try {
    // Destructure the optional parameters
    const {
      id,
      message,
      createdAt,
    } = params || {};

    // Build the query object dynamically
    const query: any = {};

    if (id) query.id = id;
    if (message) query.message = message;
    if (createdAt) query.createdAt = createdAt;

    // Fetch notifications from the database with the query
    const notifications = await db.notification.findMany({
      where: query
    });

    return notifications;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch notifications");
  }
}