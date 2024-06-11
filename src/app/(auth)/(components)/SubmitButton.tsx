"use client";
import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";
import { useEffect, useState } from "react";
import { useGlobalState } from "@/lib/state";
import { useSearchParams } from "next/navigation";

type Props = ComponentProps<"button"> & {
  pendingText?: string;
};

export function SubmitButton({ children, pendingText, ...props }: Props) {
  const { pending, action } = useFormStatus();
  const isPending = pending && action === props.formAction;
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false)
  const [textErrorAlert, setTextErrorAlert] = useGlobalState('textErrorAlert')
  const [displayErrorAlert, setDisplayErrorAlert] = useGlobalState('displayErrorAlert')
  const [alertType, setAlertType] = useGlobalState('alertType')
  const searchParams = useSearchParams()

  const handleButton = () => {
    setIsShowAlert(true)
  }

  useEffect(() => {
    if (!isPending && isShowAlert) {
      const message: string | null = searchParams.get('message')
      if (message) {
        if (message === 'Check email to continue sign in process') {
          setAlertType('info')
          } else {
            setAlertType('error')
        }

        setTextErrorAlert(message)
        setDisplayErrorAlert('fixed')

      }

      setTimeout(() => {
        setTextErrorAlert('')
        setDisplayErrorAlert('hidden')
      }, 5000)

    }
  }, [isPending])

  return (
    <button {...props} type="submit" aria-disabled={pending} onClick={handleButton}>
      {isPending ? pendingText : children}
    </button>
  );
}
