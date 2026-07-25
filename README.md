# pro-it-help.com portfolio website

Static website for Charles Fleming, ready for GitHub and Cloudflare Pages.

## Upload to GitHub
1. Create or open the GitHub repository named `pro-it-help`.
2. Upload everything in this folder to the root of the repository.
3. Commit the files to the `main` branch.

## Configure the automatic GitHub photography gallery
1. Open `assets/js/gallery-config.js`.
2. Replace `YOUR_GITHUB_USERNAME` with your exact GitHub username.
3. Confirm the repository is `pro-it-help` and the branch is `main`.
4. Keep the repository public so browser visitors can use the GitHub Contents API without a private access token.
5. Commit and push the updated file.

The gallery reads photographs automatically from these folders:

- `assets/images/photography/arizona-landscapes/`
- `assets/images/photography/people/`
- `assets/images/photography/animals/`
- `assets/images/photography/architecture/`
- `assets/images/photography/nature-detail/`
- `assets/images/photography/night-photography/`
- `assets/images/photography/travel-places/`
- `assets/images/photography/transportation/`

To add photographs:
1. Upload the image to the correct category folder.
2. Commit the upload to GitHub.
3. Refresh the gallery page after GitHub and Cloudflare finish publishing.

Supported formats are JPG, JPEG, PNG, WebP, GIF, and AVIF. Filenames are automatically converted into captions. For example, `sedona-sunset.jpg` displays as `Sedona Sunset`.

No filenames need to be added to JavaScript. Placeholder SVG files, README files, and non-image files are ignored.

## Connect Cloudflare Pages
1. Cloudflare Dashboard -> Workers & Pages.
2. Create application -> Pages -> Connect to Git.
3. Select the GitHub repository.
4. Framework preset: `None`.
5. Build command: leave blank.
6. Build output directory: `/` or the repository root.
7. Deploy.

## Custom domain
In the Cloudflare Pages project, open Custom Domains and add:
- `pro-it-help.com`
- `www.pro-it-help.com`

Let Cloudflare create the website DNS records. Keep existing MX, SPF, DKIM, DMARC, Microsoft, and Zoho verification records.

## Update AI project links
Open `ai-projects.html`. Replace `href="#"` placeholders with GitHub, live demo, architecture, and case-study links.

## Update the logo
Replace `assets/images/cf-logo.png` with a newer logo using the same filename.

## Resume
The downloadable resume is stored at `assets/docs/Charles-Fleming-Resume-2024.docx`.
