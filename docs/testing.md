# Testing

We use [Jest](https://jestjs.io/docs/tutorial-react-native) for testing. The structure we follow is that tests will live alongside each section of code in a `_tests_` folder, this ensures clarity as to areas missing testing as well as being able to easily locate tests.

The jest configuration lives within `package.json` in the Jest section.

## Useful Commands

To access the `jest` CLI you'll likely need to use the `npx` cli.

**Run Tests**

```
npm test
```

or

```
npm run test
```

**Update Snapshots**

```
npx jest --updateSnapshots
```
