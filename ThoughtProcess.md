Forked from https://github.com/lizardglobal/assessment

- Get rough idea of what to do, skimming through (in order):
  - Requirements
  - Additional exericses
  - JSON file

- Convert project into typescript
  - Type safety -> catch errors at compile time & prevent bugs
  - Maintainability -> easier to read & understand
  - Productivity -> type hinting can assist in comprehension

- Display markup & decide what to do next

- Do basic requirements

- Styling
  - Google for inspiration
  - TailwindCSS

- Do additional exercises
  - Need react-router
  - Need framer-motion
  - CSS pre-processor 
    - tailwind

- Why is data reloading even on back navigation?
  - We need to cache the data
    - Use react-query - DONE


#### Requirements

- [x] Retrieve the data from the mock API.
  - used fetch()
- [x] Output the data in a list, including properties from the data that are appropriate for a list view.
  - used map()
- [x] Implement a category filter - this can be single or multi-select.
  - used select chips
- [ ] Implement pagination - this can be traditional numbered pages or "load more".
  - ?react-query + miragejs
- [x] Use semantic markup where possible.
  - !attempted, need to double check
- [x] Create a responsive layout with HTML and CSS.
  - !attempted, need to check on many devices and browsers

#### Additional Exercises

- [x] Use client-side routing to create a "detail" page.
  - used react-router
- [x] Persist filter state in the query string.
  - used react-query
- [ ] Include animated transitions between application state, e.g. when filtering.
  - ?framer-motion
- [x] Convert the application to use TypeScript instead of JavaScript.
  - done
- [x] Use a CSS preprocessor or CSS-in-JS rather than plain CSS.
  - !used TailwindCSS

#### TODO

- [ ] Add sufficient documentation