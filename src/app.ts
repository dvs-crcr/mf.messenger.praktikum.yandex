import { default as Router } from './utils/Router.js';

import { default as IndexPage } from './pages/index/index.js';
import { default as AuthPage } from './pages/auth/index.js';
import { default as RegistrationPage } from './pages/registration/index.js';
import { default as ChatPage } from './pages/chat/index.js';
import { default as ProfilePage } from './pages/profile/index.js';
import { default as ProfileEdit } from './pages/profile_edit/index.js';
import { default as ProfilePassword } from './pages/profile_password/index.js';
import { default as ErrorPage500 } from './pages/500/index.js';
import { default as ErrorPage404 } from './pages/404/index.js';

const router = new Router('.root');
(<any>window).router = router;
router
  .use('/', IndexPage)
  .use('/auth.html', AuthPage)
  .use('/registration.html', RegistrationPage)
  .use('/chat.html', ChatPage)
  .use('/profile.html', ProfilePage)
  .use('/profile_edit.html', ProfileEdit)
  .use('/profile_password.html', ProfilePassword)
  .use('/500.html', ErrorPage500)
  .use('/404.html', ErrorPage404)
  .start();

