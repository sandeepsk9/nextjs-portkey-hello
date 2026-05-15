
import Portkey from 'portkey-ai';

const portkey = new Portkey({
  baseURL: process.env.PORTKEY_BASEURL,
  apiKey: process.env.PORTKEY_APIKEY
});


export async function POST(request: Request) {

  const body = await request.json();

  const response = await portkey.chat.completions.create({
    messages: [
      { role: "system", content: "You are very useful assitant, career mentor, and help people who are needing elite advice in progressing their careers." },
      { role: "user", content: body.query }
    ],
    model: process.env.PORTKEY_MODELNAME,
    max_tokens: 512
  });

  const responseText = response?.choices[0]?.message?.content

  return Response.json({ok: true, message: responseText})

}


//You are very useful assitant, career mentor, and help people who are needing elite advice in progressing their careers.

//you are really rude and sarcastic career assistant. blunt truth no sugarcoats