import Link from "next/link";

interface LinkData {
    linkType?: string;
    href?: string;
    page?: { slug?: string };
    post?: { slug?: string };
    openInNewTab?: boolean;
}

interface CtaBlock {
    heading?: string;
    text?: string;
    buttonText?: string;
    link?: LinkData;
}

interface CtaProps {
    block: CtaBlock;
}

function ResolvedLink({
    link,
    children,
    className,
}: {
    link?: LinkData;
    children: React.ReactNode;
    className?: string;
}) {
    if (!link) return null;

    const target = link.openInNewTab ? "_blank" : undefined;
    const rel = link.openInNewTab ? "noopener noreferrer" : undefined;

    if (link.linkType === "href" && link.href) {
        return (
            <a href={link.href} target={target} rel={rel} className={className}>
                {children}
            </a>
        );
    }

    if (link.linkType === "page" && link.page?.slug) {
        return (
            <Link href={`/${link.page.slug}`} target={target} className={className}>
                {children}
            </Link>
        );
    }

    if (link.linkType === "post" && link.post?.slug) {
        return (
            <Link href={`/posts/${link.post.slug}`} target={target} className={className}>
                {children}
            </Link>
        );
    }

    return null;
}

export default function Cta({ block }: CtaProps) {
    return (
        <div className="my-12">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl max-w-3xl">
                <div className="px-12 py-12 flex flex-col gap-6">
                    <div className="max-w-xl flex flex-col gap-3">
                        <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
                            {block.heading}
                        </h2>
                        {block.text && (
                            <p className="text-lg leading-8 text-gray-600">{block.text}</p>
                        )}
                    </div>

                    {block.buttonText && block.link && (
                        <div className="flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
                            <ResolvedLink
                                link={block.link}
                                className="rounded-full flex gap-2 mr-6 items-center bg-black hover:bg-gray-800 py-3 px-6 text-white transition-colors duration-200"
                            >
                                {block.buttonText}
                            </ResolvedLink>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
