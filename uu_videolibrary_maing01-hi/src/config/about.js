import UU5 from "uu5g04";

export const About = {
  about: {
    cs: [
      `<uu5string/>uuVideoLibrary je online aplikace pro sdílení odkazů na vzdělávací videa mezi studenty Unicorn University. Aplikace umožňuje studentům zveřejňovat odkazy na vzdělávací videa, sdílet podrobnosti o videu, upravovat podrobnosti nebo hodnotit video. Studenti také můžou vyhledávat podle kategorií. Každé nové registrované video musí být schváleno administrátorem. Studenti mají zájem o sdílení know-how mezi sebou a uuVideoLibrary je tím nejlepším řešením.`
    ],
    en: "uuVideoLibrary is an online application for sharing links to educational videos between students of Unicorn University. The application will enable students to post links to educational videos, share details about video, edit details or rate video. Students will also be able to search by categories. Each new registered video must be approved by the administrator. Students are keen on sharing know-how between themselves and uuVideoLibrary is the best solution for it.",
  },
  licence: {
    termsOfUse: "https://unicorn.com/tou/your_product",
    organisation: {
      cs: {
        name: "Unicorn a.s.",
        uri: "https://www.unicorn.com/",
      },
      en: {
        name: "Unicorn a.s.",
        uri: "https://www.unicorn.com/",
      },
    },
    authorities: {
      cs: [
        {
          name: "Name Surname",
          uri: "https://www.unicorn.com/",
        },
      ],
      en: [
        {
          name: "Name Surname",
          uri: "https://www.unicorn.com/",
        },
      ],
    },
  },
  leadingAuthors: [
    {
      name: "Tomáš Tichý",
      uuIdentity: "2242-1472-1",
      role: {
        en: "Developer",
      },
    },
    {
      name: "Edward Feldek",
      uuIdentity: "7168-8915-1",
      role: {
        en: "Developer",
      },
    },
  ],
  otherAuthors: [
    {
      name: "Patrik Sekerka",
      uuIdentity: "8995-9337-1",
      role: {
        en: "Developer",
      },
    },
    {
      name: "Miron Kuchynka",
      uuIdentity: "9886-6835-1",
      role: {
        en: "Developer",
      },
    },
  ],
  usedTechnologies: {
    technologies: {
      en: [
        <UU5.Bricks.LinkUAF key="uaf" />,
        <UU5.Bricks.LinkUuApp key="uuapp" />,
        <UU5.Bricks.LinkUU5 key="uu5" />,
        <UU5.Bricks.LinkUuPlus4U5 key="uuplus4u5" />,
        <UU5.Bricks.Link
          content="uuProductCatalogue"
          href="https://uuapp.plus4u.net/uu-bookkit-maing01/7f743efd1bf6486d8e72b27a0df92ba7/book"
          target="_blank"
          key="uuproductcatalogue"
        />,
        <UU5.Bricks.LinkUuAppServer key="uuappserver" />,
        <UU5.Bricks.LinkUuOIDC key="uuoidc" />,
        <UU5.Bricks.LinkUuCloud key="uucloud" />,
      ],
    },
    content: {
      cs: [
        `<uu5string/>Dále byly použity technologie: <UU5.Bricks.LinkHTML5/>, <UU5.Bricks.LinkCSS/>, <UU5.Bricks.LinkJavaScript/>, <UU5.Bricks.LinkBootstrap/>,
        <UU5.Bricks.LinkReact/>, <UU5.Bricks.LinkRuby/>, <UU5.Bricks.LinkPuma/> a <UU5.Bricks.LinkDocker/>.
        Aplikace je provozována v rámci internetové služby <UU5.Bricks.LinkPlus4U/> s využitím cloudu <UU5.Bricks.LinkMSAzure/>.
        Uživatelská dokumentace aplikace je popsána v knize <UU5.Bricks.Link href="" target="_blank" content='"Zde doplňte odkaz na dokumentaci"' />.
        Technickou dokumentaci lze nalézt v knize <UU5.Bricks.Link href="" target="_blank" content='"Zde doplňte odkaz na dokumentaci"' />.`,
      ],
      en: [
        `<uu5string/>Other used technologies: <UU5.Bricks.LinkHTML5/>, <UU5.Bricks.LinkCSS/>, <UU5.Bricks.LinkJavaScript/>, <UU5.Bricks.LinkBootstrap/>,
        <UU5.Bricks.LinkReact/>, <UU5.Bricks.LinkRuby/>, <UU5.Bricks.LinkPuma/> a <UU5.Bricks.LinkDocker/>.
        Application is operated in the <UU5.Bricks.LinkPlus4U/> internet service with the usage of <UU5.Bricks.LinkMSAzure/> cloud.
        The application user guide is located in <UU5.Bricks.Link href="" target="_blank" content='"Documentation link put here"' />.
        Technical documentation can be found in <UU5.Bricks.Link href="" target="_blank" content='"Documentation link put here"' />.`,
      ],
    },
  },
};

export default About;
