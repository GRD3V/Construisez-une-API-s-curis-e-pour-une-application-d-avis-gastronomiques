# Construisez une API sécurisée pour une application d-avis gastronomiques

# Configurer l'env:

Installer les deps de front et back :

```bash
cd back
yarn install

cd ../front
yarn install
```

Vous devez configurer une instance MongoDB pour pouvoirs exécuter l'API

Si vous disposez de docker :

```bash
# Pour démarrer une image MongoDB configurée
docker-compose up -d
```

Sinon, vous pouvez crée une instance gratuite via le site de MongoDB en suivant la doc.

Copier-coller le fichier `.env.template` vers `.env`. Si vous utilisez une instance MongoDB autre qu'avec la config `docker-compose` vous devriez éditer le fichier `.env`. (`.env` est seulement destiné à l'API)

```bash
cd back
cp .env.template .env
```

Une fois l'env prêt, démarrez le back et front

```bash
cd back
yarn start:dev
```

```bash
cd front
yarn start:dev
```

---

![Bannière scénario](https://user.oc-static.com/upload/2022/06/28/16564030859322_Banner_Sce%CC%81nario.png)
Vous avez passé la dernière année en tant que développeur back-end indépendant et vous avez travaillé sur plusieurs projets de tailles et de difficultés variées.

La semaine dernière, vous avez reçu un message sur votre plateforme de freelance vous demandant de l'aide pour un nouveau projet. Les sauces piquantes sont de plus en plus populaires, en grande partie grâce à la série YouTube « Hot Ones » . C’est pourquoi ce nouveau client, la marque de condiments à base de piment Piiquante, veut développer une application web de critique des sauces piquantes appelée « Hot Takes » .

![Deux piments rouges dans dans un bol, avec le nom en rouge ](https://user.oc-static.com/upload/2021/07/29/16275605596354_PiiquanteLogo.png)

Si la responsable produit de Piiquante souhaite à terme transformer l'application d'évaluation en une boutique en ligne, elle souhaite que la première version soit une « galerie de sauces » permettant aux utilisateurs de télécharger leurs sauces piquantes préférées et de liker ou disliker les sauces que d'autres partagent. Le front-end de l'application a été développé à l'aide d'Angular et a été précompilé après des tests internes, mais Piiquante a besoin d'un développeur back-end pour construire l'API.

Le délai est raisonnable, vous décidez donc d'accepter le projet. Après avoir rencontré Paula, la cheffe de produit de Piiquante, elle vous envoie l’email suivant :

> **Objet :** Besoins pour l'API
> **De :** Paula Z
> **À :** Vous
>
> Bonjour,
>
> Nous sommes ravis que vous contribuiez à cette nouvelle application web ! Nous sommes une petite marque, donc ce projet aura un impact important sur notre croissance.
>
> Vous trouverez ci-joint les spécifications pour l'API. Vous pouvez également trouver un lien vers le repo du projet ici où vous aurez accès à l'interface.
>
> Merci de faire particulièrement attention aux exigences en matière de sécurité. Nous avons récemment été victimes d'attaques sur notre site web et nous voulons être sûrs que l'API de cette application est construite selon des pratiques de code sécurisées. Tous les mots de passe des utilisateurs recueillis par l'application doivent être protégés !
>
> Cordialement,
>
> Paula Z
> Cheffe de produit
> Piiquante
>
> > **Pièce jointe :**
> >
> > - [Requirements](https://s3.eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P6/Requirements_DW_P6.pdf)

Vous êtes prêt à vous lancer dans l'API ! C’est parti !

> ### Rappel
>
> Pour vous aider à compléter ce projet, vous pouvez suivre cet exemples des étape clés pour le projet. Vous trouverez des recommandations, des outils ou des ressources utiles pour chaque étape.

![Bannière livrables](https://user.oc-static.com/upload/2022/06/27/16563220599551_Banner_Livrables.png)

- Un fichier zip contenant le code de l'API.

> ### Rappel
>
> Pour faciliter votre passage devant le jury, déposez sur la plateforme, dans un dossier ZIP nommé **“Titre_du_projet_nom_prénom”**, tous les livrables du projet comme suit : **Nom_Prénom_n° du livrable_nom du livrable\_\_date de démarrage du projet**. Cela donnera :
>
> - Nom_Prénom_1_code_mmaaaa ;
>
> Par exemple, le premier livrable peut être nommé comme suit : Dupont_Jean_1_code_012022.

![Bannière soutenance](https://user.oc-static.com/upload/2022/06/22/16559012528213_Banner_Soutenance_Dev.png)

Pendant la présentation orale, votre évaluateur jouera le rôle de Paula, la cheffe de produit de Piiquante. L'évaluateur challengera vos décisions, préparez-vous donc à défendre votre travail.

> ### Info
>
> Lorsque votre évaluateur aura téléchargé votre code, il exécutera “npm install” à partir de la racine du projet. Il doit ensuite être en mesure d'exécuter le serveur node (ou le serveur nodemon) pour faire tourner votre API.

La présentation sera structurée comme suit :

- **Présentation des livrables (15 minutes)**

  - Expliquez le fonctionnement de votre code, en particulier les éléments qui ne peuvent pas être vérifiés à l'aide de l'application front-end, comme votre middleware d'authentification. Vous devrez partager votre écran pour faire votre démonstration.
  - Expliquez la structure de votre code (contrôleurs, routeurs, etc.) et les raisons pour lesquelles vous avez choisi cette structure spécifique.
  - Expliquez vos méthodes pour sécuriser la base de données selon le RGPD et l’OWASP.

- **Discussion (10 minutes)**

  - Jouant le rôle du cheffe de produit, l'évaluateur vous posera des questions sur votre méthodologie et votre livrable. Par exemple, il peut vous challenger sur :
    - Votre choix de versions de logiciels, de plugins et de services.
    - Votre approche pour protéger les données des utilisateurs et sécuriser l'API.

- **Débriefing (5 minutes)**
  - À la fin de la session, l'évaluateur cessera de jouer le rôle du cheffe de produit afin que vous puissiez débriefer ensemble.

> ### Attention
>
> Votre présentation devra durer 15 minutes (+/- 5 minutes). Puisque le respect des durées des présentations est important en milieu professionnel, les présentations en dessous de 10 minutes ou au-dessus de 20 minutes peuvent être refusées.

#### Compétences évaluées

- Implémenter un modèle logique de données conformément à la réglementation
- Mettre en œuvre des opérations CRUD de manière sécurisée
- Stocker des données de manière sécurisée
