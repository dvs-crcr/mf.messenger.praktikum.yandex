export default 
`
<div class="error-page">
  <h1 class="error-page__title">{{header}}</h1>
  <p class="error-page__description">{{p1}}<br>{{p2}}</p>
  <a href="/" onclick="window.router.back(); return false;">← вернуться назад</a>
</div>
`