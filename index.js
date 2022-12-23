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

fs.readdirSync(`${__dirname}/input`).forEach((file) => {
  const fileExtension = file.split(".").pop();
  if (!supportedFormats.includes(fileExtension)) return; // Skip unsupported formats

  switch (fileExtension) {
    case "pdf":
      const lang = "eng";
      processes.push(
        PdfOcr(`${__dirname}/input/${file}`)
          .then((text) => {
            fs.writeFileSync(`${__dirname}/output/${lang}-${file}.txt`, text);
          })
          .catch((error) => {
            console.log(error.message);
          })
      );
      break;
    default:
      languages.forEach((lang) => {
        processes.push(
          recognize(`${__dirname}/input/${file}`, {
            lang,
            oem: 1,
            psm: 3,
          })
            .then((text) => {
              fs.writeFileSync(`${__dirname}/output/${lang}-${file}.txt`, text);
            })
            .catch((error) => {
              console.log(error.message);
            })
        );
      });
  }
});

console.log("Processing...");

Promise.all(processes)
  .then(() => {
    console.log("Done!");
  })
  .catch((error) => {
    console.error(error);
  });
