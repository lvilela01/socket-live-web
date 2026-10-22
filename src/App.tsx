import { useLivePlayers } from './hooks/useLivePlayers';

export default function App() {
  const { players, isConnected, lastBet, sendBet } = useLivePlayers();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 font-sans p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center gap-6">

        {/* Status da Conexão com indicador pulsante */}
        <div className="flex items-center gap-2.5 bg-slate-950/60 px-3 py-1.5 rounded-full border border-slate-800">
          <div className="relative flex h-2.5 w-2.5">
            {isConnected && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isConnected ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {isConnected ? 'Ao Vivo' : 'Desconectado'}
          </span>
        </div>

        {/* Contador Principal */}
        <div className="text-center">
          <h1 className="text-sm font-medium text-slate-400 mb-2">Jogadores Conectados</h1>
          <span className="text-7xl font-black text-emerald-400 tracking-tight block">
            {players}
          </span>
        </div>

        <button
          onClick={sendBet}
          className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl transition-all active:scale-95 text-sm cursor-pointer"
        >
          Simular Aposta ao Vivo
        </button>

        {lastBet && (
          <span className="text-xs text-emerald-400/80 bg-emerald-950/50 px-3 py-1 rounded-lg border border-emerald-800/40">
            {lastBet}
          </span>
        )}

        {/* Rodapé informativo */}
        <p className="text-xs text-slate-500 text-center">
          Atualização bidirecional via WebSockets
        </p>
      </div>
    </div>
  );
}
