# Atelier Forma - Architecture Studio Landing

Starter premium pentru un website de prezentare al unei companii de arhitectura si design interior. Proiectul foloseste Next.js App Router, React, TypeScript, Tailwind CSS, Three.js, React Three Fiber, Drei si Framer Motion.

## Stack

- Next.js cu App Router
- React si TypeScript
- Tailwind CSS
- Three.js
- `@react-three/fiber`
- `@react-three/drei`
- Framer Motion

## Instalare

```bash
npm install
```

## Rulare locala

```bash
npm run dev
```

Deschide apoi `http://localhost:3000`.

## Scripturi utile

```bash
npm run lint
npm run typecheck
npm run build
```

## Structura

- `app/page.tsx` compune landing page-ul.
- `components/Hero.tsx` incarca dinamic experienta 3D pentru a evita problemele SSR.
- `components/Scene3D.tsx` contine scena procedurala cu podea, pereti, volume arhitecturale, lumini, environment si controls.
- `components/Projects.tsx`, `Services.tsx`, `About.tsx`, `ContactCTA.tsx`, `Navbar.tsx` definesc sectiunile principale.

## Pasi urmatori

- Adauga modele `.glb` optimizate cu `gltfjsx` pentru proiecte reale sau obiecte de interior.
- Conecteaza un CMS precum Sanity, Contentful sau Payload pentru proiecte si studii de caz.
- Creeaza pagini individuale pentru proiecte cu galerie, planuri, randari si descriere editoriala.
- Adauga formular de contact functional cu validare si email/API route.
