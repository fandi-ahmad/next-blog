export const Heading = ({ children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <>
      <h2 className="text-3xl font-semibold text-gray-800 mb-1">{children}</h2>
      <p className="mb-6 text-gray-800">Enter email and password</p>
    </>
  )
}
