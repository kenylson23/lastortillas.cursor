import { useState } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '../hooks/use-toast';

export default function Login() {
  const [, setLocation] = useLocation();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log('Tentando login com:', credentials);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', data.user.role);
        localStorage.setItem('userInfo', JSON.stringify(data.user));
        
        console.log('Login bem-sucedido:', data.user.role);
        toast({
          title: "Login realizado com sucesso",
          description: `Redirecionando para o painel ${data.user.role === 'admin' ? 'administrativo' : 'da cozinha'}...`,
          variant: "success",
        });
        
        setTimeout(() => {
          if (data.user.role === 'admin') {
            setLocation('/admin');
          } else {
            setLocation('/cozinha');
          }
          // Forçar reload após redirecionamento
          setTimeout(() => window.location.reload(), 300);
        }, 1000);
      } else {
        console.log('Credenciais inválidas:', data.message);
        toast({
          title: "Credenciais inválidas",
          description: data.message || "Nome de usuário ou senha incorretos",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro no login:', error);
      toast({
        title: "Erro de conexão",
        description: "Não foi possível conectar ao servidor. Tente novamente.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center py-4 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-2xl sm:text-3xl font-bold text-white">🌮</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-red-600">Las Tortillas</h1>
              <p className="text-xs sm:text-sm text-gray-600">Mexican Grill</p>
            </div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Acesso Administrativo
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 px-2 sm:px-0">
            Entre com suas credenciais de administrador
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <form 
            className="space-y-6" 
            onSubmit={handleSubmit}
            autoComplete="off"
            data-form-type="other"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome de usuário
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="Digite o nome de usuário"
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="Digite a senha"
                  autoComplete="new-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </button>
            
            <div className="text-center space-y-3">
              <div className="text-xs sm:text-sm text-gray-500 bg-gray-50 p-3 rounded-lg border">
                <div className="font-medium text-gray-700 mb-2">Credenciais de acesso:</div>
                <div className="space-y-2">
                  <div className="bg-blue-50 p-2 rounded border-l-4 border-blue-400">
                    <div className="font-medium text-blue-800 mb-1">🔧 Administrador:</div>
                    <div className="text-blue-700">👤 Usuário: <span className="font-mono">administrador</span></div>
                    <div className="text-blue-700">🔑 Senha: <span className="font-mono">lasTortillas2025!</span></div>
                  </div>
                  <div className="bg-orange-50 p-2 rounded border-l-4 border-orange-400">
                    <div className="font-medium text-orange-800 mb-1">👨‍🍳 Cozinha:</div>
                    <div className="text-orange-700">👤 Usuário: <span className="font-mono">cozinha</span></div>
                    <div className="text-orange-700">🔑 Senha: <span className="font-mono">lasTortillas2025Cozinha!</span></div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setLocation('/')}
                className="inline-flex items-center text-red-600 hover:text-red-500 text-sm sm:text-base font-medium transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar ao site
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}