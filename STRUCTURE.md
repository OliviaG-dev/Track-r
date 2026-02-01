# 📁 Structure Complète du Projet Track€r

```
tracker/
│
├── 📄 Configuration & Documentation
│   ├── package.json                  ← Dépendances et scripts
│   ├── package-lock.json             ← Lock des dépendances
│   ├── tsconfig.json                 ← Config TypeScript
│   ├── tsconfig.node.json            ← Config TypeScript Node
│   ├── vite.config.ts                ← Config Vite
│   ├── index.html                    ← Point d'entrée HTML
│   ├── .gitignore                    ← Fichiers ignorés par Git
│   │
│   ├── 📚 Documentation
│   ├── README.md                     ← Documentation principale
│   ├── DEMARRAGE.md                  ← Guide démarrage rapide
│   ├── INSTALLATION.md               ← Guide installation
│   ├── RECAP.md                      ← Récapitulatif complet
│   ├── CATEGORIES.md                 ← Liste des catégories
│   ├── DESIGN.md                     ← Design system
│   ├── LIVRAISON.md                  ← Checklist finale
│   └── STRUCTURE.md                  ← Ce fichier
│
├── 📁 public/
│   └── euro-icon.svg                 ← Icône de l'application
│
└── 📁 src/
    │
    ├── 📄 Fichiers principaux
    ├── main.tsx                      ← Point d'entrée React
    ├── App.tsx                       ← Composant racine + routing
    ├── App.css                       ← Styles de l'app
    └── index.css                     ← Styles globaux + reset
    │
    ├── 📁 components/                ← Composants réutilisables
    │   │
    │   ├── 📁 Button/
    │   │   ├── Button.tsx            ← Composant bouton
    │   │   └── Button.css            ← Styles du bouton
    │   │
    │   ├── 📁 Input/
    │   │   ├── Input.tsx             ← Composant input
    │   │   └── Input.css             ← Styles de l'input
    │   │
    │   ├── 📁 Select/
    │   │   ├── Select.tsx            ← Composant select
    │   │   └── Select.css            ← Styles du select
    │   │
    │   ├── 📁 Card/
    │   │   ├── Card.tsx              ← Composant card
    │   │   └── Card.css              ← Styles de la card
    │   │
    │   ├── 📁 Modal/
    │   │   ├── Modal.tsx             ← Composant modal
    │   │   └── Modal.css             ← Styles du modal
    │   │
    │   ├── 📁 Navbar/
    │   │   ├── Navbar.tsx            ← Navigation principale
    │   │   └── Navbar.css            ← Styles de la navbar
    │   │
    │   └── 📁 StatCard/
    │       ├── StatCard.tsx          ← Card de statistiques
    │       └── StatCard.css          ← Styles de la StatCard
    │
    ├── 📁 pages/                     ← Pages principales
    │   │
    │   ├── 📁 Dashboard/
    │   │   ├── Dashboard.tsx         ← Page dashboard
    │   │   └── Dashboard.css         ← Styles du dashboard
    │   │
    │   ├── 📁 Accounts/
    │   │   ├── Accounts.tsx          ← Page gestion comptes
    │   │   └── Accounts.css          ← Styles des comptes
    │   │
    │   ├── 📁 Transactions/
    │   │   ├── Transactions.tsx      ← Page transactions
    │   │   └── Transactions.css      ← Styles des transactions
    │   │
    │   ├── 📁 Budgets/
    │   │   ├── Budgets.tsx           ← Page budgets
    │   │   └── Budgets.css           ← Styles des budgets
    │   │
    │   └── 📁 Goals/
    │       ├── Goals.tsx             ← Page objectifs
    │       └── Goals.css             ← Styles des objectifs
    │
    ├── 📁 services/                  ← Services métier
    │   ├── storage.service.ts        ← Gestion localStorage
    │   └── finance.service.ts        ← Calculs financiers
    │
    ├── 📁 store/                     ← State management
    │   └── index.ts                  ← Store Zustand
    │
    ├── 📁 types/                     ← Types TypeScript
    │   └── index.ts                  ← Tous les types
    │
    └── 📁 utils/                     ← Utilitaires
        └── helpers.ts                ← Fonctions utilitaires
```

---

## 📊 Statistiques du Projet

### Fichiers par Type

```
TypeScript (.tsx/.ts)   : 24 fichiers
CSS (.css)              : 12 fichiers
Configuration           : 6 fichiers
Documentation           : 8 fichiers
HTML                    : 1 fichier
SVG                     : 1 fichier
-----------------------------------
TOTAL                   : 52 fichiers
```

### Code Source

```
Composants TSX          : 7 composants
Pages TSX               : 5 pages
Services                : 2 services
Store                   : 1 store
Types                   : 1 fichier de types
Utils                   : 1 fichier d'utilitaires
-----------------------------------
TOTAL Logique           : 17 fichiers
```

