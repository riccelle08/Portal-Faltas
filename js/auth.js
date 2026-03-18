// ===== AUTH.JS =====
// Handles registration, login, session management

const Auth = {
  USERS_KEY: 'pf_users',
  SESSION_KEY: 'pf_session',

  getUsers() {
    return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
  },

  saveUsers(users) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  },

  getCurrentUser() {
    const id = localStorage.getItem(this.SESSION_KEY);
    if (!id) return null;
    return this.getUsers().find(u => u.id === id) || null;
  },

  register(name, email, password) {
    name = name.trim();
    email = email.trim().toLowerCase();
    password = password.trim();

    if (!name || !email || !password) return { ok: false, msg: 'Preencha todos os campos.' };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, msg: 'E-mail inválido.' };
    if (password.length < 6) return { ok: false, msg: 'Senha deve ter ao menos 6 caracteres.' };

    const users = this.getUsers();
    if (users.find(u => u.email === email)) return { ok: false, msg: 'E-mail já cadastrado.' };

    const user = { id: 'u_' + Date.now(), name, email, password, createdAt: new Date().toISOString() };
    users.push(user);
    this.saveUsers(users);
    return { ok: true, user };
  },

  login(email, password) {
    email = email.trim().toLowerCase();
    password = password.trim();

    if (!email || !password) return { ok: false, msg: 'Preencha todos os campos.' };

    const user = this.getUsers().find(u => u.email === email);
    if (!user) return { ok: false, msg: 'E-mail não encontrado.' };
    if (user.password !== password) return { ok: false, msg: 'Senha incorreta.' };

    localStorage.setItem(this.SESSION_KEY, user.id);
    return { ok: true, user };
  },

  logout() {
    localStorage.removeItem(this.SESSION_KEY);
    window.location.href = 'index.html';
  },

  requireAuth() {
    const user = this.getCurrentUser();
    if (!user) {
      window.location.href = 'index.html';
      return null;
    }
    return user;
  }
};
