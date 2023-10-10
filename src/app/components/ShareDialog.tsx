import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import Image from 'next/image'
 
export function DialogDefault() {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Downloads page QR
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Scan this barcode to open the downloads page</DialogHeader>
        <DialogBody divider>
          <div className="flex items-center justify-center">
            <Image src="/download.png" alt="Download" width="320" height="320"/>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}