import React from "react";
import Cta from "./cta";
import InfoSection from "./info-section";

type BlocksType = {
    [key: string]: React.FC<any>;
};

type BlockType = {
    _type: string;
    _key: string;
};

const Blocks: BlocksType = {
    callToAction: Cta,
    infoSection: InfoSection,
};

interface Page {
    _id: string;
    name?: string | null;
    slug?: string | null;
    heading?: string | null;
    subheading?: string | null;
    pageBuilder?: any[] | null;
}

interface PageBuilderProps {
    page: Page;
}

function BlockRenderer({ block }: { block: BlockType }) {
    if (typeof Blocks[block._type] !== "undefined") {
        return React.createElement(Blocks[block._type], {
            key: block._key,
            block: block,
        });
    }
    return (
        <div className="w-full bg-gray-100 text-center text-gray-500 p-20 rounded my-6">
            A &ldquo;{block._type}&rdquo; block hasn&apos;t been created
        </div>
    );
}

export default function PageBuilder({ page }: PageBuilderProps) {
    if (!page?.pageBuilder || page.pageBuilder.length === 0) {
        return null;
    }

    return (
        <div>
            {page.pageBuilder.map((block: any) => (
                <BlockRenderer key={block._key} block={block} />
            ))}
        </div>
    );
}
