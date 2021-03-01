export default 
`
<aside class="profile__goback" onclick="window.router.back();">
  {{goBackButton}}
</aside>
<div class="profile__content">
  <div class="profile__avatar">
    <img class="profile__avatar-image" src="{{avatar}}">
    <div class="profile__avatar-hover" onclick="{{uploadAvatarProfileHandler}}">Новый аватар</div>
  </div>
  <p class="profile__name">{{title}}</p>
  {{profileContent}}
</div>
`