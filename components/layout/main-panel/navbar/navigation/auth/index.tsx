"use client"

import { Button } from "@/ui/button"
import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx"

export const NavbarNavigation = () => {
  const { back, forward } = useRouter();

  return (
    <>
      <Button
        size="fixed_medium"
        rounded="full"
        filter="blurred"
        onClick={() => back()}
        className="bg-black/60"
      >
        <RxCaretLeft
          size={35}
          className="fill-neutral-400"
        />
      </Button>
      <Button
        size="fixed_medium"
        rounded="full"
        filter="blurred"
        onClick={() => forward()}
        className="bg-black/60"
      >
        <RxCaretRight
          size={35}
          className="fill-neutral-400"
        />
      </Button>
    </>
  )
}