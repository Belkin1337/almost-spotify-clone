import { getScopedI18n, getStaticParams } from "@/locales/server";
import { BackgroundIntro } from "./components/header/background";
import { setStaticParamsLocale } from "next-international/server";

interface WidgetItemProps {
  title: string,
  content: string,
}

const WidgetItem = ({ title, content }: WidgetItemProps) => {
  return (
    <div className="flex flex-col p-6 gap-y-2 w-full rounded-md border duration-200 border-neutral-700 bg-neutral-950 
    hover:bg-neutral-900 hover:duration-200">
      <p className="text-WHITE text-[1.6rem]">{title}</p>
      <p className="text-neutral-400 text-[1.4rem]">{content}</p>
    </div>
  )
}

export default async function Main({ params: { locale } }: { params: { locale: string } }) {
  setStaticParamsLocale(locale);
  const main_lang = await getScopedI18n('brand.main');

  const widgets = [
    { title: main_lang('content.widgets.high-quality.title'), content: main_lang('content.widgets.high-quality.content'), },
    { title: main_lang('content.widgets.new-artists.title'), content: main_lang('content.widgets.new-artists.content'), },
    { title: main_lang('content.widgets.new-genres.title'), content: main_lang('content.widgets.new-genres.content'), },
    { title: main_lang('content.widgets.new-opportunities.title'), content: main_lang('content.widgets.new-opportunities.content'), },
    { title: main_lang('content.widgets.uploaded-tracks.title'), content: main_lang('content.widgets.uploaded-tracks.content'), },
  ]

  return (
    <div className="flex flex-col justify-center bg-black/90 relative pb-8 gap-y-12">
      <div className="relative right-0 left-0 w-full bg-neutral-950 border-y-[1px] border-neutral-700 rounded-md">
        <BackgroundIntro />
        <div className="flex absolute justify-center bottom-0 right-0 left-0 items-center gap-x-4 px-4 h-[112px] bg-black/80">
          <p className="text-[1.8rem]">
            &ldquo;{main_lang('content.intro.quote')}&bdquo;
          </p>
          <p className="text-[1.6rem]">{main_lang('content.intro.quote-author')}</p>
        </div>
      </div>
      <div className="flex flex-col px-16 items-center mt-16 gap-y-4">
        <p className="text-WHITE text-[3rem] mb-8">{main_lang('content.intro.main-title')}
          <span className="text-neutral-400 text-[2.4rem]">&nbsp;{main_lang('content.intro.main-subtitle')}</span>
        </p>
        <div className="grid grid-cols-2 grid-rows-1 gap-4">
          {widgets.slice(0, 2).map((item) => (
            <WidgetItem key={item.title} title={item.title} content={item.content} />
          ))}
        </div>
        <div className="grid grid-cols-3 grid-rows-1 gap-4">
          {widgets.slice(2).map((item) => (
            <WidgetItem key={item.title} title={item.title} content={item.content} />
          ))}
        </div>
      </div>
    </div>
  )
}