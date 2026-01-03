import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PageBuilder from "./page-builder";
import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { pageQuery, pageSlugsQuery, settingsQuery } from "@/sanity/lib/queries";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    const slugs = await sanityFetch({
        query: pageSlugsQuery,
        perspective: "published",
        stega: false,
    });
    return (slugs || [])
        .filter((slug): slug is string => Boolean(slug))
        .map((slug) => ({ slug }));
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const page = await sanityFetch({
        query: pageQuery,
        params,
        stega: false,
    });

    return {
        title: page?.heading || page?.name,
        description: page?.subheading,
    } satisfies Metadata;
}

export default async function PageRoute({ params }: Props) {
    const [page, settings] = await Promise.all([
        sanityFetch({ query: pageQuery, params }),
        sanityFetch({ query: settingsQuery }),
    ]);

    if (!page?._id) {
        return notFound();
    }

    return (
        <div className="container mx-auto px-5">
            <h2 className="mb-16 mt-10 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
                <Link href="/" className="hover:underline">
                    {settings?.title || demo.title}
                </Link>
            </h2>
            <div className="my-12 lg:my-24">
                <div className="pb-6 border-b border-gray-100">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
                            {page.heading}
                        </h1>
                        {page.subheading && (
                            <p className="mt-4 text-base lg:text-lg leading-relaxed text-gray-600 uppercase font-light">
                                {page.subheading}
                            </p>
                        )}
                    </div>
                </div>
                <PageBuilder page={page} />
            </div>
        </div>
    );
}
