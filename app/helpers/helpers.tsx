import { json } from "@remix-run/node";
import type { ActionData } from "~/components/HeroCreator";

const validateIfEmpty = (value: string) =>
  value.length === 0 ? "This field is required" : undefined;

export const badRequest = (data: ActionData) => json(data, { status: 400 });

export const areFieldsEmpty = (fields: {
  name: FormDataEntryValue | null;
  secretIdentity: FormDataEntryValue | null;
  weakness: FormDataEntryValue | null;
}) =>
  typeof fields.name !== "string" ||
  typeof fields.secretIdentity !== "string" ||
  typeof fields.weakness !== "string";

export const validateFormErrors = (fields: {
  name: FormDataEntryValue | null;
  secretIdentity: FormDataEntryValue | null;
  weakness: FormDataEntryValue | null;
}) => {
  const errors = {
    name: validateIfEmpty(fields.name as string),
    secretIdentity: validateIfEmpty(fields.secretIdentity as string),
    weakness: validateIfEmpty(fields.weakness as string),
  };

  return errors;
};
