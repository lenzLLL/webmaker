import { FileIcon, X } from "lucide-react"
import Image from "next/image"
import React from "react"
import { Button } from "../ui/button"
import { UploadDropzone } from "@uploadthing/react"
import "@uploadthing/react/styles.css";
import {OurFileRouter} from "@/app/api/uploadthing/core"

const FileUpload = ({ apiEndpoint, onChange, value }) => {
    const type = value?.split(".").pop()
    if(value){
        return(
            <div className="flex flex-col justify-center items-center">
                {type !== 'pdf'? <div className="relative w-40 h-40 ">
                    <Image src = {value} alt ="uploaded image" className={apiEndpoint === "agencyLogo" ?`object-contain`:`object-cover rounded-full`} fill/>
                </div>:<div className="relative flex items-center justify-center p-2 mt-2 rounded-md bg-background/10">
                    <FileIcon/>
                    <a href={value} target="_blank" rel="noopener_noreferrer" className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline">
                        View Pdf
                    </a>
                    <Button onClick={()=>onChange("")} variant={"ghost"} type = "button"><X className="h-4 w-4"/> Remove Logo</Button>
                </div>}
                <Button
          onClick={() => onChange('')}
          variant="ghost"
          type="button"
        >
          <X className="h-4 w-4" />
          Remove Logo
        </Button>

            </div>
        )
    }
    return (
    <div className="w-full bg-muted/30">
          <UploadDropzone
    endpoint={apiEndpoint}
    onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
    }}
    onUploadError={(error) => {
      alert(`ERROR! ${error.message}`);
    }}
   
  />
    </div>)
}

export default FileUpload