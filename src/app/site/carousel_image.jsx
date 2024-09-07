"use client"
import Autoplay from "embla-carousel-autoplay"

import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import { Card, CardContent } from "@/components/ui/card";

export default function CarouselHome() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true})
      )
     
    return (
    <Carousel
    plugins={[plugin.current]}
     className="w-[90%] h-[100px] mx-auto">
    <CarouselContent className="-ml-1">
      {["/s1.png","/s2.png","/s3.png","sn.png"].map((url, index) => (
        <CarouselItem key={index} className="pl-1 md:basis-1/2 relative lg:basis-1/2 ">
          <div className="p-1">
            <Card>
              <CardContent className="flex relative aspect-square items-center justify-center p-2">
              <div className=" bg-gradient-to-r absolute from-primary to-secondary-foreground text-transparent bg-clip-text">

          <h1  className="text-6xl font-bold text-center  md:text-[200px]">
            WEBMAKER

          </h1>
          <div className="w-full flex p-96 justify-center"><h2 className="text-white shadow-xl p-10 w-[60vw] md:w-[600px] md:mx-40   md:text-2xl  text-center">
          Bring your website vision to life. Easily create and customize your pages with our intuitive builder. Seamlessly incorporate videos to engage your audience. No coding required - just your creativity.</h2>
          </div>
        </div>
              <img
                      src={url}
                      alt={"carousel picture"}
                      
                      className=" w-full  aspect-square rounded-md"
                    />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
  )
}
