const fs = require("fs");
const { recognize } = require("node-tesseract-ocr");

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
  if (!supportedFormats.includes(file.toLowerCase().split(".").pop())) return; // Skip unsupported formats

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
});

Promise.all(processes)
  .then(() => {
    console.log("Done!");
  })
  .catch((error) => {
    console.error(error);
  });
