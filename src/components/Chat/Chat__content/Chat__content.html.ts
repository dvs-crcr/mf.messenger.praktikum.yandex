export default `
<header class="chat__header">
  <div class="chat__header-info">
    <img class="chat__header-info-avatar" src="{{avatar}}" />
    <span class="chat__header-info-title">{{title}}</span>
  </div>
  <div class="chat__header-actions">
    {{dropdownHeader}}
  </div>
</header>
{{messageList}}
{{sendForm}}
`;