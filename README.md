[![Netlify Status](https://api.netlify.com/api/v1/badges/fd20f916-72b2-493c-8417-e14fe3ceff0f/deploy-status)](https://app.netlify.com/sites/kind-euclid-dcefd3/deploys)

![Parahyba Valley logo](https://parahybavalley.org/9ab7979ccf0ea8912cdc10d1f927085f.png)

# Introdução
O Parahyba Valley é um projeto para ajudar a divulgar as empresas e projetos do Vale do Paraíba.

# Setup

## Com docker

Suba o container da aplicação:
```shell
docker-compose up -d app
```

Instale as dependências:
```shell
docker-compose exec app yarn
```

Inicie a aplicação:
```shell
docker-compose exec app npm run start
```

## Sem docker

Instale as dependências:
```shell
yarn install
```

Execute a aplicação:
```shell
npm run start
```

Com isso temos o front rodando em `http://localhost:9001/` e o back em `http://localhost:9000/`.

# Framework pv-parahyba
O pv-parahyba framework é responsável por compilar o projeto, rodar o motor de diretrizes e controlar os estados dos seus componentes.

## Criando um component
Para criar um component, faça crie uma classe para seu componente e faça o extends da classe PVComponent.
```typescript
import PVComponent from "~/pv-parahyba/extends/pv-component";
```

### Gerenciando os estados do componente
Os **PVComponents** trabalham com _states_, sabendo exatamente o momento de recompilar sem precisar ficar escutando por alguma mudança em uma variável.
Para criar um state basta chamar a função _stState_ passando a chave e o valor no qual queremos alterar:
```typescript
this.setState({ var1: 'teste' });
```

### Renderizando o componente
Dentro do _constructor_ do seu componente será necessário chamar um `super()` referente ao _extends_ do **PVComponent**. No `super` você precisa passar um objeto contendo o atributo `templatePath` indicando o caminho dos arquivos do seu componente. É preciso colocar o caminho a partir da pasta `/app/`:
```typescript
super({ componentPath: 'components/slider' })
```

### Passando atributos para um componente
Para atribuir um atributo para um componente basta colocar uma propriedade na _tag_ do elemento. Para pegar um valor do state, precisamos colocar : na frente do atributo. Sendo a propriedade o nome da _property_ chamada dentro do elemento no qual você está representando pela _tag_ e o valor da propriedade é o caminho do valor dentro do seu _state_.
```html
<slider :startups="startups"></slider>
```

### Click listeners
Para atribuir um listener de click em um elemento basta colocar **PVClick** na _tag_ do elemento, passando o nome da função e seus possiveis parâmetros.

Caso coloque apenas o nome da função: 
```html
<button PVClick="teste"></button>
```
Ao clicar no botão, a função teste será chamada passando  o evento nativo do JS.

Caso você coloque também os parâmetros: 
```html
<button PVClick="teste(1, index)"></button>
```
A função teste será chamada passando 1 como argumento e será esperado que a variável _index_ exista dentro do escopo do componente, pois o valor do mesmo será passado.

### PVFor
Para realizar a repetição de um elemento basta adicionar o atributo **PVFor** ao elemento, passando como valor o nome da chave no escopo na qual será acessada no template e o array dentro do state:
```html
<div class="slider__slides__item" pvFor="slide in slides">
```

### PVIf
Para exibir ou não um elemento basta adicionar a tag **PVIf** ao elemento, passando como valor o caminho no qual corresponde a condição.
Para negar uma condição, adicione `!` na frente do parâmetro:
```html
<span pvIf="slide.data.teste" >show me if slide.data.teste exists</span>
<span pvIf="!slide.data.teste" >show me if slide.data.teste is blank</span>
```
