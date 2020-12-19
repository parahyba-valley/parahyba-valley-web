[![Netlify Status](https://api.netlify.com/api/v1/badges/fd20f916-72b2-493c-8417-e14fe3ceff0f/deploy-status)](https://app.netlify.com/sites/kind-euclid-dcefd3/deploys)
[Logo](https://parahybavalley.org/9ab7979ccf0ea8912cdc10d1f927085f.png)
# parahyba-valley-web

# parahyba-valley framework
O parahyba-valley framework é responsável por compilar o projeto, rodar o motor de diretrizes e controlar os estados dos seus componentes.

## Criando um component
Para criar um component, faça crie uma classe para seu componente e faça o extends da classe PVComponent (`import PVComponent from "~/pv-parahyba/extends/pv-component";`).

### Gerenciando os estados do componente
Os PVComponents trabalham com states, dessa forma, ele sabe exatamente o momento de recompilar, sem precisar ficar escutando por alguma mudança em uma variável.
Para criar um state, basta atribuir um atributo para o objeto state, da seguinte forma
```
this.state = { var1: 'teste' }
```

### Renderizando o componente
Dentro do constructor do seu componente, será necessário chamar um `super()` referente ao extends do PVComponent, no super, você precisa passar um objeto contendo o atributo `templatePath`, onde indica o caminho dos arquivos do seu componente. É preciso colocar o caminho a partir da pasta `/app/`.
ex: `super({ componentPath: 'components/slider' })`

### Passando atributos para um componente
Para atribuir um atributo para um componente, basta colocar uma propriedade na tag do elemento, sendo a propriedade o nome da property chamada dentro do elemento no qual você está representando pela tag, e o valor da propriedade é o caminho do valor dentro do seu state.
ex: `<slider startups="startups"></slider>`

### Click listeners
para atribuir um listener de click em um elemento, basta colocar PVClick na tag do elemento, passando o nome da função e seus possiveis parâmetros.
Caso coloque apenas o nome da função, ex: `<button PVClick="teste"></button>`, ao clicar no botão, a função teste será chamada passando  o evento nativo do JS, caso você coloque parâmetros, ex: `<button PVClick="teste(1, index)"></button>`, a função teste será chamada passando 1 como argumento e será esperado que a variável index exista dentro do escopo do componente, pois o valor do mesmo será passado.

### PVFor
Para realizar a repetição de um elemento, basta adicionar o atributo PVFor ao elemento, passando como valor, o nome da chave no escopo na qual será acessada no template e o array dentro do state na qual iremos repetir.
ex: `<div class="slider__slides__item" pvFor="slide in slides">`

### pvIf
Para exibir ou não um elemento, basta adicionar a tag PVIf ao elemento, passando como valor o caminho no qual corresponde a condição.
Para negar uma condição, adicione ! na frente do parâmetro.
ex: `<span pvIf="slide.data.teste" >don't show me</span>`
