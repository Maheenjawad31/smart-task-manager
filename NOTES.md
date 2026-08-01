# Accessibility Component Comparison Notes

## Custom Modal vs shadcn Dialog

My custom modal implementation covered the basic dialog requirements:

- `role="dialog"`

- `aria-modal="true"`

- Escape key closing

- Moving focus into the modal

- Returning focus after closing

- Basic focus trapping

After reviewing shadcn Dialog, I noticed it handles several additional details automatically:

1. shadcn provides a more complete focus management system, including reliable focus trapping and restoration across different situations.

2. shadcn separates dialog parts into reusable components such as trigger, content, header, title, and close actions, making the API easier to maintain.

3. shadcn handles rendering details such as portals and overlays, which makes dialogs behave more consistently in complex applications.

---

## Custom Tabs vs shadcn Tabs

My custom tabs implementation included:

- `role="tablist"`

- `role="tab"`

- `role="tabpanel"`

- Arrow key navigation

- Active tab state management

After reviewing shadcn Tabs, I noticed:

1. shadcn provides a more complete ARIA tabs pattern with better internal state management and keyboard behavior.

2. shadcn manages relationships between tabs and panels more systematically, reducing the chance of accessibility mistakes.

3. The generated component is designed to be reusable and composable instead of being tied to one specific example.

---

## What I Learned

Building these components manually helped me understand what accessibility features component libraries provide.

Libraries like shadcn/ui save development time, but understanding the underlying ARIA patterns is important because developers still need to review and customize generated components correctly.