import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Country-explorer" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <div> Home Page</div>;
}
