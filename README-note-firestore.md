# Harada Chart Builder

## Data Source of Truth

The source of truth for all Harada chart data is the Firestore `charts` document. All chart edits, progress, and sharing features persist to Firestore, not local or in-memory state.

See the implementation plan for further details on the Firestore data model and usage.