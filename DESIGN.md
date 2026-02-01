# 🎨 Track€r - Design System

## 🎯 Identité Visuelle

### Nom & Slogan
**Track€r** — Chaque euro compte.

### Logo
Symbole € dans un gradient violet

### Ton & Voix
- Simple, moderne, accessible
- Pas anxiogène
- Encourageant et positif
- Professionnel mais friendly

---

## 🎨 Palette de Couleurs

### Couleurs Principales

```css
/* Gradient principal (logo, titres) */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Violet principal */
#667eea - Utilisé pour les actions principales

/* Violet foncé */
#764ba2 - Accent gradient
```

### Couleurs Fonctionnelles

```css
/* Revenus / Succès */
#51cf66 - Vert

/* Dépenses / Danger */
#ff6b6b - Rouge

/* Avertissement */
#ffa94d - Orange

/* Information */
#4dabf7 - Bleu clair

/* Neutre */
#4ecdc4 - Turquoise
```

### Couleurs de Texte

```css
/* Texte principal */
#212529 - Presque noir

/* Texte secondaire */
#495057 - Gris foncé

/* Texte désactivé */
#868e96 - Gris moyen

/* Texte léger */
#adb5bd - Gris clair
```

### Couleurs de Fond

```css
/* Background principal */
#f5f7fa - Gris très clair

/* Background secondaire */
#e9ecef - Gris clair

/* Background cards */
#ffffff - Blanc

/* Background inputs */
#f8f9fa - Gris ultra clair

/* Borders */
#e9ecef - Gris clair
#f1f3f5 - Gris ultra clair
```

---

## 📐 Typographie

### Police
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
```

### Tailles de Texte

```css
/* Titres */
h1: 36px - Poids 800
h2: 24px - Poids 700
h3: 20px - Poids 700

/* Corps de texte */
Body: 16px - Poids 400
Small: 14px - Poids 400
Tiny: 13px - Poids 600
```

---

## 🧱 Composants UI

### Boutons

**Variants :**
- Primary : Gradient violet
- Secondary : Gris clair
- Danger : Rouge
- Success : Vert

**Tailles :**
- Small : 8px 16px
- Medium : 12px 24px
- Large : 16px 32px

**États :**
- Hover : translateY(-2px) + box-shadow
- Active : scale(0.98)
- Disabled : opacity 0.5

### Inputs

```css
padding: 12px 16px
border: 2px solid #e9ecef
border-radius: 8px
font-size: 16px

/* Focus */
border-color: #667eea
box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1)
```

### Cards

```css
background: white
border-radius: 12px
padding: 24px
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08)

/* Hover (clickable) */
transform: translateY(-4px)
box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12)
```

### Modals

```css
background: rgba(0, 0, 0, 0.5) /* overlay */
border-radius: 16px
max-width: 600px
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3)

/* Animations */
fadeIn + slideUp
```

---

## 🔲 Espacements

### Padding/Margin

```css
/* Échelle */
4px, 8px, 12px, 16px, 20px, 24px, 32px, 48px

/* Usage commun */
Small gap: 8px
Medium gap: 16px
Large gap: 24px
Section spacing: 32px
```

### Border Radius

```css
Small: 6px
Medium: 8px
Large: 12px
XLarge: 16px
```

---

## 📱 Responsive

### Breakpoints

```css
/* Mobile */
< 640px : 1 colonne

/* Tablet */
640px - 1024px : 2 colonnes

/* Desktop */
> 1024px : 3-4 colonnes
```

### Conteneur Principal

```css
max-width: 1400px
margin: 0 auto
padding: 32px 24px (mobile)
padding: 48px (desktop)
```

---

## ✨ Animations

### Transitions Standards

```css
transition: all 0.2s ease
```

### Animations Clés

```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0 }
  to { opacity: 1 }
}

/* Slide Up */
@keyframes slideUp {
  from { 
    transform: translateY(20px);
    opacity: 0;
  }
  to { 
    transform: translateY(0);
    opacity: 1;
  }
}

/* Pulse */
@keyframes pulse {
  0%, 100% { transform: scale(1) }
  50% { transform: scale(1.05) }
}
```

---

## 🎭 États Visuels

### Hover States
- Boutons : translateY(-2px) + shadow
- Cards : translateY(-4px) + shadow
- Links : color change

### Active States
- Boutons : scale(0.98)
- Inputs : border color + shadow

### Disabled States
- Opacity : 0.5
- Cursor : not-allowed

### Loading States
- Spinner ou skeleton screen
- Opacity réduite

---

## 🔢 Icônes

### Source
Emojis natifs Unicode

### Tailles Courantes
- Small : 18px
- Medium : 24px
- Large : 28px
- XLarge : 32px
- Hero : 64px

### Icônes Principales
- 💰 Argent / Solde
- 📈 Revenus
- 📉 Dépenses
- 🏦 Comptes
- 🎯 Budgets
- 🏆 Objectifs
- 💡 Insights
- ✅ Validé

---

## 📊 Graphiques & Visualisations

### Couleurs de Graphiques
Utiliser les couleurs des catégories pour la cohérence.

### Barres de Progression
```css
height: 8px ou 12px
border-radius: 6px
background: #f1f3f5
fill: gradient ou couleur catégorie
```

### Pourcentages
```css
Display: X%
Font-size: 14px
Font-weight: 700
Color: selon état (vert/orange/rouge)
```

---

## 🎯 États des Budgets

### Normal (< 75%)
```css
color: #51cf66 (vert)
background: #d3f9d8
```

### Avertissement (75-99%)
```css
color: #ffa94d (orange)
background: #ffe3c2
```

### Dépassé (≥ 100%)
```css
color: #ff6b6b (rouge)
background: #ffe3e3
```

---

## 📐 Grilles

### Dashboard Stats
```css
grid-template-columns: 1fr (mobile)
grid-template-columns: repeat(2, 1fr) (tablet)
grid-template-columns: repeat(4, 1fr) (desktop)
gap: 16px
```

### Cards Grid
```css
grid-template-columns: 1fr (mobile)
grid-template-columns: repeat(2, 1fr) (tablet)
grid-template-columns: repeat(3, 1fr) (desktop)
gap: 20px
```

---

## 🌟 Micro-interactions

### Boutons
- Hover : légère élévation
- Click : légère compression

### Cards
- Hover : élévation + shadow

### Inputs
- Focus : border + glow

### Success Actions
- Brève animation de confirmation

---

## ♿ Accessibilité

### Contraste
Tous les textes respectent WCAG AA (4.5:1 minimum)

### Focus States
Tous les éléments interactifs ont un état focus visible

### Taille des Zones de Click
Minimum 44x44px (recommandation mobile)

### Labels
Tous les inputs ont des labels visibles

---

**Design System cohérent pour une expérience utilisateur optimale !** ✨
