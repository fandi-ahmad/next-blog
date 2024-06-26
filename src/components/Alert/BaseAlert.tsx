"use client"
import { Alert } from "@mui/material"
import { useGlobalState } from "@/lib/state"

export default function BaseAlert() {
  const [textErrorAlert, setTextErrorAlert] = useGlobalState('textErrorAlert')
  const [displayErrorAlert, setDisplayErrorAlert] = useGlobalState('displayErrorAlert')
  const [alertType, setAlertType] = useGlobalState('alertType')

  return (
    <div className={`${displayErrorAlert} left-0 w-full px-4 sm:px-12 md:px-24 xl:px-52`}>
      <Alert variant="filled" severity={alertType}>
        {textErrorAlert}
      </Alert>
    </div>
  )
}