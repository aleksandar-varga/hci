
import Home from 'Components/Home.component';
import Login from 'Components/Login.component';
import Register from 'Components/Register.component';

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      logged: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      logged: true,
    },
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      logged: true,
    },
  },
];