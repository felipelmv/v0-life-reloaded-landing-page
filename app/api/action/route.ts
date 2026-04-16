import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { action, state } = await req.json();

    const result = await generateObject({
      model: google('models/gemini-1.5-pro-latest'), // Padrão da Vercel AI SDK
      schema: z.object({
        narrative: z.string().describe("A narrativa do Mestre de Jogo descrevendo o resultado da ação, com precisão histórica. Puna alucinações anacrônicas do jogador."),
        balanceDelta: z.number().describe("Mudança financeira (positiva ou negativa). Ex: -500 se comprou algo."),
        monthsPassed: z.number().describe("Quantos meses avançaram após essa ação (normalmente 1)."),
        skillUpdates: z.array(z.object({
          skill: z.string(),
          levelDelta: z.number()
        })).describe("Habilidades aprendidas/melhoradas (delta). Vazio se nenhuma."),
        inventoryUpdates: z.array(z.object({
          item: z.string(),
          amount: z.number()
        })).describe("Itens ganhos/perdidos. Ex: Bitcoin. Vazio se nenhum.")
      }),
      system: `Você é o Game Master do "Life Reloaded", um simulador de vida e viagem no tempo baseado em texto.
O jogador tenta tomar decisões para enriquecer ou mudar de vida.
Sua obrigação é manter VEROSSIMILHANÇA HISTÓRICA ABSOLUTA.

REGRAS CORE:
1. Se o jogador tentar usar ou criar algo que não existia na data atual (ex: Uber em 2008, TikTok em 2012), aplique uma punição narrativa leve (sarcasmo) e faça a ação falhar.
2. Se a ação fizer sentido, processe o resultado logicamente. Calcule lucros/prejuízos baseados na economia real da época.
3. Se ele comprar ativos (ações reais, bitcoin na época certa), deduza o 'balanceDelta' e adicione no 'inventoryUpdates'.
4. Sempre avance o tempo em pelo menos 1 mês. Inclua referências culturais ou macroeconômicas daquele mês específico na narrativa para dar imersão.`,
      prompt: `
ESTADO ATUAL DO JOGADOR:
Data Atual: ${state.currentDate}
Saldo Bancário: R$ ${state.balance}
Habilidades: ${JSON.stringify(state.skills)}
Inventário: ${JSON.stringify(state.inventory)}

AÇÃO DO JOGADOR:
"${action}"

Gere o resultado dessa ação.`
    });

    return NextResponse.json(result.object);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
