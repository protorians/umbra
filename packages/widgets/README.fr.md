# @protorians/widgets

Créez vos interfaces utilisateur web avec des widgets - une bibliothèque UI puissante et flexible pour les applications web modernes.

## Table des matières

- [Aperçu](#aperçu)
- [Installation](#installation)
- [Concepts fondamentaux](#concepts-fondamentaux)
  - [Widgets](#widgets)
  - [Moteur](#moteur)
  - [Gestion d'état](#gestion-détat)
  - [Stylisation](#stylisation)
  - [Déclaration de Widget](#déclaration-de-widget)
- [Utilisation de base](#utilisation-de-base)
- [Fonctionnalités avancées](#fonctionnalités-avancées)
  - [Hooks de cycle de vie](#hooks-de-cycle-de-vie)
  - [Stylisation](#stylisation-1)
    - [Stylisation de base](#stylisation-de-base)
    - [StyleWidget](#stylewidget)
      - [Fonctionnalités clés](#fonctionnalités-clés)
      - [Cas d'utilisation](#cas-dutilisation)
      - [Configuration avancée](#configuration-avancée)
  - [Gestion d'état](#gestion-détat-1)
  - [Références de widgets](#références-de-widgets)
    - [Création et utilisation des références](#création-et-utilisation-des-références)
    - [Cas d'utilisation](#cas-dutilisation-1)
    - [API de référence](#api-de-référence)
  - [Application avec vues](#application-avec-vues)
    - [Création d'une application](#création-dune-application)
    - [Travailler avec les vues](#travailler-avec-les-vues)
    - [Routage](#routage)
    - [Cas d'utilisation](#cas-dutilisation-2)
- [Référence API](#référence-api)
  - [WidgetNode](#widgetnode)
    - [Propriétés](#propriétés)
    - [Méthodes](#méthodes)
  - [Widgets](#widgets-1)
    - [Propriétés](#propriétés-1)
- [Composants Overlay](#composants-overlay)
  - [Composants Layer](#composants-layer)
  - [Composants Text](#composants-text)
  - [Composants Input](#composants-input)
  - [Composants Media](#composants-media)
  - [Composants Table](#composants-table)
- [Composants de mise en page](#composants-de-mise-en-page)
  - [Composants Stack](#composants-stack)
  - [Composant Divider](#composant-divider)
- [Composants composites](#composants-composites)
  - [Composant Container](#composant-container)
  - [Composant Glyph](#composant-glyph)
  - [Composants Animation](#composants-animation)
  - [Composant Intersection](#composant-intersection)
- [Référence des types](#référence-des-types)
- [Licence](#licence)

## Aperçu

@protorians/widgets est une bibliothèque UI complète qui vous permet de créer des interfaces web dynamiques et réactives en utilisant une approche basée sur les widgets. Elle prend en charge le rendu côté client et côté serveur, offre de puissantes capacités de stylisation et inclut un système robuste de gestion d'état.

## Installation

```bash
# Utilisation de npm
npm install @protorians/widgets

# Utilisation de yarn
yarn add @protorians/widgets

# Utilisation de pnpm
pnpm add @protorians/widgets
```

## Concepts fondamentaux

### Widgets

Les widgets sont les éléments de base de votre interface utilisateur. Chaque widget représente un élément DOM avec des capacités améliorées pour la stylisation, la gestion des événements, la gestion d'état, et plus encore.

### Moteur

Le moteur est responsable du rendu des widgets. Le package prend en charge à la fois le rendu côté client et côté serveur grâce à des moteurs enfichables.

### Gestion d'état

Les widgets incluent des capacités de gestion d'état intégrées, vous permettant de créer des interfaces utilisateur réactives qui se mettent à jour en réponse aux changements d'état.

### Stylisation

Le package fournit un système de stylisation puissant qui vous permet d'appliquer des styles directement aux widgets, avec prise en charge des alias de style, des noms de classe, et plus encore.

### Déclaration de Widget

Au cœur du système de widgets se trouve l'interface `IWidgetDeclaration`. C'est la base pour créer tous les widgets dans la bibliothèque et définit la structure que chaque widget suit.

```typescript
// La structure de base de IWidgetDeclaration
type IWidgetDeclaration<E extends HTMLElement, A extends IAttributes> = A & INativeProperties<E, A>
```

En termes simples, une déclaration de widget combine :
1. **Attributs d'élément HTML** (`A`) : Ce sont les attributs HTML standard spécifiques au type d'élément (comme `href` pour les liens, `type` pour les boutons)
2. **Propriétés natives du widget** (`INativeProperties<E, A>`) : Ce sont des propriétés spéciales qui améliorent l'élément avec des fonctionnalités de widget

Lorsque vous créez un widget, vous fournissez essentiellement un objet de déclaration qui suit cette structure :

```typescript
import {createRef} from "./ref";

const buttonRef = createRef()

// Exemple de déclaration d'un widget bouton
const buttonDeclaration = {
  // Attributs du bouton HTML
  type: 'button',
  disabled: false,

  // Propriétés natives du widget
  children: 'Cliquez-moi',     // Contenu à l'intérieur du bouton
  className: 'primary-button', // Classes CSS
  style: {color: 'white', backgroundColor: 'blue'}, // Styles en ligne
  on: {                        // Gestionnaires d'événements
    click: () => console.log('Bouton cliqué')
  },
  ref: buttonRef // Référence à l'instance du widget
}
```

Les propriétés natives clés que vous pouvez utiliser dans n'importe quelle déclaration de widget incluent :

- `children` : Contenu à placer à l'intérieur de l'élément
- `className` : Noms de classes CSS à appliquer
- `style` : Styles en ligne à appliquer
- `on` : Gestionnaires d'événements pour les événements DOM
- `listen` : Écouteurs d'événements pour les événements DOM
- `ref` : Fonction pour capturer l'instance du widget
- `signal` : Gestionnaires d'événements du cycle de vie
- `data` : Attributs de données personnalisés
- `elevate` : Niveau d'élévation de l'index Z
- `features` : Fonctionnalités supplémentaires pour les widgets spécialisés

Comprendre la structure de déclaration des widgets est essentiel car elle forme la base pour créer et configurer tous les widgets dans votre application.

## Utilisation de base

```typescript
import {Button} from '@protorians/widgets';

// Créer un widget bouton simple
const button = Button({
    class: 'my-button',
    type: 'button',
    children: 'Cliquez-moi',
    onPress: () => console.log('Déclaration cliquée')
});

// Ajouter un écouteur d'événement
button.listen('click', () => {
    console.log('Écouteur de bouton cliqué !');
});

// Monter dans le DOM avec l'API customElement
Mount('WidgetButton', () => button);
```
```html
<!doctype html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Protorians Widgets</title>
</head>
<body>
    ...
    <widget-button>
      <span>WidgetButton n'est pas disponible</span>
    </widget-button>
    ...
</body>
</html>
```

## Fonctionnalités avancées

### Hooks de cycle de vie

Les widgets fournissent des hooks de cycle de vie pour exécuter du code à des moments spécifiques du cycle de vie d'un widget.

```typescript
widget.mount((payload) => {
  console.log('Widget monté !', payload);
});

widget.unmount((payload) => {
  console.log('Widget démonté !', payload);
});

widget.ready((payload) => {
  console.log('Widget prêt !', payload);
});
```

### Stylisation

#### Stylisation de base

Appliquez des styles directement aux widgets :

```typescript
widget.style({
  color: 'red',
  fontSize: '16px',
  paddingX: '10px' // Utilise des alias de style pour paddingLeft et paddingRight
});

// Ajouter, supprimer ou remplacer des noms de classe
widget.className('active');
widget.removeClassName('inactive');
widget.replaceClassName('old-class', 'new-class');
```

#### StyleWidget

La classe `StyleWidget` fournit un moyen puissant de créer, gérer et appliquer des styles CSS à vos widgets. Elle vous permet de définir des styles de manière programmatique et de les appliquer aux widgets facilement.

```typescript
import {Style} from "@protorians/widgets";

// Créer une instance de style
const buttonStyle = Style({
  backgroundColor: 'blue',
  color: 'white',
  padding: '10px 15px',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer'
});

// Appliquer le style à un widget
buttonStyle.bind(button);

// Mettre à jour une propriété de style spécifique
buttonStyle.update('backgroundColor', 'red');

// Supprimer une propriété de style
buttonStyle.remove('border');

// Ajouter un effet de survol en utilisant des cascades de style
buttonStyle.merge({
  '&:hover': Style({
    backgroundColor: 'darkblue'
  })
});
```

##### Fonctionnalités clés

1. **Alias de style** : Définissez des propriétés abrégées qui se développent en plusieurs propriétés CSS.
   ```typescript
   // paddingX se développe en paddingLeft et paddingRight
   Style({
     paddingX: '10px' // Équivalent à {paddingLeft: '10px', paddingRight: '10px'}
   });
   ```

2. **Cascades de style** : Définissez des styles imbriqués pour différents états ou éléments enfants.
   ```typescript
   Style({
     color: 'black',
     '&:hover': Style({
       color: 'blue'
     }),
     '& .child': Style({
       color: 'green'
     })
   });
   ```

3. **Conversion d'unités** : Convertit automatiquement les valeurs numériques en unité appropriée.
   ```typescript
   Style({
     fontSize: 16 // Automatiquement converti en '16rem' (ou l'unité configurée)
   });
   ```

4. **Liaison de style** : Liez les styles directement aux widgets pour des mises à jour automatiques.
   ```typescript
   const style = Style({color: 'red'});
   style.bind(widget);
   ```

##### Cas d'utilisation

1. **Création de thème** :
   ```typescript
   // Définir un thème avec des styles cohérents
   const theme = {
     primary: Style({
       color: 'white',
       backgroundColor: '#007bff'
     }),
     secondary: Style({
       color: 'white',
       backgroundColor: '#6c757d'
     }),
     success: Style({
       color: 'white',
       backgroundColor: '#28a745'
     })
   };

   // Appliquer les styles du thème aux widgets
   const primaryButton = Button({
     children: 'Bouton primaire',
     style: theme.primary
   });

   const secondaryButton = Button({
     children: 'Bouton secondaire',
     style: theme.secondary
   });
   ```

2. **Styles responsifs** :
   ```typescript
   const responsiveStyle = Style({
     width: '100%',
     padding: '10px',
     '@media (min-width: 768px)': {
       width: '50%',
       padding: '20px'
     },
     '@media (min-width: 1200px)': {
       width: '33.33%',
       padding: '30px'
     }
   });

   const responsiveWidget = Layer({
     children: 'Contenu responsif',
     style: responsiveStyle
   });
   ```

3. **Stylisation dynamique basée sur l'état** :
   ```typescript
   import {createState} from "@protorians/widgets";

   const isActive = createState(false);
   const dynamicStyle = Style({
     backgroundColor: 'gray',
     color: 'black',
     transition: 'all 0.3s ease'
   });

   isActive.effect((active) => {
     if (active) {
       dynamicStyle.merge({
         backgroundColor: 'blue',
         color: 'white'
       }).sync();
     } else {
       dynamicStyle.merge({
         backgroundColor: 'gray',
         color: 'black'
       }).sync();
     }
   });

   const toggleButton = Button({
     children: 'Basculer le style',
     style: dynamicStyle,
     on: {
       click: () => isActive.set(!isActive.value)
     }
   });
   ```

##### Configuration avancée

La classe `StyleWidget` fournit plusieurs options de configuration :

```typescript
// Configurer les paramètres de style globaux
StyleWidget.settings = {
  bytes: 4,              // Taille de l'unité de base
  unit: RelativeUnit.Rem, // Unité par défaut (Rem, Em, Px, etc.)
  spacing: 4,            // Valeur d'espacement par défaut
  corner: 0              // Rayon de coin par défaut
};

// Définir des alias de style personnalisés
StyleWidget.alias.set('customPadding', ['paddingTop', 'paddingBottom']);

// Créer un style avec des options spécifiques
const customStyle = new StyleWidget({
  attach: true,     // Attacher automatiquement au DOM
  lock: false,      // Autoriser les mises à jour de style
  fingerprint: '.custom-selector' // Sélecteur CSS personnalisé
}).merge({
  color: 'purple',
  customPadding: '20px' // Utilise l'alias personnalisé
});
```

### Gestion d'état

Gérez l'état du widget :

```typescript
import {createState} from "@protorians/widgets";

const state = createState<number>(0);

// Obtenir l'état
const currentValue = state.value

// Définir l'état
state.set(1 + currentValue)

// Détecter le changement
state.effect((current)=> 
    console.log('État changé', current)
)

// Réinitialiser à la valeur initiale
state.reset();

// Lier le widget
state.bind(widget)

// Injecter l'état directement dans le widget
widget.content(state)
```

### Références de widgets

Les références de widgets vous permettent de capturer et de stocker une référence à une instance de widget, vous donnant la possibilité d'interagir directement avec le widget. Ceci est particulièrement utile lorsque vous devez :

- Accéder aux propriétés ou méthodes du widget après sa création
- Manipuler le widget depuis l'extérieur de sa déclaration
- Partager une instance de widget entre différentes parties de votre application
- Déclencher des actions sur un widget en réponse à des événements provenant d'autres composants

#### Création et utilisation des références

```typescript
import {createRef} from "@protorians/widgets";

// Créer une référence
const buttonRef = createRef();

// Créer un widget avec la référence
const button = Button({
  children: 'Cliquez-moi',
  className: 'primary-button',
  ref: buttonRef // Attacher la référence au widget
});

// Plus tard, vous pouvez accéder au widget via la référence
if (buttonRef.current) {
  // Accéder aux propriétés du widget
  console.log(buttonRef.current.isConnected);

  // Appeler les méthodes du widget
  buttonRef.current.style({
    backgroundColor: 'blue',
    color: 'white'
  });

  buttonRef.current.disable(); // Désactiver le bouton
}
```

#### Cas d'utilisation

1. **Validation de formulaire** :
   ```typescript
   const inputRef = createRef();
   const errorMessageRef = createRef();

   const input = Input({
     type: 'email',
     placeholder: 'Entrez votre email',
     ref: inputRef
   });

   const errorMessage = Text({
     children: 'Format d\'email invalide',
     style: { color: 'red', display: 'none' },
     ref: errorMessageRef
   });

   // Valider au clic du bouton
   Button({
     children: 'Soumettre',
     on: {
       click: () => {
         const email = inputRef.current?.element.value;
         const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

         if (!isValid && errorMessageRef.current) {
           errorMessageRef.current.show();
         } else if (errorMessageRef.current) {
           errorMessageRef.current.hide();
         }
       }
     }
   });
   ```

2. **Mises à jour de contenu dynamique** :
   ```typescript
   const counterRef = createRef();
   const displayRef = createRef();

   const display = Text({
     children: '0',
     ref: displayRef
   });

   const counter = Button({
     children: 'Incrémenter',
     ref: counterRef,
     on: {
       click: () => {
         const currentValue = parseInt(displayRef.current?.element.textContent || '0');
         displayRef.current?.content(currentValue + 1);
       }
     }
   });
   ```

3. **Contrôle de l'état du widget à partir d'événements externes** :
   ```typescript
   const modalRef = createRef();

   // Créer un widget modal
   const modal = Layer({
     className: 'modal',
     style: { display: 'none' },
     children: [
       Text({ children: 'Contenu Modal' }),
       Button({
         children: 'Fermer',
         on: { click: () => modalRef.current?.hide() }
       })
     ],
     ref: modalRef
   });

   // Afficher le modal depuis un autre widget
   Button({
     children: 'Ouvrir Modal',
     on: { click: () => modalRef.current?.show() }
   });

   // Afficher le modal en fonction d'une condition externe
   window.addEventListener('keydown', (event) => {
     if (event.key === 'Escape' && modalRef.current) {
       modalRef.current.hide();
     }
   });
   ```

#### API de référence

L'objet de référence du widget fournit les méthodes suivantes :

- `current` : Obtient l'instance actuelle du widget ou undefined si non attaché
- `attach(widget)` : Attache un widget à la référence (appelé automatiquement lors de l'utilisation de la propriété `ref`)
- `detach()` : Détache le widget de la référence

Les références de widgets sont une fonctionnalité puissante qui permet des interactions plus complexes entre les widgets et aide à créer des interfaces utilisateur plus dynamiques et réactives.

### Application avec vues

La bibliothèque @protorians/widgets fournit un moyen puissant de créer des applications complètes en utilisant des vues et du routage. Cette approche vous permet de construire des applications à page unique (SPA) avec plusieurs vues entre lesquelles les utilisateurs peuvent naviguer.

#### Création d'une application

La classe `Application` est la base pour créer des applications. Elle fournit une façon structurée de définir la configuration, le routage et la mise en page principale de votre application.

```typescript
import {createApplication, createRouter} from "@protorians/widgets";

// Créer un routeur avec des routes
const router = createRouter({
  useHash: true,  // Utiliser le routage basé sur le hash
  baseUrl: '/',   // URL de base pour l'application
  index: 'home',  // Route par défaut
  errors: {
    404: 'notFound' // Route pour les erreurs 404
  }
});

// Définir les routes
router.use({
  path: 'home',
  view: HomeView
});

router.use({
  path: 'about',
  view: AboutView
});

router.use({
  path: 'notFound',
  view: NotFoundView
});

// Créer l'application
const app = createApplication({
  alias: 'my-app',  // Nom d'élément personnalisé pour le montage
  router: router,   // Instance du routeur
  name: 'My App',   // Nom de l'application
  title: 'Bienvenue dans My App', // Titre de l'application
  icon: '/assets/icon.png'    // Icône de l'application
});

// Exécuter l'application
app.run();
```

La fonction `createApplication` crée une instance de la classe `Application` avec la configuration fournie. La méthode `run` monte l'application sur le DOM et configure le routeur pour gérer la navigation.

#### Travailler avec les vues

Les vues sont les éléments de base de l'interface utilisateur de votre application. La bibliothèque @protorians/widgets fournit deux types de vues :

1. **StatelessView** : Vues qui ne maintiennent pas d'état interne entre les rendus
2. **StatefulView** : Vues qui maintiennent l'état entre les rendus

Voici comment créer une vue simple :

```typescript
import {StatefulView, Section, Text, Button} from "@protorians/widgets";

class HomeView extends StatefulView {
  // Définir la méthode principale qui renvoie le widget de la vue
  static _default_configs = {
    stateless: false,
    main: 'render',
    bootstrapper: 'onMount',
    defuser: 'onUnmount',
    properties: ['title'],
    states: ['counter'],
  };

  // Définir les propriétés
  title = 'Page d\'accueil';

  // Définir les états
  counter = createState(0);

  // Méthode de rendu qui renvoie le widget de la vue
  render(props) {
    return Section({
      children: [
        Text({
          children: this.title
        }),
        Text({
          children: `Compteur: ${this.counter.value}`
        }),
        Button({
          children: 'Incrémenter',
          on: {
            click: () => this.counter.set(this.counter.value + 1)
          }
        })
      ]
    });
  }

  // Méthodes de cycle de vie
  onMount(payload) {
    console.log('Vue d\'accueil montée', payload);
  }

  onUnmount(payload) {
    console.log('Vue d\'accueil démontée', payload);
  }
}
```

La propriété statique `_default_configs` définit la configuration de la vue :

- `stateless` : Si la vue est sans état (false pour StatefulView)
- `main` : La méthode qui rend la vue
- `bootstrapper` : Méthode appelée lorsque la vue est montée
- `defuser` : Méthode appelée lorsque la vue est démontée
- `properties` : Tableau des noms de propriétés à exposer
- `states` : Tableau des noms d'états à exposer

#### Routage

Le routeur est responsable de la navigation entre les vues en fonction de l'URL. Lorsqu'un utilisateur navigue vers une route, le routeur construit la vue correspondante et remplace le contenu actuel par celle-ci.

```typescript
// Naviguer par programmation
router.navigate('/about');

// Naviguer avec des paramètres
router.navigate('/user/123', { role: 'admin' });

// Ouvrir une route spécifique
router.open('about');

// Créer un lien de navigation
Link({
  href: '#/about',
  children: 'À propos'
});
```

Lorsque le routeur navigue vers une route, il :

1. Construit la vue en utilisant la méthode `construct`
2. Démonte la vue actuelle
3. Monte la nouvelle vue
4. Met à jour le titre du document

#### Cas d'utilisation

1. **Applications à page unique** :
   ```typescript
   // Créer une SPA complète avec plusieurs vues
   const app = createApplication({
     alias: 'my-spa',
     router: router,
     name: 'My SPA',
     title: 'Mon application à page unique'
   });

   app.run();
   ```

2. **Applications de tableau de bord** :
   ```typescript
   // Créer un tableau de bord avec différentes sections
   router.use({
     path: 'dashboard',
     view: DashboardView
   });

   router.use({
     path: 'dashboard/analytics',
     view: AnalyticsView
   });

   router.use({
     path: 'dashboard/settings',
     view: SettingsView
   });
   ```

3. **Flux d'authentification** :
   ```typescript
   // Créer un flux d'authentification avec des routes protégées
   class AuthRouter extends Router {
     navigate(to, props) {
       // Vérifier si l'utilisateur est authentifié pour les routes protégées
       if (to.startsWith('/protected') && !isAuthenticated()) {
         return super.navigate('/login', { redirect: to });
       }
       return super.navigate(to, props);
     }
   }

   const router = new AuthRouter({
     useHash: true,
     index: 'home'
   });

   router.use({
     path: 'login',
     view: LoginView
   });

   router.use({
     path: 'protected/profile',
     view: ProfileView
   });
   ```

Le modèle Application avec vues fournit un moyen puissant de structurer vos applications web, les rendant plus maintenables, évolutives et conviviales.

## Référence API

### WidgetNode

La classe de base pour créer des widgets.

#### Propriétés

- `tag` : Obtient la balise HTML du widget
- `fingerprint` : Obtient l'identifiant unique du widget
- `isConnected` : Vérifie si le widget est connecté au DOM
- `clientElement` : Obtient l'élément DOM côté client
- `serverElement` : Obtient l'élément DOM côté serveur
- `children` : Obtient les enfants du widget
- `attributes` : Obtient les attributs du widget
- `props` : Obtient les props du widget
- `datasets` : Obtient les datasets du widget
- `reference` : Obtient la référence du widget
- `locked` : Obtient ou définit si le widget est verrouillé
- `signal` : Obtient la pile de signaux du widget
- `measure` : Obtient les mesures du widget
- `stylesheet` : Obtient la feuille de style du widget
- `context` : Obtient le contexte du widget

#### Méthodes

- **Cycle de vie**
  - `construct(callback)` : S'exécute lorsque le widget est construit
  - `mount(callback)` : S'exécute lorsque le widget est monté
  - `unmount(callback)` : S'exécute lorsque le widget est démonté
  - `ready(callback)` : S'exécute lorsque le widget est prêt
  - `before(callback)` : S'exécute avant que le widget ne soit rendu
  - `after(callback)` : S'exécute après que le widget soit rendu

- **Gestion d'état**
  - `value` : Obtient une valeur d'état
  - `set(state)` : Définit les valeurs d'état

- **Manipulation DOM**
  - `clear()` : Efface le contenu du widget
  - `remove()` : Supprime le widget du DOM
  - `html(code)` : Définit le contenu HTML du widget
  - `content(children)` : Définit le contenu du widget
  - `append(children)` : Ajoute des enfants au widget
  - `clone()` : Crée un clone du widget

- **Stylisation**
  - `style(declaration)` : Applique des styles au widget
  - `className(token)` : Ajoute un nom de classe au widget
  - `removeClassName(token)` : Supprime un nom de classe du widget
  - `replaceClassName(oldToken, token)` : Remplace un nom de classe
  - `clearClassName()` : Efface tous les noms de classe
  - `elevate(elevation)` : Définit l'élévation du widget

- **Attributs**
  - `attribute(attributes)` : Définit des attributs sur le widget
  - `attributeLess(attributes)` : Supprime des attributs du widget
  - `data(dataset)` : Définit des attributs de données sur le widget

- **Événements**
  - `listen(type, callback, options)` : Ajoute un écouteur d'événement
  - `on(type, callback)` : Ajoute un écouteur d'événement personnalisé
  - `trigger(type)` : Déclenche un événement

- **Visibilité**
  - `show(display)` : Affiche le widget
  - `hide()` : Cache le widget
  - `toggle(option)` : Bascule la visibilité du widget

- **Focus**
  - `focus()` : Met le focus sur le widget
  - `blur()` : Retire le focus du widget

- **État**
  - `enable()` : Active le widget
  - `disable()` : Désactive le widget
  - `lock()` : Verrouille le widget
  - `unlock()` : Déverrouille le widget

### Widgets

Une classe statique qui fournit la gestion du moteur.

#### Propriétés

- `ServerEngine` : Le constructeur du moteur côté serveur
- `ClientEngine` : Le constructeur du moteur côté client
- `Engine` : Une carte de moteur pour créer des moteurs de widget côté serveur et côté client

## Composants Overlay

Le module overlay fournit des composants pour créer divers éléments d'interface utilisateur qui se superposent à la page.

### Composants Layer

Composants pour créer des éléments de mise en page HTML sémantiques :

- `Layer(declaration)` : Crée un nœud de widget générique
  - **Propriétés** :
    - `children: IChildren` : Contenu à placer à l'intérieur de l'élément
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer
    - `id: string` : ID de l'élément
    - `hidden: boolean` : Si l'élément est caché
    - `tabindex: number` : Index de tabulation pour la navigation au clavier
    - `role: string` : Rôle ARIA
    - `signal: IWidgetSignalMap` : Gestionnaires de signaux pour les événements du cycle de vie

- `Section(declaration)` : Crée un élément section
  - **Propriétés** : Identiques à Layer

- `MainFrame(declaration)` : Crée un élément main
  - **Propriétés** : Identiques à Layer

- `HeaderFrame(declaration)` : Crée un élément header
  - **Propriétés** : Identiques à Layer

- `FooterFrame(declaration)` : Crée un élément footer
  - **Propriétés** : Identiques à Layer

- `AsideFrame(declaration)` : Crée un élément aside
  - **Propriétés** : Identiques à Layer

### Composants Text

Composants pour créer des éléments de texte avec différents styles :

- `Text(declaration)` : Crée un élément de texte régulier (span avec taille de police moyenne)
  - **Propriétés** :
    - `children: IChildren` : Contenu à placer à l'intérieur de l'élément
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer
    - `id: string` : ID de l'élément
    - `hidden: boolean` : Si l'élément est caché

- `SmallText(declaration)` : Crée un élément de texte petit (span avec petite taille de police)
  - **Propriétés** : Identiques à Text

- `SmallerText(declaration)` : Crée un élément de texte plus petit (span avec taille de police plus petite)
  - **Propriétés** : Identiques à Text

- `LargeText(declaration)` : Crée un élément de texte grand (span avec grande taille de police)
  - **Propriétés** : Identiques à Text

- `LargerText(declaration)` : Crée un élément de texte plus grand (span avec taille de police plus grande)
  - **Propriétés** : Identiques à Text

- `StrongText(declaration)` : Crée un élément de texte fort (gras)
  - **Propriétés** : Identiques à Text

- `ItalicText(declaration)` : Crée un élément de texte italique
  - **Propriétés** : Identiques à Text

- `Link(declaration)` : Crée un élément de lien hypertexte
  - **Propriétés** :
    - `href: string` : URL vers laquelle lier (obligatoire)
    - `target: ITarget` : Où ouvrir le lien (_blank, _self, etc.)
    - `rel: string` : Relation entre le document actuel et le document lié
    - `download: string` : Si la cible sera téléchargée
    - `children: IChildren` : Contenu à placer à l'intérieur de l'élément
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer

### Composants Input

Composants pour créer des éléments de formulaire :

- `Input(declaration)` : Crée un élément input
  - **Propriétés** :
    - `type: IInputType` : Type d'input (text, password, email, number, etc.)
    - `name: string` : Nom de l'input
    - `value: string` : Valeur de l'input
    - `placeholder: string` : Texte d'espace réservé
    - `disabled: boolean` : Si l'input est désactivé
    - `required: boolean` : Si l'input est requis
    - `readonly: boolean` : Si l'input est en lecture seule
    - `autofocus: boolean` : Si l'input doit être automatiquement focalisé
    - `min: number | string` : Valeur minimale (pour les inputs numériques)
    - `max: number | string` : Valeur maximale (pour les inputs numériques)
    - `minlength: number` : Longueur minimale (pour les inputs texte)
    - `maxlength: number` : Longueur maximale (pour les inputs texte)
    - `pattern: RegExp` : Modèle de validation
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer

- `InputArea(declaration)` : Crée un élément textarea
  - **Propriétés** :
    - `name: string` : Nom de l'input
    - `value: string` : Valeur de l'input
    - `placeholder: string` : Texte d'espace réservé
    - `disabled: boolean` : Si le textarea est désactivé
    - `required: boolean` : Si le textarea est requis
    - `readonly: boolean` : Si le textarea est en lecture seule
    - `autofocus: boolean` : Si le textarea doit être automatiquement focalisé
    - `minlength: number` : Longueur minimale
    - `maxlength: number` : Longueur maximale
    - `children: IChildren` : Contenu à placer à l'intérieur de l'élément
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer

- `Form(declaration)` : Crée un élément form
  - **Propriétés** :
    - `action: string` : URL de soumission du formulaire
    - `method: 'get' | 'post'` : Méthode HTTP
    - `enctype: string` : Type d'encodage du formulaire
    - `target: ITarget` : Où afficher la réponse
    - `novalidate: boolean` : Si la validation du formulaire doit être désactivée
    - `children: IChildren` : Éléments du formulaire
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer

- `Label(declaration)` : Crée un élément label
  - **Propriétés** :
    - `for: string` : ID de l'élément de formulaire pour lequel ce label est destiné
    - `children: IChildren` : Texte ou éléments du label
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer

- `Select(declaration)` : Crée une liste déroulante select
  - **Propriétés** :
    - `name: string` : Nom du select
    - `disabled: boolean` : Si le select est désactivé
    - `required: boolean` : Si le select est requis
    - `multiple: boolean` : Si plusieurs options peuvent être sélectionnées
    - `children: IChildren` : Éléments d'option
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer

- `Option(declaration)` : Crée une option pour un élément select
  - **Propriétés** :
    - `value: string | number` : Valeur de l'option
    - `selected: boolean` : Si l'option est sélectionnée
    - `disabled: boolean` : Si l'option est désactivée
    - `label: string` : Étiquette de l'option
    - `children: IChildren` : Texte de l'option

- `OptionGroup(declaration)` : Crée un groupe d'options
  - **Propriétés** :
    - `label: string` : Étiquette du groupe
    - `disabled: boolean` : Si le groupe est désactivé
    - `children: IChildren` : Éléments d'option

### Composants Media

Composants pour créer des éléments média :

- `Image(declaration)` : Crée un élément image
  - **Propriétés** :
    - `src: string` : URL source de l'image
    - `alt: string` : Texte alternatif pour l'image
    - `width: number | string` : Largeur de l'image
    - `height: number | string` : Hauteur de l'image
    - `loading: ILoading` : Stratégie de chargement (lazy, eager)
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer

- `Video(declaration)` : Crée un élément vidéo
  - **Propriétés** :
    - `src: string` : URL source de la vidéo
    - `controls: boolean` : Si les contrôles de la vidéo doivent être affichés
    - `autoplay: boolean` : Si la vidéo doit démarrer automatiquement
    - `loop: boolean` : Si la vidéo doit se répéter
    - `muted: boolean` : Si la vidéo doit être muette
    - `poster: string` : URL de l'image d'affiche
    - `width: number | string` : Largeur de la vidéo
    - `height: number | string` : Hauteur de la vidéo
    - `children: IChildren` : Sources ou pistes de la vidéo
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer

- `Audio(declaration)` : Crée un élément audio
  - **Propriétés** :
    - `src: string` : URL source de l'audio
    - `controls: boolean` : Si les contrôles audio doivent être affichés
    - `autoplay: boolean` : Si l'audio doit démarrer automatiquement
    - `loop: boolean` : Si l'audio doit se répéter
    - `muted: boolean` : Si l'audio doit être muet
    - `children: IChildren` : Sources ou pistes audio
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer

### Composants Table

Composants pour créer des tableaux :

- `Table(declaration)` : Crée un élément table
  - **Propriétés** :
    - `children: IChildren` : Contenu du tableau
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer

- `TableHead(declaration)` : Crée un en-tête de tableau
  - **Propriétés** :
    - `children: IChildren` : Lignes d'en-tête
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer

- `TableBody(declaration)` : Crée un corps de tableau
  - **Propriétés** :
    - `children: IChildren` : Lignes du corps
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer

- `TableFoot(declaration)` : Crée un pied de tableau
  - **Propriétés** :
    - `children: IChildren` : Lignes de pied
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer

- `TableRow(declaration)` : Crée une ligne de tableau
  - **Propriétés** :
    - `children: IChildren` : Cellules de la ligne
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer

- `TableCell(declaration)` : Crée une cellule de tableau
  - **Propriétés** :
    - `children: IChildren` : Contenu de la cellule
    - `colspan: number` : Nombre de colonnes que la cellule s'étend
    - `rowspan: number` : Nombre de lignes que la cellule s'étend
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer

- `TableHeaderCell(declaration)` : Crée une cellule d'en-tête de tableau
  - **Propriétés** :
    - `children: IChildren` : Contenu de la cellule d'en-tête
    - `scope: 'row' | 'col'` : Portée de la cellule d'en-tête
    - `colspan: number` : Nombre de colonnes que la cellule s'étend
    - `rowspan: number` : Nombre de lignes que la cellule s'étend
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer

## Composants de mise en page

Composants pour créer des mises en page :

### Composants Stack

Composants pour créer des mises en page de pile :

- `HStack(declaration)` : Crée une pile horizontale
  - **Propriétés** :
    - `children: IChildren` : Éléments de la pile
    - `spacing: number | string` : Espacement entre les éléments
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer

- `VStack(declaration)` : Crée une pile verticale
  - **Propriétés** :
    - `children: IChildren` : Éléments de la pile
    - `spacing: number | string` : Espacement entre les éléments
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer

- `ZStack(declaration)` : Crée une pile z (superposition)
  - **Propriétés** :
    - `children: IChildren` : Éléments de la pile
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer

### Composant Divider

Composant pour créer des séparateurs :

- `Divider(declaration)` : Crée un séparateur horizontal ou vertical
  - **Propriétés** :
    - `orientation: 'horizontal' | 'vertical'` : Orientation du séparateur
    - `thickness: number | string` : Épaisseur du séparateur
    - `color: string` : Couleur du séparateur
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer

## Composants composites

Composants qui combinent plusieurs éléments pour créer des composants plus complexes :

### Composant Container

Composant pour créer des conteneurs :

- `Container(declaration)` : Crée un conteneur avec une largeur maximale et un centrage
  - **Propriétés** :
    - `children: IChildren` : Contenu du conteneur
    - `maxWidth: string | number` : Largeur maximale du conteneur
    - `padding: string | number` : Rembourrage du conteneur
    - `centerContent: boolean` : Si le contenu doit être centré
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer

### Composant Glyph

Composant pour créer des icônes :

- `Glyph(declaration)` : Crée une icône à partir d'une police d'icônes
  - **Propriétés** :
    - `icon: string` : Nom de l'icône
    - `size: number | string` : Taille de l'icône
    - `color: string` : Couleur de l'icône
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer

### Composants Animation

Composants pour créer des animations :

- `Fade(declaration)` : Crée une animation de fondu
  - **Propriétés** :
    - `children: IChildren` : Contenu à animer
    - `in: boolean` : Si l'animation doit être active
    - `duration: number` : Durée de l'animation en millisecondes
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer

- `Slide(declaration)` : Crée une animation de glissement
  - **Propriétés** :
    - `children: IChildren` : Contenu à animer
    - `in: boolean` : Si l'animation doit être active
    - `direction: 'up' | 'down' | 'left' | 'right'` : Direction du glissement
    - `duration: number` : Durée de l'animation en millisecondes
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer

### Composant Intersection

Composant pour détecter l'intersection avec le viewport :

- `Intersection(declaration)` : Crée un composant qui détecte quand il entre dans le viewport
  - **Propriétés** :
    - `children: IChildren` : Contenu à observer
    - `threshold: number` : Seuil d'intersection (0-1)
    - `root: Element | null` : Élément racine pour l'intersection
    - `rootMargin: string` : Marge autour de la racine
    - `onEnter: Function` : Fonction appelée lorsque l'élément entre dans le viewport
    - `onExit: Function` : Fonction appelée lorsque l'élément quitte le viewport
    - `className: string | string[]` : Noms de classes CSS
    - `style: IStyleDeclaration` : Styles en ligne à appliquer

## Référence des types

| Catégorie | Type | Description |
|-----------|------|-------------|
| **Types de Widget** | `IWidgetNode<E, A>` | Interface principale pour tous les widgets, où E est le type d'élément HTML et A est le type d'attributs |
| | `IWidgetDeclaration<E, A>` | Type pour déclarer un widget avec des attributs et des propriétés natives |
| | `IChildrenSupported` | Types qui peuvent être utilisés comme enfants d'un widget |
| **Types d'attributs** | `IAttributes` | Interface de base pour tous les attributs HTML |
| | `IGlobalAttributes` | Attributs qui peuvent être appliqués à n'importe quel élément HTML |
| | `IInputAttributes` | Attributs spécifiques aux éléments input |
| **Types de style** | `IStyleDeclaration` | Type pour les déclarations de style CSS |
| | `IStyleSheet` | Interface pour les feuilles de style |
| | `IStyleOptions` | Options pour configurer le comportement des styles |
| **Types d'état** | `IState<T>` | Interface pour les états typés |
| | `IStateStack` | Collection d'états |
| | `IStateEffect<T>` | Fonction de rappel pour les changements d'état |
| **Types de référence** | `IRef<E, A>` | Interface pour les références de widget |
| | `IRefCallable<E, A>` | Fonction de rappel pour les références |
| **Types d'événement** | `IGlobalEventMap` | Carte de tous les événements DOM natifs |
| | `IGlobalEventCallableMap<E, A>` | Fonctions de rappel pour les événements |
| | `ICallable<E, A, Payload>` | Fonction de rappel générique avec charge utile |
| **Types de vue** | `IView` | Interface de base pour toutes les vues |
| | `IViewConstructor` | Constructeur pour les vues |
| | `IViewProperties<T>` | Propriétés pour les vues |
| | `IViewStates<T>` | États pour les vues |
| **Types de routeur** | `IRouter<Scheme>` | Interface pour les routeurs |
| | `IRouterRoute<Scheme, K>` | Route dans un routeur |
| | `IRouterConfig<Scheme>` | Configuration pour un routeur |
| **Types d'application** | `IApplication<RouterScheme>` | Interface pour les applications |
| | `IApplicationConfig<RouterScheme>` | Configuration pour une application |

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.