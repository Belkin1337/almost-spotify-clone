const about = (translate_func: Function) => {
  return [
    {
      content: translate_func("about-widgets.explore"),
      image: "/images/headphones.jpg",
    },
    {
      content: translate_func("about-widgets.connect"),
      image: "/images/people-listen.jpg",
    },
    {
      content: translate_func("about-widgets.connect"),
      image: "/images/people-listen-metro.jpg",
    },
  ];
};

const listComponents = (translate_func: Function) => {
  return [
    {
      name: translate_func("main"),
      route: "/",
    },
    {
      name: translate_func("about"),
      route: "/about",
    },
    {
      name: translate_func("start"),
      route: "/home",
    },
  ];
};

const widgets = (translate_func: Function) => {
  return [
    {
      title: translate_func("content.widgets.high-quality.title"),
      content: translate_func("content.widgets.high-quality.content"),
      image: "/images/music_card1.jpeg"
    },
    {
      title: translate_func("content.widgets.new-artists.title"),
      content: translate_func("content.widgets.new-artists.content"),
      image: "/images/music_card2.jpg"
    },
    {
      title: translate_func("content.widgets.new-genres.title"),
      content: translate_func("content.widgets.new-genres.content"),
      image: "/images/music_card3.jpg"
    },
  ];
};

export { 
  about,
  listComponents,
  widgets
}