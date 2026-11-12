# Personnalisation de l'interface

Extension SuiteCRM 8 qui adapte l'interface aux usages français, sans recompiler le front
de SuiteCRM : un **module Angular** que SuiteCRM charge au démarrage de l'interface.

Aujourd'hui : **les montants s'affichent avec le symbole après le nombre**, « 67 300,00 € »
au lieu de « €67 300,00 », partout où SuiteCRM affiche un montant. Les séparateurs restent
ceux réglés dans SuiteCRM (espace pour les milliers, virgule pour les décimales).

## Activer

Dans le `.env.local` de l'instance, ajouter `front-customizer` à `EXTENSIONS`, puis
redémarrer. Recharger l'interface (Ctrl+F5) : la console du navigateur affiche
`front-customizer : chargé`.

## Modifier le module

| Dossier | Contenu |
|---|---|
| `app/` | les sources du module Angular (`app/src/extension.module.ts`) |
| `public/` | le module construit, **commité** : suitecrm-core l'installe tel quel |
| `config/extension.php` | la déclaration du module à SuiteCRM (`remoteEntry`, `remoteName`) |

Après toute modification de `app/` :

```bash
make front@build   # construit public/ contre les sources de SuiteCRM (Docker, Node 22)
```

puis commiter `app/` **et** `public/` ensemble : la CI reconstruit le module
(`make front@check`) et refuse un `public/` qui ne correspond pas à `app/`. La première
construction télécharge les sources de SuiteCRM et leurs dépendances (quelques minutes) ;
les suivantes prennent moins d'une minute.

Bon à savoir : SuiteCRM crée le module mais n'appelle pas sa méthode `init()` ; ce qu'il
doit faire au chargement se fait dans son constructeur.

## Vérifier

```bash
make extension@validate && make quality@lint && make quality@stan && make test@unit && make front@check
```
