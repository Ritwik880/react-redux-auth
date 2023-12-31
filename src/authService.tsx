interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  completedCourses: { [courseId: string]: boolean };
}

let users: User[] = [];

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
      password,
      completedCourses: {},
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    return Promise.resolve(newUser);
  },

  login: async (credentials: { username?: string; password?: string }): Promise<User> => {
    console.log('Login attempt with credentials:', credentials);

    const existingUser = users.find(
      (user) =>
        user.password.toLowerCase() === (credentials.password || '').toLowerCase() &&
        user.username.toLowerCase() === (credentials.username || '').toLowerCase()
    );

    if (!existingUser) {
      console.error('User not found');
      throw new Error('Invalid credentials');
    }

    console.log('Login successful. User:', existingUser);

    return Promise.resolve(existingUser);
  },

  completeSubcourse: async (user: User, courseId: string, subcourseId: string): Promise<User> => {
    user.completedCourses[courseId] = true;
    user.completedCourses[subcourseId] = true;

    const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    return Promise.resolve(user);
  },

  isCourseCompleted: (user: User, courseId: string): boolean => {
    return user.completedCourses[courseId] || false;
  },

  logout: async (): Promise<void> => {
    return Promise.resolve();
  },
};
