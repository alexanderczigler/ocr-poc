FROM alexanderczigler/ubuntu-ocr:kinetic

RUN apt-get -y install nodejs npm

WORKDIR /app
ADD package*json /app/

RUN npm ci

ADD index.js /app/index.js
ADD input /app/input
ADD run.bash /app/run.bash

RUN mkdir /app/output

ENV TESSDATA_PREFIX=/usr/share/tesseract-ocr/5/tessdata
CMD ["bash", "run.bash"]
