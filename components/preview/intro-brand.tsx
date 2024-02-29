"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { GoogleGeminiEffect } from "@/ui/google-gemini-effect";
import { useScopedI18n } from "@/locales/client";
 
export const IntroBrand = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const brandLocale = useScopedI18n('brand.main');

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.1, 2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.7], [0.1, 2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.6], [0.1, 2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.5], [0.1, 2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.4], [0.1, 2]);
 
  return (
    <div
      className="h-[100vh] z-10 bg-black/80 rounded-md relative overflow-clip"
      ref={ref}
    >
      <GoogleGeminiEffect
        title="Smotify"
        className="w-[95%] mx-auto"
        description={brandLocale('content.intro.quote')}
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
    </div>
  );
}