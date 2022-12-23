FROM ubuntu:kinetic

RUN apt-get update
RUN apt-get -y install ghostscript nodejs npm pdftk poppler-utils tesseract-ocr tesseract-ocr-swe

WORKDIR /app
ADD package*json /app/

RUN npm ci

ADD index.js /app/index.js
ADD input /app/input
RUN mkdir /app/output

ENV TESSDATA_PREFIX=/usr/share/tesseract-ocr/5/tessdata
CMD ["node", "index.js"]
