const { Configuration, OpenAIApi } = require("openai")

const postMessage = async (messages: any) => {
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  return openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages
  }, {
    proxy: process.env.NODE_ENV === 'development' ? {
      host: "127.0.0.1",
      port: 7890
    } : null,
    responseType: 'stream'
  });
}

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const response = await postMessage(messages)
    return new Response(response.data)
  } catch (error: any) {
    return new Error(error)
  }
}
