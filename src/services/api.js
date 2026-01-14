const BASE_URL = import.meta.env.PROD
  ? "https://metaforge.app/api/arc-raiders"
  : "/api/arc-raiders";

// Cache para armazenar resultados de buscas
const searchCache = new Map();
let abortController = null;

// Função para mapear raridade para cor
export const getRarityColor = (rarity) => {
  const rarityMap = {
    common: "[#6c6c6c]",
    uncommon: "[#26bf57]",
    rare: "[#00a8f2]",
    epic: "[#cc3099]",
    legendary: "[#ffc600]",
  };

  return rarityMap[rarity?.toLowerCase()] || "text-slate-400";
};

// Busca a lista inicial (opcional, apenas se quiser mostrar algo antes de digitar)
export const fetchItems = async () => {
  try {
    const response = await fetch(`${BASE_URL}/items`, {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    return Array.isArray(data) ? data : data.items || [];
  } catch (error) {
    console.error("Erro ao buscar itens:", error);
    return [];
  }
};

// BUSCA REAL: Usa o endpoint de pesquisa da API com cache e cancelamento
export const searchItems = async (query) => {
  if (!query) return [];

  // Verificar cache primeiro
  if (searchCache.has(query)) {
    return searchCache.get(query);
  }

  try {
    // Cancelar requisição anterior se existir
    if (abortController) {
      abortController.abort();
    }
    abortController = new AbortController();

    const url = `${BASE_URL}/items?search=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
      signal: abortController.signal,
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();

    // A API de busca costuma retornar a array direta ou dentro de 'data'
    const result = Array.isArray(data) ? data : data.data || data.items || [];

    // Armazenar no cache
    searchCache.set(query, result);

    // Limpar cache se ficar muito grande (mais de 50 buscas)
    if (searchCache.size > 50) {
      const firstKey = searchCache.keys().next().value;
      searchCache.delete(firstKey);
    }

    return result;
  } catch (error) {
    // Não logar erro se foi abortado intencionalmente
    if (error.name !== "AbortError") {
      console.error("Erro na busca:", error);
    }
    return [];
  }
};
