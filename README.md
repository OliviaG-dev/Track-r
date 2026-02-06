# Track€r — Chaque euro compte.

Track€r est une application moderne de gestion de finances personnelles qui permet de suivre chaque euro avec précision, sans complexité.

## ✨ Fonctionnalités

### 📊 Dashboard

- Vue d'ensemble de votre santé financière
- Solde total, revenus et dépenses du mois, épargne nette
- **Analyse** : insights automatiques (dépenses élevées, épargne, budgets dépassés, tendances)
- Dépenses par catégorie : liste détaillée + diagramme circulaire interactif (donut)
- **Évolution du solde** : grille mensuelle + graphique en courbe (axe Y en valeurs rondes 0, 2k, 4k…)
- Données de démo au premier lancement (mocks)

### 🏦 Comptes

- Créer plusieurs comptes (courant, épargne, espèces, carte)
- Personnaliser avec des couleurs
- Solde mis à jour automatiquement à chaque transaction

### 💸 Transactions

- Ajouter revenus et dépenses
- Catégories avec icônes (nourriture, transport, logement, etc.)
- Filtres (type, compte, catégorie, recherche)
- Historique complet

### 🎯 Budgets

- Budgets mensuels par catégorie
- Barres de progression (succès / warning / danger)
- Alertes à 75 % et 100 %
- Montant restant affiché

### 🏆 Objectifs d'épargne

- Objectifs avec date cible et montant cible
- Progression visuelle (barre de progression)
- Mise à jour du montant épargné
- Mise en avant des objectifs atteints

## 🛠️ Technologies

- **React 18** + **TypeScript**
- **Vite** — build et dev server
- **Zustand** — state global (comptes, transactions, budgets, objectifs, catégories)
- **React Router** — navigation (Dashboard, Comptes, Transactions, Budgets, Objectifs)
- **date-fns** — formatage des dates
- **CSS** — thème sombre, pas de framework CSS

## 📁 Structure du projet

```
src/
├── components/       # Composants réutilisables
│   ├── Button/
│   ├── Input/
│   ├── Select/
│   ├── Card/
│   ├── Modal/
│   ├── Navbar/
│   ├── StatCard/
│   └── Icons/         # Icônes SVG (navbar, catégories, etc.)
├── pages/
│   ├── Dashboard/
│   ├── Accounts/
│   ├── Transactions/
│   ├── Budgets/
│   └── Goals/
├── services/          # finance.service, storage.service
├── store/             # Zustand store + persistance localStorage
├── types/             # Types TypeScript
├── utils/             # formatCurrency, formatDate, etc.
└── mocks/             # Données de démo (data.ts)
```

## 🚀 Installation

1. **Cloner le dépôt et entrer dans le dossier**

   ```bash
   git clone <url-du-repo>
   cd tracker
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Lancer l’application**

   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   ```
   http://localhost:5173
   ```

## 📦 Scripts

| Commande          | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Serveur de développement |
| `npm run build`   | Build de production      |
| `npm run preview` | Prévisualiser le build   |
| `npm run lint`    | Linter ESLint            |

## 💾 Données

- **localStorage** : persistance des comptes, transactions, budgets, objectifs, catégories, utilisateur.
- Au premier lancement (ou sans comptes), chargement des **données de démo** depuis `src/mocks/data.ts`.
- Pas de backend requis pour faire tourner l’app.

## 🎨 Design

- **Thème sombre** : fond gris anthracite (#15171b, dégradés), cartes foncées, texte clair.
- **Accents dorés** : titres en dégradé doré, boutons primary, navbar et liens actifs (alignés au logo).
- **Icônes SVG** : navbar, catégories, cartes (pas d’emojis).
- **Animations** : hover fluide sur les cartes, apparition du graphique d’évolution, listes décalées.
- **Responsive** : grilles adaptatives, mise en page mobile-first.

## 🗺️ Roadmap

### ✅ Fait

- Comptes, transactions, catégories, dashboard
- Budgets et objectifs d’épargne
- Insights / analyse automatique
- Filtres avancés (transactions)
- Mode sombre + design harmonisé (logo, navbar, pages)
- Graphique d’évolution du solde (SVG), donut des dépenses
- Données de démo (mocks)

### 📋 À venir (optionnel)

- Backend (ex. Supabase)
- Authentification
- Export CSV / PDF
- Notifications
- PWA / mobile

## 📝 Licence

Projet open source, libre d’utilisation pour un usage personnel ou portfolio.

---

**Track€r** — Chaque euro compte.
