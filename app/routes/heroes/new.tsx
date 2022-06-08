import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import * as React from "react";
import HeroCreator from "~/components/HeroCreator";

import { createHero } from "~/models/hero.server";
import { requireUserId } from "~/session.server";

type ActionData = {
  formError?: string;
  errors?: {
    name?: string;
    secretIdentity?: string;
    weakness?: string;
  };
  fields?: {
    name: any;
    secretIdentity: any;
    weakness: any;
  };
};

const validateIfEmpty = (value: string) =>
  value.length === 0 ? "This field is required" : undefined;

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const name = formData.get("name");
  const secretIdentity = formData.get("secretIdentity");
  const weakness = formData.get("weakness");
  const fields = { name, secretIdentity, weakness };

  if (
    typeof name !== "string" ||
    typeof secretIdentity !== "string" ||
    typeof weakness !== "string"
  ) {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const errors = {
    name: validateIfEmpty(name),
    secretIdentity: validateIfEmpty(secretIdentity),
    weakness: validateIfEmpty(weakness),
  };

  if (Object.values(errors).some(Boolean)) {
    return badRequest({ errors, fields });
  }

  const hero = await createHero({
    name: name as string,
    secretIdentity: secretIdentity as string,
    userId,
    weakness: weakness as string,
  });

  return redirect(`/heroes/${hero.id}`);
};

export default function NewHeroPage() {
  const actionData = useActionData() as ActionData;

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <HeroCreator actionData={actionData} />
    </Form>
  );
}
