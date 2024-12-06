import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tags } from "@prisma/client";
import { Form } from "@remix-run/react";
import { Search } from "lucide-react";

type FiltersFormProps = {
  searchParams: URLSearchParams;
  navigationState: string;
  fromRef: React.RefObject<HTMLFormElement>;
  inputRef: React.RefObject<HTMLInputElement>;
};

export default function FiltersForm({
  searchParams,
  navigationState,
  inputRef,
  fromRef,
}: FiltersFormProps) {
  return (
    <Form ref={fromRef} className="flex flex-wrap items-end gap-x-4 space-y-5">
      <div className="flex w-full items-center gap-2">
        <Input
          ref={inputRef}
          name="search"
          id="search"
          placeholder="Search by email From or To"
          defaultValue={searchParams.get("search") || ""}
        />
      </div>

      <div className="flex w-full gap-8">
        <Select name="tag" defaultValue={searchParams.get("tag") || ""}>
          <SelectTrigger>
            <SelectValue placeholder="Select tag" />
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
        <Select name="status" defaultValue={searchParams.get("status") || ""}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="true">Read</SelectItem>
              <SelectItem value="false">Unread</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select name="orderBy" defaultValue={searchParams.get("orderBy") || ""}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="subject">Subject</SelectItem>
              <SelectItem value="updatedAt">Updated</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          name="orderDir"
          defaultValue={searchParams.get("orderDir") || ""}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a direction" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">
        <Search />
        {navigationState === "submitting" ? "Searching..." : "Search"}
      </Button>
    </Form>
  );
}