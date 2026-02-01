# 🚀 Démarrage Rapide - Track€r

## Installation et lancement en 3 étapes

### 1️⃣ Installer les dépendances
```bash
npm install
```

### 2️⃣ Lancer l'application
```bash
npm run dev
```

### 3️⃣ Ouvrir dans le navigateur
```
http://localhost:5173
```

## 📝 Premiers pas

Au premier lancement, l'application :
- Crée automatiquement un utilisateur demo
- Initialise les catégories par défaut (Nourriture, Transport, etc.)
- Prêt à l'emploi !

### Actions recommandées :

1. **Créer votre premier compte** (onglet "Comptes")
   - Compte courant, épargne, ou autre
   - Définir le solde initial

2. **Ajouter une transaction** (onglet "Transactions")
   - Revenu ou dépense
   - Sélectionner le compte et la catégorie

3. **Définir un budget** (onglet "Budgets")
   - Par catégorie (ex: Nourriture = 300€/mois)
   - Suivre votre progression en temps réel

4. **Créer un objectif** (onglet "Objectifs")
   - Ex: Vacances, Voiture, Urgences
   - Montant cible et date

5. **Consulter le Dashboard**
   - Vue d'ensemble
   - Graphiques et insights automatiques

## 🎯 Architecture du code

Chaque composant/page suit le pattern :
```
ComponentName/
├── ComponentName.tsx  ← Logique React
└── ComponentName.css  ← Styles dédiés
```

## 💾 Données

- **Stockage** : localStorage (pas de serveur nécessaire)
- **Export/Import** : fonctionnalité intégrée
- **Reset** : possible depuis le store

## 🛠️ Commandes utiles

```bash
npm run dev      # Dev server avec hot reload
npm run build    # Build de production
npm run preview  # Prévisualiser le build
```

## 🐛 Problèmes courants

### Port déjà utilisé
```bash
# Vite utilise le port 5173 par défaut
# Si occupé, il propose automatiquement 5174, 5175, etc.
```

### Erreur de dépendances
```bash
rm -rf node_modules package-lock.json
npm install
```

### Cache du navigateur
```
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)
```

## 📊 Données de test

Pour tester rapidement :

1. **Créer un compte** : "Compte Principal" - 1000€
2. **Ajouter des revenus** : Salaire - 2500€
3. **Ajouter des dépenses** :
   - Loyer : 800€
   - Courses : 250€
   - Transport : 80€
4. **Budget** : Nourriture - 300€/mois
5. **Objectif** : Vacances - 1500€

Le dashboard affichera immédiatement les statistiques !

## 🎨 Personnalisation

### Couleurs
Les couleurs sont définies dans chaque fichier CSS.
Variables principales dans `index.css`.

### Catégories
Modifiables depuis le store (`src/store/index.ts`).
Les catégories par défaut sont créées au premier lancement.

## 📱 Responsive

L'application est **mobile-first** et s'adapte à tous les écrans :
- Mobile : < 640px
- Tablet : 640px - 1024px
- Desktop : > 1024px

## 🚀 Prochaines étapes

Une fois l'application testée :
- Migrer vers Supabase pour un backend complet
- Ajouter l'authentification
- Déployer sur Vercel/Netlify

---

**Bon développement ! 💻**
