// ===== UCS.JS =====

const UCs = {
  create(turmaId, nome, totalAulas) {
    nome = nome.trim();
    totalAulas = parseInt(totalAulas);
    if (!nome) return { ok: false, msg: 'Nome da UC é obrigatório.' };
    if (isNaN(totalAulas) || totalAulas < 1) return { ok: false, msg: 'Total de aulas deve ser maior que 0.' };

    const uc = {
      id: Storage.newId('uc'),
      turmaId,
      nome,
      totalAulas,
      createdAt: new Date().toISOString()
    };
    Storage.saveUC(uc);
    return { ok: true, uc };
  },

  update(id, nome, totalAulas) {
    nome = nome.trim();
    totalAulas = parseInt(totalAulas);
    if (!nome) return { ok: false, msg: 'Nome da UC é obrigatório.' };
    if (isNaN(totalAulas) || totalAulas < 1) return { ok: false, msg: 'Total de aulas deve ser maior que 0.' };

    const uc = Storage.getUCById(id);
    if (!uc) return { ok: false, msg: 'UC não encontrada.' };
    uc.nome = nome;
    uc.totalAulas = totalAulas;
    Storage.saveUC(uc);
    return { ok: true, uc };
  },

  delete(id) {
    Storage.deleteUC(id);
    return { ok: true };
  }
};
