
import { useState } from "react";
import { Search, Bell, UserCircle2, LogOut } from "lucide-react";

type HeaderProps = {
  onLogout: () => void;
};

export default function Header({ onLogout }: HeaderProps) {
  const [search, setSearch] = useState("");

  return (
    <header className="flex h-16 w-full items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6">
      <img
        src="/brasao.png"
        alt="Brasão de Crateús"
        className="h-11 w-auto shrink-0 object-contain"
      />

      <div className="mx-2 flex w-full max-w-xl items-center rounded-full border border-slate-300 px-4 py-2 focus-within:border-emerald-500">
        <Search size={19} className="mr-3 shrink-0 text-emerald-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por placa, veículo ou modelo..."
          aria-label="Buscar veículos"
          className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <button type="button" title="Notificações" aria-label="Notificações" className="text-emerald-700">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-2">
          <UserCircle2 size={32} className="text-emerald-600" />
          <div className="hidden leading-tight sm:block">
            <p className="text-xs font-bold text-emerald-700">Olá, User</p>
            <p className="text-[11px] text-slate-500">administrador</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onLogout}
          title="Sair do sistema"
          aria-label="Sair do sistema"
          className="flex items-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
        >
          <LogOut size={18} />
          <span className="hidden xl:inline">Sair</span>
        </button>
      </div>
    </header>
  );
}
