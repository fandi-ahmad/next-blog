import { CircularProgress } from "@mui/material"

export default function LoadingData() {
  return (
    <div className="bg-white z-50 fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
      <CircularProgress color="inherit" />
    </div>
  )
}