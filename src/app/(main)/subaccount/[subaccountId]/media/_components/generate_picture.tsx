"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CarouselPicures from "./carousel_image.jsx";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/components/global/loading.jsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useRouter } from "next/navigation.js";
import { createMedia, saveActivityLogsNotification } from "@/lib/queries";
type Props = {
  subaccountId: string
}
export const ImageGenerator = ({subaccountId}:Props) => {
  const [prompt, setPrompt] = useState<any>("");
  const [title, setTitle] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);
  const [image, setImage] = useState<any>();
  const router = useRouter()
  const {toast} = useToast()
  useEffect(() => {
    if(localStorage.getItem("generated-image")){
        setImage(JSON.parse(localStorage.getItem("generated-image")||""))
    }
  }, []);


  const savePicture = async () => {
    try {
      if(!title){
        toast({
          variant: 'destructive',
          title: 'Failed',
          description: 'Title field is empty',
        })
        return
      }
      const response = await createMedia(subaccountId,{link:image,name:title} )
      if(response){
          setImage("")
          localStorage.removeItem("generated-image")
      }
      else{return}
      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Uploaded a media file | ${response.name}`,
        subaccountId
      })

      toast({ title: 'Succes', description: 'saved image' })
      router.refresh()
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'Failed',
        description: 'Could not saved media',
      })
    }
  }
  // const handleGenerateImage = async () => {
  //   setLoading(true);

  //   try {
  //     const response = await axios.post("/api/generate", { prompt });
  //     setImage(response.data.url)
  //     localStorage.setItem("generated-image",JSON.stringify(response.data.url))
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setPrompt("");
  //     setLoading(false);
  //   }
  // };
  const handleGenerateImage = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt,
          n: 1,
          size: '512x512',
        }),
      });

      const data = await response.json();

      if (data.error) throw new Error(data.error.message);

    
            setImage(data?.data[0]?.url)
      localStorage.setItem("generated-image",JSON.stringify(data?.data[0]?.url))
    } catch (err: any) {
     
    } finally {
     setLoading(false);
    }
  };


  return (
    <AlertDialog>
    <div className="flex flex-col items-center w-full h-full">
      <div className="w-full px-4  md:px-6 ">
        <div className="flex flex-col items-center gap-4">
      

        
            <div className=" flex items-center justify-center">
              <p className="text-lg text-center text-muted-foreground">
                {loading? <div className="h-[200px] lg:h-[370px] flex items-center justify-center"><Loading/></div>:image?  <Card>
              <CardContent className="flex flex-col gap-2 aspect-square items-start justify-center p-2">
              <img
                      src={image}
                      alt={"image builded"}
                      
                      className=" w-full  aspect-square rounded-md"
                    />
                          <Input
              type="text"
              placeholder="Enter a title"
              className="flex-1 h-16 mb-1 mt-1 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
               <div className="flex items-center justify-start gap-2">
         
            <Button disabled={loading}  onClick={savePicture} className="h-10">
                save
            </Button>
            <AlertDialogTrigger asChild>
            <Button className="h-10" variant={'destructive'}>Delete Picture</Button>
          </AlertDialogTrigger>
               </div>
              </CardContent>
            </Card>:<CarouselPicures/>}
              </p>
            </div>
        

<div className="flex w-full items-center space-x-2">
            
            <Input
              type="text"
              placeholder="Enter a prompt to generate an image"
              className="flex-1 h-12"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button disabled={loading} className="h-12" onClick={handleGenerateImage}>
              {loading ? (
                <>
                  Generating{" "}
                  <Loader2Icon className="animate-spin size-4 ml-2" />
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>

    <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will definitively delete your
                builded picture.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="items-center">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={ () => {
                    setImage("")
                    localStorage.removeItem("generated-image")
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
    </AlertDialog>

  );
};


