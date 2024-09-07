"use client"
import UploadForm from "../upload/upload-form"
import ActiveImage from "./active-image"
import { useLayerStore } from "@/lib/layer-store"
import Layers from "../layers/layer"
import ImageTools from "../toolbar/image-tools"
import VideoTools from "../toolbar/video-tools"
import GenerativeFill from "../toolbar/generative-fill"
import Loading from "./loading"
import ExportAsset from "../toolbar/export-image"
import { ArrowLeftCircle } from "lucide-react"
import Link from "next/link"

export default function Editor() {
  const activeLayer = useLayerStore((state) => state.activeLayer)

  return (
    <div className="flex h-full ">
      <div className="py-6 px-4  min-w-48 ">
      
        <div className="flex flex-col gap-4 ">
          {activeLayer.resourceType === "video" ? <VideoTools /> : null}
          {activeLayer.resourceType === "image" ? <ImageTools /> : null}
          {activeLayer.resourceType && (
            <ExportAsset resource={activeLayer.resourceType} />
          )}
        </div>
      </div>
      <div className="absolute top-5 left-5">
      <Link href={`/subaccount`}>
            <ArrowLeftCircle size={30} />
        </Link>
        </div>
      <Loading />
      <ActiveImage />
      <UploadForm />
      <Layers />
    </div>
  )
}