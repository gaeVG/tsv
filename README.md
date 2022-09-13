# 📒 Installation

## 🏒 Préparation de l'environnement (Windows)

### Logiciels requis

1. [Télécharger git](https://git-scm.com/download/win)
2. [Télécharger MongoDB](https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-6.0.0-signed.msi)
3. [Télécharger NodeJS](https://nodejs.org/dist/v16.16.0/node-v16.16.0-x64.msi)

## 🎛️ Paramétrage de git

> _Ajouter les informations de connexion au dépot_

```
git config user.name "NAME"
git config user.mail MAIL@ADRESSE.COM
```

## 🔃 Récupération du projet

### Création des nouveaux dossiers

```powershell
mkdir EvilParadise
```

> _Cloner depuis le dossier racine_

```
git clone https://git.cenne.xyz/evilparadise/base.git ./
```

## 📒 Installation de l'artefact

### Créer le dossier `server`

```powershell
mkdir server
cd server
```

### ⤵️ Téléchargement de l'artefact

> _Décompresser le fichier [téléchargé](https://runtime.fivem.net/artifacts/fivem/build_server_windows/master/5562-25984c7003de26d4a222e897a782bb1f22bebedd/server.7z) dans le dossier `server`_

```powershell
Invoke-WebRequest -Uri "https://runtime.fivem.net/artifacts/fivem/build_server_windows/master/5562-25984c7003de26d4a222e897a782bb1f22bebedd/server.7z" -OutFile "server.7z"
```

## 🧰 Préparation du noyau

```powershell
cd data\resources\ts_paradise\src
npm i
npm i -g yarn
# Pour compiler la ressource sur le serveur de production :
yarn build
# Pour développper et compiler automatiquement la ressource :
yarn watch
```

### Configuration du noyau

> 📘 _Créer le fichier d'environnement `.env` à la racine de la ressource et renseigner les informations correspondantes_

```
NODE_ENV ["development"|"test"|"production"]
SECRET_KEY=[string]
IDENTIFIER_TYPE=[string]
DEBUG_NODE_MODULES=[boolean]
DEBUG_MODULES=[Array<string>]
LOG_ERRORS=[boolean]
SAFE_MODE=[boolean]
DB_HOST=[string]
DB_PORT=[number]
DB_NAME=[string]
DB_USER=[string]
DB_PASSWORD=[string]
```

## 🎇 Premier lancement

> _Lancer le serveur depuis le dossier racine_

```
./server/FXServer.exe +set txDataPath ./server/txData/ +set serverProfile dev
```

## ✂️ Configuration du serveur

Les instructions suivantes sont à compléter sur _txAdmin_ dans le champ **Aditionnals Argument** dans la configuration du serveur :

```
+exec permissions.cfg +set sv_licenseKey LICENSE_FIVEM +set steam_webApiKey "STEAM_API"
+set sv_maxclients 128 +set sv_hostname "😈 Evil (Dev) Paradise"
+set sv_master="" +set svgui_disable true sets locale "QC-FR"
```

# 🖥️ Developpement

## ⚙️ Gestion des threads

```ts
import _t from "@config/i18n";
import { tsp } from '@client';

tsv.threads.createThread({
    name: "exempleTick",
    timer: 1000,
    callback: () => {
        const player = new Player();
        tsv.log.debug({
            namespace: "Exemple",
            container: "Function",
            location: "exempleTick()",
            message: _t('exemple.tick.message', { playerName: player.Name })
        });

        return player.serverId === 0 false : true;
    }
});
```

## 🎉 Gestion des évènements

### Enregistrement :

```ts
// Server

tsv.events.listen({
    name: 'exempleEvent',
    module: 'exemple',
    handler: (data) => {
        tsv.log.debug({
            ...log,
            message: _t('exemple.event.message', { data: data })
        });
    }
)}

// Server <-> Client
tsv.events.listen({
    name: 'exempleEvent',
    module: 'exemple',
    onNet: true,
    handler: (data) => {
        tsv.log.debug({
            ...log,
            message: _t('exemple.event.message', { data: data })
        });
    }
)}
```

### Déclenchement :

```ts
// Local
tsv.event.trigger({ name: "exempleEvent" });

// Server <-> Client
tsv.event.trigger({ name: "exempleEvent", onNet: true });

// Callback
tsv.event.trigger({
  name: "exempleEvent",
  onNet: true,
  data: [data],
  callback: (result: any) => {
    tsv.log.debug({
      ...log,
      message: _t("exemple.event.message", { result: result }),
    });
  },
});
```

# 💡 Liens utilies

### EvilParadise

1. [Panneau d'administration](https://txa.evilparadise.com)
2. [**Wiki** du serveur](https://evilparadise.nohost.me/project/evilparadise/base/-/wikis/Wiki-du-serveur)
3. [Vêtements et cheveux de Evil Paradise](https://docs.google.com/spreadsheets/d/103Zc4YEipFxzcA0Jn4AckE-whrcEuI0JviPUNEA4Src/edit#gid=1209004457)

---

### FiveM

1. [Game référence (FiveM Documentation)](https://docs.fivem.net/docs/game-references/)
2. [FiveM Natives References](https://runtime.fivem.net/doc/natives/?n_CFX)
3. [FiveM Wiki User](https://github.com/jorjic/fivem-docs/wiki)
4. [Weapons Models (GTANet)](https://wiki.gtanet.work/index.php?title=Weapons_Models)
5. [Vehicles Models (GTANet)](https://wiki.gtanet.work/index.php?title=Vehicle_Models)
6. [GTA Dumps (Github)](https://github.com/DurtyFree/gta-v-data-dumps)
7. [Online Interiors and locations](https://wiki.gtanet.work/index.php?title=Online_Interiors_and_locations)
8. [Animations List](https://alexguirre.github.io/animations-list/)
9. [Grand Theft Data](http://grandtheftdata.com)

## Outils

### 3D

1. [Code Walker](https://github.com/dexyfex/CodeWalker)
2. [OpenIV](https://openiv.com/)
3. [Props vizualizer](https://mwojtasik.dev/tools/gtav/objects)
4. [YMAP &YBN Mover](https://forum.cfx.re/t/tool-ymap-ybn-mover/307344)
5. [GTA Handling](https://files.gta5-mods.com/uploads/gtav-handling-editor/ac2d6b-GTAV%20Handling%20Editor%201.7.zip)
6. [Recherche de props par hash (Pleb Master)](https://plebmasters.de/?app=objects)
7. [Cloth Tool](https://www.gta5-mods.com/tools/alt-v-cloth-tool-addon-clothes-dlc-generator)
8. [3DSMax 2020 (torrent)](https://cdn.discordapp.com/attachments/530835585460469773/727829981232889881/Autodesk_3ds_Max_2020__Update_2020.3RePack.torrent)
   - [GIMS Evo](https://files.gta5-mods.com/uploads/gims-evo-with-gta-v-support/76198a-Manual.install.rar)

### Développement

1. [Lua Beautifer](https://goonlinetools.com/lua-beautifier/)
