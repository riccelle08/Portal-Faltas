const Frequencia = {
  // Create a new aula for a UC
  criarAula(ucId, turmaId, data) {
    const aulas = Storage.getAulas(ucId);
    const numero = aulas.length + 1;
    const aula = {
      id: Storage.newId('aula'),
      ucId,
      turmaId,
      numero,
      data: data || new Date().toISOString().split('T')[0],
      frequencia: {}, // { alunoId: true/false } true = presente
      createdAt: new Date().toISOString()
    };
    // pre-fill all current alunos as presente by default
    const alunos = Storage.getAlunos(turmaId);
    alunos.forEach(a => { aula.frequencia[a.id] = true; });
    Storage.saveAula(aula);
    return { ok: true, aula };
  },
 
  // Toggle presença — FIXED: read directly from localStorage
  marcarFrequencia(aulaId, alunoId, presente) {
    const all = JSON.parse(localStorage.getItem('pf_aulas') || '[]');
    const aula = all.find(a => a.id === aulaId);
    if (!aula) return { ok: false };
    aula.frequencia[alunoId] = presente;
    localStorage.setItem('pf_aulas', JSON.stringify(all));
    return { ok: true };
  },
 
  // Get stats for one aluno in one UC
  statsAluno(alunoId, ucId) {
    const uc = Storage.getUCById(ucId);
    const aulas = Storage.getAulas(ucId);
    if (!uc || aulas.length === 0) return null;
 
    let presencas = 0;
    let aulasCom = 0;
 
    aulas.forEach(aula => {
      if (alunoId in aula.frequencia) {
        aulasCom++;
        if (aula.frequencia[alunoId]) presencas++;
      }
    });
 
    // FIXED: % sobre aulas lançadas, não sobre o total planejado
    const percentualPresenca = aulasCom > 0 ? (presencas / aulasCom) * 100 : 100;
 
    // Check 2 consecutive faltas
    let faltasConsecutivas = false;
    let consecutivasCount = 0;
    aulas.forEach(aula => {
      const presente = aula.frequencia[alunoId];
      if (presente === false) {
        consecutivasCount++;
        if (consecutivasCount >= 2) faltasConsecutivas = true;
      } else {
        consecutivasCount = 0;
      }
    });
 
    const baixaPresenca = percentualPresenca < 40;
 
    return {
      presencas,
      faltas: aulasCom - presencas,
      aulasCom,
      totalPlanejadas: uc.totalAulas,
      percentualPresenca: Math.round(percentualPresenca * 10) / 10,
      faltasConsecutivas,
      baixaPresenca
    };
  },
 
  // Get all aula ids/raw  
  getAulaRaw(aulaId) {
    const all = JSON.parse(localStorage.getItem('pf_aulas') || '[]');
    return all.find(a => a.id === aulaId) || null;
  }
};
 