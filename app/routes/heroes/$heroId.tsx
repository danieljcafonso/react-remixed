import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { deleteHero, Hero } from "~/models/hero.server";
import { getHeroById } from "~/models/hero.server";
import { requireUserId } from "~/session.server";

type LoaderData = {
  hero: Hero;
};

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);

  invariant(params.heroId, "heroId not found");

  await deleteHero({ userId, id: params.heroId });

  return redirect("/heroes");

}

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
      <p className="pt-6">{`Secret Identity: ${data.hero.secretIdentity}`}</p>
      <p className="pb-6">{`Weakness: ${data.hero.weakness}`}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Hero not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

