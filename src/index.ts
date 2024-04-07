import { ioc } from './ioc';

import type { User } from './types';

const renderUsers = async () => {
  const usersService = ioc.resolve('users');
  const users = await usersService.getUsers();

  const listNode = document.getElementById('users-list');

  users.forEach((user: User) => {
    const listItemNode = document.createElement('li');

    listItemNode.innerHTML = user.name;
    listNode.appendChild(listItemNode);
  });
};

const app = () => {
  renderUsers();
};

window.onload = (event: Event) => {
  const config = (window as any).__CONFIG__;
  delete (window as any).__CONFIG__;
  ioc.register('apiConfig', config.api);

  const logger = ioc.resolve('logger');
  logger.info('Page is loaded.');

  app();
};
