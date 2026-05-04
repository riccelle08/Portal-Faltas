const Auth = {
  _SESSION_KEY: 'pf_session',
 
  register(nome, email, senha) {
    nome  = nome.trim();
    email = email.trim().toLowerCase();
    if (!nome)  return { ok: false, msg: 'Nome é obrigatório.' };
    if (!email || !email.includes('@')) return { ok: false, msg: 'E-mail inválido.' };
    if (!senha || senha.length < 6) return { ok: false, msg: 'Senha deve ter no mínimo 6 caracteres.' };
 
    const users = JSON.parse(localStorage.getItem('pf_users') || '[]');
    if (users.find(u => u.email === email))
      return { ok: false, msg: 'E-mail já cadastrado.' };
 
    const user = {
      id: 'u_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
      name: nome,
      email,
      senha,
      createdAt: new Date().toISOString()
    };
    users.push(user);
    localStorage.setItem('pf_users', JSON.stringify(users));
    return { ok: true, user };
  },
 
  login(email, senha) {
    email = email.trim().toLowerCase();
    if (!email || !senha) return { ok: false, msg: 'Preencha e-mail e senha.' };
 
    const users = JSON.parse(localStorage.getItem('pf_users') || '[]');
    const user  = users.find(u => u.email === email && u.senha === senha);
    if (!user) return { ok: false, msg: 'E-mail ou senha incorretos.' };
 
    localStorage.setItem(this._SESSION_KEY, JSON.stringify({
      id: user.id, name: user.name, email: user.email
    }));
    return { ok: true, user };
  },
 
  logout() {
    localStorage.removeItem(this._SESSION_KEY);
    window.location.href = 'index.html';
  },
 
  getCurrentUser() {
    return JSON.parse(localStorage.getItem(this._SESSION_KEY) || 'null');
  },
 
  requireAuth() {
    const user = this.getCurrentUser();
    if (!user) { window.location.href = 'index.html'; return null; }
    return user;
  }
};