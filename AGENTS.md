# AGENTS.md — Regras permanentes do Hub

Manual principal do repositório `crf2two/crftwo`.

O `index.html` oficial agora usa o design **Workbench**: escuro, operacional, direto, sem hero, sem glassmorphism e com foco em uso diário.

## Última atualização obrigatória

Toda alteração exige atualizar:

1. `ultimo_log.js` com `LATEST_LOG.message` e `LATEST_LOG.dateIso`.
2. `mensagem_atualizacao.txt` com resumo curto.
3. `updatesData` dentro do `index.html`, adicionando nova entrada no topo.

Usar horário de Brasília, UTC-3:

```bash
TZ='America/Sao_Paulo' date "+%H:%M  %d/%m/%Y  %Y-%m-%dT%H:%M:%S-03:00"
```

## Design oficial

O Hub principal deve seguir o padrão Workbench:

- busca no topo;
- ferramentas mais usadas em cards maiores;
- ferramentas de apoio em cards médios;
- scrapers em blocos compactos;
- rodapé com Online e Última Atualização;
- tooltip ao passar o mouse sobre o horário;
- ferramentas internas escondidas.

As ferramentas internas aparecem somente com 3 cliques no nome **Thiago Luz**.

Não voltar para visual de landing page, hero grande, neon, aurora, glassmorphism ou layout com cara de IA.

## Arquivos centrais

- `index.html` — estrutura principal e `updatesData`.
- `hub-workbench.css` — visual Workbench.
- `ultimo_log.js` — `LATEST_LOG` e lógica do Hub.
- `mensagem_atualizacao.txt` — mensagem curta da última alteração.

Não manter arquivos `index-*-conceito.html` depois que o design for aprovado.

## Preservar

- links das ferramentas;
- busca;
- scrapers individuais;
- busca rápida Dufrio;
- clique triplo em Thiago Luz;
- responsividade mobile;
- compatibilidade com GitHub Pages;
- scrapers, extensão e páginas internas.

## Meta viewport

Toda página HTML precisa ter:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## Antes de alterar

1. Reler o GitHub.
2. Ler este `AGENTS.md`.
3. Entender o pedido.
4. Alterar somente o pedido.
5. Atualizar os três arquivos de Última Atualização.
6. Fazer commit com mensagem clara.
