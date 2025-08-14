import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Clock, 
  BookOpen, 
  Target, 
  TrendingUp
} from "lucide-react";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento de dados
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700 mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Dashboard de Estudos</h2>
        <p className="text-slate-300">Acompanhe seu progresso na preparação para o CFO PMDF</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total de Horas</p>
                <p className="text-3xl font-bold text-slate-800">147h</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Matérias Estudadas</p>
                <p className="text-3xl font-bold text-slate-800">12</p>
              </div>
              <BookOpen className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Taxa de Acertos</p>
                <p className="text-3xl font-bold text-slate-800">78%</p>
              </div>
              <Target className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Sequência de Dias</p>
                <p className="text-3xl font-bold text-slate-800">15</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Message */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Sistema Funcionando</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-700">
            Dashboard básico carregado com sucesso! Este é o frontend com mock data funcionando.
            Próximo passo: implementar o backend para persistência de dados reais.
          </p>
          <div className="mt-4">
            <Badge className="bg-blue-600 text-white mr-2">✅ Frontend Funcionando</Badge>
            <Badge className="bg-yellow-600 text-white mr-2">🔨 Backend em Desenvolvimento</Badge>
            <Badge className="bg-green-600 text-white">📊 Mock Data Ativo</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;