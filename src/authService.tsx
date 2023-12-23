interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  completedCourses: { [courseId: string]: boolean };
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
      password,
      completedCourses: {}, // Initialize completedCourses
    };

    users.push(newUser);

    // updating users in localStorage
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
      throw new Error('Invalid credentials'); // More specific error message
    }

    console.log('Login successful. User:', existingUser);

    return Promise.resolve(existingUser);
  },

  // New function to mark a subcourse as completed
  completeSubcourse: async (user: User, courseId: string, subcourseId: string): Promise<User> => {
    // Update user's completedCourses
    user.completedCourses[courseId] = true;
    user.completedCourses[subcourseId] = true;
  
    // Update the specific user in localStorage
    const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  
    return Promise.resolve(user);
  },

  // New function to check if the entire course is completed
  isCourseCompleted: (user: User, courseId: string): boolean => {
    return user.completedCourses[courseId] || false;
  },

  logout: async (): Promise<void> => {
    return Promise.resolve();
  },
};
