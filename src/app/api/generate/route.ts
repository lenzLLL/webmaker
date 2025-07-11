import { replicate } from "@/components/replica";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const prompt = body.prompt;

  try {
    const res: any = await replicate.run(
      "anthropic/claude-3.7-sonnet",
      {
        input: {
          prompt,
        },
      }
    );

    const imageUrl = res.join("");

    // await connectToDB();

    // const imageDoc = await ImageModel.create({ imageUrl, prompt });

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Failed to save image" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Image generated successfully",url:imageUrl },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// export async function GET() {
//   await connectToDB();

//   const images = await ImageModel.find().sort({ createdAt: -1 }).limit(10);

//   return NextResponse.json({ images }, { status: 200 });
// }
