export default `
  <aside class="chat__left">
    <a class="chat__profile-link" href="/profile.html">Профиль<i class="fa fa-chevron-right"></i></a>
    <div class="chat__search">
      <input class="chat__search-input" type="text" placeholder="Поиск" />
      <i class="fa fa-search chat__search-icon"></i>
    </div>
    {{chatListContent}}
  </aside>
  <main class="chat__right">
    {{chatContent}}
  </main>
`;