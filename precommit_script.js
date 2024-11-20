const { exec } = require("child_process");

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

        console.log("Modified files: ", modifiedFiles);
        process.exit(0);
    }
);
