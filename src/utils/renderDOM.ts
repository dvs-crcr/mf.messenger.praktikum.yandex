import { Block } from './Block';

export function renderDOM(selector: string, block: Block) {
  const root = document.querySelector(selector);
  const blockContent = block.getContent();
  if (typeof blockContent !== 'undefined' && root !== null) {
    root.appendChild(blockContent);
    return root;
  }
}


