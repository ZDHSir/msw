import { http, HttpResponse } from 'msw'

const mockers = import.meta.glob("./**/*.json")

export const handlers = Object.keys(mockers).map(key => {
  if(key.startsWith("./get")){
    return http.get(key.replace("./get","").replace(".json", ""), ()=>{
      return HttpResponse.json(mockers[key]())
    })
  }
  if(key.startsWith("./post")){
    return http.post(key.replace("./post","").replace(".json", ""), ()=>{
      return HttpResponse.json(mockers[key]())
    })
  }
  return null
}).filter(Boolean)

console.log({handlers});
