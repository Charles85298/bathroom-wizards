# Bathroom Wizards Website — Version 3.0

Version 3 loads carousel photos directly from a public GitHub repository. It does not use a GitHub Action, `.github` workflow, `gallery.json`, Python, or a Windows batch file.

## One-time setup

Open `gallery-config.js` and replace these two values:

```js
owner: "REPLACE_WITH_GITHUB_USERNAME",
repo: "REPLACE_WITH_REPOSITORY_NAME",
```

Example:

```js
owner: "wayne-trotter",
repo: "bathroom-wizards",
```

Keep `branch: "main"` unless your website uses a different branch. Keep `folder: "assets/gallery"` unless you intentionally store the photos elsewhere.

The GitHub repository must be public because the website reads the public GitHub Contents API without a password or token.

## Add photos later

1. Open `assets/gallery` in the GitHub repository.
2. Select **Add file → Upload files**.
3. Upload JPG, JPEG, PNG, WEBP, GIF, or AVIF images.
4. Commit the upload.
5. Wait for Cloudflare to deploy, then refresh the website.

The carousel automatically detects every supported image in that folder. It creates captions from filenames and sorts filenames in descending order. Date-prefixed filenames work well, such as:

- `2026-07-24-phoenix-guest-bath.jpg`
- `2026-07-20-custom-tile-shower.jpg`
- `2026-06-25-kitchen-hood-install.jpg`

## Important

- Do not restore `update-gallery.yml`; Version 3 does not need it.
- Do not create or update `gallery.json`; Version 3 does not read it.
- GitHub may temporarily limit anonymous API requests if the same internet connection refreshes the page many times in one hour. Normal customer traffic should generally be fine, but a Cloudflare API proxy would be the next upgrade for a high-traffic site.
