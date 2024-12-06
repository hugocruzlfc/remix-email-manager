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
  navigationState: string;
  fromRef: React.RefObject<HTMLFormElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  buttonSubmitStatus: boolean;
};

export default function FiltersForm({
  navigationState,
  inputRef,
  fromRef,
  buttonSubmitStatus,
}: FiltersFormProps) {
  return (
    <Form ref={fromRef} className="flex flex-wrap items-end gap-x-4 space-y-5">
      <div className="flex w-full items-center gap-2">
        <Input
          ref={inputRef}
          name="search"
          id="search"
          placeholder="Search by email From or To"
        />
      </div>

      <div className="flex w-full flex-col gap-8 md:flex-row">
        <Select name="tag">
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
        <Select name="status">
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
        <Select name="orderBy">
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
        <Select name="orderDir">
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
      <Button type="submit" className="w-full" disabled={buttonSubmitStatus}>
        <Search />
        {navigationState === "submitting" ? "Searching..." : "Search"}
      </Button>
    </Form>
  );
}
