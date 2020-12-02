# test-fw

Testing the Somenage framework.

Configuring all stuff to work together is not easy. At this momement there are 9 config files in 5 folders using half-a-dozen hacks to make the magic happen.

What's interesting to see is `tsconfig.json` and all `jest.config.json` files in the root and subfolders.

## Create Next App

- Install is easy

## Typescript

- Install is easy

### Paths

- Easy
- https://www.typescriptlang.org/tsconfig#paths
- https://nextjs.org/docs/advanced-features/module-path-aliases

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@theme": ["theme/"],
      "@hooks": ["hooks/"],
      "@components/*": ["components/*"],
      "@pages/*": ["pages/*"]
    }
  }
}
```

### `ts-jest`

- Install is easy.
- At the first run gives two errors:
  - Cannot find module '@theme' from `src/hooks/use-breakpoint/useBreakpoint.ts`
  - Jest encountered an unexpected token in `src/components/Home/Home.test.tsx`

#### `@theme`

- https://kulshekhar.github.io/ts-jest/user/config/#paths-mapping

```js
// jest.config.js
moduleNameMapper: {
  "^@theme": "<rootDir>/src/theme/",
  "^@hooks": "<rootDir>/src/hooks/",
  "^@components/(.*)$": "<rootDir>/src/components/$1",
  "^@pages/(.*)$": "<rootDir>/src/pages/$1",
},
```

#### `Home.test.tsx`

- https://stackoverflow.com/questions/41318115/testing-two-environments-with-jest
- https://github.com/nrwl/nx/issues/3776

```json
{
  "compilerOptions": {
    "jsx": "react"
  }
}
```

However **THAT SETTING WILL BE ARBITRARILY OVERWRITTEN BY NEXT**.
As a workaround a `tsconfig.jest.json` has to be created, and a `globals` entry added to all `jest.config.js` files.
See https://github.com/vercel/next.js/issues/8663

```js
// jest.config.js, in root + project folders
globals: {
  /**
   * A workaround for 'Next.js' to enable `"jsx": "react"`
   * @see https://github.com/vercel/next.js/issues/8663
   */
  "ts-jest": {
	tsconfig: "tsconfig.jest.json",
  },
},
```

```js
// jest.config.js
projects: [
  /**
   * Configuring different test environments.
   * For React components: 'jsdom'
   * For hooks, theme: node
   * @see https://stackoverflow.com/questions/41318115/testing-two-environments-with-jest
   */
  "<rootDir>/src/pages",
  "<rootDir>/src/components",
  "<rootDir>/src/hooks",
  "<rootDir>/src/theme",
],
```

```js
// hooks/jest.config.js, theme/jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  /**
   * https://kulshekhar.github.io/ts-jest/user/config/#paths-mapping
   */
  moduleNameMapper: {
    "^@theme": "<rootDir>/../theme/",
    "^@hooks": "<rootDir>/../hooks/",
    "^@components/(.*)$": "<rootDir>/../components/$1",
    "^@pages/(.*)$": "<rootDir>/../pages/$1",
  },
};
```

```js
// components/jest.config.js, pages/jest.config.js
module.exports = {
  preset: "ts-jest",
  /**
   * Load different test environment for JSX
   * @see https://github.com/nrwl/nx/issues/3776
   */
  testEnvironment: "jest-environment-jsdom-fifteen",
  /**
   * Enable @path imports for tests.
   * https://kulshekhar.github.io/ts-jest/user/config/#paths-mapping
   */
  moduleNameMapper: {
    "^@theme": "<rootDir>/../theme/",
    "^@hooks": "<rootDir>/../hooks/",
    "^@components/(.*)$": "<rootDir>/../components/$1",
    "^@pages/(.*)$": "<rootDir>/../pages/$1",
  },
};
```

#### `import "normalize.css";`

- https://jestjs.io/docs/en/webpack.html

```js
// jest.config.js in all project folders (theme, hooks, components, pages)
module.exports = {
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "../../jest.mock.file.js",
    "\\.(css|less)$": "../../jest.mock.css.js",
  },
};
```

## React testing library

- Install is easy.

## MDX

### Next.js

- The official install guides are not working: https://mdxjs.com/getting-started/next, https://github.com/vercel/next.js/tree/canary/packages/next-mdx
- No official TS support: https://github.com/microsoft/TypeScript/issues/36440
- It seems the problem is the latest version.

```js
// This works
"@mdx-js/loader": "1.6.21",
"@next/mdx": "10.0.2",

// This is not working for now
"@mdx-js/loader": "^1.6.22",
"@next/mdx": "^10.0.3",
```

- Finally we have:

```js
// mdx.d.ts
declare module "*.mdx" {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}
```

```js
// next.config.js
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});
module.exports = withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});
```

```js
// tsconfig.json
"include": ["next-env.d.ts", "mdx.d.ts", "**/*.ts", "**/*.tsx"],
```

### Jest

- Simply exclude `.mdx` files as other files like `.jpg` from being tested.

```js
// in every jest.config.js file in project folders.
"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|mdx)$":
  "<rootDir>/../../jest.mock.file.js",
"\\.(css|less)$": "<rootDir>/../../jest.mock.css.js",
```
