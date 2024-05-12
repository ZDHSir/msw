import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'
import {HttpHandler} from "msw";
 
export const worker = setupWorker(...(handlers as HttpHandler[]))