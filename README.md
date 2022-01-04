# IgNews 🚀

O projeto foi projetado Totalmente pensando totalmente JAM Stack , onde consumimos um CMS headless (prismicIO) por intermédio de uma api e utilizamos o React(jsx) para
\
\
![gif 1](https://raw.githubusercontent.com/victor-magaldi/ig-news/main/src/assets/gif-1.gif)
\
![gif 2](https://raw.githubusercontent.com/victor-magaldi/ig-news/main/src/assets/gif-2.gif)

## Tecnologias e técnicas🔥

**Client:** , ,
\
Foram usados novos recursos do React como:

- React
- Typescript
- React Modal,
- styled components
- axios
- hook useState, useEffect , context API
- @prismicio/client para consumir os dados do headlessCms
- NextAuth com auth do github
- Foi usado Webhooks do stripe para fazer disparo de eventos em nossa API

**Server:**

- Utilizou-se o NextJs para fazer a API , onde existem validações das assinaturas dos usuários pelo utilizando o banco FaunaDB e integraçoes com Auth do Github feita através do NextAuth

## Stripe map webhooks

Tendo stripe.exe na raiz do projeto

```bash
npx stripe login
```

```
npx stripe listen --forward-to localhost:3000/api/webhooks
```

## Rodando o Projeto 💻

Clonar o projeto

```bash
  git clone https://github.com/victor-magaldi/ig-news.git
```

```bash
  cd /ig-news
```

Instalar dependências

```bash
  npm install
```

para rodar o projeto

```bash
  npm run dev
```

para criar uma build de produção

```bash
  npm run build
```
