
import React, { useState, useCallback } from 'react';
import { CheckCircle, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

// Declaration for Meta Pixel function
declare global {
  interface Window {
    fbq: any;
  }
}

const App: React.FC = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmPurchase = useCallback(() => {
    setIsLoading(true);

    // Trigger Meta Pixel Purchase Event
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'Purchase', {
        value: 97.00,
        currency: 'BRL'
      });
    } else {
      console.warn('Meta Pixel not found');
    }

    // Simulate a small delay for better UX before showing success
    setTimeout(() => {
      setIsLoading(false);
      setIsConfirmed(true);
    }, 800);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-white sm:bg-gray-50">
      <div className="w-full max-w-md bg-white sm:shadow-xl sm:rounded-2xl overflow-hidden border border-transparent sm:border-gray-100">
        
        {/* Header Section */}
        <header className="bg-emerald-800 p-8 text-center">
          <h1 className="text-white text-3xl font-extrabold tracking-tight mb-1">
            ALHO E SÓ
          </h1>
          <p className="text-emerald-100 text-sm font-medium uppercase tracking-widest">
            Renda Extra & Empreendedorismo
          </p>
        </header>

        <div className="p-8 sm:p-10">
          {!isConfirmed ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full mb-4">
                  <ShoppingBag size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Quase lá!
                </h2>
                <p className="text-gray-600 font-medium">
                  eBook – Aprenda a Vender Alho e Gerar Renda Extra
                </p>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-md">
                <p className="text-emerald-800 text-sm leading-relaxed">
                  Detectamos seu pagamento via WhatsApp. Para finalizar o processo e liberar seu acesso, confirme sua compra clicando no botão abaixo.
                </p>
              </div>

              <button
                onClick={handleConfirmPurchase}
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl text-lg font-bold transition-all transform active:scale-95 shadow-lg ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-emerald-200'
                }`}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    CONFIRMAR MINHA COMPRA
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
                <ShieldCheck size={14} />
                <span>Ambiente Seguro e Criptografado</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 animate-in fade-in zoom-in duration-500">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mb-6">
                <CheckCircle size={48} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Compra confirmada com sucesso!
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Parabéns! Você acaba de dar o primeiro passo para sua nova fonte de renda.
                <br />
                <span className="font-semibold text-emerald-700">Bem-vindo(a) à ALHO E SÓ.</span>
              </p>
              
              <div className="p-4 bg-emerald-50 rounded-lg text-emerald-800 text-sm border border-emerald-100">
                Verifique seu e-mail ou WhatsApp para acessar o conteúdo.
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <footer className="bg-gray-50 border-t border-gray-100 p-6 text-center">
          <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">
            © {new Date().getFullYear()} ALHO E SÓ - TODOS OS DIREITOS RESERVADOS
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
