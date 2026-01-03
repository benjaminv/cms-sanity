import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`;

export const heroQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
    content,
    ${postFields}
  }
`);

export const moreStoriesQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content,
    ${postFields}
  }
`);

// Link reference expansion for pageBuilder
const linkReference = /* groq */ `
  _type == "page" => {"slug": slug.current, _type},
  _type == "post" => {"slug": slug.current, _type},
`;

const linkFields = /* groq */ `
  linkType,
  href,
  openInNewTab,
  page->{${linkReference}},
  post->{${linkReference}},
`;

export const pageQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug] [0] {
    _id,
    _type,
    name,
    "slug": slug.current,
    heading,
    subheading,
    pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ...,
        link {
          ${linkFields}
        }
      },
      _type == "infoSection" => {
        ...,
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`);

export const pageSlugsQuery = defineQuery(`
  *[_type == "page" && defined(slug.current)][].slug.current
`);

