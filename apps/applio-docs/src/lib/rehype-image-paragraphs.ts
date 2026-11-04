interface Node {
  type: string;
  tagName?: string;
  children?: Node[];
}

// Expandable images contain a dialog and figure, which cannot live inside a p.
export default function imageParagraphs() {
  return (tree: Node) => {
    function visit(node: Node) {
      if (node.tagName === "p" && node.children?.some(child => child.tagName === "img")) {
        node.tagName = "div";
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}
