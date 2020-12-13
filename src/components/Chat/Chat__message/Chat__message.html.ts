export const chatMessageDateTemplate = `
{{msgContent}}
`;

export const chatMessageTextTemplate = `
<div class="chat__body-message-text">{{msgContent}}</div>
{{msgStatus}}
<div class="chat__body-message-time">{{time}}</div>
`;

export const chatMessageImageTemplate = `
<img src="{{msgContent}}">
{{msgStatus}}
<div class="chat__body-message-time">{{time}}</div>
`;