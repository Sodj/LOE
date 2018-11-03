# Deploy locally:

- Set `homepage: "./"` in `package.json`
- Comment "Prod" and uncomment "Dev" lines in `main.js`
- `$ npm start` &emsp; app will be available in http://localhost:3000
- `$ npm run e` &emsp; app will be available in Electron

# Deploy for browser (in server):

- Set `homepage: "/"` in `package.json` (if app is in server root)
- Set `homepage: "/FOLDER_NAME/"` in `package.json` (if app is in folder)
- `$ npm build` &emsp; app will be in `/build` folder

# Deploy for browser (without server):

> Warning: this is for test only and is unrecommended for everyday use to avoid data loss
- Set `homepage: "./"` in `package.json`
- Set `const Router = HashRouter;` in `index.js`
- `$ npm build` &emsp; app will be in `/build` folder, just open index.html

# Deploy for electron:

- Set `homepage: "./"` in `package.json`
- Comment "Dev" and uncomment "Prod" lines in `main.js`
- `$ npm build` &emsp; app will be in `/build` folder
- `$ npm run package-mac` &emsp; package the app for Mac
- `$ npm run package-win` &emsp; package the app for Windows
- `$ npm run package-linux` &emsp; package the app for Linux