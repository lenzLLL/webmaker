import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { prompt } = await req.json();
  if (!prompt) return NextResponse.json({ error: "Prompt manquant" }, { status: 400 });

  try {
    const resp = await openai.images.generate({ // ou openai.images.create dépend de la version
      prompt,
      n: 1,
      size: "1024x1024",
    });
    
   const url = resp.data?.[0]?.url;
if (!url) {
  return NextResponse.json({ error: "Aucune image générée" }, { status: 500 });
}
    return NextResponse.json({ url });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
