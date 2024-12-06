import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { TypographyH3 } from "@/components/ui/typography";
import { prisma } from "@/lib/prisma-client";
import { addEmailFormSchema } from "@/lib/schema-validation";
import { Tags } from "@prisma/client";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, redirect, useNavigation } from "@remix-run/react";
import { CirclePlus, Send } from "lucide-react";
import { useEffect, useRef } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Email Manager" },
    { name: "description", content: "Welcome to Email Manager App" },
  ];
};

export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);

  const { success, data } = addEmailFormSchema.safeParse(values);

  if (!success) {
    throw new Response("Not allowed", {
      status: 400,
    });
  }

  await prisma.email.create({
    data,
  });

  return redirect("/");
}

export default function Index() {
  const { state } = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state === "submitting") {
      formRef.current?.reset();
      inputRef.current?.focus();
    }
  }, [state]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TypographyH3 title="Create a new email" />
          <CirclePlus />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <Form
            ref={formRef}
            method="POST"
            className="grid gap-4"
            encType="multipart/form-data"
          >
            <div className="flex flex-row items-center justify-between gap-5">
              <div className="w-full space-y-2">
                <Label htmlFor="from">From</Label>
                <Input name="from" id="from" required ref={inputRef} />
              </div>
              <div className="w-full space-y-2">
                <Label htmlFor="to">To</Label>
                <Input name="to" id="to" required />
              </div>
            </div>
            <div className="flex flex-row items-center justify-between gap-5">
              <div className="w-full space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input name="subject" id="subject" required />
              </div>

              <div className="w-full space-y-2">
                <Label htmlFor="tag">Tag</Label>
                <Select name="tag" defaultValue={Tags.Important}>
                  <SelectTrigger>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.keys(Tags).map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-5">
              <Textarea
                placeholder="Type your message here."
                className="resize-none"
                name="body"
                rows={15}
                required
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">
                <Send />
                {state === "submitting" ? "Sending..." : "Send"}
              </Button>
            </div>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
