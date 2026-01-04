import Link from "next/link";
import { Image } from "next-sanity/image";
import { PortableText } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/utils";

interface LinkData {
  linkType?: string;
  href?: string;
  page?: string;  // slug string from GROQ dereference
  post?: string;  // slug string from GROQ dereference
  openInNewTab?: boolean;
}

interface ButtonData {
  buttonText?: string;
  link?: LinkData;
}

interface CtaBlock {
  _key?: string;
  heading?: string;
  eyebrow?: string;
  body?: any[];
  button?: ButtonData;
  image?: {
    asset?: { _ref: string };
    crop?: any;
    alt?: string;
  };
  theme?: "light" | "dark";
  contentAlignment?: "textFirst" | "imageFirst";
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

  if (link.linkType === "page" && link.page) {
    return (
      <Link href={`/${link.page}`} target={target} className={className}>
        {children}
      </Link>
    );
  }

  if (link.linkType === "post" && link.post) {
    return (
      <Link href={`/posts/${link.post}`} target={target} className={className}>
        {children}
      </Link>
    );
  }

  return null;
}

export default function Cta({ block }: CtaProps) {
  const { heading, eyebrow, body = [], button, image, theme, contentAlignment } = block;

  const isDark = theme === "dark";
  const isImageFirst = contentAlignment === "imageFirst";

  const imageUrl = image?.asset?._ref
    ? urlForImage(image)?.width(704).height(400).url()
    : null;

  return (
    <section className={`relative my-12 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="container mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-12 py-12">
          <div
            className={`${isImageFirst && image ? "row-start-2 lg:row-start-1 lg:col-start-2" : ""} flex flex-col gap-2`}
          >
            {eyebrow && (
              <span
                className={`text-sm uppercase font-mono tracking-tight opacity-70 ${isDark ? "text-white" : "text-gray-600"}`}
              >
                {eyebrow}
              </span>
            )}
            {heading && (
              <h2
                className={`text-2xl md:text-3xl lg:text-4xl font-bold ${isDark ? "text-white" : "text-black"}`}
              >
                {heading}
              </h2>
            )}
            {body && body.length > 0 && (
              <div className={`prose ${isDark ? "prose-invert" : ""}`}>
                <PortableText value={body} />
              </div>
            )}

            {button?.buttonText && button?.link && (
              <div className="flex mt-4">
                <ResolvedLink
                  link={button.link}
                  className={`rounded-full flex gap-2 font-mono text-sm whitespace-nowrap items-center py-3 px-6 transition-colors duration-200 ${
                    isDark
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  {button.buttonText}
                </ResolvedLink>
              </div>
            )}
          </div>

          {imageUrl && (
            <div className="flex items-center">
              <Image
                src={imageUrl}
                alt={image?.alt || "CTA image"}
                width={704}
                height={400}
                className="rounded-sm object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
