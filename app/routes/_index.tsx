import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Email Manager" },
    { name: "description", content: "Welcome to Email Manager App" },
  ];
};

export default function Index() {
  return <div className="flex h-screen items-center justify-center">hi</div>;
}
