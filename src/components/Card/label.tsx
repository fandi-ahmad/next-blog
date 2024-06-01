import { AccessTime, AccountCircle, LocalOffer } from "@mui/icons-material"

interface dataLabel {
  created_at: string,
  username?: string | null | undefined,
  label?: string,
}

export default function Label(props: dataLabel) {
  return (
    <div className="text-xs mt-2 flex flex-row">
      <div className="">
        <AccessTime fontSize="small" />
        <span className="ps-1 my-auto">{props.created_at}</span>
      </div>
      <div className="ps-4">
        <AccountCircle fontSize="small" />
        <span className="ps-1 my-auto">{props.username || 'unknow'}</span>
      </div>
      <div className="ps-4 hidden sm:block">
        <LocalOffer fontSize="small" />
        <span className="ps-1 my-auto">{props.label}</span>
      </div>
    </div>
  )
}