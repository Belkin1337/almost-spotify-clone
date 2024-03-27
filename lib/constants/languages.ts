export const languages = (
  langLocale: Function, 
  changeLocale: Function
) => {
  return [
    {
      name: "RU",
      fullname: langLocale('ru'),
      onClick: changeLocale('ru'),
    },
    {
      name: "EN",
      fullname: langLocale('en'),
      onClick: changeLocale('en'),
    },
  ]
}