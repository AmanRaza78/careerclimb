import JobListCard from "@/components/job-list-card";
import JobResults from "@/components/job-results";
import SidebarFilter from "@/components/sidebar-filter";
import prisma from "@/lib/prisma";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";

interface HomePageProps {
  searchParams: {
    q?: string;
    jobtype?: string;
    joblocation?: string;
  };
}

export default async function Home({
  searchParams: { q, jobtype, joblocation },
}: HomePageProps) {

  const filterValues: JobFilterValues = {
    q,
    jobtype,
    joblocation
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-4xl font-bold tracking-tight">
        Developers Job
      </h1>
      <p className="text-muted-foreground text-center mt-2">
        Find your dream job with career climb
      </p>

      <div className="flex flex-col lg:flex-row lg:space-x-2">
        {/* Sidebar Filter */}
        <div className="lg:w-1/4 w-full mb-4 lg:mb-0 lg:mt-10">
          <SidebarFilter />
        </div>
        {/* Job List */}
        <JobResults filterValues={filterValues}/>
      </div>
    </div>
  );
}
