import { defineArrayMember, defineType } from "sanity";

export default defineType({
  title: "Block Content (Simple - Text Only)",
  name: "blockContentTextOnly",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
    }),
  ],
});
