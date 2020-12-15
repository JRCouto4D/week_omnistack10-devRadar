<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="assets/devradar.svg" width="347px" />
</h1>

<h3 align="center">
  Semana OmniStack 10: DevRadar (Backend, FrontEnd e Mobile)
</h3>


# Instruções para executar a aplicação.

Faça o download do repositório e siga as instruções:

## Ambiente 

Este procedimento foi testado usando o Windows 10 e o Expo.

Para criação das bases de dados foi utilizado o mongoDb.

## Backend

duplique o arquivo .env.example que se encontra na raiz da pasta backend salve com o nome .env e preencha a variável MONGO_URL de acordo com a configuração da sua base de dados.

utilizando o terminal acesse a pasta backend e rode o seguinte comando para instalar as dependências do projeto.

```
  yarn
```

É hora de subir o servidor: rode o seguinte comando na raiz da pasta backend:
```
yarn dev
```

Pronto, o backend já está pronto para o uso, agora vamos para a parte web da aplicação.


### tecnologias aprendidas e aplicadas

- Node
- Nodemon
- Mongoose
- Axios
- Socket.io

## WEB

Rode o seguinte comando na raiz da pasta frontend para instalar as dependencias

```
  yarn
```
Agora para iniciar a aplicação WEB basta rodar:

```
  yarn start
```

A aplicação vai se iniciar na tela de cadastro. Para fazer o cadastro basta preencher o formulário com o nome de usuário do github, as tecnologias que o dev trabalha, e as cordenadas(latitudo e longitude) da sua localização.

### tecnologias aprendidas e aplicadas

- ReactJS
- Axios

## Mobile

Acesse a pasta mobile e rode o seguinte comando para instalar as dependências

```
  yarn
```

Agora basta iniciar a aplicação 

```
yarn start
```

Com o aplicativo do <a hfer="https://docs.expo.io/">Expo</a> instalado no seu celular, basta scanear o QR code gerado na aba que foi aberta do navegador.

### tecnologias aprendidas e aplicadas

- Expo
- Expo-location
- React-native-maps
- React-native-webview
- Socket.io-client
- styled-components