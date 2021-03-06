import { Link } from "@remix-run/react";

export default function HeroIndexPage() {
  return (
    <p>
      No hero selected. Select a hero on the left, or{" "}
      <Link to="new" className="text-blue-500 underline">
        create a new hero.
      </Link>
    </p>
  );
}
