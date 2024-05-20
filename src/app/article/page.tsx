import { AccessTime, AccountCircle, LocalOffer } from "@mui/icons-material"

export default function Article() {
  return (
    <main className="mt-2">
      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold mb-1">The Dark Side of useEffect in React</h2>

      <div className="text-xs mt-2 flex flex-row mb-4 sm:mb-6">
        <div>
          <AccessTime fontSize="small" />
          <span className="ps-1 my-auto">18/05/2024</span>
        </div>
        <div className="ps-4">
          <AccountCircle fontSize="small" />
          <span className="ps-1 my-auto">fandi</span>
        </div>
        <div className="ps-4">
          <LocalOffer fontSize="small" />
          <span className="ps-1 my-auto">react</span>
        </div>
      </div>
      
      <p className="mb-4 text-sm sm:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate molestiae saepe placeat aspernatur vitae ut voluptatem fugit, explicabo maiores eum eius atque nam fugiat tenetur.</p>
      <p className="mb-4 text-sm sm:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate molestiae saepe placeat aspernatur vitae ut voluptatem fugit, explicabo maiores eum eius atque nam fugiat tenetur.</p>

    </main>
  );
}
