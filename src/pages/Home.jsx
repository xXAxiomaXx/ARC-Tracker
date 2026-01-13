import { Link } from "react-router-dom";
import { useState } from "react"; // <--- Importar useState
import ItemCard from "../components/itemCard"; // Verifique se o nome do arquivo é ItemCard ou itemCard
import ModalConfirm from "../components/ModalConfirm"; // <--- Importar o ModalConfirm

const Home = ({ watchlist, setWatchlist, onRemove, onEditTarget }) => {
  // Estado para controlar o modal de "Limpar Concluídos"
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const updateQuantity = (id, newVal) => {
    setWatchlist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, owned: Math.max(0, newVal) } : item
      )
    );
  };

  // Função chamada pelo botão (Apenas abre o modal)
  const requestClear = () => {
    setIsClearModalOpen(true);
  };

  // Função chamada pelo botão "CONFIRMAR" do Modal
  const confirmClear = () => {
    setWatchlist((prev) => prev.filter((item) => item.owned < item.target));
    setIsClearModalOpen(false);
  };

  return (
    <div className="p-4 min-w-screen mx-auto">
      {/* Modal de Confirmação para Limpar Concluídos */}
      <ModalConfirm
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={confirmClear}
        title="INVENTORY CLEANUP"
        message="Do you want to remove from the list all items that have already reached the goal?"
      />

      <header className="mb-6 border-b border-orange-500/30 pb-4">
        <h1 className="text-5xl font-black italic tracking-tighter text-orange-500">
          ARC <span className="text-slate-100">TRACKER</span>
        </h1>
        <p className="text-xs text-slate-500 uppercase tracking-widest">
          Surface Scavenging Assistant
        </p>
      </header>

      <div className="flex justify-between items-center mb-6 w-full">
        <div className="flex gap-2 w-full justify-around">
          <Link
            to="/add-item"
            className="bg-slate-800 p-3 px-5 w-8/12 text-center rounded-lg border border-slate-700 font-bold uppercase hover:bg-slate-700 active:scale-95 transition-all"
          >
            <p className="text-white">+ Add Item</p>
          </Link>
        </div>
      </div>

      <section>
        {watchlist.length === 0 ? (
          <div className="text-center py-20 text-slate-700 border-2 border-dashed border-slate-900 rounded-2xl">
            <p className="text-sm italic">The search inventory is empty.</p>
          </div>
        ) : (
          watchlist.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              owned={item.owned} // Se ItemCard esperar o objeto item completo, isso pode ser redundante, mas mal não faz
              onUpdate={updateQuantity}
              onRemove={onRemove}
              onEditTarget={onEditTarget}
            />
          ))
        )}
      </section>

      {/* Botão para Acionar a Limpeza */}
      {watchlist.some((i) => i.owned >= i.target) && (
        <button
          onClick={requestClear} // Agora chama a função que abre o modal
          className="w-full mb-4 py-2 bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-bold uppercase rounded-lg active:scale-95 transition-transform"
        >
          Clear Completed Items
        </button>
      )}
    </div>
  );
};

export default Home;
