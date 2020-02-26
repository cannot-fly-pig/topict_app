const axios = require("axios")

export default async function translate(token,text,source_lang,target_lang){

  const url = `https://tra.mimi.fd.ai/machine_translation?text=${text}&source_lang=${source_lang}&target_lang=${target_lang}`

  let res = await axios.get(url,{headers:{"Authorization": `Bearer ${token}`}})

  return res

}
