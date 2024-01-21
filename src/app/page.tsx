"use client"; // Not ideal, but `material-tailwind` doesn't support SSR.

import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center p-8">
      <div className="2xl:w-1/2 xl:w-2/3 md:w-full mx-auto">
        <h1 className="text-4xl font-bold mb-4">Securely transfer files without the Internet!</h1>
        <p className="text-lg mb-8">This site offers you an open source, secure, and completely free way to transfer files between devices that are not connected to the internet. It involves converting your files into a series of unique barcodes, allowing you to download them on a different device by simply scanning these barcodes.</p>
        <h2 className="text-3xl font-bold mb-5">How It Works</h2>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-bold inline-block px-2 py-1">Upload Your File:</h3>
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-lg mb-8">Click on the <Link href="/upload">&apos;Upload&apos; button</Link>, select any file you want to transfer, and let our system work its magic. Your file will be converted into a series of barcodes.</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-bold inline-block px-2 py-1">Visit the Download Page:</h3>
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-lg mb-8">On the target device, visit our website and go to the <Link href="/download">&apos;Download&apos; page</Link>. Here, you&apos;ll find a barcode scanner. Use your device&apos;s camera to scan the series of barcodes.</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-bold inline-block px-2 py-1">Download Your File: </h3>
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-lg mb-8">As you scan each barcode, the corresponding part of your file will be reconstructed. Once all barcodes are scanned, your original file is complete and ready for download. It&apos;s that simple!</p>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
        <ul className="text-lg mb-8 list-disc list-inside">
          <li><span className="font-bold">Security First: </span>Your files never leave your devices, ensuring complete privacy and security.</li>
          <li><span className="font-bold">No Internet Dependency: </span>Transfer files even when you have no internet connection.</li>
          <li><span className="font-bold">Trust: </span>Don&apos;t take our word for it. This site is completely open source. Check out the source code on <Link href="https://github.com/Deeds67/qr-file-transfer">GitHub at https://github.com/Deeds67/qr-file-transfer</Link></li>
        </ul>
        <Button size="lg">
          <Link href="/upload">
            Get started!
          </Link>
        </Button>
      </div>
    </main>
  )
}