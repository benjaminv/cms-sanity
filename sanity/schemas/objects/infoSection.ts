import { InfoOutlineIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Info Section schema for page builder.
 */

export default defineType({
    name: "infoSection",
    title: "Info Section",
    type: "object",
    icon: InfoOutlineIcon,
    fields: [
        defineField({
            name: "heading",
            title: "Heading",
            type: "string",
        }),
        defineField({
            name: "subheading",
            title: "Subheading",
            type: "string",
        }),
        defineField({
            name: "content",
            title: "Content",
            type: "array",
            of: [{ type: "block" }],
        }),
    ],
    preview: {
        select: {
            title: "heading",
        },
        prepare({ title }) {
            return {
                title: title || "Info Section",
                subtitle: "Info Block",
            };
        },
    },
});
