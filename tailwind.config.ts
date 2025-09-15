import type { Config } from 'tailwindcss'


const config: Config = {
content: [
'./app/**/*.{ts,tsx}',
'./components/**/*.{ts,tsx}',
],
theme: {
extend: {
colors: {
SG: '#FF8A00',
CL: '#E63946',
FL: '#2A9D8F',
ML: '#264653',
},
borderRadius: {
'2xl': '1.25rem',
}
},
},
plugins: [],
}
export default config