"use client";
import { useRouter } from "next/navigation";

const cards = [
  {
    title: "Calculator App",
    route: "/calculator",
  },
  {
    title: "StarRating App",
    route: "/star-rating",
  },
  {
    title: "Memory Game",
    route: "/memory-game",
  },
  {
    title: "Bar Chart",
    route: "/bar-chart",
  },
  {
    title: "Tic Toc Toe",
    route: "/tac-toc-toe",
  },
];

export default function Home() {
  const router = useRouter();

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-10 gap-8">
      <h1 className="text-4xl font-semibold font-serif">
        FRONTEND MACHINE CODING PROJECTS
      </h1>
      <div className="flex gap-12 flex-wrap">
        {cards.map((card, index) => (
          <div
            key={index}
            className="card bg-neutral text-neutral-content w-60 mb-4"
          >
            <div className="card-body items-center text-center">
              <h2 className="card-title">{card.title}</h2>
              <div className="card-actions justify-end mt-2">
                <button
                  className="btn btn-sm btn-outline btn-primary"
                  onClick={() => handleNavigate(card.route)}
                >
                  Visit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
