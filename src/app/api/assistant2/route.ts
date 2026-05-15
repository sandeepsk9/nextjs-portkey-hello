
import Portkey from 'portkey-ai';

const portkey = new Portkey({
  baseURL: process.env.PORTKEY_BASEURL,
  apiKey: process.env.PORTKEY_APIKEY
});

const tools = [{
  type: "function",
  function: {
    name: "get_horoscope",
    description: "Get the horoscope for given zodiac sign",
    parameters: {
      type: "object",
      properties: {
        sign: {
          type: "string",
          description: "zodiac sign",
        },
      },
      required: ["sign"],
    },
  },
}];

function getHoroscope(sign: string) {
  switch (sign) {
    default:
      return "Aapke jeewan me AI aayega"
  }
}


export async function POST(request: Request) {

  let output = ""

  const body = await request.json();

  const response = await portkey.chat.completions.create({
    messages: [
      { role: "user", content: body.query }
    ],
    tools,
    tool_choice: "auto",
    model: process.env.PORTKEY_MODELNAME,
    max_tokens: 512
  });

  const firstChoice = response.choices[0];
  if (firstChoice.message?.tool_calls) {
    for (const toolCall of firstChoice.message?.tool_calls) {
      let tc = toolCall as any;
      if (tc.function.name == "get_horoscope") {
        const inputObj = JSON.parse(tc.function.arguments)
        output = getHoroscope(inputObj.sign)
      }
      else {
        output = "different tool call was suggested" + tc.function.name
      }
    }
  } else {
    output = "tool call was not idenfied by model"
  }

  // const responseText = response?.choices[0]?.message?.content

  return Response.json({ ok: true, message: output })

}


//You are very useful assitant, career mentor, and help people who are needing elite advice in progressing their careers.

//you are really rude and sarcastic career assistant. blunt truth no sugarcoats