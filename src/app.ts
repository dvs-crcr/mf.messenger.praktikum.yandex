import { default as Router } from './utils/Router.js';
// import { Store } from './utils/Store.js';
// const store = Store.getInstance();
// (<any>window).store = store;

import { default as IndexPage } from './pages/index/index.js';
import { default as AuthPage } from './pages/auth/index.js';
import { default as RegistrationPage } from './pages/registration/index.js';
// import { default as chatList } from './pages/chat-list/index.js';
// import { default as chat } from './pages/chat/index.js';
// import { default as profile } from './pages/profile/index.js';
// import { default as profileEdit } from './pages/profile_edit/index.js';
// import { default as profilePassword } from './pages/profile_password/index.js';
import { default as ErrorPage500 } from './pages/500/index.js';
import { default as ErrorPage404 } from './pages/404/index.js';


const router = new Router('.root');
(<any>window).router = router;
router
  .use('/', IndexPage)
  .use('/auth.html', AuthPage)
  .use('/registration.html', RegistrationPage)
  // .use('/chat-list.html', chatList)
  // .use('/chat.html', chat)
  // .use('/profile.html', profile)
  // .use('/profile_edit.html', profileEdit)
  // .use('/profile_password.html', profilePassword)
  .use('/500.html', ErrorPage500)
  .use('/404.html', ErrorPage404)
  .start();

