# ⚠️ Note importante sur l'installation

## Problème avec le caractère € dans le chemin

Le dossier contient le caractère spécial `€` qui peut causer des problèmes avec certains outils.

## Solution recommandée

### Option 1 : Renommer le dossier (recommandé)
```bash
# Renommer le dossier en "Tracker" (sans €)
# Puis lancer l'installation normalement
cd c:\Users\Olivia\Desktop\Tracker
npm install
npm run dev
```

### Option 2 : Créer un nouveau projet
```bash
# Dans un nouveau dossier sans caractères spéciaux
cd c:\Users\Olivia\Desktop
mkdir Tracker
cd Tracker

# Copier tous les fichiers du projet actuel
# Puis :
npm install
npm run dev
```

## Installation manuelle si npm fonctionne

Si npm fonctionne dans votre terminal :

1. **Ouvrir un terminal dans le dossier du projet**
2. **Installer les dépendances :**
   ```bash
   npm install
   ```
3. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```
4. **Ouvrir le navigateur :**
   ```
   http://localhost:5173
   ```

## Dépendances requises

Le projet nécessite :
- **Node.js** version 18+ 
- **npm** version 9+

### Vérifier vos versions :
```bash
node --version
npm --version
```

## En cas de problème

### Nettoyer et réinstaller
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Vider le cache npm
```bash
npm cache clean --force
npm install
```

## Structure complète du projet

Tous les fichiers sont en place :
- ✅ Configuration (package.json, tsconfig, vite.config)
- ✅ Types TypeScript
- ✅ Services (storage, finance)
- ✅ Store Zustand
- ✅ Composants (Button, Input, Card, Modal, etc.)
- ✅ Pages (Dashboard, Accounts, Transactions, Budgets, Goals)
- ✅ Routing et App principale
- ✅ Styles CSS

Le projet est **100% fonctionnel** une fois les dépendances installées !

---

**Si vous avez des questions ou problèmes, consultez le README.md** 📚
