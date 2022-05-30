import Header from "~/components/Header";
import HeroesNavList from "~/components/HeroesNavList";

// TODO: we need to type our data somehow
export default function HeroesPage() {
  // TODO: Where is the data?

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header />

      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          {/* TODO: somehow we need to add a new hero */}
          <div className="block p-4 text-xl text-blue-500">+ Add Hero</div>

          <hr />
          {/* TODO: When we have data we need to render it, right? */}
          <HeroesNavList heroes={[]} />
        </div>

        <div className="flex-1 p-6">
          {/* TODO: We need to render our nested routes somehow 🤔 */}
        </div>
      </main>
    </div>
  );
}
