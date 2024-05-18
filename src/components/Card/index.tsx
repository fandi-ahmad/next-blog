import Image from "next/image"
import { AccessTime, AccountCircle, LocalOffer } from "@mui/icons-material"

export default function() {
  return (
    <div className="text-gray-700 mb-4 sm:mb-8">

      <div className="flex justify-between">

        <div className="cursor-pointer">
          <div>
            <h2 className="text-sm sm:text-xl lg:text-2xl font-semibold">The Dark Side of useEffect in React</h2>
            <span className="hidden sm:block">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod eum asperiores, fugit recusandae aperiam architecto aliquam? Reiciendis officia sequi libero.</span>
          </div>
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
        </div>

        <Image
          src={'/images/ai-image-generator.webp'}
          alt="blog card content"
          width={120}
          height={80}
          quality={100}
          className="min-w-6 md:min-w-40 lg:min-w-52 h-fit rounded-md ms-4 my-auto"
        />

      </div>
      
    </div>
  )
}