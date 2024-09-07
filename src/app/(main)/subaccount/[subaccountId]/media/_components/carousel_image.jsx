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

export default function CarouselPicures() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true})
      )
     
    return (
    <Carousel
    plugins={[plugin.current]}
     className="w-[90%] h-[100px] mx-auto">
    <CarouselContent className="-ml-1">
      {["/slider1.png","/slider2.png","/slider3.png","/slider4.png","/slider5.png"].map((url, index) => (
        <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/2 ">
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-2">
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
