import React from "react";

const ModalConfirm = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  itemName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 w-full max-w-xs rounded-2xl border border-red-900/50 shadow-[0_0_40px_rgba(220,38,38,0.2)] p-6 relative animate-scale-up">
        {/* Ícone ou Título de Alerta */}
        <h3 className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2 text-center">
          ⚠ {title}
        </h3>

        <div className="text-center mb-8">
          <p className="text-slate-400 text-sm mb-2">{message}</p>
          {itemName && (
            <p className="text-slate-100 font-black text-lg uppercase leading-tight">
              "{itemName}"
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="py-3 rounded-xl bg-slate-800 text-slate-400 font-bold uppercase text-xs tracking-wider active:scale-95 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="py-3 rounded-xl bg-red-600 text-white font-bold uppercase text-xs tracking-wider shadow-[0_0_15px_rgba(220,38,38,0.4)] active:scale-95 transition-all hover:bg-red-500"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
