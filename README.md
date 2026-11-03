# Bilal Aytekin — personal academic website

Plain HTML and CSS for GitHub Pages: no Jekyll, no build step, no framework. Each page is a single
small HTML file, so navigation is effectively instant, and the site has a light/dark toggle.

Live at <https://bilalaytekin.github.io>.

## Pages and files

| File | Contents |
| --- | --- |
| `index.html` | About, research interests, publications and preprints |
| `talks.html` | Talks given, conferences and workshops attended |
| `teaching.html` | Teaching at UMD and Boğaziçi, service |
| `notes.html` | B.Sc. thesis and lecture notes |
| `404.html` | Not-found page (uses absolute paths because it can be served at any URL) |
| `assets/style.css` | All styling; light and dark themes share one set of color tokens |
| `assets/site.js` | Theme toggle, copy-email button, hover prefetch fallback |
| `assets/photo.jpg`, `photo.webp` | Portrait, resized to 480×600 (45 KB / 27 KB instead of the old 4000×6000 original) |
| `assets/favicon.svg` | Browser-tab icon |
| `files/` | CV, résumé, thesis and lecture-note PDFs (file names unchanged, so old links still work) |
| `cv/`, `teaching/`, `talks/`, `writing/`, `about/`, `resume/`, `publication/…` | Tiny redirect pages so URLs from the old Jekyll site (and search results) still land somewhere |
| `sitemap.xml`, `robots.txt` | Help search engines find the pages |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |

## Preview locally

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Routine updates

- **CV and résumé.** In the LaTeX project run `make site SITE=path/to/this/repo` (or copy
  `cv.pdf` to `files/Bilal_Aytekin_CV.pdf` and `resume.pdf` to `files/Bilal_Aytekin_Resume.pdf`).
  Then update the "November 2026" strings: search all HTML files for `November 2026`.
- **Papers.** Add an `<li class="pub">` block at the top of the `<ol class="pubs">` list in
  `index.html`, numbered one higher than the current first entry. Abstracts go in a
  `<details class="abstract">` block. For an arXiv paper, the BibTeX link is
  `https://arxiv.org/bibtex/<arXiv id>`.
- **Talks, conferences, courses.** Copy an existing list item (`talks.html`) or table row
  (`teaching.html`) and edit it. Lists are in reverse chronological order.
- **Header, sidebar, footer.** These are repeated in each of the four main pages so that every
  page loads as one file with nothing to assemble. If you change one (say, the address), make the
  same change in all four; a search-and-replace across `*.html` does it.
- **Photo.** Replace `assets/photo.jpg` and `assets/photo.webp` with a 4:5 portrait about 480 px
  wide. If the photo is ever missing, the sidebar hides the empty slot.

## Improvements over the site this is modeled on

- **Even faster clicks.** Chrome and Edge prerender a page the moment you hover its link
  (Speculation Rules), so the click shows a page that is already rendered; other browsers
  prefetch it on hover. PDFs are excluded so nothing large is fetched by accident.
- **Smooth page changes.** In Chrome, Edge and Safari 18+ the reading column crossfades while
  the header and sidebar stay put (CSS view transitions). It is off for anyone who has asked
  their system for reduced motion.
- **Dark mode details.** The mobile browser's address bar follows the theme, the choice is
  remembered across pages, and it is applied before the first paint, so there is no white flash.
- **Copy-email button** next to the spam-proofed address.
- **BibTeX and code links** on each paper; long author lists fold into an "All authors" toggle.
- **Search-engine metadata.** Each page has a canonical URL, an Open Graph preview (title,
  description, photo) for links shared on Slack, X or email, and the home page has schema.org
  `Person` data. There is also a sitemap.
- **No MathJax download**, since none of the abstracts need it (add the script tag from the
  original site to `index.html` if a future abstract uses `\( ... \)`).
- **Old URLs keep working** through the redirect pages listed above.
- **Optimized portrait** served as WebP, with a JPEG fallback.
- **Print stylesheet** drops the navigation and theme button.

## Publishing (replacing the old Jekyll site)

```sh
git clone https://github.com/bilalaytekin/bilalaytekin.github.io
cd bilalaytekin.github.io
git checkout -b redesign
git rm -r -q .                         # remove the old Jekyll site (it stays in git history)
unzip -o ../website.zip -d .           # the files from this folder, including .nojekyll
git add -A
git commit -m "Replace Jekyll theme with a static site"
git push -u origin redesign
```

Check the preview locally, then merge `redesign` into `master` (on GitHub: open a pull request
and merge it, or `git checkout master && git merge redesign && git push`). Under
**Settings → Pages**, the source should be **Deploy from a branch**, branch `master`, folder
`/ (root)`. The new site is live a minute or two after the push.
