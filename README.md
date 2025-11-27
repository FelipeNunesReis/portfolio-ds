# Portfólio - Felipe Nunes Reis (deploy-ready)

## O que tem aqui
- Site estático pronto para deploy (index.html, css, js)
- Tema Dark/Light com persistência (localStorage)
- Animações extras via Lottie (placeholder incluído)
- CI: Workflow GitHub Actions para publicar no GitHub Pages

## Como usar localmente
1. Coloque sua foto em `images/fotoportfolio.png` (já deve estar presente se você fez upload).
2. Abra `index.html` no VSCode (Live Server) ou no navegador.

## Deploy para GitHub Pages (automático via Actions)
1. Crie um repositório no GitHub.
2. Faça `git init` / `git add .` / `git commit -m "initial"`
3. `git branch -M main`
4. `git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git`
5. `git push -u origin main`

Ao enviar para a branch `main`, o workflow `.github/workflows/gh-pages.yml` publicará o conteúdo do branch `main` no GitHub Pages automaticamente.

## Notas
- O arquivo do CV foi copiado para `assets/CV_Felipe_Nunes_Reis.pdf`.
- Lottie: coloque JSONs de animações em `assets/` e referencie nos elementos com `data-lottie="assets/seu-lottie.json"`.

