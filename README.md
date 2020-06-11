# Sis MEI - SaaS

## Descrição

Este projeto é referente ao frontend do TCC de Ciência da Computação dos alunos Matheus Cintra, Lucas Mancini e João Miranda. Nosso projeto, é um sistema do tipo SaaS, no qual um microempreendedor individual poderá ter controle sobre seus
serviços prestados. Também terá controle sobre seus clientes, bem como informações
em forma de gráfico com informações relevantes como vendas, clientes, caixa.

## Tecnologias

- NodeJS - Um ambiente de execução JavaScript assíncrono orientado a eventos, o Node.js é projetado para desenvolvimento de aplicações escaláveis de rede.

- MongoDB - MongoDB é um software de banco de dados orientado a documentos livre, de código aberto e multiplataforma, escrito na linguagem C++.

- ReactJS - Uma biblioteca JavaScript de código aberto com foco em criar interfaces de usuário em páginas web. É mantido pelo Facebook, Instagram, outras empresas e uma comunidade de desenvolvedores individuais. É utilizado nos sites da Netflix, Imgur, Feedly, Airbnb, SeatGeek, HelloSign, Walmart e outros.

- Express - Uma estrutura de aplicativo da Web para o Node.js, lançada como software livre e de código aberto sob a Licença MIT. Ele foi projetado para criar aplicativos da Web e APIs.

## Como rodar o Frontend

Ao clonar o repositório, você deverá preencher o arquivo `.env` com as variáveis de ambiente. Existe um arquivo chamado `.env-example` com as variáveis que deverão ser preenchidas.

Após isso, deverá ser instalado os pacotes necessários para a aplicação, com o seguinte comando:

### `yarn install`

Feito isso, basta rodar o projeto com:

### `yarn start`

Feito isso, será aberta uma aba em seu navegador em modo de desenvolvedor, na seguinte URL: [http://localhost:300](http://localhost:300). Qualquer alteração realizada no código, a página será automaticamente recarregada.

<!-- ### `yarn test` -->

<!-- Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information. -->

Para gerar a build de produção do projeto, rode o seguinte comando:

### `yarn build`

Irá gerar todos os arquivos necessário para subir o projeto para Internet. Os arquivos ficarão salvos na pasta `build`.
