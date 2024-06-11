import Image from "next/image";
import companyLogoPlaceholder from "@/assets/company-logo-placeholder.png";
import Link from "next/link";
import { Jobs } from "@prisma/client";
import { MapPin, Globe, CalendarDays } from "lucide-react";
import { relativeDate, formatMoney } from "@/lib/utils";

interface CardInterface {
  job: Jobs;
}

export default function JobListCard({
  job: {
    title,
    companyName,
    salary,
    companyLogoUrl,
    locationType,
    location,
    type,
    createdAt,
  },
}: CardInterface) {
  return (
    <div className="m-5">
      <div className="group mx-2 mt-10 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto">
        <a
          href="#"
          className="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4"
        >
          <div className="group relative h-16 w-16 overflow-hidden rounded-lg">
            <Image
              width={100}
              height={100}
              src={companyLogoUrl || companyLogoPlaceholder}
              alt="company_logo"
              className="h-full w-full object-cover text-gray-700"
            />
          </div>
        </a>
        <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
          <h3 className="text-sm text-gray-600">{companyName}</h3>
          <Link
            href="#"
            className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl"
          >
            {title}
          </Link>
          <div className="flex flex-col gap-y-2">
            <p className="flex items-center gap-x-1 overflow-hidden pr-7 text-sm">
              <MapPin size={16} className="shrink-0" />
              {locationType}
            </p>

            <p className="flex items-center gap-x-1 overflow-hidden pr-7 text-sm">
              <Globe size={16} className="shrink-0" />
              {location || "Worldwide"}
            </p>

            <p className="flex items-center gap-x-1 overflow-hidden pr-7 text-sm">
              <CalendarDays size={16} className="shrink-0" />
              {relativeDate(createdAt)}
            </p>
          </div>

          <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
            <div>
              Type:
              <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                {type}
              </span>
            </div>
            <div>
              Salary:
              <span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">
                {formatMoney(salary)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
