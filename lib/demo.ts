/**
 * Script pour initialiser l'application avec des données de démo
 * Utile pour le développement et les tests
 */

import { useAppStore } from '@/store/useAppStore';

export function initializeDemoData() {
  const store = useAppStore.getState();

  // Créer un workspace de démo
  store.addWorkspace('Projets Web', '#3b82f6');
  const workspace = store.workspaces[0];

  if (workspace) {
    // Ajouter un projet
    store.addProject(workspace.id, 'E-commerce', 'Projet de boutique en ligne');
    const project = workspace.projects[0];

    if (project) {
      // Ajouter une session avec des messages de démo
      store.addSession(project.id, 'Refactoring du checkout');
      const session = project.sessions[0];

      if (session) {
        // Ajouter quelques messages de démo
        store.addMessage(session.id, {
          role: 'user',
          content: 'Aide-moi à refactorer le composant de checkout pour le rendre plus modulaire.',
          tokenCount: 15,
        });

        store.addMessage(session.id, {
          role: 'assistant',
          content:
            "Bien sûr ! Pour rendre le composant checkout plus modulaire, je vous suggère de le diviser en plusieurs sous-composants :\n\n1. **CheckoutSummary** - Affichage du résumé de commande\n2. **PaymentForm** - Formulaire de paiement\n3. **ShippingForm** - Formulaire d'adresse de livraison\n4. **CheckoutSteps** - Navigation entre les étapes\n\nVoulez-vous que je vous montre un exemple d'implémentation ?",
          tokenCount: 80,
        });

        store.updateTokenUsage(session.id, { input: 15, output: 80 });
        store.updateSessionStatus(session.id, 'completed');
      }
    }

    // Ajouter un second projet
    store.addProject(workspace.id, 'Blog Personnel', 'Site de blog avec Next.js');
  }
}
