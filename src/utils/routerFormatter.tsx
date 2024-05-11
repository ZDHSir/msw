import { lazy } from "react"

export const routerFormatter = (keys: string[],  valueMap: any):any[] => {
    const result:any[] = []
    keys.forEach(key => {
        let path = key.replace("..", "")
        if(path === "/pages/index.tsx"){
            path = "/"
        }else{
            path = path.replace("/pages", "").replace("/index.tsx", "").toLowerCase()
        }
        const route = {
            path,
            Component: lazy(valueMap[key])
        }
        result.push(route)
    })
    // console.log({result});
    return result
}