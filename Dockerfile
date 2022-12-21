FROM node:19

RUN apt-get -y update
RUN apt-get -y install pdftk poppler-utils ghostscript tesseract-ocr

WORKDIR /app
ADD package*json /app/

RUN npm ci

ADD index.js /app/index.js
ADD pdf.js /app/pdf.js
ADD input /app/input

CMD ["node", "index.js"]
