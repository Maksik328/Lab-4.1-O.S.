interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

class UserService {
  private users: User[] = [
    {
      id: 1,
      username: "admin",
      password: "admin",
      role: "admin",
    },
    {
      id: 2,
      username: "student",
      password: "student",
      role: "student",
    },
  ];

  private currentUser: User | null = null;

  login(username: string, password: string): User | null {
    const user = this.users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      this.currentUser = user;
      return user;
    }

    return null;
  }

  logout(): void {
    this.currentUser = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getStudentById(studentId: number): User | null {
    return this.users.find((user) => user.id === studentId && user.role === "student") || null;
  }
}

export default UserService;