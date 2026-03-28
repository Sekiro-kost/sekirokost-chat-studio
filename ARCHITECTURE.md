# Architecture & Choix Techniques

## Vue d'ensemble

Claude Interface est une application web moderne construite avec Next.js 14, utilisant l'App Router et des patterns de développement React modernes.

## Stack Technique

### Frontend
- **Next.js 14** - Framework React avec App Router
- **React 18** - Bibliothèque UI avec hooks et composants fonctionnels
- **TypeScript** - Typage statique pour la qualité du code
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Icônes SVG modernes

### State Management
- **Zustand** - Gestion d'état légère et performante
  - Plus simple que Redux
  - API intuitive basée sur hooks
  - Middleware de persistence intégré
  - Pas de boilerplate

### Persistence
- **localStorage** - Via middleware Zustand persist
  - Sauvegarde automatique de l'état
  - Restauration au chargement
  - Pas besoin de backend pour MVP

## Architecture de l'Application

```
┌─────────────────────────────────────────────────────────┐
│                    App (Next.js 14)                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Sidebar   │  │   ChatView   │  │    Status    │  │
│  │             │  │              │  │  Indicator   │  │
│  │ - Workspaces│  │ - Messages   │  │              │  │
│  │ - Projects  │  │ - Textarea   │  │ - Flash      │  │
│  │ - Sessions  │  │ - Scroll     │  │ - Green dot  │  │
│  └─────────────┘  └──────────────┘  └──────────────┘  │
│        │                 │                   │         │
│        └─────────────────┴───────────────────┘         │
│                          │                             │
│                   ┌──────▼──────┐                      │
│                   │   Zustand   │                      │
│                   │    Store    │                      │
│                   └──────┬──────┘                      │
│                          │                             │
│                   ┌──────▼──────┐                      │
│                   │ localStorage│                      │
│                   └─────────────┘                      │
└─────────────────────────────────────────────────────────┘
```

## Structure des Données

### Hiérarchie

```
Workspace
  ├── id: string
  ├── name: string
  ├── color: string
  ├── createdAt: Date
  └── projects: Project[]
      ├── id: string
      ├── name: string
      ├── description?: string
      ├── createdAt: Date
      └── sessions: Session[]
          ├── id: string
          ├── name: string
          ├── status: 'idle' | 'processing' | 'completed' | 'error'
          ├── tokenUsage: { input, output, total }
          ├── createdAt: Date
          ├── updatedAt: Date
          └── messages: Message[]
              ├── id: string
              ├── role: 'user' | 'assistant' | 'system'
              ├── content: string
              ├── timestamp: Date
              └── tokenCount?: number
```

## Patterns & Principes

### 1. Composants Functionnels avec Hooks

Tous les composants utilisent la syntaxe fonctionnelle moderne :

```typescript
export function Component() {
  const state = useAppStore();
  const [local, setLocal] = useState();
  
  useEffect(() => {
    // Side effects
  }, []);
  
  return <div>...</div>;
}
```

### 2. Single Source of Truth

Zustand centralise tout l'état de l'application. Pas de props drilling, accès direct via hooks.

### 3. Colocation

Les fichiers sont organisés par feature, pas par type :
- `components/` - Composants UI réutilisables
- `hooks/` - Custom hooks
- `lib/` - Utilitaires et helpers
- `store/` - Gestion d'état
- `types/` - Définitions TypeScript

### 4. CSS Utility-First

Tailwind CSS pour un styling rapide et consistant. Classes utilitaires au lieu de CSS custom.

### 5. Type Safety

TypeScript strict pour attraper les erreurs à la compilation.

## Fonctionnalités Clés

### 1. Textarea Flottante

```typescript
// ChatView.tsx
<div className="flex-1 overflow-y-auto">
  {/* Messages scrollables */}
</div>
<div className="fixed bottom-0">
  <textarea /> {/* Reste visible */}
</div>
```

### 2. Notifications Visuelles

```typescript
// StatusIndicator.tsx
const { isClaudeProcessing, shouldFlash } = useAppStore();

<div className={shouldFlash && 'animate-flash'}>
  <div className={isClaudeProcessing ? 'bg-yellow-500' : 'bg-green-500'} />
</div>
```

### 3. Suivi des Tokens

Calcul en temps réel :
```typescript
updateTokenUsage(sessionId, {
  input: previousInput + newInputTokens,
  output: previousOutput + newOutputTokens
});
```

### 4. Persistence Automatique

```typescript
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({ /* state */ }),
    { name: 'claude-interface-storage' }
  )
);
```

## Performance

### Optimisations

1. **Code Splitting** - Next.js split automatiquement le code
2. **Lazy Loading** - Composants chargés à la demande
3. **Memoization** - `useMemo` pour les calculs coûteux
4. **Virtual Scrolling** - À implémenter pour de longues listes

### Métriques Cibles

- First Contentful Paint (FCP): < 1.8s
- Time to Interactive (TTI): < 3.8s
- Lighthouse Score: > 90

## Sécurité

### Actuellement Implémenté

- ✅ Type safety avec TypeScript
- ✅ Validation des inputs côté client
- ✅ XSS protection (React échappe automatiquement)

### À Implémenter

- [ ] API key rotation
- [ ] Rate limiting
- [ ] CSRF protection
- [ ] Content Security Policy headers
- [ ] Input sanitization côté serveur

## Scalabilité

### Current Limitations

- localStorage limité à ~5-10MB
- Pas de synchronisation multi-device
- Pas de collaboration temps réel

### Solutions Futures

1. **Backend API**
   - Node.js + Express ou tRPC
   - PostgreSQL ou MongoDB
   - Authentication (NextAuth.js)

2. **WebSockets**
   - Socket.io pour temps réel
   - Streaming des réponses Claude

3. **Cache**
   - Redis pour sessions actives
   - CDN pour assets statiques

## Testing (À Implémenter)

```bash
npm install -D @testing-library/react @testing-library/jest-dom jest
```

- Unit tests avec Jest
- Component tests avec React Testing Library
- E2E tests avec Playwright

## CI/CD

GitHub Actions configuré pour :
- ✅ Lint sur chaque commit
- ✅ Build sur PR
- 🔲 Tests (à ajouter)
- 🔲 Deploy automatique

## Roadmap Technique

### Phase 1 (MVP) - ✅ Complété
- [x] Interface de base
- [x] Gestion workspaces/projects/sessions
- [x] Persistence localStorage
- [x] Suivi tokens
- [x] Notifications visuelles

### Phase 2 - Backend
- [ ] API Claude intégration
- [ ] Backend Node.js
- [ ] Base de données
- [ ] Authentication

### Phase 3 - Features Avancées
- [ ] WebSocket streaming
- [ ] Export/Import
- [ ] Recherche full-text
- [ ] Tags et filtres
- [ ] Statistiques avancées

### Phase 4 - Multi-utilisateurs
- [ ] Collaboration temps réel
- [ ] Partage de sessions
- [ ] Permissions et rôles

## Ressources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Anthropic API](https://docs.anthropic.com)

---

Maintenu par [@julien](https://github.com/julien)
