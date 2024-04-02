# Debugging Unit Tests

When you run `npm test` Jest will run unit tests.

It's often valuable to be able to step through when test are failing. Within the `./vscode` folder a `launch.json` file allows us to debug Jest.

To debug a specific file go to the `.test.tsx` file and hit `CTRL + SHIFT + D`. This will open the vscode debugger. At the top ensure the drop down is set to 'Jest: current file' and click play. This will hit any breakpoints in the file.
