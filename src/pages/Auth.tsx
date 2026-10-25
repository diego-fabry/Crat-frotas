
import { useState, type FormEvent } from "react";
import {
  User, Lock, Eye, EyeOff, Truck, ShieldCheck,
  ArrowRight, ArrowLeft, FileText, Mail, CheckCircle2
} from "lucide-react";

type View = "login" | "register" | "forgot-password";

type AuthProps = {
  onLogin: () => void;
};

type RegisterData = {
  nome: string;
  documento: string;
  email: string;
  senha: string;
  confirmarSenha: string;
};

const initialRegisterData: RegisterData = {
  nome: "",
  documento: "",
  email: "",
  senha: "",
  confirmarSenha: "",
};

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100";

type FieldProps = {
  label: string;
  icon: typeof User;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  rightAction?: React.ReactNode;
};

function Field({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  rightAction,
}: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>
      <div className="relative">
        <Icon
          size={19}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600"
        />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className={inputClass}
        />
        {rightAction}
      </div>
    </label>
  );
}

export default function Auth({ onLogin }: AuthProps) {
  const [currentView, setCurrentView] = useState<View>("login");
  const [documento, setDocumento] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [registerData, setRegisterData] =
    useState<RegisterData>(initialRegisterData);
  const [mostrarSenhaCadastro, setMostrarSenhaCadastro] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [cadastroEnviado, setCadastroEnviado] = useState(false);

  const [recuperacao, setRecuperacao] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [erro, setErro] = useState("");

  const navigateTo = (view: View) => {
    setCurrentView(view);
    setErro("");
    setIsSubmitted(false);
    setCadastroEnviado(false);
  };

  const updateRegister = (field: keyof RegisterData, value: string) => {
    setRegisterData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErro("");

    if (!documento.trim() || !senha.trim()) {
      setErro("Preencha todos os campos.");
      return;
    }

    // Login demonstrativo: abre o Dashboard
    onLogin();
  };

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErro("");

    if (Object.values(registerData).some((value) => !value.trim())) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (registerData.senha.length < 8) {
      setErro("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (registerData.senha !== registerData.confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setCadastroEnviado(true);
  };

  const handleForgotPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!recuperacao.trim()) {
      setErro("Informe seu e-mail ou CPF/CNPJ.");
      return;
    }
    setErro("");
    setIsSubmitted(true);
  };

  const eyeButton = (
    visible: boolean,
    toggle: () => void
  ) => (
    <button
      type="button"
      onClick={toggle}
      aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600"
    >
      {visible ? <EyeOff size={19} /> : <Eye size={19} />}
    </button>
  );

  return (
    <main className="flex min-h-screen flex-col bg-white lg:flex-row">
      {/* COLUNA ESQUERDA */}
      <section className="relative flex min-h-[400px] w-full flex-col justify-between overflow-hidden bg-emerald-950 px-8 py-10 text-white sm:px-12 lg:min-h-screen lg:w-[65%] lg:px-16 lg:py-12">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/monumento_crateus.jpg')",
            backgroundPosition: "60% center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/75 to-emerald-800/30" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full border-[70px] border-emerald-400/10" />

        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md">
            <Truck size={30} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200">
              Governo de Crateús
            </p>
            <h1 className="text-2xl font-extrabold">CRAT FROTAS</h1>
          </div>
        </div>

        <div className="relative z-10 my-12 max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100 backdrop-blur-sm">
            <ShieldCheck size={17} />
            Sistema de Gestão de Frotas
          </div>

          <h2 className="mb-6 text-4xl font-extrabold leading-tight sm:text-5xl xl:text-6xl">
            Gestão inteligente
            <br />
            para uma cidade
            <br />
            <span className="text-emerald-300">em movimento.</span>
          </h2>

          <p className="max-w-lg text-base leading-relaxed text-emerald-50/90 sm:text-lg">
            Controle, organização e eficiência na gestão dos veículos
            municipais de Crateús. Tudo em um só lugar.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {["Controle de veículos", "Gestão eficiente"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-emerald-100/80">
          © {new Date().getFullYear()} Governo de Crateús.
          Todos os direitos reservados.
        </p>
      </section>

      {/* COLUNA DIREITA */}
      <section className="flex min-h-screen w-full items-center justify-center bg-white px-6 py-10 sm:px-10 lg:w-[35%] lg:px-8 xl:px-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex flex-col items-center">
            <img
              src="/brasao.png"
              alt="Brasão oficial de Crateús"
              className="h-28 w-auto object-contain sm:h-32"
            />
            <p className="mt-3 text-center text-sm font-medium tracking-wide text-gray-500">
              Governo de Crateús
            </p>
          </div>

          <div key={currentView} className="animate-[viewEnter_350ms_ease-out_both]">
            {/* LOGIN */}
            {currentView === "login" && (
              <>
                <h3 className="text-2xl font-bold text-slate-800">
                  Acesse sua conta
                </h3>
                <p className="mb-7 mt-2 text-sm text-gray-500">
                  Informe suas credenciais para continuar.
                </p>

                <form onSubmit={handleLogin} className="space-y-5">
                  <Field
                    label="CPF ou CNPJ"
                    icon={User}
                    value={documento}
                    onChange={setDocumento}
                    placeholder="Digite seu CPF ou CNPJ"
                    autoComplete="username"
                  />

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-700">
                        Senha
                      </span>
                      <button
                        type="button"
                        onClick={() => navigateTo("forgot-password")}
                        className="text-xs font-medium text-emerald-600 hover:underline"
                      >
                        Esqueceu a senha?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600" />
                      <input
                        type={mostrarSenha ? "text" : "password"}
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Digite sua senha"
                        autoComplete="current-password"
                        required
                        className={inputClass}
                      />
                      {eyeButton(mostrarSenha, () => setMostrarSenha(!mostrarSenha))}
                    </div>
                  </div>

                  {erro && <p role="alert" className="text-sm text-red-600">{erro}</p>}

                  <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 font-bold text-white shadow-md transition hover:bg-emerald-700">
                    Entrar <ArrowRight size={18} />
                  </button>
                </form>

                <div className="mt-12 border-t border-gray-100 pt-8 text-center">
                  <p className="text-sm font-semibold text-gray-700">
                    Ainda não tem cadastro?
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Solicite seu acesso ao sistema de gestão de frotas do município.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigateTo("register")}
                    className="mt-5 w-full rounded-xl border-2 border-emerald-500 py-3 font-semibold text-emerald-600 transition hover:bg-emerald-50"
                  >
                    Criar Conta
                  </button>
                </div>
              </>
            )}

            {/* CADASTRO */}
            {currentView === "register" && (
              <>
                <h3 className="text-2xl font-bold text-slate-800">
                  Criar sua conta
                </h3>
                <p className="mb-6 mt-2 text-sm text-gray-500">
                  Preencha os dados abaixo para solicitar acesso ao CRAT FROTAS.
                </p>

                {cadastroEnviado ? (
                  <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                    <CheckCircle2 size={42} className="mx-auto mb-4 text-emerald-600" />
                    <h4 className="font-bold text-emerald-800">Dados validados!</h4>
                    <p className="mt-2 text-sm text-emerald-700">
                      Cadastro demonstrativo. Nenhuma solicitação foi enviada.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <Field
                      label="Nome Completo"
                      icon={User}
                      value={registerData.nome}
                      onChange={(v) => updateRegister("nome", v)}
                      placeholder="Seu nome completo"
                      autoComplete="name"
                    />
                    <Field
                      label="CPF ou CNPJ"
                      icon={FileText}
                      value={registerData.documento}
                      onChange={(v) => updateRegister("documento", v)}
                      placeholder="Digite seu CPF ou CNPJ"
                    />
                    <Field
                      label="E-mail"
                      icon={Mail}
                      type="email"
                      value={registerData.email}
                      onChange={(v) => updateRegister("email", v)}
                      placeholder="seuemail@exemplo.com"
                      autoComplete="email"
                    />
                    <Field
                      label="Senha"
                      icon={Lock}
                      type={mostrarSenhaCadastro ? "text" : "password"}
                      value={registerData.senha}
                      onChange={(v) => updateRegister("senha", v)}
                      placeholder="Mínimo de 8 caracteres"
                      autoComplete="new-password"
                      rightAction={eyeButton(mostrarSenhaCadastro, () =>
                        setMostrarSenhaCadastro(!mostrarSenhaCadastro)
                      )}
                    />
                    <Field
                      label="Confirmar Senha"
                      icon={Lock}
                      type={mostrarConfirmacao ? "text" : "password"}
                      value={registerData.confirmarSenha}
                      onChange={(v) => updateRegister("confirmarSenha", v)}
                      placeholder="Repita sua senha"
                      autoComplete="new-password"
                      rightAction={eyeButton(mostrarConfirmacao, () =>
                        setMostrarConfirmacao(!mostrarConfirmacao)
                      )}
                    />

                    {erro && <p role="alert" className="text-sm text-red-600">{erro}</p>}

                    <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 font-bold text-white transition hover:bg-emerald-700">
                      Solicitar Cadastro <ArrowRight size={18} />
                    </button>
                  </form>
                )}

                <p className="mt-6 text-center text-sm text-gray-500">
                  Já possui uma conta?{" "}
                  <button type="button" onClick={() => navigateTo("login")} className="font-bold text-emerald-600 hover:underline">
                    Fazer Login
                  </button>
                </p>
              </>
            )}

            {/* RECUPERAÇÃO DE SENHA */}
            {currentView === "forgot-password" && (
              <>
                <h3 className="text-2xl font-bold text-slate-800">
                  Recuperar senha
                </h3>
                <p className="mb-7 mt-2 text-sm leading-relaxed text-gray-500">
                  Informe seu e-mail ou CPF/CNPJ cadastrado para receber as instruções de redefinição.
                </p>

                {isSubmitted ? (
                  <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                    <CheckCircle2 size={46} className="mx-auto mb-4 text-emerald-600" />
                    <h4 className="font-bold text-emerald-800">
                      Solicitação demonstrativa concluída!
                    </h4>
                    <p className="mt-3 text-sm text-emerald-700">
                      Nenhum e-mail foi enviado. A recuperação será integrada ao backend futuramente.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleForgotPassword} className="space-y-5">
                    <Field
                      label="E-mail ou CPF/CNPJ"
                      icon={Mail}
                      value={recuperacao}
                      onChange={setRecuperacao}
                      placeholder="Digite seu e-mail ou documento"
                    />

                    {erro && <p role="alert" className="text-sm text-red-600">{erro}</p>}

                    <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 font-bold text-white transition hover:bg-emerald-700">
                      Enviar instruções <ArrowRight size={18} />
                    </button>
                  </form>
                )}

                <button
                  type="button"
                  onClick={() => navigateTo("login")}
                  className="mt-8 flex w-full items-center justify-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-800"
                >
                  <ArrowLeft size={18} /> Voltar para o Login
                </button>
              </>
            )}
          </div>

          <p className="mt-10 text-center text-xs text-gray-400">
            CRAT FROTAS • Sistema de Gestão Municipal
          </p>
        </div>
      </section>
    </main>
  );
}
