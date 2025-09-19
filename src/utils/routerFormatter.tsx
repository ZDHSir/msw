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
        const LazyComponent = lazy(valueMap[key])
        // console.log(`Loading component for path:`, LazyComponent);
        const route = {
            path,
            Component: LazyComponent
        }
        result.push(route)
    })
    // console.log({result});
    return result
}