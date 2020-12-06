export default 
`
<h1 class="auth__header">{{ header }}</h1>
{{error_line}}
<div class="auth__content">
  {{form}}
  <nav class="auth__links">
    <a href="{{link.href}}">{{link.title}}</a>
  </nav>
</div>

`