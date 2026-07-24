# Bathroom Wizards Website — Version 2.0

A premium, mobile-responsive static portfolio website for Bathroom Wizards, ready for Cloudflare Workers Static Assets, Cloudflare Pages, or GitHub hosting.

## Version 2.0 features

- Premium animated hero and loading screen
- Updated wizard-and-water-drop SVG logo
- Filterable, click-to-enlarge project gallery
- Before/after comparison slider
- Quick-estimate modal using the existing Formspree endpoint
- Main contact form using Formspree
- Thumbtack trust stats and profile link
- Google Reviews placeholder button
- Interactive Phoenix map with an approximate 70-mile radius
- Google Maps launch button
- Mobile Call, Text, and Estimate controls
- Local business structured data, canonical URL, Open Graph metadata, sitemap, and robots file
- Reduced-motion accessibility support

## Publish through GitHub and Cloudflare

1. Extract this ZIP.
2. Upload the contents of `bathroom-wizards-site` to the root of your GitHub repository.
3. Commit the changes.
4. Redeploy your Cloudflare Worker/Static Assets project, or let the Git-connected deployment run automatically.
5. Test `https://bathroom-wizards.com` on desktop and mobile.

## Google Reviews URL

Open `index.html`, search for `#google-reviews-url`, and replace it with the final Google review/profile link. Remove `data-placeholder="true"` after inserting the live URL.

## Add gallery photos

1. Put optimized JPG or WebP files in `assets/images/`.
2. Copy an existing `.gallery-card` block in `index.html`.
3. Update the image path, caption, alt text, and `data-category`.
4. Use one of: `tile`, `waterproofing`, or `remodeling`. Add another filter button if you create a new category.

## Contact forms

Both forms post to `https://formspree.io/f/mkodqjal`. Destination email settings are managed in Formspree.

## Important business claims

The site intentionally does not state “licensed” or “insured.” Add those claims only when verified and currently applicable.

## Version 2.1 changes
- Added three featured Thumbtack customer reviews.
- Removed the interactive map and all Leaflet dependencies.
- Retained the Phoenix-area service list with direct estimate and phone actions.

## Automatic photo carousel (Version 2.2)

The project gallery is now generated from the `assets/gallery` folder.

### Easiest Windows workflow
1. Copy new JPG, PNG, WebP, GIF, or AVIF pictures into `assets/gallery`.
2. Give each file a descriptive name, such as `Gilbert-master-bath-remodel.jpg`.
3. Double-click `update-gallery.bat`.
4. Upload/deploy the complete website folder.

The updater rebuilds `gallery.json`. The website reads that file and automatically creates the carousel, navigation arrows, dots, captions, autoplay, and full-size lightbox.

### GitHub automatic workflow
If the website repository is connected to GitHub, the included `.github/workflows/update-gallery.yml` workflow regenerates and commits `gallery.json` whenever files are added to `assets/gallery`. Cloudflare can then redeploy the updated site from the repository.

Important: a static website cannot directly inspect a server folder in the browser. The included updater or GitHub workflow creates the small manifest that tells the carousel which photos exist.
