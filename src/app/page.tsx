"use client";

import { Button } from '@material-tailwind/react';
import Image from 'next/image'

import Link from 'next/link';


export default function Home() {
  return (
    <main className="flex flex-col items-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Securely transfer files without the Internet!</h1>
        <p className="text-lg mb-8">This site offers you an open source, secure, and completely free way to transfer files between devices that are not connected to the internet. It involves converting your files into a series of unique barcodes, allowing you to download them on a different device by simply scanning these barcodes.</p>
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <h3 className="text-xl font-bold inline-block px-2 py-1">Upload Your File:</h3>

          
        <p className="text-lg mb-8">Click on the <Link href="/upload" className='color-blue'>Upload button</Link>, select any file you want to transfer, and let our system work its magic. Your file will be converted into a series of barcodes.</p>
        <h3 className="text-xl font-bold inline-block px-2 py-1">Visit the Download Page:</h3>
        <p className="text-lg mb-8">On the target device, visit our website and go to the 'Download' page. Here, you'll find a barcode scanner. Use your device's camera to scan the series of barcodes.</p>
        <h3 className="text-xl font-bold inline-block px-2 py-1">Download Your File: </h3>
        <p className="text-lg mb-8">As you scan each barcode, the corresponding part of your file will be reconstructed. Once all barcodes are scanned, your original file is complete and ready for download. It's that simple!</p>
        <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
        <ul className="text-lg mb-8 list-disc list-inside">
          <li>Security First: Your files never leave your devices, ensuring complete privacy and security.</li>
          <li>No Internet Dependency: Transfer files even when you have no internet connection.</li>
        </ul>
        <Button size="lg">
          <Link href="/upload">
            Get Started Now!
          </Link>
        </Button>
      </div>
    </main>
  )
}
