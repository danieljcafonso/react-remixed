import type { Hero, User } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Hero } from "@prisma/client";

export function getHeroById({
  id,
  userId,
}: Pick<Hero, "id"> & {
  userId: User["id"];
}) {
  return prisma.hero.findFirst({
    where: { id, userId },
  });
}

export async function createHero({
  name,
  secretIdentity,
  userId,
  weakness
}: Pick<Hero, "name" | "secretIdentity" | "weakness"> & {
  userId: User["id"];
}) {
  return prisma.hero.create({
    data: {
      name,
      secretIdentity,
      weakness,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function getHeroes({ userId }: { userId: User["id"] }) {
  return prisma.hero.findMany({
    where: { userId },
    select: { id: true, name: true, secretIdentity: true, weakness: true},
  });
}


export function deleteHero({
  id,
  userId,
}: Pick<Hero, "id"> & { userId: User["id"] }) {
  return prisma.hero.deleteMany({
    where: { id, userId },
  });
}