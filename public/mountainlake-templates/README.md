# Mountainlake Templates

Community-contributed template files for the Mountainlake note design system.

## Quick Add Template

1. **Design** your template using the Mountainlake Designer
2. **Export** using "Download Template"
3. **Save** the file to `public/mountainlake-templates/`
3. **Add** to project:

```bash
npm run addTemplate your-template.mountainlake.json
```

Done! The script validates and adds your template automatically.

## Template Format

```json
{
  "name": "Your Template Name",
  "description": "Brief description",
  "author": "Your Name",
  "version": "1.0",
  "createdAt": "2025-11-20T12:00:00.000Z",
  "front": { /* config */ },
  "back": { /* config */ }
}
```
