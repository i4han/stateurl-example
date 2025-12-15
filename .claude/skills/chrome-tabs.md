# Chrome-Style Tabs

A clean, minimal tab component that mimics Chrome browser tabs with seamless connection between active tab and content.

## Design Principles

- **Seamless active tab** - Active tab background matches content, no visible border between them
- **Contrasting tab bar** - Tab bar uses darker/muted background to separate from content
- **Subtle dividers** - Thin vertical lines between inactive tabs, hidden near active tab
- **Card-like content** - Thicker border on left, right, bottom gives depth
- **Stable transitions** - Only animate color/background, not dimensions (prevents layout shift)
- **Consistent tab width** - Equal width tabs using flexbox

## HTML Structure

```html
<div class="chrome-tabs">
    <a href="#" class="active">Tab 1</a>
    <a href="#">Tab 2</a>
    <a href="#">Tab 3</a>
</div>
<div class="tab-content">
    <!-- Content here -->
</div>
```

## CSS

```css
.chrome-tabs {
    display: flex;
    gap: 0;
    margin: 1.5rem 0 0;
    padding: 4px 4px 0;
    background: var(--border-default);
    border-radius: 10px 10px 0 0;
    overflow-x: auto;
}

.chrome-tabs a {
    flex: 1;
    min-width: 100px;
    padding: 10px 16px 11px;
    margin-bottom: -1px;
    background: transparent;
    cursor: pointer;
    font-size: 15px;
    color: var(--text-secondary);
    transition: background 0.15s, color 0.15s;
    white-space: nowrap;
    text-decoration: none;
    text-align: center;
    position: relative;
    border-radius: 8px 8px 0 0;
}

/* Subtle dividers between tabs */
.chrome-tabs a:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 16px;
    width: 1px;
    background: var(--text-secondary);
    opacity: 0.3;
}

.chrome-tabs a:hover {
    background: rgba(255,255,255,0.5);
    color: var(--text-primary);
}

.chrome-tabs a.active,
.chrome-tabs a.active:hover {
    background: var(--bg-surface);
    color: var(--text-primary);
    font-weight: 500;
}

/* Hide dividers adjacent to active tab */
.chrome-tabs a.active::after,
.chrome-tabs a:has(+ a.active)::after {
    display: none;
}

/* Tab content panel */
.tab-content {
    background: var(--bg-surface);
    padding: 1.5rem;
    border-radius: 0 0 10px 10px;
    margin-top: 0;
    border: 3px solid var(--border-default);
    border-top: 1px solid transparent;
}
```

## CSS Variables Required

```css
:root {
    --bg-surface: #ffffff;      /* Content background */
    --bg-muted: #f5f5f5;        /* Muted background */
    --border-default: #e0e0e0;  /* Tab bar background & content border */
    --text-primary: #1a1a1a;    /* Active tab text */
    --text-secondary: #666666;  /* Inactive tab text */
}
```

## Key Implementation Notes

1. **Seamless connection**: Active tab uses `margin-bottom: -1px` to overlap content border
2. **No layout shift**: All tabs have same padding/margin; only background/color transitions
3. **Divider hiding**: Use `:has()` selector to hide divider before active tab
4. **Content border**: Use `border-top: 1px solid transparent` to prevent visible line

## React Example with stateurl

```tsx
<div className='chrome-tabs'>
    <a
        href={props.to('tab1')}
        onClick={handleHref}
        className={activeTab === 'tab1' ? 'active' : ''}
    >
        Tab 1
    </a>
    <a
        href={props.to('tab2')}
        onClick={handleHref}
        className={activeTab === 'tab2' ? 'active' : ''}
    >
        Tab 2
    </a>
</div>
<Outlet />
```
