const path = require("path");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { getPackageName } = require("./lib/name");
const { readMarkdownFileSync, writeHtmlFileSync } = require("./lib/file");
const { marked } = require("marked");

const { argv } = yargs(hideBin(process.argv))
  .option("name", {
    describe: "CLI名を表示",
  })
  .option("file", {
    describe: "Markdownファイルのパス",
  })
  .option("out", {
    describe: "html file",
    default: "article.html",
  });

if (argv.name) {
  const packageName = getPackageName();
  console.log(packageName);
  process.exit(0);
}

const markdownStr = readMarkdownFileSync(path.resolve(__dirname, argv.file));
const html = marked(markdownStr);

writeHtmlFileSync(path.resolve(__dirname, argv.out), html);
