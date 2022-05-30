import type { Hero } from "@prisma/client";
import { NavLink } from "@remix-run/react";
import type { getHeroes } from "~/models/hero.server";

export default function HeroesNavList({
  heroes,
}: {
  heroes: Awaited<ReturnType<typeof getHeroes>>;
}) {
  return heroes.length === 0 ? (
    <p className="p-4"> No heroes exist yet</p>
  ) : (
    <ol>
      {heroes.map((hero) => (
        <li key={hero.id}>
          <NavLink
            className={({ isActive }) =>
              `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
            }
            to={hero.id}
          >
            {hero.name}
          </NavLink>
        </li>
      ))}
    </ol>
  );
}
