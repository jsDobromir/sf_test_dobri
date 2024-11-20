const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const classPath = "force-app/main/default/classes/";

exec(
    "git diff --cached --name-only --diff-filter=M",
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
        const errorsArray = new Array();
        const testClasses = new Set();
        for (const file of modifiedFiles) {
            if (file.includes("/classes/")) {
                const className = file.split("/classes/")[1];
                const classExt = className.split(".")[1];
                if (classExt != "cls" || className.includes("Test")) continue;
                const classNameTest =
                    className.split(".")[0] +
                    "Test" +
                    "." +
                    className.split(".")[1];
                const fullClassPathTest = path.resolve(
                    __dirname,
                    classPath,
                    classNameTest
                );
                testClasses.add(className.split(".")[0] + "Test");
                const fileExists = fs.existsSync(fullClassPathTest);
                if (!fileExists) {
                    errorsArray.push(
                        `Error: test class for class: ${className} does not exist`
                    );
                }
            }
        }
        if (errorsArray.length > 0) {
            for (const error of errorsArray) {
                console.error("\x1b[31m", error);
            }
            process.exit(1);
        }

        if (testClasses.size > 0) {
            let testClassesArray = Array.from(testClasses);
            console.log(testClassesArray.join(","));
            const testCommand = `sfdx force:apex:test:run --classnames ${testClassesArray.join(",")} --resultformat human --synchronous`;
            exec(testCommand, (error, stdout, stderr) => {
                console.log("output");
                console.log(stdout);
                const isWarning = stderr && stderr.includes("Warning:");
                console.log(stderr.length);
                if ((error || (stderr && !isWarning)) && !isWarning) {
                    console.error("\x1b[31m", error || stderr);
                    process.exit(1);
                }
                process.exit(0);
            });
        } else {
            process.exit(0);
        }
    }
);
