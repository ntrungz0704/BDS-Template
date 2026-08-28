---
description: Always include summary tables when explaining results, commands, or configurations to the user.
globs: 
alwaysApply: true
---

# Table-Style Reporting Rule

When reporting results, explaining commands, configurations, or any multi-step process to the user:

1. **Always include a summary table** that breaks down each component with clear columns (e.g., Part | Meaning, File | Change | Status, etc.)
2. Use markdown table format with headers and alignment
3. Keep explanations in the table concise but informative
4. Tables should come AFTER the raw content (code block, command, etc.) to serve as a visual explanation

## Examples of good table usage:

- Command explanations: Break each part of a long command into rows
- File changes: List each file modified with what changed and status
- Configuration mappings: Show key-value pairs with descriptions
- Deployment status: Show each service with its domain and state
- Error summaries: List each error with its cause and fix
