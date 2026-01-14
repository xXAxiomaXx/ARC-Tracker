import React from "react";

// src/components/ItemCard.jsx (Versão Atualizada)
const ItemCard = ({ item, onUpdate, onRemove, onEditTarget }) => {
  const missing = Math.max(0, item.target - item.owned);
  const progress = Math.min(100, (item.owned / item.target) * 100);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-3 shadow-xl">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <img
            src={item.icon}
            className="w-18 bg-slate-950 rounded-lg p-1"
            onError={(e) =>
              (e.target.src = "https://via.placeholder.com/40?text=?")
            }
          />
          <div>
            <h3 className="text-sm font-bold uppercase tracking-tight text-slate-100">
              {item.name}
            </h3>
            <button
              onClick={() => onEditTarget(item.id)}
              className="text-[10px] text-orange-500 font-bold uppercase hover:underline"
            >
              Goal: {item.target} (Change)
            </button>
          </div>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="text-slate-600 hover:text-red-500 p-1"
        >
          ✕
        </button>
      </div>

      <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mb-4">
        <div
          className={`h-full transition-all duration-500 ${
            missing === 0
              ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
              : "bg-orange-500"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => onUpdate(item.id, item.owned - 1)}
          className="flex-1 bg-slate-800 h-12 pb-1 rounded-full active:bg-slate-700 font-bold text-xl"
        >
          -
        </button>

        <div className="text-center min-w-[60px]">
          <span className="text-lg font-black font-mono leading-none">
            {item.owned}
          </span>
          <p className="text-[10px] text-slate-500 uppercase font-bold">
            Looted
          </p>
        </div>

        <button
          onClick={() => onUpdate(item.id, item.owned + 1)}
          className="flex-1 bg-slate-800 h-12 pb-1 rounded-full active:bg-slate-700 font-bold text-xl"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
