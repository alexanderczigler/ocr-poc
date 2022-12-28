const fs = require("fs");
const { recognize } = require("node-tesseract-ocr");
const PdfOcr = require("node-pdf-ocr");

const languages = ["eng", "swe"];
const supportedFormats = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "pdf",
  "tif",
  "tiff",
  "webp",
];
const processes = [];

const write = (path, data) => {
  console.log(`*** Writing ${path}`);
  fs.writeFileSync(path, data);
};

fs.readdirSync(`${__dirname}/input`).forEach((file) => {
  const fileExtension = file.split(".").pop();
  if (!supportedFormats.includes(fileExtension)) return; // Skip unsupported formats

  languages.forEach((language) => {
    console.log(`*** Adding ${file} to process queue.`);

    switch (fileExtension) {
      case "pdf":
        processes.push(
          PdfOcr(`${__dirname}/input/${file}`, {
            language,
            quality: 720,
          })
            .then((text) => {
              console.log(`--- ${language}-${file} ---`);
              console.log(text);
              console.log(`--- END ---`);

              write(`${__dirname}/output/${language}-${file}.txt`, text);
            })
            .catch((error) => {
              console.log(error.message);
            })
        );
        break;
      default:
        processes.push(
          recognize(`${__dirname}/input/${file}`, {
            lang: language,
            oem: 1,
            psm: 3,
          })
            .then((text) => {
              write(`${__dirname}/output/${language}-${file}.txt`, text);
            })
            .catch((error) => {
              console.log(error.message);
            })
        );
    }
  });
});

Promise.all(processes)
  .then(() => {
    console.log("*** Done!");
  })
  .catch((error) => {
    console.error(error);
  });
