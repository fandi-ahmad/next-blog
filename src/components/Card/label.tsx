import { AccessTime, AccountCircle, LocalOffer } from "@mui/icons-material"

export default function Label() {
  return (
    <div className="text-xs mt-2 flex flex-row">
      <div>
        <AccessTime fontSize="small" />
        <span className="ps-1 my-auto">18/05/2024</span>
      </div>
      <div className="ps-4">
        <AccountCircle fontSize="small" />
        <span className="ps-1 my-auto">fandi</span>
      </div>
      <div className="ps-4 hidden sm:block">
        <LocalOffer fontSize="small" />
        <span className="ps-1 my-auto">react</span>
      </div>
    </div>
  )
}