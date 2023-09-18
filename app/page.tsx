import Link from "next/link";
import React from "react";
import Particles from "./components/particles";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <div className="">
        <div className="z-10 text-4xl text-transparent  cursor-default text-edge-outline  font-display sm:text-6xl md:text-9xl whitespace-nowrap   hover:bg-white bg-clip-text duration-1000 hover:translate-y-2 hover:rotate-3 hover:scale-150 ">
          Manoj
        </div>{" "}
        <div className="z-10 text-4xl text-transparent   cursor-default text-edge-outline  font-display sm:text-6xl md:text-9xl whitespace-nowrap  hover:bg-white bg-clip-text duration-1000 hover:translate-y-2 hover:rotate-3 hover:scale-110 ">
          Parasuram
        </div>
      </div>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-left animate-fade-in">
        <h2 className="text-sm text-zinc-500 ">
          Hi, my name is Manoj, I'm a flutter and mobile app developer. <br />
          Proud member of{" "}
          <Link
            target="_blank"
            href="https://amfoss.in"
            className="underline duration-500 hover:text-zinc-300"
          >
            amfoss
          </Link>
          <br />
          and working on{" "}
          <Link
            target="_blank"
            href="https://unkey.dev"
            className="underline duration-500 hover:text-zinc-300"
          >
            unkey.dev
          </Link>{" "}
          at night.
        </h2>
      </div>
    </div>
  );
}
