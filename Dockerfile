FROM node:19

RUN apt-get -y update
RUN apt-get -y install \
  ghostscript \
  pdftk \
  poppler-utils \
  tesseract-ocr \
  tesseract-ocr-swe

WORKDIR /app
ADD package*json /app/

RUN npm ci

ADD index.js /app/index.js
ADD input /app/input
RUN mkdir /app/output

CMD ["node", "index.js"]
