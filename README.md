# Track€r — Chaque euro compte. 💰

Track€r est une application moderne de gestion de finances personnelles qui permet de suivre chaque euro avec précision, sans complexité.

## ✨ Fonctionnalités

### 📊 Dashboard
- Vue d'ensemble de votre santé financière
- Solde total de tous vos comptes
- Revenus et dépenses du mois
- Épargne nette
- Insights et analyses automatiques
- Graphiques des dépenses par catégorie
- Évolution du solde sur 6 mois

### 🏦 Gestion des Comptes
- Créer plusieurs comptes (courant, épargne, espèces, carte)
- Personnaliser avec des couleurs
- Suivi du solde en temps réel
- Mise à jour automatique à chaque transaction

### 💸 Transactions
- Ajouter revenus et dépenses
- Catégories personnalisables
- Filtres avancés (type, compte, catégorie, recherche)
- Historique complet avec détails
- Lien automatique avec les comptes

### 🎯 Budgets
- Définir des budgets mensuels par catégorie
- Suivi en temps réel de la progression
- Alertes à 75% et 100%
- Visualisation claire des dépassements
- Montant restant affiché

### 🏆 Objectifs d'Épargne
- Créer des objectifs financiers
- Suivre la progression visuellement
- Date cible et estimation
- Mise à jour facile du montant épargné
- Célébration des objectifs atteints

## 🛠️ Technologies Utilisées

- **React 18** - Framework UI
- **TypeScript** - Type safety
- **Vite** - Build tool ultra-rapide
- **Zustand** - State management léger
- **React Router** - Navigation
- **Chart.js** - Graphiques interactifs
- **date-fns** - Manipulation de dates
- **CSS pur** - Styling (pas de Tailwind)

## 📁 Architecture

Chaque composant et page suit l'architecture demandée :
```
component/
├── Component.tsx
└── Component.css
```

```
src/
├── components/        # Composants réutilisables
│   ├── Button/
│   ├── Input/
│   ├── Select/
│   ├── Card/
│   ├── Modal/
│   ├── Navbar/
│   └── StatCard/
├── pages/            # Pages principales
│   ├── Dashboard/
│   ├── Accounts/
│   ├── Transactions/
│   ├── Budgets/
│   └── Goals/
├── services/         # Services (storage, finance)
├── store/            # State management (Zustand)
├── types/            # Types TypeScript
└── utils/            # Utilitaires
```

## 🚀 Installation

1. **Cloner le projet**
```bash
cd tracker
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:5173
```

## 📦 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Build de production
- `npm run preview` - Prévisualiser le build

## 💾 Stockage des données

Les données sont stockées en **localStorage** :
- Aucune configuration nécessaire
- Données persistantes
- Export/Import JSON possible
- Facilement migrable vers un backend (Supabase recommandé)

## 🎨 Design

- **Mobile-first** - Optimisé pour tous les écrans
- **Interface moderne** - Clean et intuitive
- **Animations légères** - UX fluide
- **Couleurs personnalisables** - Par compte et catégorie
- **Mode sombre** - (à venir en Phase 3)

## 🗺️ Roadmap

### ✅ Phase 1 - MVP (Actuelle)
- Transactions ✓
- Comptes ✓
- Catégories ✓
- Dashboard ✓
- LocalStorage ✓

### 📋 Phase 2 - Avancé
- Budgets ✓
- Objectifs ✓
- Insights automatiques ✓
- Filtres avancés ✓

### 🚀 Phase 3 - Bonus
- Backend Supabase
- Authentification
- Export CSV/PDF
- Mode sombre
- Notifications push
- Application mobile

## 🤝 Backend

**Supabase** 


## 📝 License

Ce projet est open source et disponible pour usage personnel et portfolio.

---

**Track€r** - Transformez la gestion financière en une expérience simple, fluide et presque ludique. 🚀
