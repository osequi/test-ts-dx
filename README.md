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

## Return types

- https://github.com/microsoft/TypeScript/wiki/Performance#using-type-annotations
- Adding type annotations, especially return types, can save the compiler a lot of work.

## Avoid unions

- https://github.com/microsoft/TypeScript/wiki/Performance#preferring-base-types-over-unions
- Prefer base types vs unions
- Avoiding unions also removes a strong reason to use types vs interfaces.
