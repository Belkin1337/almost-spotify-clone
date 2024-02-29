export const about = (a_lang: Function) => {
  return [
    {
      content: a_lang("about-widgets.explore"),
      image: "/images/headphones.jpg",
    },
    {
      content: a_lang("about-widgets.connect"),
      image: "/images/people-listen.jpg",
    },
    {
      content: a_lang("about-widgets.connect"),
      image: "/images/people-listen-metro.jpg",
    },
  ];
};

export const listComponents = (headerLocale: Function) => {
  return [
    {
      name: headerLocale("main"),
      route: "/",
    },
    {
      name: headerLocale("about"),
      route: "/about",
    },
    {
      name: headerLocale("start"),
      route: "/home",
    },
  ];
};

export const widgets = (brandLocale: Function) => {
  return [
    {
      title: brandLocale("content.widgets.high-quality.title"),
      content: brandLocale("content.widgets.high-quality.content"),
      image: "/images/music_card1.jpeg"
    },
    {
      title: brandLocale("content.widgets.new-artists.title"),
      content: brandLocale("content.widgets.new-artists.content"),
      image: "/images/music_card2.jpg"
    },
    {
      title: brandLocale("content.widgets.new-genres.title"),
      content: brandLocale("content.widgets.new-genres.content"),
      image: "/images/music_card3.jpg"
    },
  ];
};