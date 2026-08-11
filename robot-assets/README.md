# Robot presentation assets

The original 2026 CAD exports live locally in `source/` and are intentionally ignored by Git. They total roughly 1.7 GB and are not suitable for a public web deployment in their current form.

Deployment-safe static renders are kept in `public/robot-assets/` and power the homepage and Engineering page. If the source model is simplified for the web later, export a derived asset rather than publishing the original STEP, OBJ, or full-resolution GLB.
