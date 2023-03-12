import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
    <Head>
      <title>Command Explorer</title>
      <meta name="description" content="Command Explorer" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/assets/images/favicon.ico" />
    </Head>
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
      <h1 className='text-primary text-5xl font-bold tracking-wider mb-6'>Command Explorer</h1>
      <p className='text-[#4a4a4a] text-xl text-center w-2/3 tracking-wider transition-colors mb-8'>Find the right commands you need without digging through the web.</p>
      <div className='grid grid-cols-2 gap-10'>
        <Link href="/git" className='flex flex-row justify-center items-center gap-4 border w-[500px] h-40 rounded-xl'>
          <Image 
            className='w-12 h-12'
            height={24}
            width={24}
            src="/assets/images/git.svg"
            alt="Git logo"
          />
          <h2 className="text-primary text-2xl font-bold tracking-wider">
            Git <span className='text-git'>Command</span> Explorer
          </h2>
        </Link>
        <Link href="/docker" className='flex flex-row justify-center items-center gap-4 border w-[500px] h-40 rounded-xl'>
          <Image 
            className='w-12 h-12'
            height={24}
            width={24}
            src="/assets/images/docker.svg"
            alt="Git logo"
          />
          <h2 className="text-primary text-2xl font-bold tracking-wider">
            Docker <span className='text-docker'>Command</span> Explorer
          </h2>
        </Link>
      </div>
    </div>
    </>
  );
}