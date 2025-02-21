import type { AdmonitionType } from "src/types";
import type { Node, Paragraph as P, Parent, Root, PhrasingContent } from "mdast";
import type { Directives, LeafDirective, TextDirective } from "mdast-util-directive";
import { directiveToMarkdown } from "mdast-util-directive";
import { toMarkdown } from "mdast-util-to-markdown";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { type Properties, h as _h } from "hastscript";
import { toString as mdastToString } from "mdast-util-to-string";

const Admonitions = new Set<AdmonitionType>(["tip", "note", "important", "caution", "warning"]);

function isAdmonition(s: string): s is AdmonitionType {
  return Admonitions.has(s as AdmonitionType);
}

function isNodeDirective(node: Node): node is Directives {
  return node.type === "containerDirective" || node.type === "leafDirective" || node.type === "textDirective";
}

function transformUnhandledDirective(node: LeafDirective | TextDirective, index: number, parent: Parent) {
  const textNode = {
    type: "text",
    value: toMarkdown(node, { extensions: [directiveToMarkdown()] }),
  } as const;

  if (node.type === "textDirective") {
    parent.children[index] = textNode;
  } else {
    parent.children[index] = {
      children: [textNode],
      type: "paragraph",
    };
  }
}

function h(el: string, attrs: Properties = {}, children: any[] = []): P {
  const { properties, tagName } = _h(el, attrs);
  return {
    children,
    data: { hName: tagName, hProperties: properties },
    type: "paragraph",
  };
}

export const remarkAdmonitions: Plugin<[], Root> = () => tree => {
  visit(tree, (node, index, parent) => {
    if (!parent || index === undefined || !isNodeDirective(node)) return;

    if (node.type === "textDirective" || node.type === "leafDirective") {
      transformUnhandledDirective(node, index, parent);
      return;
    }

    const admonitionType = node.name;
    if (!isAdmonition(admonitionType)) return;

    let title: string = admonitionType;
    let titleNode: PhrasingContent[] = [{ type: "text", value: title }];

    const firstChild = node.children[0];
    if (
      firstChild?.type === "paragraph" &&
      firstChild.data &&
      "directiveLabel" in firstChild.data &&
      firstChild.children.length > 0
    ) {
      titleNode = firstChild.children;
      title = mdastToString(firstChild.children);
      node.children.splice(0, 1);
    }

    const admonition = h(
      "aside",
      {
        "aria-label": title,
        class: "admonition",
        "data-admonition-type": admonitionType,
      },
      [
        h("p", { class: "admonition-title", "aria-hidden": "true" }, [...titleNode]),
        h("div", { class: "admonition-content" }, node.children),
      ]
    );
    console.log("admonition", admonition);

    parent.children[index] = admonition;
  });
};
