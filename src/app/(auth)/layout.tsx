import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex justify-between" style={{height: '80vh'}}>
        <Image
          src={'login.svg'}
          alt="login"
          width={400}
          height={400}
          priority
        />
        <div className="my-auto">
          <div className="w-96 px-8 py-6 md:py-6">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}