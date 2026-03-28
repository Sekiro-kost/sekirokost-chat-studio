import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const { ollamaUrl, model, messages } = await request.json();

    console.log('Ollama API Request received:', {
      hasOllamaUrl: !!ollamaUrl,
      ollamaUrl,
      model,
      messagesCount: messages?.length,
    });

    if (!ollamaUrl) {
      return NextResponse.json(
        { error: 'URL Ollama manquante' },
        { status: 400 }
      );
    }

    if (!model) {
      return NextResponse.json(
        { error: 'Modèle non spécifié' },
        { status: 400 }
      );
    }

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages manquants' },
        { status: 400 }
      );
    }

    // URL de l'API Ollama
    const apiUrl = `${ollamaUrl}/api/chat`;
    console.log('Calling Ollama API:', apiUrl);

    // Appel à l'API Ollama
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
      }),
    });

    console.log('Ollama API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Ollama API error:', errorText);
      
      return NextResponse.json(
        { 
          error: `Erreur Ollama: ${errorText}`,
          status: response.status,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Format de réponse compatible avec notre interface
    // Ollama retourne { message: { role, content }, ... }
    return NextResponse.json({
      content: [{ text: data.message?.content || '' }],
      usage: {
        input_tokens: data.prompt_eval_count || 0,
        output_tokens: data.eval_count || 0,
      },
    });

  } catch (error: any) {
    console.error('Ollama API error:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur de connexion à Ollama' },
      { status: 500 }
    );
  }
}
