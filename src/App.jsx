import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import AddItem from "./pages/AddItem";
import ModalInput from "./components/ModalInput";
import ModalConfirm from "./components/ModalConfirm"; // <--- Importe o novo modal

function App() {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("arc_watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Estados para Edição (ModalInput)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  // Estados para Remoção (ModalConfirm) <--- NOVOS
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem("arc_watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // --- LÓGICA DE REMOÇÃO ---

  // 1. O botão "X" chama esta função, que só abre o modal
  const requestRemove = (id) => {
    const item = watchlist.find((i) => i.id === id);
    if (item) {
      setItemToDelete(item);
      setIsDeleteModalOpen(true);
    }
  };

  // 2. O botão "REMOVER" do modal chama esta função
  const confirmRemove = () => {
    if (itemToDelete) {
      setWatchlist((prev) =>
        prev.filter((item) => item.id !== itemToDelete.id)
      );
    }
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };
  // -------------------------

  // --- LÓGICA DE EDIÇÃO ---
  const editTarget = (id) => {
    const item = watchlist.find((i) => i.id === id);
    if (item) {
      setItemToEdit(item);
      setIsEditModalOpen(true);
    }
  };

  const confirmEdit = (newVal) => {
    if (itemToEdit && newVal > 0) {
      setWatchlist((prev) =>
        prev.map((i) =>
          i.id === itemToEdit.id ? { ...i, target: parseInt(newVal) } : i
        )
      );
    }
    setIsEditModalOpen(false);
    setItemToEdit(null);
  };
  // ------------------------

  return (
    <Router>
      <div className="min-h-screen min-w-screen bg-slate-950 text-slate-100 font-sans pb-10">
        {/* Modal de Edição de Meta */}
        <ModalInput
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onConfirm={confirmEdit}
          title="UPDATE GOAL"
          itemName={itemToEdit?.name}
          initialValue={itemToEdit?.target || 10}
        />

        {/* Modal de Confirmação de Exclusão */}
        <ModalConfirm
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmRemove}
          title="CONFIRM DELETION"
          message="Are you sure you want to stop tracking?"
          itemName={itemToDelete?.name}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                watchlist={watchlist}
                setWatchlist={setWatchlist}
                onRemove={requestRemove} // Passamos a nova função requestRemove
                onEditTarget={editTarget}
              />
            }
          />
          <Route
            path="/add-item"
            element={
              <AddItem setWatchlist={setWatchlist} watchlist={watchlist} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
