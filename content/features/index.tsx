import { ChangeLang } from "@/features/change-lang";
import { ChangeTheme } from "@/features/change-theme";

export const features = (translate_func: Function) => [
  {
    name: "theme",
    attributes: {
      name: translate_func('theme'),
      description: "Выбери удобную для тебя тему приложения."
    },
    component: <ChangeTheme/>,
    available_list: {
      // todo: add a diffirent themes
    }
  },
  {
    name: "language",
    attributes: {
      name: translate_func('language'),
      description: "Выбери язык (изменения произойдут после перезагрузки приложения)"
    },
    component: <ChangeLang/>,
    available_list: [
      "english", "russian"
    ]
  }
]