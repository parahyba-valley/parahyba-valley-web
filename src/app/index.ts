import './index.scss';
import PVComponent from '~/pv-parahyba/extends/pv-component';
import Slider from '~/app/components/slider';
import Header from '~/app/components/header';
import Cities from '~/app/components/cities';
import Footer from '~/app/components/footer';
import Copyright from '~/app/components/copyright';
import StartupsService from '~/app/services/startups-service';

const COMPONENTS = {
  slider: Slider,
  header: Header,
  cities: Cities,
  footer: Footer,
  copyright: Copyright,
};

export default class Index extends  PVComponent {
  constructor(container: HTMLElement) {
    super({ components: COMPONENTS });
    // StartupsService
    //   .getAll()
    //   .then((response) => {
    //     const startups = response.sort(() => .5 - Math.random());
    //     this.state = { startups };
    //     this.render(container);
    //   });

      this.state = { startups: [
        { data: {
          "profile_image":"https://cdn.startupbase.com.br/uploads/startups/2018/11/aqui-emprestimo.png",
          "name":"AQUI Empréstimo",
          "description":"Somos uma empresa que a 2 anos oferece empréstimo consignado e pessoal, cartão de crédito e seguro. Sempre com atendimento diferenciado e personalizado focando em auxiliar na realização de projetos e sonhos dos nossos clientes.",
          "tags":[
          ],
          "slug":"aqui-emprestimo",
          "is_verified":0,
          "created_at":1543332836,
          "updated_at":1572976980,
          "employees":"1-5",
          "uf":"RJ",
          "state":"Rio de Janeiro",
          "city":"Barra do Piraí",
          "place":"Barra do Piraí - RJ",
          "is_active":1,
          "badges":[
          ],
          "segments":null,
          "objectID":"a64a2287-2f32-4710-a8d4-d99f53a0b889"
        }},
        { data: {
          "profile_image":"https://cdn.startupbase.com.br/uploads/startups/2018/10/toca-logo.png",
          "founded_at":"27/08/2017",
          "name":"Toca Logo",
          "description":"Somos um marketplace para contratação de músicos, ​fazendo a ponte com quem queira contratar, a fim de simplificar a vida de ambos.\r\nPara o artista, essa é a sua oportunidade apresentar o seu trabalho e valor para o mundo.\r\nSe você está a procura de diversidade musical e qualidade para seu estabelecimento ou evento particular, aqui é o lugar certo!\r\nFomos vencedores do primeira Startup Weekend Sul Fluminense, evento fomentado pela Google para empreendedorismo.",
          "tags":[
            "música",
            "IA",
            "App",
            "contratação"
          ],
          "slug":"toca-logo",
          "is_verified":0,
          "created_at":1538469701,
          "updated_at":1572976920,
          "employees":"6-10",
          "business_target":"B2B2C",
          "business_phase":"Operação",
          "business_model":"Marketplace",
          "uf":"RJ",
          "state":"Rio de Janeiro",
          "city":"Barra do Piraí",
          "place":"Barra do Piraí - RJ",
          "is_active":1,
          "badges":[
          ],
          "segments":{
            "primary":"Eventos e Turismo"
          },
          "objectID":"51369891-d4ab-47a5-b968-3fa512f242ec"
        }},
        { data: {
          "profile_image":"https://cdn.startupbase.com.br/uploads/startups/2018/07/deliveryon.png",
          "founded_at":"05/10/2017",
          "name":"DeliveryOn",
          "short_description":"Os melhores deliveries de sua cidade em um único lugar. Nosso aplicativo oferece comodidade e praticidade na realização de pedidos de comida.",
          "description":"O DeliveryOn é uma plataforma online para realização de pedidos que pretende alavancar e otimizar a gestão de estabelecimentos com delivery de comida, bem como oferecer praticidade e comodidade para usuários realizarem seus pedidos através do nosso aplicativo.\n\nMissão: Alavancar vendas para estabelecimentos de Delivery promovendo-os e provendo comodidade e praticidade na realização de pedidos e otimizar a gestão do negócio.\n\nVisão: Promover os estabelecimentos de Delivery, através da nossa base de usuários crescente, impulsionando suas vendas e centralizando todos os pedidos em uma única plataforma de gestão, sejam eles realizados pelo celular, tablet, computador, telefone ou em seu próprio estabelecimento.",
          "tags":[
            "Internet",
            "Mobile"
          ],
          "slug":"deliveryon",
          "is_verified":0,
          "created_at":1509148800,
          "updated_at":1572976832,
          "employees":"6-10",
          "business_target":"B2B2C",
          "business_phase":"Operação",
          "business_model":"Marketplace",
          "uf":"RJ",
          "state":"Rio de Janeiro",
          "city":"Barra do Piraí",
          "place":"Barra do Piraí - RJ",
          "is_active":1,
          "badges":[
          ],
          "segments":{
            "primary":"Produtos de Consumo"
          },
          "objectID":"0374b388-0f8f-44d5-a91b-a5ead2cee74c"
        }},
        { data: {
          "name":"Upnid",
          "tags":[
          ],
          "slug":"upnid",
          "is_verified":0,
          "created_at":1542845889,
          "updated_at":1572976974,
          "employees":"1-5",
          "uf":"RJ",
          "state":"Rio de Janeiro",
          "city":"Barra do Piraí",
          "place":"Barra do Piraí - RJ",
          "is_active":1,
          "badges":[
          ],
          "segments":null,
          "objectID":"2775faf9-2801-4ed6-b411-1b3c2d0ae913"
        }},
        { data: {
          "founded_at":"30/09/2015",
          "name":"RJS Construtora LTDA",
          "description":"A RJS Construtora cria empreendimentos construindo apartamentos populares para serem oferecidos para pessoas de baixa e média renda. E assim que houver uma estabilidade de capital buscar um crescimento com oferta de conjuntos habitacionais de luxo.",
          "tags":[
          ],
          "slug":"rjs-construtora-ltda",
          "is_verified":0,
          "created_at":1447950751,
          "updated_at":1572976912,
          "employees":"1-5",
          "business_phase":"Ideação",
          "business_model":"Outros",
          "uf":"RJ",
          "state":"Rio de Janeiro",
          "city":"Barra do Piraí",
          "place":"Barra do Piraí - RJ",
          "is_active":1,
          "badges":[
          ],
          "segments":{
            "primary":"Construção Civil"
          },
          "objectID":"81f6c8c8-7105-44a0-8dc5-9b6eaadee53d"
        }},
        { data: {
          "founded_at":"30/09/2012",
          "name":"Catálogos TEM",
          "description":"Plataforma de catálogos digitais organizados por cidade. Já estão no ar duas cidades: www.barratem.com.br (Barra do Piraí, RJ) e www.paracambitem.com.br (Paracambi, RJ) e os dados destes sites também podem ser encontrados no portal www.cidadestem.com.br.\r\nVamos construir uma franquia para que outros investidores utilizem a plataforma para implantar em cidades distantes do nosso escritório que fica no município de Mendes, RJ.\r\nPara o segundo semestre de 2015 pretendemos expandir para mais duas ou três cidades da região, além de implantar a atualização da plataforma.\r\nA plataforma conta com uma área administrativa que controla todo o conteúdo do site.",
          "tags":[
          ],
          "slug":"catalogos-tem",
          "is_verified":0,
          "created_at":1430779969,
          "updated_at":1572976901,
          "employees":"6-10",
          "business_phase":"Operação",
          "uf":"RJ",
          "state":"Rio de Janeiro",
          "city":"Barra do Piraí",
          "place":"Barra do Piraí - RJ",
          "is_active":1,
          "badges":[
          ],
          "segments":{
            "primary":"Internet"
          },
          "objectID":"53ba046e-c9b0-41c5-a9f1-f486bb33ff4a"
        }},
        { data: {
          "profile_image":"https://cdn.startupbase.com.br/uploads/startups/2019/04/lu8noiqbgmsbisxzxbhc.opt.png",
          "founded_at":"31/12/2013",
          "name":"BioSolvit",
          "description":"Fabricante de produtos derivados de fibra de palmeiras para reaproveitamento de resíduos da produção de palmito. BioBlue é um absorvente de hidrocarbonetos para realização de limpeza em derramamentos de petróleo. BioGreen é um xaxim para armazenamento de plantas, com diferencial em relação ao tradicional, por não prejudicar a saúde da planta.",
          "tags":[
          ],
          "slug":"biosolvit",
          "is_verified":1,
          "created_at":1542845887,
          "updated_at":1572976969,
          "employees":"6-10",
          "business_target":"B2C",
          "business_phase":"Tração",
          "business_model":"Hardware",
          "uf":"RJ",
          "state":"Rio de Janeiro",
          "city":"Barra Mansa",
          "place":"Barra Mansa - RJ",
          "is_active":1,
          "badges":[
            {
              "name":"STARTOUT",
              "profile_image":"https://cdn.startupbase.com.br/assets/images/badges/badge_startout.png"
            },
            {
              "name":"Troposlab",
              "profile_image":"https://cdn.startupbase.com.br/assets/images/badges/badge_troposlab.png"
            }
          ],
          "segments":{
            "primary":"Energia"
          },
          "objectID":"b3b36a2a-6ebe-4a26-8e65-9ba434a0c901"
        }},
        { data: {
          "profile_image":"https://cdn.startupbase.com.br/uploads/startups/2018/07/banco-mare.png",
          "founded_at":"10/08/2016",
          "name":"Banco Maré",
          "short_description":"O Banco Maré é uma startup social que atende regiões sem acesso ao sistema financeiro. ",
          "description":"O Banco Maré existe para facilitar o acesso a serviços financeiros, sem análises de crédito,consultas a cadastro de devedores e outras formas de exclusão financeira. Nosso propósito maior é simplificar para os mais simples.",
          "tags":[
            "Mobile"
          ],
          "slug":"banco-mare",
          "is_verified":0,
          "created_at":1509062400,
          "updated_at":1572976830,
          "employees":"11-20",
          "business_target":"B2C",
          "business_phase":"Operação",
          "business_model":"Consumer",
          "uf":"RJ",
          "state":"Rio de Janeiro",
          "city":"Barra Mansa",
          "place":"Barra Mansa - RJ",
          "is_active":1,
          "badges":[
            {
              "name":"Cubo",
              "profile_image":"https://cdn.startupbase.com.br/assets/images/badges/badge_cubo.png"
            },
            {
              "name":"Artemisia",
              "profile_image":"https://cdn.startupbase.com.br/assets/images/badges/badge_artemisia.png"
            }
          ],
          "segments":{
            "primary":"Finanças"
          },
          "objectID":"5b8a9184-a0c1-45f8-a5e8-c6c78ea0cf2f"
        }},
        { data: {
          "name":"RiskPro",
          "tags":[
          ],
          "slug":"riskpro",
          "is_verified":0,
          "created_at":1552647613,
          "updated_at":1572977017,
          "employees":"6-10",
          "business_phase":"Tração",
          "uf":"RJ",
          "state":"Rio de Janeiro",
          "city":"Barra Mansa",
          "place":"Barra Mansa - RJ",
          "is_active":1,
          "badges":[
          ],
          "segments":{
            "primary":"Indústria"
          },
          "objectID":"c85d9e39-82b9-44ce-bf8c-600cf132fb3c"
        }},
        { data: {
          "name":"NeoProj Soluções Tecnológica",
          "tags":[
          ],
          "slug":"neoproj-solucoes-tecnologica",
          "is_verified":0,
          "created_at":1543494153,
          "updated_at":1572977006,
          "employees":"1-5",
          "uf":"RJ",
          "state":"Rio de Janeiro",
          "city":"Barra Mansa",
          "place":"Barra Mansa - RJ",
          "is_active":1,
          "badges":[
          ],
          "segments":null,
          "objectID":"c92e2052-e8fa-42ac-9218-1eec010d5d26"
        }},
        { data: {
          "name":"Descont",
          "short_description":"Um mix entre cupons e suas modalidades,shop cupom Descont.\nUm simples cupom aqui!",
          "description":"Um mix entre cupons e suas modalidades,shop cupom Descont.\nUm simples cupom aqui!",
          "tags":[
          ],
          "slug":"descont",
          "is_verified":0,
          "created_at":1358035260,
          "updated_at":1572976874,
          "employees":"1-5",
          "business_phase":"Fora de Operação",
          "uf":"RJ",
          "state":"Rio de Janeiro",
          "city":"Barra Mansa",
          "place":"Barra Mansa - RJ",
          "is_active":0,
          "badges":[
          ],
          "segments":null,
          "objectID":"7f6ce1a4-7ac4-47ee-a778-117714840836"
        }}]
       };
      this.render(container);
  }
};
