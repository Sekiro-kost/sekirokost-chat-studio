import type { NextRequest } from 'next/server';

export const runtime = 'edge'; // Optionnel : utilise Edge Runtime pour de meilleures performances

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { apiKey, apiUrl, model, messages } = body;

    console.log('API Request received:', { 
      hasApiKey: !!apiKey, 
      apiUrl, 
      model, 
      messagesCount: messages?.length 
    });

    if (!apiKey) {
      return Response.json(
        { error: 'API key is required' },
        { status: 400 }
      );
    }

    if (!messages || messages.length === 0) {
      return Response.json(
        { error: 'Messages are required' },
        { status: 400 }
      );
    }

    // Appel à l'API Claude via le backend
    const claudeUrl = `${apiUrl}/messages`;
    console.log('Calling Claude API:', claudeUrl);

    const response = await fetch(claudeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: model || 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        messages: messages,
      }),
    });

    const data = await response.json();
    console.log('Claude API response status:', response.status);

    if (!response.ok) {
      console.error('Claude API error:', data);
      return Response.json(
        { 
          error: data.error?.message || data.error?.type || 'API request failed', 
          details: data,
          status: response.status 
        },
        { status: response.status }
      );
    }

    return Response.json(data);
  } catch (error) {
    console.error('Claude API proxy error:', error);
    return Response.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
