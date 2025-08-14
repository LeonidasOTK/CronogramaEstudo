import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User,
  Shield,
  ArrowLeft,
  Loader2,
  Check
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/use-toast';

const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(1); // 1: Registro, 2: Verificação
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);
  
  const { register, verifyEmail } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpa erro do campo quando usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Você deve aceitar os termos de uso';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const result = await register({
        name: formData.name.trim(),
        email: formData.email,
        password: formData.password
      });
      
      setRegisteredUser(result.user);
      setCurrentStep(2);
      
      toast({
        title: 'Conta criada com sucesso!',
        description: 'Verifique seu email para o código de verificação.',
      });
      
    } catch (error) {
      toast({
        title: 'Erro ao criar conta',
        description: error.message || 'Tente novamente',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    
    if (!verificationCode.trim()) {
      setErrors({ verification: 'Código de verificação é obrigatório' });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await verifyEmail(registeredUser.email, verificationCode);
      
      toast({
        title: 'Email verificado!',
        description: 'Sua conta foi ativada com sucesso.',
      });
      
      // Redireciona para dashboard após verificação
      navigate('/', { replace: true });
      
    } catch (error) {
      toast({
        title: 'Erro na verificação',
        description: 'Código inválido. Tente novamente.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationCode = async () => {
    toast({
      title: 'Código reenviado!',
      description: 'Verifique sua caixa de entrada.',
    });
  };

  // Step 1: Registration Form
  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-amber-500" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">CFO PMDF</h1>
            <p className="text-slate-600">Sistema de Organização de Estudos</p>
          </div>

          {/* Register Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Criar Conta</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome completo"
                      className="pl-10"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.name && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.name}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.email}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Mínimo 6 caracteres"
                      className="pl-10 pr-10"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.password}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Repita sua senha"
                      className="pl-10 pr-10"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.confirmPassword}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Terms Acceptance */}
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => handleInputChange('acceptTerms', checked)}
                      disabled={isLoading}
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      Aceito os{' '}
                      <Link to="/terms" className="text-amber-600 hover:text-amber-700 underline">
                        termos de uso
                      </Link>{' '}
                      e{' '}
                      <Link to="/privacy" className="text-amber-600 hover:text-amber-700 underline">
                        política de privacidade
                      </Link>
                    </Label>
                  </div>
                  {errors.acceptTerms && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.acceptTerms}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-amber-500 hover:bg-amber-600" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Criando conta...
                    </>
                  ) : (
                    'Criar Conta'
                  )}
                </Button>
              </form>

              {/* Links */}
              <div className="mt-6 text-center">
                <Link 
                  to="/login" 
                  className="text-amber-600 hover:text-amber-700 font-medium"
                >
                  Já tem conta? Fazer login
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Back to Home */}
          <div className="text-center">
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-700"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar ao início</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Email Verification
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Verifique seu Email</h1>
          <p className="text-slate-600 mt-2">
            Enviamos um código de verificação para:
            <br />
            <span className="font-medium">{registeredUser?.email}</span>
          </p>
        </div>

        {/* Verification Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Código de Verificação</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerification} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="verification">Digite o código de 6 dígitos</Label>
                <Input
                  id="verification"
                  type="text"
                  placeholder="XXXXXX"
                  className="text-center text-lg font-mono tracking-widest"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase();
                    setVerificationCode(value);
                    if (errors.verification) {
                      setErrors({});
                    }
                  }}
                  disabled={isLoading}
                />
                {errors.verification && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.verification}</AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Demo Code Info */}
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 font-medium mb-1">Código Demo:</p>
                <p className="text-sm text-blue-600">Use qualquer código de 6 caracteres</p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Verificar Código
                  </>
                )}
              </Button>
            </form>

            {/* Resend Code */}
            <div className="mt-4 text-center">
              <p className="text-sm text-slate-600">
                Não recebeu o código?{' '}
                <button 
                  onClick={resendVerificationCode}
                  className="text-amber-600 hover:text-amber-700 font-medium"
                  disabled={isLoading}
                >
                  Reenviar
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Login */}
        <div className="text-center">
          <Link 
            to="/login" 
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar ao login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;