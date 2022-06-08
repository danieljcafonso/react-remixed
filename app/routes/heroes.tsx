import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import Header from "~/components/Header";
import HeroesNavList from "~/components/HeroesNavList";
import { getHeroes } from "~/models/hero.server";
import { requireUserId } from "~/session.server";

type LoaderData = {
  heroes: Awaited<ReturnType<typeof getHeroes>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const heroes = await getHeroes({ userId });
  return json<LoaderData>({ heroes });
};

export default function HeroesPage() {
  const data = useLoaderData() as LoaderData;
  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header />

      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + Add Hero
          </Link>

          <hr />
          <HeroesNavList heroes={data.heroes} />
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
