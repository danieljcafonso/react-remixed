import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import * as React from "react";

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
  const nameRef = React.useRef<HTMLInputElement>(null);
  const secretIdentityRef = React.useRef<HTMLInputElement>(null);
  const weaknessRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.name) {
      nameRef.current?.focus();
    } else if (actionData?.errors?.secretIdentity) {
      secretIdentityRef.current?.focus();
    } else if (actionData?.errors?.weakness) {
      weaknessRef.current?.focus();
    }
  }, [actionData]);

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
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Name: </span>
          <input
            ref={nameRef}
            name="name"
            defaultValue={actionData?.fields?.name}
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={actionData?.errors?.name ? true : undefined}
            aria-errormessage={
              actionData?.errors?.name ? "name-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.name && (
          <div className="pt-1 text-red-700" id="name-error">
            {actionData.errors.name}
          </div>
        )}
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Secret Identity: </span>
          <input
            ref={secretIdentityRef}
            name="secretIdentity"
            defaultValue={actionData?.fields?.secretIdentity}
            className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"
            aria-invalid={actionData?.errors?.secretIdentity ? true : undefined}
            aria-errormessage={
              actionData?.errors?.secretIdentity
                ? "secretIdentity-error"
                : undefined
            }
          />
        </label>
        {actionData?.errors?.secretIdentity && (
          <div className="pt-1 text-red-700" id="secretIdentity-error">
            {actionData.errors.secretIdentity}
          </div>
        )}
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Weakness: </span>
          <textarea
            ref={weaknessRef}
            name="weakness"
            rows={8}
            className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"
            aria-invalid={actionData?.errors?.weakness ? true : undefined}
            aria-errormessage={
              actionData?.errors?.weakness ? "weakness-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.weakness && (
          <div className="pt-1 text-red-700" id="weakness-error">
            {actionData.errors.weakness}
          </div>
        )}
      </div>

      <div className="text-right">
        {actionData?.formError ? (
          <p className="pt-1 text-red-700" role="alert">
            {actionData.formError}
          </p>
        ) : null}
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>
  );
}
