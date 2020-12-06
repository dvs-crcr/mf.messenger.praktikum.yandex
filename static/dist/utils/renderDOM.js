export function renderDOM(query, block, title) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    if (typeof title !== 'undefined') {
        document.title = title;
    }
    return root;
}
//# sourceMappingURL=renderDOM.js.map