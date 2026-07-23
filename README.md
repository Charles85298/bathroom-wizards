# Bathroom Wizards Website

A mobile-responsive, dark-themed portfolio site for **Bathroom Wizards**.

## Included

- Home page and service sections
- Click-to-enlarge project gallery
- Before/after comparison slider
- Responsive mobile navigation
- Phoenix-area map with an approximate 70-mile radius
- Contact information and estimate form
- Placeholder Google Reviews button
- Temporary wizard logo in SVG format
- SEO description, social sharing metadata, sitemap, and robots file

## Preview on your computer

Open `index.html` in a browser. The map and Google Fonts require an internet connection.

For the most accurate preview, run a simple local server from the website folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Important setup before publishing

### 1. Activate the contact form

This site uses Formspree because a plain static website cannot send email by itself.

1. Create a free Formspree account.
2. Create a new form and set the notification email to `Wayne.Trotter@bathroom-wizards.com`.
3. Formspree gives you an endpoint similar to:

   `https://formspree.io/f/abcdwxyz`

4. Open `index.html`.
5. Find:

   `https://formspree.io/f/mkodqjal`

6. Replace it with your real endpoint.
7. Remove `data-form-placeholder="true"` from the same `<form>` tag.

Cloudflare also documents Formspree as a simple option for static HTML forms on Pages.

### 2. Add the Google Reviews link

1. Open your Google Business Profile.
2. Copy the link that sends customers to your reviews/profile.
3. Open `index.html`.
4. Find:

   `href="#google-reviews-url" data-placeholder="true"`

5. Replace it with your complete Google URL and remove `data-placeholder="true"`.

### 3. Add or replace photos

Photos are stored in `assets/images/`.

To replace an existing photo, use the same filename. To add a new gallery item, copy one of the `<button class="gallery-card">...</button>` blocks inside the `gallery-grid` section and update the image path, alt text, caption, and project title.

For best speed, resize large photos to roughly 1800–2400 pixels on the longest edge and save them as optimized JPG or WebP files.

## Upload to GitHub using the website

1. Sign in to GitHub.
2. Select **New repository**.
3. Name it `bathroom-wizards-website`.
4. Choose **Public** or **Private**. Cloudflare Pages can connect to either when authorization is granted.
5. Create the repository without adding starter files.
6. Open the repository and choose **Add file → Upload files**.
7. Extract this ZIP first, then drag the **contents inside** the `bathroom-wizards-site` folder into GitHub. `index.html` must be at the repository root.
8. Commit the files.

GitHub's web uploader supports files up to 25 MiB each. The provided photos are below that threshold, but optimized photos are still recommended.

## Publish with Cloudflare Pages

1. Sign in to Cloudflare.
2. Open **Workers & Pages**.
3. Select **Create application** and choose **Pages**.
4. Choose **Connect to Git**.
5. Authorize GitHub and select `bathroom-wizards-website`.
6. For build settings:
   - Framework preset: **None**
   - Build command: leave blank
   - Build output directory: `/` or leave the default root option offered by Cloudflare
7. Save and deploy.

Cloudflare will publish the site to a temporary `pages.dev` address. With Git integration, future GitHub commits automatically trigger a new deployment.

> Important: Cloudflare's current documentation notes that a Pages project created with Git integration cannot later be converted to Direct Upload. Create this site using **Connect to Git** from the beginning.

## Connect Bathroom-wizards.com

1. In the Cloudflare Pages project, open **Custom domains**.
2. Select **Set up a custom domain**.
3. Enter `bathroom-wizards.com`.
4. Follow Cloudflare's DNS prompts.
5. Add `www.bathroom-wizards.com` as a second custom domain if desired.
6. Choose one version as the primary URL and redirect the other version to it using Cloudflare Redirect Rules if needed.

For an apex/root domain such as `bathroom-wizards.com`, Cloudflare requires the domain to be in the same Cloudflare account as the Pages project.

## Website files

- `index.html` — page content and contact details
- `styles.css` — design, layout, mobile responsiveness, and animations
- `script.js` — menu, animations, gallery lightbox, slider, map, and form reminders
- `assets/icons/wizard-logo.svg` — temporary logo
- `assets/images/` — project photographs
- `robots.txt` and `sitemap.xml` — search engine files

## Business details currently included

- Phone: 602-600-8820
- Email: Wayne.Trotter@bathroom-wizards.com
- Domain: Bathroom-wizards.com
- Area: Phoenix Metro and surrounding communities
