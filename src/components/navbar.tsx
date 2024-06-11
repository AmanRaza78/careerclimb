import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="flex border-b flex-wrap sm:justify-start sm:flex-nowrap w-full bg-background text-sm py-4 shadow-md">
      <nav
        className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <Link className="flex-none text-xl font-semibold" href="#">
          Career Climb
        </Link>
        <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
            <Button>Post Job</Button>
        </div>
      </nav>
    </header>
  );
}
