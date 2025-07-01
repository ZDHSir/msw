import { http, HttpResponse } from 'msw'

const mockers = import.meta.glob("./**/*.json")

export const handlers = Object.keys(mockers).map(key => {
  if(key.startsWith("./get")){
    return http.get(`/api${key.replace("./get","").replace(".json", "")}`, async()=>{
      const data = await mockers[key]() as any
      return HttpResponse.json(data.default)
    })
  }
  if(key.startsWith("./post")){
    return http.post(`/api${key.replace("./post","").replace(".json", "")}`, async()=>{
      const data = await mockers[key]() as any
      return HttpResponse.json(data.default)
    })
  }
  return null
}).filter(Boolean)

console.log({handlers});
