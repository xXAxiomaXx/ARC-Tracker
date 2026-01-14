import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchItems, getRarityColor } from "../services/api";
import ModalInput from "../components/ModalInput"; // Importar o Modal

const AddItem = ({ setWatchlist, watchlist }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Novos estados para o Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const navigate = useNavigate();

  // Efeito de Busca com Debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (search.length >= 2) {
        setLoading(true);
        const data = await searchItems(search);
        console.log("Resultado da busca:", data);
        setResults(data);
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 500); // 500ms de delay após parar de digitar

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  // 1. Ao clicar no item, apenas abrimos o modal
  const handleItemClick = (item) => {
    // Evitar duplicados
    if (watchlist.find((w) => w.id === item.id)) {
      alert("Este item já está na sua lista!");
      return;
    }
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // 2. Função chamada quando o usuário confirma no Modal
  const confirmAdd = (quantity) => {
    if (quantity > 0 && selectedItem) {
      setWatchlist([
        ...watchlist,
        { ...selectedItem, owned: 0, target: parseInt(quantity) },
      ]);
      setIsModalOpen(false);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 min-w-screen max-w-screen mx-auto">
      {/* O Componente Modal (Invisível até isModalOpen ser true) */}
      <ModalInput
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmAdd}
        title="SET GOAL"
        itemName={selectedItem?.name}
        initialValue={10}
      />

      {/* Header Fixo */}
      <div className="sticky top-0 bg-slate-950 pb-4 z-20">
        <button
          onClick={() => navigate("/")}
          className="text-orange-500 text-lg flex items-center justify-center font-bold mb-4"
        >
          <span className="pb-1.5 mr-1">←</span> BACK
        </button>

        <div className="relative flex border-slate-700 border rounded-xl overflow-hidden bg-slate-900">
          <input
            type="text"
            placeholder="Type the item name..."
            className="w-full bg-transparent p-4 text-white outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-orange-500 font-bold px-4 active:bg-slate-800"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Lista de Resultados */}
      <div className="mt-6 space-y-3 pb-10">
        {loading && (
          <p className="text-orange-500 text-center animate-pulse text-xs tracking-widest uppercase">
            Accessing the ARC Database...
          </p>
        )}

        {!loading &&
          results.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)} // Mudámos para a nova função
              className="flex items-center gap-4 bg-slate-900 p-3 rounded-xl border border-slate-800 active:scale-95 active:border-orange-500 transition-all cursor-pointer"
            >
              <img
                src={item.icon} // Nota: Se a API retornar a URL completa, ok. Se for só o ID, usar o template string.
                className={`w-18 bg-slate-950 rounded-lg object-contain p-1`}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/50?text=ARC")
                }
              />
              <div className="flex-1">
                <p className="text-sm font-bold uppercase text-slate-100">
                  {item.name}
                </p>
                <p
                  className={`text-${getRarityColor(
                    item.rarity
                  )} uppercase font-mono`}
                >
                  {item.rarity || "Common"}
                </p>
              </div>
              <div className="bg-orange-500/10 w-8 h-8 rounded-full flex items-center justify-center">
                <span className="text-orange-500 text-xl font-light leading-none pb-1">
                  +
                </span>
              </div>
            </div>
          ))}

        {search.length >= 2 && !loading && results.length === 0 && (
          <p className="text-slate-600 text-center italic text-sm">
            Nenhum item encontrado.
          </p>
        )}
      </div>
    </div>
  );
};

export default AddItem;
