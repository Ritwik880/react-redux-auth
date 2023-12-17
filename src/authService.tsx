interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

let users: User[] = [];

// retrieve users from localStorage if available
const storedUsers = localStorage.getItem('users');
if (storedUsers) {
  users = JSON.parse(storedUsers);
}

export const authService = {
  register: async (username: string, email: string, password: string): Promise<User> => {
    const newUser: User = {
      id: String(users.length + 1),
      username,
      email,
      password
    };

    users.push(newUser);

    // updating users in localStorage
    localStorage.setItem('users', JSON.stringify(users));

    return Promise.resolve(newUser);
  },

  login: async (credentials: { username?: string; password?: string }): Promise<User> => {
    console.log('Login attempt with credentials:', credentials);

    const existingUser = users.find(
      user => user.password.toLowerCase() === (credentials.password || '').toLowerCase() ||
        user.username.toLowerCase() === (credentials.username || '').toLowerCase()
    );

    if (!existingUser) {
      console.error('User not found');
      throw new Error('User not found');
    }

    console.log('Login successful. User:', existingUser);

    return Promise.resolve(existingUser);
  },

  logout: async (): Promise<void> => {
    return Promise.resolve();
  },
};
