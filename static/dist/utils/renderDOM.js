export function renderDOM(selector, block, title) {
    var root = document.querySelector(selector);
    var blockContent = block.getContent();
    if (typeof blockContent !== 'undefined' && root !== null) {
        root.appendChild(blockContent);
        if (typeof title !== 'undefined') {
            document.title = title;
        }
        return root;
    }
}
//# sourceMappingURL=renderDOM.js.map