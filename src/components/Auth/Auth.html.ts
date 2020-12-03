export const template = `
<div class="auth">
  <h1 class="auth__header">{{locale.ru.header}}</h1>
  <p class="auth__error hidden">{{locale.ru.error.wrong_credentials}}</p>
  <div class="auth__content">
    <form class="auth__form form" method="POST" onsubmit="{{authSubmitFormHander}}">
      <input class="auth__input form__input" name="login" type="text" placeholder="{{locale.ru.login}}" />
      <input class="auth__input form__input" name="password" type="password" placeholder="{{locale.ru.password}}" />
      <button class="auth__button btn btn_primary btn_fullwidth" type="submit">{{locale.ru.enter}}</button>
    </form>
    <nav class="auth__links">
      <a href="/registration.html">{{locale.ru.create_account}}</a>
    </nav>
  </div>
</div>
`