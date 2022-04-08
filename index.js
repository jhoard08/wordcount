const fs = require('fs');
const readline = require('readline');

const wordCounter = Object.create(null);

(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('testfile.txt')
    });

    rl.on('line', line => {
        line.toLowerCase().split(' ').forEach(word => {
            if (!word) return;
            wordCounter[word] = (wordCounter[word] || 0) + 1;
          });
    });
    await rl.on("close", () => {
        let result = Object.entries(wordCounter)
          .sort((a, b) =>  b[1] - a[1])
          .map(entry => `${entry[0]} ${entry[1]}`)
          .join("\n");
    
        console.log(result);
    });

  } catch (err) {
    console.error(err);
  }
})();
