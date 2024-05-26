"use client";
import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";
import { useEffect, useState } from "react";
import { useGlobalState } from "@/lib/state";

type Props = ComponentProps<"button"> & {
  pendingText?: string;
};

export function SubmitButton({ children, pendingText, ...props }: Props) {
  const { pending, action } = useFormStatus();
  const isPending = pending && action === props.formAction;
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false)
  const [textErrorAlert, setTextErrorAlert] = useGlobalState('textErrorAlert')
  const [displayErrorAlert, setDisplayErrorAlert] = useGlobalState('displayErrorAlert')


  const handleButton = () => {
    setIsShowAlert(true)
  }

  useEffect(() => {
    if (!isPending && isShowAlert) {
      setTextErrorAlert('Email or password is wrong!')
      setDisplayErrorAlert('fixed')

      setTimeout(() => {
        setTextErrorAlert('')
        setDisplayErrorAlert('hidden')
      }, 3000)

    }
  }, [isPending])

  return (
    <button {...props} type="submit" aria-disabled={pending} onClick={handleButton}>
      {isPending ? pendingText : children}
    </button>
  );
}
