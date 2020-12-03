export const template = `
<div class="auth">
  <h1 class="auth__header">{{header}}</h1>
  <p class="auth__error hidden">{{error}}</p>
  <div class="auth__content">
    <form class="auth__form form" method="POST" onsubmit="Auth.submitForm(event);">
      <input class="auth__input form__input" name="login" type="text" placeholder="Логин" />
      <input class="auth__input form__input" name="password" type="password" placeholder="Пароль" />
      <button class="auth__button btn btn_primary btn_fullwidth" type="submit">Войти</button>
    </form>
    <nav class="auth__links">
      <a href="/registration.html">создать аккаунт</a>
    </nav>
  </div>
</div>
`