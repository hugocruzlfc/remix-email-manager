import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Admin Dashboard" },
    { name: "description", content: "Admin Dashboard" },
  ];
};
export default function AdminDashboardPage() {
  return <div>hola</div>;
}
