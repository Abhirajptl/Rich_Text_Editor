import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import VariableToken from "../components/VariableToken";

export const VariableExtension = Node.create({
  name: "variable",
  group: "inline",
  inline: true,
  atom: true,

  addAttributes() {
    return {
      id: { default: null },
      label: { default: "" },
    };
  },

  parseHTML() {
    return [{ tag: "span[data-variable]" }];
  },

  renderHTML({ node }) {
    return ["span", { "data-variable": node.attrs.id }, node.attrs.label];
  },

  addNodeView() {
    return ReactNodeViewRenderer(VariableToken);
  },
});
