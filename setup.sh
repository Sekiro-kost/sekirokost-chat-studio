#!/bin/bash

echo "🚀 Configuration de Claude Interface..."
echo ""

# Vérifier que Node.js est installé
if ! command -v node &> /dev/null
then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer depuis https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dépendances installées avec succès"
else
    echo "❌ Erreur lors de l'installation des dépendances"
    exit 1
fi

echo ""

# Créer le fichier .env.local s'il n'existe pas
if [ ! -f .env.local ]; then
    echo "📝 Création du fichier .env.local..."
    cp .env.example .env.local
    echo "✅ Fichier .env.local créé"
    echo "⚠️  N'oubliez pas d'ajouter votre clé API Claude si nécessaire"
else
    echo "ℹ️  Le fichier .env.local existe déjà"
fi

echo ""
echo "✨ Installation terminée !"
echo ""
echo "Pour démarrer l'application :"
echo "  npm run dev"
echo ""
echo "Puis ouvrez http://localhost:3000 dans votre navigateur."
echo ""
