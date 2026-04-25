import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'GLPKart \u2014 GLP-1 Weight Loss, Done Right',
  description: "India's first science-backed GLP-1 weight loss platform. Doctor consultation, licensed medication, delivered to your door.",
  keywords: 'GLP-1 weight loss India, semaglutide India, tirzepatide India, weight loss doctor India, GLPKart',
  openGraph: {
    title: 'GLPKart \u2014 GLP-1 Weight Loss, Done Right',
    description: 'Doctor consultation + licensed GLP-1 medication + ongoing support. Starting \u20B9799.',
    url: 'https://glpkart.com',
    siteName: 'GLPKart',
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-YEDMPHTGZB" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-YEDMPHTGZB');`}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '954737590749797');
          fbq('track', 'PageView');`}
        </Script>
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "wgtm2ltia4");`}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
