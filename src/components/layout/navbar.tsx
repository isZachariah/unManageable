import React, { useEffect, useState } from "react";
import Link from "next/link";
import Search from "../input/search";
import "@fontsource/yellowtail";
import { useRouter } from "next/router";

export const PAGES = [
  { title: "Daily Reflections", href: "/dailyreflections" },
  { title: "Big Book", href: "/bigbook" },
  { title: "As Bill Sees It", href: `/asbillseesit` },
  { title: "Prayers", href: "/prayers" },
  { title: "Steps", href: "/steps" },
  { title: "Traditions", href: "/traditions" }
];

function Navbar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const url = {
      pathname: router.pathname,
      query: {
        search: search
      }
    };
    router.push(url, undefined, { shallow: true })
      .then(ok => ok)
      .catch(e => console.error(e));
  }, [search]);

  return (
    <header
      className={"text-white flex-col align-middle m-auto bg-sky-900 w-screen h-48 border-b-4 border-black sticky top-0 z-50 lg:mb-12 md:mb-12 mb-2 lg:h-24 md:h-36"}>
      <nav>
        <ul
          className={"flex flex-row space-around m-auto text-black justify-center align-middle w-full items-center flex-wrap flex-basis flex-1"}>
          <h1
            className={"text-white lg:my-6 md:my-6 text-6xl my-2 m-auto text-center flex flex-col"}>
            <Link className={""} style={{ fontFamily: "Yellowtail" }} href={"/"}>unManageable</Link>
          </h1>
          <div className={"text-black m-auto align-middle space-around"}>
            <Search query={search} setQuery={setSearch} />
          </div>
          {
            PAGES.map(({ title, href }, index) => (
              <li key={index}>
                <Link
                  className={"text-white text-center align-middle items-center font-bold block text-l mx-8 hover:text-sky-300"}
                  href={href}
                >{title}</Link>
              </li>
            ))
          }
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;