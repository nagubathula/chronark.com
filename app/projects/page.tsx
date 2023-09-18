import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";
import Particles from "../components/particles";


const redis = Redis.fromEnv();

export const revalidate = 60;

export default async function ProjectsPage() {
  const projectSlugs = allProjects.map((p) => p.slug);

  const views = await redis.mget<number[]>(
    ...projectSlugs.map((slug) => ["pageviews", "projects", slug].join(":"))
  );

  const viewsData = projectSlugs.reduce((acc, slug, i) => {
    acc[slug] = views[i] ?? 0;
    return acc;
  }, {} as Record<string, number>);

  const featured = allProjects.find((project) => project.slug === "wfn");
  const top2 = allProjects.find((project) => project.slug === "wfn");
  const top3 = allProjects.find((project) => project.slug === "wfn");

  if (!featured || !top2 || !top3) {
    return (
      <div>
        <p>Error: One or more projects not found.</p>
      </div>
    );
  }

  const sorted = allProjects
    .filter((p) => p.published)
    .filter(
      (project) =>
        project.slug !== featured.slug &&
        project.slug !== top2.slug &&
        project.slug !== top3.slug
    )
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime()
    );

  return (
    <div className="relative pb-16">
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <Navigation />
      <div className="px-6 pt-16 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400">
            Some of the projects are from work and some are on my own time.
          </p>
        </div>
        {/* <div className="w-full h-px bg-zinc-800" />
        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
          <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0">
            {[top2, top3].map(
              (project) =>
                project && (
                  <Card key={project.slug}>
                    <Article
                      project={project}
                      views={viewsData[project.slug] ?? 0}
                    />
                  </Card>
                )
            )}
          </div>
        </div> */}
        <div className="hidden w-full h-px md:block bg-zinc-800" />

        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          {/* Sorted projects */}
          {sorted.map((project) => (
            <Card key={project.slug}>
              <Article project={project} views={viewsData[project.slug] ?? 0} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
