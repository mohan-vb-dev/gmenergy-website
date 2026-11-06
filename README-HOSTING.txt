GM ENERGY – HOW TO PUBLISH ON GODADDY
=====================================

FOLDER CONTENTS
  index.html        Main web page
  css/style.css     Design / colours / layout
  js/main.js        Slider, mobile menu, enquiry form
  images/           Logo, favicon, banner, client logos
  .htaccess         HTTPS redirect, caching (Linux/cPanel hosting)
  404.html, robots.txt, sitemap.xml

A) GoDaddy Web Hosting (cPanel / Linux)  – recommended
  1. Log in to GoDaddy > My Products > Web Hosting > Manage > cPanel Admin.
  2. Open "File Manager" > go into the folder  public_html
  3. Click "Upload" and upload  gmenergy-website.zip
  4. Right-click the zip > "Extract" (extract into public_html).
     index.html must sit directly inside public_html (not in a sub-folder).
  5. In File Manager > Settings, tick "Show Hidden Files" to see .htaccess.
  6. Activate SSL: cPanel > SSL/TLS Status (or GoDaddy SSL) so https:// works.
     If the site shows a redirect loop before SSL is active, temporarily
     rename .htaccess to htaccess.txt and rename back after SSL is on.
  7. Visit https://www.gmenergy.in

B) GoDaddy Windows (Plesk) hosting
  Upload the same files into  httpdocs  (.htaccess is ignored there – that's OK).

THINGS TO UPDATE BEFORE / AFTER GOING LIVE
  - Social media links: in index.html search for  href="#" aria-label="LinkedIn"
    (also Facebook, Instagram) – appears twice (top bar + footer). Replace "#"
    with your page URLs.
  - Slider & gallery photos load from Unsplash (free licence). For best speed,
    download your own project/plant photos, put them in images/ (e.g. slide1.jpg)
    and replace the matching https://images.unsplash.com/... address in index.html
    with  images/slide1.jpg
  - Enquiry form opens the visitor's email app addressed to info@gmenergy.in.
    For a form that emails you directly without an email app, you can use a
    free service like Formspree / Web3Forms (ask your web designer to plug in).
