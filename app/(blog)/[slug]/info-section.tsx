import { PortableText } from "@portabletext/react";

interface InfoSectionBlock {
    heading?: string;
    subheading?: string;
    content?: any[];
}

interface InfoSectionProps {
    block: InfoSectionBlock;
}

export default function InfoSection({ block }: InfoSectionProps) {
    return (
        <div className="my-12">
            <div className="max-w-3xl">
                {block?.heading && (
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                        {block.heading}
                    </h2>
                )}
                {block?.subheading && (
                    <span className="block mt-4 mb-8 text-lg uppercase font-light text-gray-600">
                        {block.subheading}
                    </span>
                )}
                {block?.content && block.content.length > 0 && (
                    <div className="mt-4 prose prose-lg">
                        <PortableText value={block.content} />
                    </div>
                )}
            </div>
        </div>
    );
}
