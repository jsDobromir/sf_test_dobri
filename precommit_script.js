const { exec } = require("child_process");
const readline = require("readline");
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
            const testProcess = exec(testCommand);
            const rl = readline.createInterface({
                input: testProcess.stdout,
                output: testProcess.stdout,
                terminal: false
            });
            rl.on("line", (line) => {
                console.log(`Recived line: ${line}`);
            });
            rl.on("error", (error) => {
                console.error("\x1b[31m", error);
                process.exit(1);
            });
            rl.on("exit", (code) => {
                console.log(`Process exited with code ${code}`);
            });
            // exec(testCommand, (error, stdout, stderr) => {
            //     if (error) {
            //         console.error("\x1b[31m", error);
            //         process.exit(1);
            //     }
            //     // Parse the stdout to get the "Outcome"
            //     const lines = stdout.split("\n");
            //     let outcome = "Unknown"; // Default value in case "Outcome" is not found

            //     // Loop through each line to find the "Outcome" value
            //     for (let line of lines) {
            //         console.log(line);
            //         if (line.startsWith("Outcome")) {
            //             const outcomeParts = line.split("│"); // Split based on the separator
            //             if (outcomeParts.length > 1) {
            //                 outcome = outcomeParts[1].trim(); // Extract and trim the value
            //             }
            //             break;
            //         }
            //     }
            //     // Output the result
            //     console.log(`Test Outcome: ${outcome}`);

            //     // Exit with success if the outcome is "Passed", else failure
            //     if (outcome === "Passed") {
            //         process.exit(0);
            //     } else {
            //         process.exit(1);
            //     }
            // });
        } else {
            process.exit(0);
        }
    }
);
