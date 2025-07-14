import { NextResponse } from "next/server"
import { openai } from "@/lib/openai"

export async function POST(req: Request) {
  const { prompt } = await req.json()
  if (!prompt) return NextResponse.json({ error: "Prompt requis" }, { status: 400 })

  try {
    const resp = await openai.createImage({
      model: "gpt-image-1",   // ou "dall-e-3" selon disponibilité
      prompt,
      n: 1,
      size: "1024x1024",     // ou "512x512", "256x256" :contentReference[oaicite:9]{index=9}
    })

    const url = resp.data.data[0].url
    return NextResponse.json({ url })
  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ error: "Échec génération" }, { status: 500 })
  }
}
