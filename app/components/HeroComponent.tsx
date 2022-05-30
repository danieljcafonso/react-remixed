import type { Hero } from "@prisma/client";

export default function HeroComponent({ hero }: { hero: Hero }) {
  return (
    <>
      <h3 className="text-2xl font-bold">{hero.name}</h3>
      <p className="pt-6">{`Secret Identity: ${hero.secretIdentity}`}</p>
      <p className="pb-6">{`Weakness: ${hero.weakness}`}</p>
      <hr className="my-4" />
    </>
  );
}
