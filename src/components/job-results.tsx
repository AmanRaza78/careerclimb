import prisma from "@/lib/prisma";
import JobListCard from "./job-list-card";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";

interface JobResultsProps {
  filterValues: JobFilterValues;
}

export default async function JobResults({
  filterValues: { q, jobtype, joblocation },
}: JobResultsProps) {
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const andConditions: Prisma.JobsWhereInput[] = [{ approved: true }];

  if (searchString) {
    andConditions.push({
      OR: [
        { title: { contains: searchString } },
        { companyName: { contains: searchString } },
        { location: { contains: searchString } },
        { locationType: { contains: searchString } },
        { type: { contains: searchString } },
      ],
    });
  }

  if (jobtype) {
    andConditions.push({ type: jobtype });
  }

  if (joblocation) {
    andConditions.push({ location: joblocation });
  }

  const whereClause: Prisma.JobsWhereInput = {
    approved: true,
    AND: andConditions,
  };

  const jobs = await prisma.jobs.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="lg:w-3/4 w-full lg:pl-4">
      {jobs.map((job) => (
        <JobListCard job={job} key={job.id} />
      ))}
    </div>
  );
}
