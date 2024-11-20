const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const classPath = "force-app/main/default/classes/";

exec(
    "git diff --cached --name-only --diff-filter=ACM",
    (error, stdout, stderr) => {
        if (error || stderr) {
            console.error("Error fetching modified files", error || stderr);
            process.exit(1);
        }

        const modifiedFiles = stdout.split("\n").filter(Boolean);
        if (modifiedFiles.length === 0) {
            console.log("No modified files detected. Skipping.");
            process.exit(0);
        }
        for (const file of modifiedFiles) {
            if (file.includes("/classes/")) {
                const className = file.split("/classes/")[1];
                const fullClassPath = path.resolve(__dirname, classPath);
                console.log(fullClassPath);
            }
        }
    }
);
