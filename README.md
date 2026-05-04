# Portal de Controle de Faltas Recorrentes

Sistema web para instrutores controlarem frequências de alunos por turma e Unidade Curricular (UC).

## Como usar

1. Abra o arquivo `index.html` em qualquer navegador moderno.
2. Crie uma conta com nome, e-mail e senha.
3. Faça login e acesse o portal.

## Funcionalidades

### ✅ Cadastro e Login
- Registro com nome, e-mail e senha
- Validação de campos e e-mail duplicado
- Sessão persistida com localStorage

### ✅ Dashboard (Portal)
- Boas-vindas com nome do usuário
- Lista de turmas do usuário logado
- Contadores de alunos e UCs

### ✅ Turmas
- Criar, editar e excluir turmas
- Cada usuário vê apenas suas turmas

### ✅ Alunos (CRUD)
- Cadastrar, editar e remover alunos
- Validação de matrícula única por turma
- Contador de total de alunos

### ✅ Unidades Curriculares (CRUD)
- Cadastrar, editar e remover UCs
- Total de aulas planejadas

### ✅ Frequência
- Criar aulas com data e numeração automática
- Marcar presença/falta por aluno com botões
- Tudo persistido em localStorage

### 🚨 Regras de Alerta
- **⚠ 2 faltas consecutivas**: Nome do aluno fica vermelho + badge de alerta
- **📉 Presença < 40%**: Badge "alerta de faltas" abaixo do nome no resumo

## Estrutura de Arquivos

```
portal-faltas/
├── index.html       # Login / Cadastro
├── portal.html      # Dashboard com turmas
├── turma.html       # Detalhe da turma (Alunos + UCs)
├── uc.html          # Frequência por UC
├── css/
│   └── style.css    # Estilo completo
├── js/
│   ├── auth.js      # Autenticação e sessão
│   ├── storage.js   # Acesso ao localStorage
│   ├── turmas.js    # CRUD de turmas
│   ├── alunos.js    # CRUD de alunos
│   ├── ucs.js       # CRUD de UCs
│   └── frequencia.js # Registro e regras de alerta
└── README.md
```

## Tecnologias
- HTML5 + CSS3 + JavaScript puro
- localStorage para persistência
- Nenhuma dependência externa (exceto Google Fonts via CDN)
