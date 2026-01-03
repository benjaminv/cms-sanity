import { BlockElementIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Call to Action schema for page builder.
 */

export default defineType({
    name: "callToAction",
    title: "Call to Action",
    type: "object",
    icon: BlockElementIcon,
    fields: [
        defineField({
            name: "heading",
            title: "Heading",
            type: "string",
        }),
        defineField({
            name: "text",
            title: "Text",
            type: "text",
        }),
        defineField({
            name: "buttonText",
            title: "Button text",
            type: "string",
        }),
        defineField({
            name: "link",
            title: "Link",
            type: "link",
            validation: (Rule) =>
                Rule.custom((value, context: any) => {
                    if (context.parent?.buttonText && !value) {
                        return "Link is required when Button text is set";
                    }
                    return true;
                }),
        }),
    ],
    preview: {
        select: {
            title: "heading",
        },
        prepare({ title }) {
            return {
                title: title || "Call to Action",
                subtitle: "CTA Block",
            };
        },
    },
});
