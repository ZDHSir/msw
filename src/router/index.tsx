import { createHashRouter } from "react-router-dom"
import { routerFormatter } from "../utils/routerFormatter";

const pages = import.meta.glob("../pages/**/index.tsx")
export const router = createHashRouter(routerFormatter(Object.keys(pages), pages))