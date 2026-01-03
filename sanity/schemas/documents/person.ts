import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Person schema. Matches the person type from the shared Sanity backend.
 * This allows posts referencing person documents to work correctly.
 */

export default defineType({
    name: "person",
    title: "Person",
    icon: UserIcon,
    type: "document",
    fields: [
        defineField({
            name: "firstName",
            title: "First Name",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "lastName",
            title: "Last Name",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "picture",
            title: "Picture",
            type: "image",
            fields: [
                defineField({
                    name: "alt",
                    type: "string",
                    title: "Alternative text",
                    description: "Important for SEO and accessibility.",
                    validation: (rule) => {
                        return rule.custom((alt, context) => {
                            if ((context.document?.picture as any)?.asset?._ref && !alt) {
                                return "Required";
                            }
                            return true;
                        });
                    },
                }),
            ],
            options: {
                hotspot: true,
                aiAssist: {
                    imageDescriptionField: "alt",
                },
            },
            validation: (rule) => rule.required(),
        }),
    ],
    preview: {
        select: {
            firstName: "firstName",
            lastName: "lastName",
            picture: "picture",
        },
        prepare(selection) {
            const { firstName, lastName, picture } = selection;
            return {
                title: [firstName, lastName].filter(Boolean).join(" ") || "Untitled",
                subtitle: "Person",
                media: picture,
            };
        },
    },
});
