
import {
  Menu,
  X,
  House,
  CarFront,
  UserRound,
  Wrench,
  Fuel,
  FileChartColumn,
  Settings,
} from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const menuItems = [
  {
    label: "Início",
    icon: House,
  },
  {
    label: "Veículos",
    icon: CarFront,
  },
  {
    label: "Motoristas",
    icon: UserRound,
  },
  {
    label: "Manutenções",
    icon: Wrench,
  },
  {
    label: "Abastecimento",
    icon: Fuel,
  },
  {
    label: "Relatório",
    icon: FileChartColumn,
  },
  {
    label: "Configurações",
    icon: Settings,
  },
];

export default function Sidebar({
  isOpen,
  onToggle,
}: SidebarProps) {
  return (
    <aside
      className={`
        fixed left-0 top-0 z-50
        flex h-screen flex-col
        bg-emerald-700 text-white
        shadow-md
        transition-all duration-300 ease-in-out
        ${isOpen ? "w-60" : "w-14"}
      `}
    >
      {/* BOTÃO DE ABRIR E FECHAR */}
      <div className="flex h-16 items-center px-3">
        <button
          type="button"
          onClick={onToggle}
          aria-label={
            isOpen ? "Fechar menu" : "Abrir menu"
          }
          aria-expanded={isOpen}
          className="
            flex h-9 w-9 shrink-0
            items-center justify-center
            rounded-lg
            transition-colors
            hover:bg-emerald-600
          "
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

        {isOpen && (
          <span className="ml-3 whitespace-nowrap text-sm font-bold tracking-wide">
            CRAT FROTAS
          </span>
        )}
      </div>

      {/* OPÇÕES DE NAVEGAÇÃO */}
      <nav
        aria-label="Menu principal"
        className={`
          mt-3 flex flex-1 flex-col gap-1
          overflow-y-auto overflow-x-hidden
          ${isOpen ? "px-2" : "px-1"}
        `}
      >
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const active = index === 0;

          return (
            <button
              key={item.label}
              type="button"
              title={item.label}
              aria-current={
                active ? "page" : undefined
              }
              className={`
                flex min-h-12 w-full
                items-center rounded-lg
                text-left text-sm
                font-semibold
                transition-colors duration-200
                ${
                  active
                    ? "bg-emerald-500 text-white"
                    : "text-emerald-50 hover:bg-emerald-600"
                }
                ${
                  isOpen
                    ? "gap-4 px-3"
                    : "justify-center"
                }
              `}
            >
              <Icon
                size={21}
                strokeWidth={2.3}
                className="shrink-0"
              />

              {isOpen && (
                <span className="whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* RODAPÉ */}
      <div className="border-t border-white/10 p-3">
        {isOpen && (
          <p className="text-center text-xs text-emerald-100/70">
            Governo de Crateús
          </p>
        )}
      </div>
    </aside>
  );
}
