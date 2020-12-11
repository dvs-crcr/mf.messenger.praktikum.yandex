export default `
<header class="chat__header">
  <div class="chat__header-info">
    <img class="chat__header-info-avatar" src="{{avatar}}" />
    <span class="chat__header-info-title">{{title}}</span>
  </div>
  <div class="chat__header-actions">
    <div class="dropdown bottom_right">
      <button class="dropdown__toggle button-round button-round_transparent chat__header-button">
        <svg width="3" height="15" viewBox="0 0 3 15" fill="#757575" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 1.5C3 2.32843 2.32843 3 1.5 3C0.671573 3 0 2.32843 0 1.5C0 0.671573 0.671573 0 1.5 0C2.32843 0 3 0.671573 3 1.5Z" />
          <path d="M3 13.5C3 14.3284 2.32843 15 1.5 15C0.671573 15 0 14.3284 0 13.5C0 12.6716 0.671573 12 1.5 12C2.32843 12 3 12.6716 3 13.5Z" />
          <path d="M3 7.5C3 8.32843 2.32843 9 1.5 9C0.671573 9 0 8.32843 0 7.5C0 6.67157 0.671573 6 1.5 6C2.32843 6 3 6.67157 3 7.5Z" />
          </svg>
      </button>
      <div class="dropdown__list">
        <button onclick="Chat.showModal('add_user_modal');" class="dropdown__list-button"><i class="icon-button icon-button_add-user"></i>Добавить пользователя</button>
        <button onclick="Chat.showModal('delete_user_modal');" class="dropdown__list-button"><i class="icon-button icon-button_delete-user"></i>Удалить пользователя</button>
        <button onclick="Chat.showModal('delete_chat_modal');" class="dropdown__list-button"><i class="icon-button icon-button_delete-chat"></i>Удалить чат</button>
      </div>
    </div>
  </div>
</header>
{{messageList}}
<form class="chat__message" method="POST" onsubmit="Chat.submitForm(event);">
  <div class="dropdown top_left">
    <button type="button" class="dropdown__toggle chat__message-attach"><i class="fa fa-paperclip"></i></button>
    <div class="dropdown__list">
      <button class="dropdown__list-button"><i class="icon-button icon-button_media"></i>Фото и Видео</button>
      <button class="dropdown__list-button"><i class="icon-button icon-button_file"></i>Файл</button>
      <button class="dropdown__list-button"><i class="icon-button icon-button_location"></i>Локация</button>
    </div>
  </div>
  <input class="chat__message-text" name="message" type="text" placeholder="Сообщение">
  <button type="button" class="button-round button-round_primary chat__message-send">
    <i class="fa fa-arrow-right"></i>
  </button>
</form>
`