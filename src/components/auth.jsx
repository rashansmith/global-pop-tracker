const USERS_DB_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

export const signUp = (username, password) => {
  const users = JSON.parse(localStorage.getItem(USERS_DB_KEY)) || {};
  if (users[username]) {
    throw new Error('User already exists');
  }
  users[username] = { password };
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  localStorage.setItem(CURRENT_USER_KEY, username);
};

export const logIn = (username, password) => {
  const users = JSON.parse(localStorage.getItem(USERS_DB_KEY)) || {};
  if (users[username] && users[username].password === password) {
    localStorage.setItem(CURRENT_USER_KEY, username);
  } else {
    throw new Error('Invalid username or password');
  }
};

export const logOut = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = () => {
  return localStorage.getItem(CURRENT_USER_KEY);
};
