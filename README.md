# OCR POC

This is a simple POC for OCR reading images and documents.

The Node.js code relies on a couple of NPM packages that in turn act as wrappers around _ghostscript_ and _tesseract_ that perform the actual OCR processing.

**TODO**

- [x] Change to node lts
- [ ] Cleanup the Dockerfile
- [ ] Swe language in PDF processing
- [ ] Investigate PDF processing performance

## Setup

```shell
brew install ghostscript tesseract tesseract-lang
nvm install && nvm use
npm ci
```

## Run

```shell
# Set TESSDATA_PREFIX (MacOS + brew)
export TESSDATA_PREFIX=/opt/homebrew/share/tessdata

npx nodemon
```

Add more images/documents to the `input/` dir to try it out.
