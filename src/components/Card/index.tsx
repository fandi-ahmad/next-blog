"use client"
import Label from "./label"
import { MoreHoriz } from "@mui/icons-material"
import { Menu, MenuItem, Tooltip } from "@mui/material"
import { useState } from "react"
import Link from "next/link"

interface dataCard {
  src?: string,
  head: string,
  body: string,
  created_at: string,
  username?: string | null | undefined,
  label?: string,
  onClickEdit?: any,
  onClickDelete?: any,
  idForHref?: string | number,
}

export default function Card(props: dataCard) {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="mb-4 sm:mb-6 border border-white rounded-md">
        <Link href={`/article/${props.idForHref}`} className="flex justify-between text-blue-300 hover:text-blue-400 px-4 py-3 rounded-md duration-100 transition-all cursor-pointer">

          <div>
            <div>
              <div>
                <h2 className="text-2xl font-semibold">{props.head}</h2>
                <span className="text-white">{props.body}</span>
              </div>
              <Label created_at={props.created_at} username={props.username} label={props.label} />
            </div>
          </div>

          {/* <img
            src={props.src || '/thumbnail.webp'}
            alt="blog card content"
            className="min-w-28 max-w-28 md:min-w-40 md:max-w-40 lg:min-w-52 lg:max-w-52 min-h-16 max-h-16 md:min-h-20 md:max-h-20 lg:min-h-28 lg:max-h-28 object-cover rounded-md ms-4 my-auto"
          /> */}

        </Link>
        {
          props.onClickEdit || props.onClickDelete ?
          <Tooltip className="px-4" title='Option' arrow>
            <button onClick={handleClick}>
              <MoreHoriz/>
            </button>
          </Tooltip> : null
        }
      </div>

      {
        props.onClickEdit || props.onClickDelete ?
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={props.onClickEdit}>Edit</MenuItem>
          <MenuItem onClick={props.onClickDelete}>Delete</MenuItem>
        </Menu> : null
      }
    </>
  )
}