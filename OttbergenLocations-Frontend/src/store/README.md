# Store

Dieser Ordner ist für State Management reserviert.

Sie können hier Pinia (empfohlen für Vue 3) oder Vuex verwenden.

## Pinia Installation (empfohlen)

```bash
npm install pinia
```

Dann in `main.ts`:

```typescript
import { createPinia } from 'pinia'

app.use(createPinia())
```
