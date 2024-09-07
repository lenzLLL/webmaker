import BlurPage from '@/components/global/blur_page'
import MediaComponent from '@/components/media'
import { getMedia } from '@/lib/queries'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ImageGenerator } from './_components/generate_picture'
import EditorHome from './_components/editor-home'

type Props = {
  params: { subaccountId: string }
}

const MediaPage = async ({ params }: Props) => {
  const data = await getMedia(params.subaccountId)

  return (
  <BlurPage>
    <Tabs defaultValue='pictures' className=' w-full'>
    <TabsList className="bg-transparent border-b-2 h-16 w-full justify-between mb-4">
 
      <div>
      <TabsTrigger value="pictures">Images</TabsTrigger>
      <TabsTrigger value="generate">Generate image</TabsTrigger>
      <TabsTrigger value="editor">Editor</TabsTrigger>
     </div>
    </TabsList> 
   <TabsContent value='pictures'>
    
      <MediaComponent
        data={data}
        subaccountId={params.subaccountId}
      />
    

   </TabsContent>
    <TabsContent value ="generate">
    <ImageGenerator subaccountId={params.subaccountId}/>
    </TabsContent>
    <TabsContent value ="editor">
      
        <EditorHome/>
    </TabsContent>


</Tabs>  
   </BlurPage>
  )
}

export default MediaPage