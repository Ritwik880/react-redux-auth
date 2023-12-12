// src/services/authService.ts

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

let users: User[] = [];

export const authService = {
  register: async (username: string, email: string, password: string): Promise<User> => {
    // Mock registration logic, in a real scenario, you would send a request to the server
    const newUser: User = {
      id: String(users.length + 1),
      username,
      email,
      password
    };

    users.push(newUser);

    return Promise.resolve(newUser);
  },

  login: async (credentials: { username?: string; password?: string }): Promise<User> => {
    console.log('Login attempt with credentials:', credentials);
  
    // Mock login logic, in a real scenario, you would send a request to the server
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
    // Mock logout logic
    return Promise.resolve();
  },
};
