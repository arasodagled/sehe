import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'SUHÉ | Botanical Fragrance House',description:'Colombian-inspired botanical candles, thoughtfully crafted in Britain.'};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
