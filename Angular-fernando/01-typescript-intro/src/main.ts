import './style.css'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
 Hola mundo
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
