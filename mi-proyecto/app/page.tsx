import Image from "next/image";

export default function Home() {
  return (
    <div className="justify-items-center p-8 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <Image
          className="dark:invert"
          src="/avellan.svg"
          alt="Avellan logo"
          width={320}
          height={38}
        />
        <h1 className="font-mono">
        Mmmm son tan ricos y baratos
        </h1>
        <h2 className="font-mono">
          <a
            className="hover:underline hover:underline-offset-4"
            href="https://avellan.com.ar/"
            target="_blank"
            rel="noopener noreferrer" //segun lo que lei es una buena practica de seguridad cuando usas _blank
          >
            https://avellan.com.ar/
          </a>
        </h2>


      </main>
    </div>
  );
}
