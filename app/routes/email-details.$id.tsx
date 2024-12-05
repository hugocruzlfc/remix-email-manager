import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Email Details" },
    { name: "description", content: "Email Details" },
  ];
};

export default function EmailDetailsPage() {
  return <div>Hio</div>;
}
