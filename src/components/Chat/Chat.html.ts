export default `
  <aside class="chat__left">
    <a class="chat__profile-link" href="/profile.html" onclick="window.router.go('/profile.html'); return false;">Профиль<i class="fa fa-chevron-right"></i></a>
    <div class="chat__search">
      <input class="chat__search-input" type="text" placeholder="Поиск" />
      <i class="fa fa-search chat__search-icon"></i>
    </div>
    {{addChatButton}}
    {{chatListContent}}
  </aside>
  {{chatContent}}
  {{chatModals}}
`;