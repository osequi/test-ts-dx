# test-ts-dx

Finding a better DX for TS.
See https://github.com/osequi/somenage/issues/4

## Types vs. Interfaces

- Blurry
- Types seem more powerful:
  - https://stackoverflow.com/a/52682220, https://stackoverflow.com/a/56360335
  - "Unlike an interface, the type alias can also be used for other types such as primitives, unions, and tuples.""
  - Suits better Javascript functions: https://blog.logrocket.com/types-vs-interfaces-in-typescript/
- Interfaces seem more complicated:
  - Are more OOP-like with the `extends`, `implements` syntax
  - Suits better React components: https://blog.logrocket.com/types-vs-interfaces-in-typescript/
- They both can be used together.
- Microsoft tells choose interfaces:

  - https://github.com/microsoft/TypeScript/wiki/Performance#-read-carefully-before-you-jump-to-conclusions-on-this-page
  - Creating types and interfaces is in the same way easy
  - However when composing them interfaces shine:
    - Interfaces create a single flat object type that detects property conflicts
    - Intersections on the other hand just recursively merge properties, and in some cases produce `never`
  - Interfaces display better
  - Interfaces are cached

- The React TypeScript cheatsheet says:
  - https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/types_or_interfaces
  - always use interface for public API's definition when authoring a library or 3rd party ambient type definitions, as this allows a consumer to extend them via declaration merging if some definitions are missing.

### In practice, types work better than interfaces

```js
// Interfaces
const breakpoint: TBreakpoint = breakpoints.find(
  /**
   * // NOTE: It seems comparisions have to be type casted.
   * @see https://github.com/microsoft/TypeScript/issues/25642
   */
  (item: TBreakpoint) => String(item.name) === String(name)
);
```

vs

```js
// Types
const breakpoint = breakpoints.find((item: TBreakpoint) => item.name === name);
```

With interfaces `useBreakpoint('mobile')` is not working, fails with the error: `Argument of type 'string' is not assignable to parameter of type 'TBreakpointNames | TBreakpointNames[]'.`

With types `useBreakpoint('mobile')` works just as expected: allows only the enumerated values.

## Return types

- https://github.com/microsoft/TypeScript/wiki/Performance#using-type-annotations
- Adding type annotations, especially return types, can save the compiler a lot of work.

## Avoid unions

- https://github.com/microsoft/TypeScript/wiki/Performance#preferring-base-types-over-unions
- Prefer base types vs unions
- Avoiding unions also removes a strong reason to use types vs interfaces.

## React.FC

- https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components
- It's better without, but the return type needs to be set.
- It turns out TS sets the return type automatically to `JSX.Element`. Just hover on any React function component and see the return type. Also: https://www.typescriptlang.org/docs/handbook/jsx.html#function-component says: `TS enforces that its return type must be assignable to JSX.Element.`
