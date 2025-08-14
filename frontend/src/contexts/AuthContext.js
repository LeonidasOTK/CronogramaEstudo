import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica se há usuário salvo no localStorage
    const checkAuthStatus = () => {
      try {
        const savedUser = localStorage.getItem('cfo_pmdf_user');
        const savedToken = localStorage.getItem('cfo_pmdf_token');
        
        if (savedUser && savedToken) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Erro ao verificar status de autenticação:', error);
        // Limpa dados corrompidos
        localStorage.removeItem('cfo_pmdf_user');
        localStorage.removeItem('cfo_pmdf_token');
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password, rememberMe = false) => {
    try {
      setLoading(true);
      
      // Mock de autenticação - substituir por chamada real ao backend
      if (email === 'demo@cfpmdf.com' && password === '123456') {
        const mockUser = {
          id: 1,
          name: 'Usuario Demo',
          email: email,
          verified: true,
          avatar: null,
          createdAt: new Date().toISOString()
        };
        
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        setUser(mockUser);
        setIsAuthenticated(true);
        
        // Salva no localStorage se "lembrar senha" estiver marcado
        if (rememberMe) {
          localStorage.setItem('cfo_pmdf_user', JSON.stringify(mockUser));
          localStorage.setItem('cfo_pmdf_token', mockToken);
          localStorage.setItem('cfo_pmdf_remember', 'true');
        } else {
          // Remove dados salvos se não quiser lembrar
          localStorage.removeItem('cfo_pmdf_user');
          localStorage.removeItem('cfo_pmdf_token');
          localStorage.removeItem('cfo_pmdf_remember');
        }
        
        return { success: true, user: mockUser };
      } else {
        throw new Error('Email ou senha incorretos');
      }
    } catch (error) {
      setLoading(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      
      // Mock de registro - substituir por chamada real ao backend
      const mockUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        verified: false,
        avatar: null,
        createdAt: new Date().toISOString(),
        verificationCode: Math.random().toString(36).substring(2, 8).toUpperCase()
      };
      
      // Simula envio de email
      console.log('Email de verificação enviado para:', userData.email);
      console.log('Código de verificação:', mockUser.verificationCode);
      
      return { 
        success: true, 
        user: mockUser,
        message: 'Conta criada! Verifique seu email para ativar.'
      };
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (email, verificationCode) => {
    try {
      setLoading(true);
      
      // Mock de verificação - substituir por chamada real ao backend
      const mockUser = {
        id: Date.now(),
        name: 'Usuário Verificado',
        email: email,
        verified: true,
        avatar: null,
        createdAt: new Date().toISOString()
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      
      return { 
        success: true, 
        user: mockUser,
        message: 'Email verificado com sucesso!'
      };
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    
    // Limpa todos os dados salvos
    localStorage.removeItem('cfo_pmdf_user');
    localStorage.removeItem('cfo_pmdf_token');
    localStorage.removeItem('cfo_pmdf_remember');
  };

  const updateProfile = async (updates) => {
    try {
      setLoading(true);
      
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      
      // Atualiza localStorage se estiver salvo
      const savedUser = localStorage.getItem('cfo_pmdf_user');
      if (savedUser) {
        localStorage.setItem('cfo_pmdf_user', JSON.stringify(updatedUser));
      }
      
      return { success: true, user: updatedUser };
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    verifyEmail,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};