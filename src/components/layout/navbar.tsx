import React, { useEffect, useState } from "react";
import Link from "next/link";
import Search from "../input/search";
import "@fontsource/yellowtail";
import {useRouter} from "next/router";

const linkStyles='border w-36 border-black shadow-2xl p-2 rounded-3xl bg-slate-800 text-white text-center align-middle items-center font-bold block text-sm mx-2'
const betterLinkStyles='text-white text-center align-middle items-center font-bold block text-l mx-8 hover:text-sky-300'
export const PAGES = [
  { title: 'Daily Reflections', href: '/dailyreflections'},
  { title: 'Big Book',          href: '/bigbook'},
  { title: 'As Bill Sees It',   href: `/asbillseesit`},
  { title: 'Prayers' ,          href: '/prayers'},
  { title: 'Steps',             href : '/steps'},
  { title: 'Traditions',        href: '/traditions'}
]
function Navbar() {
  const [search, setSearch] = useState('')
  const router = useRouter()

  useEffect( () => {
    const url = {
      pathname: router.pathname,
      query: {
        search: search
      }
    }
    router.push(url, undefined, {shallow: true})
      .then(ok => ok)
      .catch(e => console.error(e))
  }, [search])

  return (
    <header className={'text-white flex-col align-middle m-auto bg-sky-900 w-screen h-24 border-b-4 border-black sticky top-0 z-50'} >
      <nav >
        <ul className={'flex flex-row space-around m-auto text-black justify-center align-middle w-full items-center flex-wrap flex-basis flex-1'}>
          <h1 className={'text-white text-6xl my-6 m-auto text-center flex flex-col '}>
            <Link className={''} style={{ fontFamily: 'Yellowtail'}} href={'/'}>unManageable</Link>
          </h1>
          <div className={'text-black m-auto align-middle space-around'}>
            <Search query={search} setQuery={setSearch}/>
          </div>
            {
              PAGES.map(({title, href}, index) => (
                <li key={index}>
                  <Link
                    className={betterLinkStyles}
                    href={href}
                  >{title}</Link>
                </li>
              ))
            }
          {/*<li>*/}
          {/*  <Link className={linkStyles} href={'/dailyreflections'}>Daily Reflections</Link>*/}
          {/*</li>*/}
          {/*<li className={linkStyles}>*/}
          {/*  <Link href={'/bigbook'}>Big Book</Link>*/}
          {/*</li>*/}
          {/*<li className={linkStyles}>*/}
          {/*  <Link href={'/asbillseesit'}>As Bill Sees It</Link>*/}
          {/*</li>*/}
          {/*<li className={linkStyles}>*/}
          {/*  <Link href={'/prayers'}>Prayers</Link>*/}
          {/*</li>*/}
          {/*<li className={linkStyles}>*/}
          {/*  <Link href={'/steps'}>Twelve Steps</Link>*/}
          {/*</li>*/}
          {/*<li className={linkStyles}>*/}
          {/*  <Link href={'/traditions'}>Traditions</Link>*/}
          {/*</li>*/}
        </ul>
      </nav>
      <div className={'flex flex-row  align-middle m-auto  w-full'}>
      </div>
    </header>
  );
}

export default Navbar;