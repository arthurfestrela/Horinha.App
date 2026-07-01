import { prisma } from "../lib/prisma";

export async function syncUserService(
  clerkUserId: string,
  data: { email: string; name?: string }
) {
  return prisma.user.upsert({
    where: { clerkUserId },
    update: {
      email: data.email,
      name: data.name,
    },
    create: {
      clerkUserId,
      email: data.email,
      name: data.name,
    },
  });
}