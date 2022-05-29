import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { Hero } from "~/models/hero.server";
import { getHeroById } from "~/models/hero.server";
import { requireUserId } from "~/session.server";

type LoaderData = {
  hero: Hero;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.heroId, "heroId not found");

  const hero = await getHeroById({ userId, id: params.heroId });
  if (!hero) {
    throw new Response("Not Found", { status: 404 });
  }

  return json<LoaderData>({ hero });
};

export default function HeroDetailsPage() {
  const data = useLoaderData() as LoaderData;
  return (
    <div>
      <h3 className="text-2xl font-bold">{data.hero.name}</h3>
      <p className="py-6">{data.hero.secretIdentity}</p>
      <hr className="my-4" />
    </div>
  );
}
