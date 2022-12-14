const JSZip = require("jszip");
const fs = require("fs");

const zip = JSZip()

// OSU MapReader v1.0

const LINE_REGEX = /\r\n/;
const CATEGORY_REGEX = /\[([^)]+)\]/;
const PARAMETER_REGEX = /^(\w+?):(\w+?)$/;
const POINT_REGEX = /([-\d,.:]+)$/;

const getExtension = (fileName) => {
  const arr = fileName.split(".");
  const extension = arr[arr.length - 1]
  return extension;
};

const readMap = (fileName, callback) => {
  fs.readFile(fileName, (err, data) => {
    if (err) throw err;
    zip.loadAsync(data).then((result) => {
      const files = []
      const fileNames = Object.keys(result.files);
      fileNames.forEach(name => {
        const currentFile = zip.file(name);
        files.push(currentFile);
      })
      callback(files);
    })
  });
}

const filterExtension = (files, ext) => {
  const result = files.filter(file => {
    const fileExt = getExtension(file.name);
    if (fileExt === ext) {
      return file
    }
  })
  return result
}

const parseChart = (osuFile, callback) => {
  const textFile = osuFile.async("text");
  textFile.then((data) => {
    const lines = data.split(LINE_REGEX);
    const chart = {}

    let categoryName = ""
    lines.forEach((line) => {
      const category = line.match(CATEGORY_REGEX);
      if (category && category.index === 0) {
        categoryName = category[1];
        if (categoryName === "HitObjects" || categoryName === "TimingPoints") {
          chart[categoryName] = [];
        } else {
          chart[categoryName] = {};
        }
      }

      if (categoryName === "HitObjects" || categoryName === "TimingPoints") {
        const pointLine = line.match(POINT_REGEX);
        if (pointLine && pointLine.index === 0) {
          chart[categoryName].push(line);
        }
      } else {
        const parameter = line.match(PARAMETER_REGEX);
        if (parameter && parameter.index === 0) {
          chart[categoryName][parameter[1]] = parameter[2];
        }
      }
    });

    callback(chart);
  });
}

readMap("1857899.osz", (files) => {
  const osuFiles = filterExtension(files, "osu")
  parseChart(osuFiles[0], (chart) => {
    // Send from server, for example
  });
});
