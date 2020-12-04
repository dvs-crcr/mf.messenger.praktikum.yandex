export default 
`
<h1 class="auth__header">{{ header }}</h1>
<p class="auth__error hidden">{{wrong_credentials}}</p>
<div class="auth__content">
  <form class="auth__form form" method="POST" onsubmit="{{ authSubmitFormHander }}">
    <input class="auth__input form__input" name="login" type="text" placeholder="{{label.login}}" />
    <input class="auth__input form__input" name="password" type="password" placeholder="{{label.password}}" />
    {{buttons}}
  </form>
  <nav class="auth__links">
    <a href="/registration.html">{{label.create_account}}</a>
  </nav>
</div>

`