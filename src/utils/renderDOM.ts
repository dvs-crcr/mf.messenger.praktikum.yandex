import { Block } from "./Block";

export function renderDOM(query: any, block: Block, title?: string) {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  if (typeof title !== 'undefined') {
    document.title = title;
  }
  return root;
}


