# 📒 Installation

## 🏒 Préparation de l'environnement (Windows)

### Logiciels requis

1. [Télécharger git](https://git-scm.com/download/win)
2. [Télécharger MongoDB](https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-6.0.0-signed.msi)
3. [Télécharger NodeJS](https://nodejs.org/dist/v16.16.0/node-v16.16.0-x64.msi)
4. [Télécharger Visual Studio](https://visualstudio.microsoft.com/fr/thank-you-downloading-visual-studio/?sku=Community&channel=Release&version=VS2022&source=VSLandingPage&cid=2030&passive=false)
    - Installer les composants _Windows desktop development with C++_


## 🔃 Récupération du projet

### Création des nouveaux dossiers

```powershell
mkdir MonServeur
```

> _Cloner depuis le dossier racine_

```
git clone https://git.cenne.xyz/fivem/base.git ./
```

## 📒 Installation de l'artefact

### Créer le dossier `server`

```powershell
mkdir server
cd server
```

### ⤵️ Téléchargement de l'artefact

> _Décompresser le fichier [téléchargé](https://runtime.fivem.net/artifacts/fivem/build_server_windows/master/5878-a5c270439ddb3bbb1fc4e7d02cb5593be84a9b89/server.7z) dans le dossier `server`_

```powershell
Invoke-WebRequest -Uri "https://runtime.fivem.net/artifacts/fivem/build_server_windows/master/5878-a5c270439ddb3bbb1fc4e7d02cb5593be84a9b89/server.7z" -OutFile "server.7z"
```

## 🧰 Préparation du noyau

```powershell
cd data\resources\tsv\src
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
EXECUTION_MODE="development"|"test"|"safemode"|"production"
SECRET_KEY=string
IDENTIFIER_TYPE=string
DEBUG_MODULES=Array<string>
DB_HOST=string
DB_PORT=number
DB_NAME=string
DB_USER=string
DB_PASSWORD=string
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
+set sv_maxclients 128 +set sv_hostname "Mon super serveur"
+set sv_master="" +set svgui_disable true sets locale "FR-FR"
```
# 💡 Liens utilies
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
10. 📎 [GFX Sources](https://cenne.xyz/44948c3589/s/ytRoG76Ld7iLgR9/download/EVERYTHING.rar)
## Outils
### 3D
1. [Code Walker](https://github.com/dexyfex/CodeWalker)
2. [OpenIV](https://openiv.com/)
3. [Props vizualizer](https://mwojtasik.dev/tools/gtav/objects)
4. [YMAP &YBN Mover](https://forum.cfx.re/t/tool-ymap-ybn-mover/307344)
5. [GTA Handling](https://files.gta5-mods.com/uploads/gtav-handling-editor/ac2d6b-GTAV%20Handling%20Editor%201.7.zip)
6. [Recherche de props par hash (Pleb Master)](https://plebmasters.de/?app=objects)
7. [Cloth Tool](https://www.gta5-mods.com/tools/alt-v-cloth-tool-addon-clothes-dlc-generator)
8. [GIMS Evo](https://files.gta5-mods.com/uploads/gims-evo-with-gta-v-support/76198a-Manual.install.rar)