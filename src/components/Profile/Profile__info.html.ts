export default `
<ul class="profile__list">
  <li>
    <span class="profile__settings-label">Электронная почта</span>
    <span class="profile__settings-value">{{email}}</span>
  </li>
  <li>
    <span class="profile__settings-label">Логин</span>
    <span class="profile__settings-value">{{login}}</span>
  </li>
  <li>
    <span class="profile__settings-label">Имя</span>
    <span class="profile__settings-value">{{first_name}}</span>
  </li>
  <li>
    <span class="profile__settings-label">Фамилия</span>
    <span class="profile__settings-value">{{second_name}}</span>
  </li>
  <li>
    <span class="profile__settings-label">Имя в чате</span>
    <span class="profile__settings-value">{{display_name}}</span>
  </li>
  <li>
    <span class="profile__settings-label">Телефон</span>
    <span class="profile__settings-value">{{phone}}</span>
  </li>
</ul>
<ul class="profile__list profile__list-links">
  <li><a class="profile__link" href="/profile_edit.html" onclick="window.router.go('/profile_edit.html'); return false;">Изменить данные</a></li>
  <li><a class="profile__link" href="/profile_password.html" onclick="window.router.go('/profile_password.html'); return false;">Изменить пароль</a></li>
  <li><a class="profile__link profile__link_logout" onclick="{{logoutProfileHandler}}">Выйти</a></li>
</ul>
`