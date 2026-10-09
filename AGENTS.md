# Project Architecture

- Events and Services use dedicated `/events` and `/services` routes; the homepage keeps its concise event overview.
- Keep homepage-specific editorial presentation local to the homepage and reuse existing portfolio data; this prevents refinements from changing shared pages or portfolio systems.
- Keep enquiry validation in a pure frontend helper using libphonenumber-js, with field-rule tests; this validates international numbers without changing enquiry storage or access controls.
- Measure the fixed header for scroll clearance; this keeps anchor destinations below navigation at every screen size.