### Styles CSS

```
Composants CSS          : 7 fichiers
Pages CSS               : 5 fichiers
Global CSS              : 2 fichiers (App.css, index.css)
-----------------------------------
TOTAL Styles            : 14 fichiers
```

---

## 🎯 Architecture Respectée

### ✅ Dossier par Composant/Page

Chaque composant et page suit le pattern demandé :

```
ComponentName/
├── ComponentName.tsx    ← Logique React
└── ComponentName.css    ← Styles dédiés
```

**Avantages :**
- Colocalisation du code
- Facilité de maintenance
- Import/export clairs
- Suppression facile

---

## 📦 Modules Principaux

### 1. Components (Réutilisables)

**Button** - Boutons avec variants et tailles
**Input** - Champs de saisie avec icônes
**Select** - Liste déroulante stylisée
**Card** - Conteneurs avec hover effects
**Modal** - Fenêtres modales animées
**Navbar** - Navigation responsive
**StatCard** - Cartes de statistiques

### 2. Pages (Vues principales)

**Dashboard** - Vue d'ensemble + insights
**Accounts** - Gestion des comptes
**Transactions** - Historique + filtres
**Budgets** - Suivi des budgets
**Goals** - Objectifs d'épargne

### 3. Services (Logique métier)

**storage.service** - LocalStorage CRUD
**finance.service** - Calculs financiers

### 4. Store (État global)

**Zustand store** - State management centralisé

### 5. Types (TypeScript)

**Types** - Interfaces complètes

### 6. Utils (Utilitaires)

**Helpers** - Fonctions réutilisables

---

## 🔗 Dépendances du Projet

### Dependencies (Runtime)

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.22.0",
  "zustand": "^4.5.0",
  "chart.js": "^4.4.1",
  "react-chartjs-2": "^5.2.0",
  "date-fns": "^3.3.1"
}
```

### DevDependencies (Développement)

```json
{
  "@types/react": "^18.2.55",
  "@types/react-dom": "^18.2.19",
  "@typescript-eslint/eslint-plugin": "^6.21.0",
  "@typescript-eslint/parser": "^6.21.0",
  "@vitejs/plugin-react": "^4.2.1",
  "eslint": "^8.56.0",
  "eslint-plugin-react-hooks": "^4.6.0",
  "eslint-plugin-react-refresh": "^0.4.5",
  "typescript": "^5.3.3",
  "vite": "^5.1.0"
}
```

---

## 🚀 Scripts NPM

```json
{
  "dev": "vite",                    // Dev server
  "build": "tsc && vite build",     // Build production
  "preview": "vite preview",        // Preview build
  "lint": "eslint . --ext ts,tsx"   // Linter
}
```

---

## 📝 Conventions de Nommage

### Fichiers
- Composants : `PascalCase.tsx`
- Services : `kebab-case.service.ts`
- Utils : `kebab-case.ts`
- Types : `index.ts`
- CSS : `PascalCase.css`

### Code
- Composants : `PascalCase`
- Fonctions : `camelCase`
- Constants : `UPPER_SNAKE_CASE`
- Types : `PascalCase`
- Interfaces : `PascalCase`

---

## 🎨 Organisation CSS

### Global
- `index.css` - Reset + styles globaux
- `App.css` - Styles de l'app

### Par Composant/Page
Chaque composant/page a son propre fichier CSS

### Classes CSS
- Préfixe par composant
- BEM-like naming
- Pas de conflits

Exemple :
```css
.button { }
.button--primary { }
.button--large { }
.button:hover { }
```

---

## 🔄 Flux de Données

```
User Action
    ↓
Component Event Handler
    ↓
Store Action (Zustand)
    ↓
Update State
    ↓
Storage Service (LocalStorage)
    ↓
Re-render Components
    ↓
Updated UI
```

---

## 🧩 Import/Export Pattern

### Composants
```typescript
// Export par défaut
export default function Button() { }

// Import
import Button from '@/components/Button/Button';
```

### Services
```typescript
// Export nommé
export class StorageService { }

// Import
import { StorageService } from '@/services/storage.service';
```

### Store
```typescript
// Export du hook
export const useStore = create<AppState>(() => {});

// Import
import { useStore } from '@/store';
```

---

## 🎯 Points Clés de l'Architecture

### ✅ Séparation des Concerns
- UI (Components)
- Pages (Views)
- Logique (Services)
- État (Store)
- Types (Types)

### ✅ Réutilisabilité
- Composants génériques
- Services partagés
- Types réutilisés

### ✅ Maintenabilité
- Code organisé
- Naming cohérent
- Documentation complète

### ✅ Scalabilité
- Structure extensible
- Ajout facile de features
- Migration backend simple

---

**Structure professionnelle et évolutive !** 🚀
