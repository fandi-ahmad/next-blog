"use client"
import Image from "next/image";
import { Tooltip } from "@mui/material";
import { useGlobalState } from "@/lib/state";

export default function UploadFile() {
  const [thumbnailUpload, setThumbnailUpload] = useGlobalState('thumbnailUpload')
  const [thumbnailBlob, setThumbnailBlob] = useGlobalState('thumbnailBlob')

  const uploadFile = (event: any) => {
    const file = event.target.files[0];
    setThumbnailUpload(file)
    setThumbnailBlob(URL.createObjectURL(file))
  };

  return (
    <div className="mb-8">
      <Tooltip title='Upload thumbnail' arrow>
        <Image
          src={thumbnailBlob}
          alt="empty-image"
          className="object-cover w-full h-96 rounded-md cursor-pointer"
          width={500} height={300} priority
          onClick={() => document.getElementById('inputFile')?.click()}
        />
      </Tooltip>
      <input type="file" className="hidden" id="inputFile" onChange={uploadFile} />
    </div>
  );
}