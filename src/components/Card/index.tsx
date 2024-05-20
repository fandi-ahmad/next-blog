"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Label from "./label"

interface dataCard {
  src?: string
}

export default function Card(props: dataCard) {
  const router = useRouter()

  return (
    <div className="text-gray-700 mb-4 sm:mb-8">

      <div className="flex justify-between">

        <div className="cursor-pointer" onClick={() => router.push('/article')}>
          <div>
            <h2 className="text-sm sm:text-xl lg:text-2xl font-semibold">The Dark Side of useEffect in React</h2>
            <span className="hidden sm:block">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod eum asperiores, fugit recusandae aperiam architecto aliquam? Reiciendis officia sequi libero.</span>
          </div>
          <Label/>
        </div>

        <Image
          src={props.src || '/images/ai-image-generator.webp'}
          alt="blog card content"
          width={140}
          height={80}
          quality={100}
          className="min-w-28 max-w-28 md:min-w-40 md:max-w-40 lg:min-w-52 lg:max-w-52 min-h-16 max-h-16 md:min-h-20 md:max-h-20 lg:min-h-28 lg:max-h-28 object-cover rounded-md ms-4 my-auto"
        />

      </div>
      
    </div>
  )
}