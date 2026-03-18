// ===== ALUNOS.JS =====

const Alunos = {
  create(turmaId, nome, matricula) {
    nome = nome.trim();
    matricula = matricula.trim();
    if (!nome) return { ok: false, msg: 'Nome do aluno é obrigatório.' };
    if (!matricula) return { ok: false, msg: 'Matrícula é obrigatória.' };

    const existing = Storage.getAlunos(turmaId);
    if (existing.find(a => a.matricula === matricula))
      return { ok: false, msg: 'Matrícula já cadastrada nesta turma.' };

    const aluno = {
      id: Storage.newId('a'),
      turmaId,
      nome,
      matricula,
      createdAt: new Date().toISOString()
    };
    Storage.saveAluno(aluno);
    return { ok: true, aluno };
  },

  update(id, nome, matricula) {
    nome = nome.trim();
    matricula = matricula.trim();
    if (!nome) return { ok: false, msg: 'Nome é obrigatório.' };
    if (!matricula) return { ok: false, msg: 'Matrícula é obrigatória.' };

    const aluno = Storage.getAlunoById(id);
    if (!aluno) return { ok: false, msg: 'Aluno não encontrado.' };

    // Check duplicate matricula (excluding self)
    const existing = Storage.getAlunos(aluno.turmaId);
    if (existing.find(a => a.matricula === matricula && a.id !== id))
      return { ok: false, msg: 'Matrícula já cadastrada nesta turma.' };

    aluno.nome = nome;
    aluno.matricula = matricula;
    Storage.saveAluno(aluno);
    return { ok: true, aluno };
  },

  delete(id) {
    const aluno = Storage.getAlunoById(id);
    if (!aluno) return { ok: false, msg: 'Aluno não encontrado.' };
    Storage.deleteAluno(id, aluno.turmaId);
    return { ok: true };
  }
};
