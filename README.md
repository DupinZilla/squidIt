# Squid Teste tecnico

Programa criado na intenção de provar meus conhecimentos para a empresa Squid


## Install

```sh
$ npm install
```

## Usage

__Coloque seu clientID e clientSecret em server/modules/instagram/api/controller.js :__

```javascript
var Instagram = require('../model');
var request = require("request");
var clientID = "SEUCLIENTID";
var clientSecret = "SEUSECRET";
var redirect_uri = "http://localhost:3000/api/instagram/callbackAuthentication";
```

## Minificando

```sh
$ gulp
```

Após rodar o comando acima, os controllers e demais arquivos serão minificados e armazenado em public/dist/build-min.js ,
basta chama-lo no index.js e no login.js (ele ja esta usando a versão minificada)

## Nuvem

- Clique [aqui](https://www.npmjs.com/package/path-parser) para acessar o projeto que esta na nuvem
