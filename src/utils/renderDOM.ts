import { Block } from './Block';

export function renderDOM(selector: string, block: Block, title?: string) {
  const root = document.querySelector(selector);
  const blockContent = block.getContent();
  if (typeof blockContent !== 'undefined' && root !== null) {
    root.appendChild(blockContent);
    if (typeof title !== 'undefined') {
      document.title = title;
    }
    return root;
  }
}


