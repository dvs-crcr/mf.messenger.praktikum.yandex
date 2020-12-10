export default "\n<header class=\"chat__header\">\n  <div class=\"chat__header-info\">\n    <img class=\"chat__header-info-avatar\" src=\"{{avatar}}\" />\n    <span class=\"chat__header-info-title\">{{title}}</span>\n  </div>\n  <div class=\"chat__header-actions\">\n    <div class=\"dropdown bottom_right\">\n      <button class=\"dropdown__toggle btn-round btn-round_transparent chat__header-button\">\n        <svg width=\"3\" height=\"15\" viewBox=\"0 0 3 15\" fill=\"#757575\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M3 1.5C3 2.32843 2.32843 3 1.5 3C0.671573 3 0 2.32843 0 1.5C0 0.671573 0.671573 0 1.5 0C2.32843 0 3 0.671573 3 1.5Z\" />\n          <path d=\"M3 13.5C3 14.3284 2.32843 15 1.5 15C0.671573 15 0 14.3284 0 13.5C0 12.6716 0.671573 12 1.5 12C2.32843 12 3 12.6716 3 13.5Z\" />\n          <path d=\"M3 7.5C3 8.32843 2.32843 9 1.5 9C0.671573 9 0 8.32843 0 7.5C0 6.67157 0.671573 6 1.5 6C2.32843 6 3 6.67157 3 7.5Z\" />\n          </svg>\n      </button>\n      <div class=\"dropdown__list\">\n        <button onclick=\"Chat.showModal('add_user_modal');\" class=\"dropdown__list-button\"><i class=\"icon-button icon-button_add-user\"></i>\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</button>\n        <button onclick=\"Chat.showModal('delete_user_modal');\" class=\"dropdown__list-button\"><i class=\"icon-button icon-button_delete-user\"></i>\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</button>\n        <button onclick=\"Chat.showModal('delete_chat_modal');\" class=\"dropdown__list-button\"><i class=\"icon-button icon-button_delete-chat\"></i>\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0447\u0430\u0442</button>\n      </div>\n    </div>\n  </div>\n</header>\n{{messageList}}\n<form class=\"chat__message\" method=\"POST\" onsubmit=\"Chat.submitForm(event);\">\n  <div class=\"dropdown top_left\">\n    <button type=\"button\" class=\"dropdown__toggle chat__message-attach\"><i class=\"fa fa-paperclip\"></i></button>\n    <div class=\"dropdown__list\">\n      <button class=\"dropdown__list-button\"><i class=\"icon-button icon-button_media\"></i>\u0424\u043E\u0442\u043E \u0438 \u0412\u0438\u0434\u0435\u043E</button>\n      <button class=\"dropdown__list-button\"><i class=\"icon-button icon-button_file\"></i>\u0424\u0430\u0439\u043B</button>\n      <button class=\"dropdown__list-button\"><i class=\"icon-button icon-button_location\"></i>\u041B\u043E\u043A\u0430\u0446\u0438\u044F</button>\n    </div>\n  </div>\n  <input class=\"chat__message-text\" name=\"message\" type=\"text\" placeholder=\"\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435\">\n  <button type=\"button\" class=\"btn-round btn-round_primary chat__message-send\">\n    <i class=\"fa fa-arrow-right\"></i>\n  </button>\n</form>\n";
//# sourceMappingURL=Chat__content.html.js.map