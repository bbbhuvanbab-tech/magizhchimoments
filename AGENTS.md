# Project Architecture

- Events and Services use dedicated `/events` and `/services` routes; the homepage keeps its concise event overview.
- Keep homepage-specific editorial presentation local to the homepage and reuse existing portfolio data; this prevents refinements from changing shared pages or portfolio systems.