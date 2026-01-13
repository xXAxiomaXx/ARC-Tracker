const BASE_URL = "https://metaforge.app/api/arc-raiders";
const PROXY = "https://api.allorigins.win/get?url=";

// Busca a lista inicial (opcional, apenas se quiser mostrar algo antes de digitar)
export const fetchItems = async () => {
  try {
    const response = await fetch(
      `${PROXY}${encodeURIComponent(`${BASE_URL}/items`)}`
    );
    const wrapper = await response.json();
    const data = JSON.parse(wrapper.contents);
    return Array.isArray(data) ? data : data.items || [];
  } catch (error) {
    return [];
  }
};

// BUSCA REAL: Usa o endpoint de pesquisa da API
export const searchItems = async (query) => {
  if (!query) return [];
  try {
    const url = `${BASE_URL}/items?search=${encodeURIComponent(query)}`;
    const response = await fetch(`${PROXY}${encodeURIComponent(url)}`);
    const wrapper = await response.json();
    const data = JSON.parse(wrapper.contents);

    // A API de busca costuma retornar a array direta ou dentro de 'data'
    return Array.isArray(data) ? data : data.data || data.items || [];
  } catch (error) {
    console.error("Erro na busca:", error);
    return [];
  }
};
