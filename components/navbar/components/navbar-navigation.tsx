import { Button } from "@/ui/button"
import { useRouter } from "next/navigation";
import { CaretLeftIcon } from "@/ui/icons/caret-left";
import { CaretRightIcon } from "@/ui/icons/caret-right";

export const NavbarNavigation = () => {
  const { back, forward } = useRouter();

  return (
    <>
      <Button
        onClick={() => back()}
        size="fixed_medium"
        rounded="full"
        filter="blurred"
        align="centered"
        background_color="black_60"
      >
        <CaretLeftIcon/>
      </Button>
      <Button
        onClick={() => forward()}
        size="fixed_medium"
        rounded="full"
        align="centered"
        filter="blurred"
        background_color="black_60"
      >
        <CaretRightIcon/>
      </Button>
    </>
  )
}