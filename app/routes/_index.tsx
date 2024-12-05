import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TypographyH3 } from "@/components/ui/typography";
import { Tags } from "@prisma/client";
import type { MetaFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Email Manager" },
    { name: "description", content: "Welcome to Email Manager App" },
  ];
};

export default function Index() {
  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent>
        <div className="space-y-5">
          <TypographyH3 title="Create a new pet" />
          <Form
            method="POST"
            className="grid gap-4"
            encType="multipart/form-data"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input name="name" id="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select name="type" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select Pet Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.keys(Tags).map((petType) => (
                      <SelectItem key={petType} value={petType}>
                        {petType}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthday">Birthday</Label>
              <Input name="birthday" id="birthday" type="date" required />
            </div>

            <div className="flex items-center justify-between">
              <Button type="submit">Add pet</Button>
              <Button asChild variant="link">
                <Link to="/">Cancel</Link>
              </Button>
            </div>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
