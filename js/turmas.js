// ===== TURMAS.JS =====

const Turmas = {
  create(userId, nome, descricao) {
    nome = nome.trim();
    if (!nome) return { ok: false, msg: 'Nome da turma é obrigatório.' };

    const turma = {
      id: Storage.newId('t'),
      userId,
      nome,
      descricao: descricao ? descricao.trim() : '',
      createdAt: new Date().toISOString()
    };
    Storage.saveTurma(turma);
    return { ok: true, turma };
  },

  update(id, nome, descricao) {
    nome = nome.trim();
    if (!nome) return { ok: false, msg: 'Nome da turma é obrigatório.' };
    const turma = Storage.getTurmaById(id);
    if (!turma) return { ok: false, msg: 'Turma não encontrada.' };
    turma.nome = nome;
    turma.descricao = descricao ? descricao.trim() : '';
    Storage.saveTurma(turma);
    return { ok: true, turma };
  },

  delete(id) {
    Storage.deleteTurma(id);
    return { ok: true };
  }
};
