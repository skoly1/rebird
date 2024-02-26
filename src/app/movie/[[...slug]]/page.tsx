"use client";
interface MoviePageProps {
  params: {
    slug: string[];
  };
}

export default function DocPage({ params }: MoviePageProps) {
  console.log(params.slug.join("/") ?? null);
  return <>HI</>;
}
