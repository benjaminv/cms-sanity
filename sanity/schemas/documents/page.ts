import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Page schema. Define and edit the fields for the 'page' content type.
 */

export default defineType({
    name: "page",
    title: "Page",
    type: "document",
    icon: DocumentIcon,
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            validation: (Rule) => Rule.required(),
            options: {
                source: "name",
                maxLength: 96,
            },
        }),
        defineField({
            name: "heading",
            title: "Heading",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "subheading",
            title: "Subheading",
            type: "string",
        }),
        defineField({
            name: "pageBuilder",
            title: "Page builder",
            type: "array",
            of: [{ type: "callToAction" }, { type: "infoSection" }],
        }),
    ],
});
