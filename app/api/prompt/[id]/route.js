import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export async function GET(request, { params }) {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate('creator');

    if (!prompt) return new Response('Prompt not found', { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all prompt', { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response('Prompt not found', { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();
  } catch (error) {
    new Response('Failed to update Prompt', { status: 500 });
  }
}
