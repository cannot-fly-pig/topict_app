const axios = require("axios")

export default async function speech(token,text,lang){

  const url = `https://tra.mimi.fd.ai/speech_synthesis?text=${text}&engine=nict&lang=${lang}`

  let res = await axios.get(url,{
    headers:{"Authorization": `Bearer ${token}`},
    responseType: "arraybuffer",
    dataType:'binary',
  })

  return res

}
