import { useEffect } from "react";
import { clinicConfig } from "@/config/clinicConfig";

/**
 * AnalyticsManager
 * ----------------
 * Injeta GTM, GA4 e Meta Pixel somente quando os IDs correspondentes
 * estão preenchidos em `clinicConfig.analytics`. Roda no client.
 */
export function AnalyticsManager() {
  const { gtmId, gaId, metaPixelId } = clinicConfig.analytics;

  useEffect(() => {
    if (gtmId && !document.getElementById("gtm-script")) {
      const s = document.createElement("script");
      s.id = "gtm-script";
      s.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`;
      document.head.appendChild(s);
    }

    if (gaId && !document.getElementById("ga-script")) {
      const s1 = document.createElement("script");
      s1.async = true;
      s1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(s1);

      const s2 = document.createElement("script");
      s2.id = "ga-script";
      s2.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`;
      document.head.appendChild(s2);
    }

    if (metaPixelId && !document.getElementById("meta-pixel")) {
      const s = document.createElement("script");
      s.id = "meta-pixel";
      s.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`;
      document.head.appendChild(s);
    }
  }, [gtmId, gaId, metaPixelId]);

  return null;
}
