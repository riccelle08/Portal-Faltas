// ===== STORAGE.JS =====
// Central data access layer

const Storage = {
  // Prefix to namespace keys
  _k: (key) => 'pf_' + key,

  _get(key) { return JSON.parse(localStorage.getItem(this._k(key)) || 'null'); },
  _set(key, val) { localStorage.setItem(this._k(key), JSON.stringify(val)); },

  // ===== TURMAS =====
  getTurmas(userId) {
    return (this._get('turmas') || []).filter(t => t.userId === userId);
  },

  saveTurma(turma) {
    const all = this._get('turmas') || [];
    const idx = all.findIndex(t => t.id === turma.id);
    if (idx >= 0) all[idx] = turma;
    else all.push(turma);
    this._set('turmas', all);
  },

  deleteTurma(id) {
    this._set('turmas', (this._get('turmas') || []).filter(t => t.id !== id));
    // cascade delete
    this._set('alunos', (this._get('alunos') || []).filter(a => a.turmaId !== id));
    const ucs = (this._get('ucs') || []).filter(u => u.turmaId === id);
    ucs.forEach(uc => this.deleteUC(uc.id));
    this._set('ucs', (this._get('ucs') || []).filter(u => u.turmaId !== id));
  },

  getTurmaById(id) {
    return (this._get('turmas') || []).find(t => t.id === id) || null;
  },

  // ===== ALUNOS =====
  getAlunos(turmaId) {
    return (this._get('alunos') || []).filter(a => a.turmaId === turmaId);
  },

  saveAluno(aluno) {
    const all = this._get('alunos') || [];
    const idx = all.findIndex(a => a.id === aluno.id);
    if (idx >= 0) all[idx] = aluno;
    else all.push(aluno);
    this._set('alunos', all);
  },

  deleteAluno(id, turmaId) {
    this._set('alunos', (this._get('alunos') || []).filter(a => a.id !== id));
    // remove from all frequency records
    const aulasList = this._get('aulas') || [];
    aulasList.forEach(aula => {
      if (aula.turmaId === turmaId) {
        delete aula.frequencia[id];
      }
    });
    this._set('aulas', aulasList);
  },

  getAlunoById(id) {
    return (this._get('alunos') || []).find(a => a.id === id) || null;
  },

  // ===== UCs =====
  getUCs(turmaId) {
    return (this._get('ucs') || []).filter(u => u.turmaId === turmaId);
  },

  saveUC(uc) {
    const all = this._get('ucs') || [];
    const idx = all.findIndex(u => u.id === uc.id);
    if (idx >= 0) all[idx] = uc;
    else all.push(uc);
    this._set('ucs', all);
  },

  deleteUC(id) {
    this._set('ucs', (this._get('ucs') || []).filter(u => u.id !== id));
    this._set('aulas', (this._get('aulas') || []).filter(a => a.ucId !== id));
  },

  getUCById(id) {
    return (this._get('ucs') || []).find(u => u.id === id) || null;
  },

  // ===== AULAS / FREQUENCIA =====
  getAulas(ucId) {
    return (this._get('aulas') || [])
      .filter(a => a.ucId === ucId)
      .sort((a, b) => a.numero - b.numero);
  },

  saveAula(aula) {
    const all = this._get('aulas') || [];
    const idx = all.findIndex(a => a.id === aula.id);
    if (idx >= 0) all[idx] = aula;
    else all.push(aula);
    this._set('aulas', all);
  },

  deleteAula(id) {
    this._set('aulas', (this._get('aulas') || []).filter(a => a.id !== id));
  },

  // ===== UTIL =====
  newId(prefix) {
    return prefix + '_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
  }
};
