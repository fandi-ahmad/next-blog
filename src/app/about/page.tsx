"use client"
import { GitHub, Instagram, Language, LinkedIn, MailOutline } from "@mui/icons-material";
import Link from "next/link";

export default function About() {
  return (
    <div className="mt-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">About This Platform</h1>
        <p>An article writing platform designed to combine the love of technology and writing. The platform was created as part of a developer portfolio, showcasing skills in software development and user experience design.</p>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Why This Platform Was Created</h1>
        <p className="mb-2">The aim of this platform is to:</p>
        <ul>
          <li>• Simple writing environment.</li>
          <li>• Ease of sharing articles.</li>
          <li>• Connect and collaborate with other writers.</li>
        </ul>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold">About Developer</h1>
        <p>From the city of Palu, Indonesia, with a background in technology, especially Full Stack Web Developer.</p>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Get In Touch</h1>
        <p className="mb-2">Nice to hear from you! For questions, suggestions, or just to share your story, contact:</p>
        <div>
          <Link href={'https://instagram.com/fandi.jsx'} target="_blank" className="mr-2">
            <Instagram/>
          </Link>
          <Link href={'https://github.com/fandi-ahmad'} target="_blank" className="mr-2">
            <GitHub/>
          </Link>
          <Link href={'https://www.linkedin.com/in/fandijsx/'} target="_blank" className="mr-2">
            <LinkedIn/>
          </Link>
          <Link href={'mailto:fandi4160@gmail.com'} className="mr-2">
            <MailOutline/>
          </Link>
          <Link href={'https://fandi-ahmad.vercel.app/'} target="_blank">
            <Language/>
          </Link>
        </div>
      </div>

    </div>
  )
}