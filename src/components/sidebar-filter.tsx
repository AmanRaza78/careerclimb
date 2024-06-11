import { jobTypes } from "@/lib/job-types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import prisma from "@/lib/prisma";
import { Button } from "./ui/button";
import { jobfilterschema } from "@/lib/validation";
import { redirect } from "next/navigation";


async function filterJobs(formData:FormData){
    "use server"

    const values = Object.fromEntries(formData.entries())

    const {q,jobtype,joblocation} = jobfilterschema.parse(values)

    const searchParams = new URLSearchParams({
        ...(q && {q:q.trim()}),
        ...(jobtype && {jobtype}),
        ...(joblocation && {joblocation})
    }) 

    redirect(`/?${searchParams.toString()}`)
}

export default async function SidebarFilter() {
  const distinctJobLocations = (await prisma.jobs
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean)
    )) as string[];

  return (
    <Card className="sticky top-0 h-fit">
      <CardHeader>
        <CardTitle>Filter Jobs</CardTitle>
        <CardDescription>Refine your job search</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={filterJobs}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="q">Search</Label>
              <Input id="q" placeholder="Title, Company, etc.." name="q" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="job-type">Job Type</Label>

              <Select name="jobtype">
                <SelectTrigger id="job-type">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {jobTypes.map((type) => (
                    <SelectItem value={type} key={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="joblocation">Job Location</Label>

              <Select name="joblocation">
                <SelectTrigger id="joblocation">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {distinctJobLocations.map((location) => (
                    <SelectItem value={location} key={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button className="w-full mt-3" type="submit">Search</Button>

        </form>
      </CardContent>
    </Card>
  );
}
