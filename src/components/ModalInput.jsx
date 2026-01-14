import { useState, useEffect, useRef } from "react";

const ModalInput = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  itemName,
  initialValue = 10,
}) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef(null);

  // Foca no input automaticamente quando o modal abre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    // Fundo Escuro (Backdrop)
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-fade-in">
      {/* A Caixa do Modal */}
      <div className="bg-slate-900 w-full max-w-xs rounded-2xl border border-slate-700 shadow-[0_0_30px_rgba(0,0,0,0.5)] p-6 relative animate-scale-up">
        {/* Título */}
        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1 text-center">
          {title}
        </h3>
        <p className="text-orange-500 font-black text-lg uppercase text-center mb-6 leading-tight">
          {itemName}
        </p>

        {/* Campo de Input */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() => setValue((prev) => Math.max(1, prev - 1))}
            className="w-12 h-12 rounded-xl bg-slate-800 text-slate-300 text-2xl font-bold active:bg-slate-700 active:scale-95 transition-all"
          >
            -
          </button>

          <input
            ref={inputRef}
            type="number"
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value) || 0)}
            className="w-20 bg-transparent text-center text-3xl font-black text-white outline-none border-b-2 border-slate-700 focus:border-orange-500 transition-colors"
          />

          <button
            onClick={() => setValue((prev) => prev + 1)}
            className="w-12 h-12 rounded-xl bg-slate-800 text-slate-300 text-2xl font-bold active:bg-slate-700 active:scale-95 transition-all"
          >
            +
          </button>
        </div>

        {/* Botões de Ação */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="py-3 rounded-xl bg-slate-800 text-slate-400 font-bold uppercase text-xs tracking-wider active:scale-95 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(value)}
            className="py-3 rounded-xl bg-orange-600 text-white font-bold uppercase text-xs tracking-wider shadow-[0_0_15px_rgba(234,88,12,0.4)] active:scale-95 transition-all"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalInput;
