# ⚠️ SOLUTION RAPIDE - Problème d'Installation

## 🔴 Problème Identifié

Le caractère **`€`** dans le nom du dossier `Track€r` cause des problèmes avec npm/PowerShell sous Windows.

---

## ✅ SOLUTION (3 options)

### 🎯 Option 1 : Renommer le Dossier (RECOMMANDÉ)

1. **Fermer Vite/le serveur de dev** (Ctrl+C dans le terminal)
2. **Fermer VSCode/Cursor**
3. **Renommer le dossier** `Track€r` en `Tracker`
4. **Ouvrir le nouveau dossier** `Tracker` dans votre éditeur
5. **Ouvrir un terminal** dans ce dossier
6. **Lancer les commandes :**

```bash
npm install
npm run dev
```

---

### 🎯 Option 2 : Utiliser CMD au lieu de PowerShell

Si vous voulez garder le nom avec `€` :

1. **Ouvrir CMD** (pas PowerShell)
   - Appuyer sur `Windows + R`
   - Taper `cmd`
   - Entrée

2. **Naviguer vers le dossier :**
```cmd
cd "C:\Users\Olivia\Desktop\Track€r\tracker"
```

3. **Installer les dépendances :**
```cmd
npm install
```

4. **Lancer l'app :**
```cmd
npm run dev
```

---

### 🎯 Option 3 : Installer Manuellement les Dépendances

Si les options ci-dessus ne marchent pas :

1. **Ouvrir Git Bash** (si installé) ou **WSL**

2. **Naviguer et installer :**
```bash
cd /c/Users/Olivia/Desktop/Tracker  # Après renommage
npm install
npm run dev
```

---

## 📋 Commandes d'Installation Complètes

Une fois dans un terminal qui fonctionne :

```bash
# Installer toutes les dépendances
npm install

# OU installer une par une si besoin
npm install react react-dom
npm install react-router-dom
npm install zustand
npm install date-fns
npm install chart.js react-chartjs-2

# Dépendances de dev
npm install -D @types/react @types/react-dom
npm install -D typescript vite @vitejs/plugin-react

# Lancer l'app
npm run dev
```

---

## ✅ Vérification que tout fonctionne

Après installation, vérifier :

```bash
# Vérifier que node_modules existe
dir node_modules  # Windows CMD
ls node_modules   # Git Bash/WSL

# Vérifier que react-router-dom est installé
npm list react-router-dom
```

Vous devriez voir :
```
tracker@1.0.0
└── react-router-dom@6.22.0
```

---

## 🚀 Relancer le Serveur

```bash
npm run dev
```

Le serveur devrait démarrer sur `http://localhost:5173`

---

## 💡 Pourquoi ce Problème ?

Windows PowerShell a des problèmes avec certains caractères spéciaux (comme `€`, `é`, etc.) dans les chemins de fichiers, surtout avec des outils Node.js/npm.

**Solution définitive** : Toujours utiliser des noms de dossiers **sans caractères spéciaux** pour les projets de développement.

---

## 📞 Si le Problème Persiste

### Nettoyer et Réinstaller

```bash
# Supprimer node_modules et package-lock.json
rm -rf node_modules package-lock.json  # Git Bash
rmdir /s /q node_modules               # CMD Windows
del package-lock.json                  # CMD Windows

# Nettoyer le cache npm
npm cache clean --force

# Réinstaller
npm install
```

---

## 🎯 Checklist Rapide

- [ ] Renommer le dossier en `Tracker` (sans €)
- [ ] Ouvrir un terminal (CMD ou Git Bash)
- [ ] Naviguer dans le dossier
- [ ] Exécuter `npm install`
- [ ] Attendre la fin de l'installation
- [ ] Exécuter `npm run dev`
- [ ] Ouvrir http://localhost:5173
- [ ] ✅ L'application fonctionne !

---

**Le projet est complet, il ne manque que l'installation des dépendances !** 🚀
