import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { 
  History, 
  Calendar, 
  Clock, 
  BookOpen,
  TrendingUp,
  Search,
  Download,
  Filter,
  BarChart3,
  Target
} from "lucide-react";
import { getMockData } from "../mock";

const StudyHistory = () => {
  const [history, setHistory] = useState([]);
  const [recentSessions, setRecentSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => {
    const data = getMockData();
    setHistory(data.studyHistory);
    setRecentSessions(data.recentSessions);
  }, []);

  const filteredSessions = recentSessions.filter(session =>
    session.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStats = {
    totalSessions: recentSessions.length,
    totalHours: Math.round(recentSessions.reduce((acc, s) => acc + s.duration, 0) / 60 * 10) / 10,
    averageScore: Math.round(recentSessions.reduce((acc, s) => acc + (s.correctAnswers / s.totalAnswers * 100), 0) / recentSessions.length),
    bestStreak: 7
  };

  const getPerformanceColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-amber-600 bg-amber-100";
    return "text-red-600 bg-red-100";
  };

  const exportData = () => {
    // Simulação de exportação de dados
    const data = {
      sessions: filteredSessions,
      history,
      totalStats,
      exportDate: new Date().toISOString()
    };
    
    console.log('Exportando dados:', data);
    // Aqui seria implementada a exportação real para CSV/Excel
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Histórico de Estudos</h2>
        <p className="text-indigo-100">Visualize seu progresso e analise seu desempenho ao longo do tempo</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total de Sessões</p>
                <p className="text-3xl font-bold text-slate-800">{totalStats.totalSessions}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Horas Estudadas</p>
                <p className="text-3xl font-bold text-slate-800">{totalStats.totalHours}h</p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Desempenho Médio</p>
                <p className="text-3xl font-bold text-slate-800">{totalStats.averageScore}%</p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Melhor Sequência</p>
                <p className="text-3xl font-bold text-slate-800">{totalStats.bestStreak} dias</p>
              </div>
              <TrendingUp className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar por matéria ou tópico..."
              className="pl-10 max-w-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-3 py-2 border border-slate-300 rounded-md text-sm"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="all">Todos os Períodos</option>
            <option value="week">Última Semana</option>
            <option value="month">Último Mês</option>
            <option value="quarter">Último Trimestre</option>
          </select>
        </div>
        <Button onClick={exportData} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar Dados
        </Button>
      </div>

      {/* Weekly Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Resumo Semanal</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {history.map((day) => (
              <div key={day.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">
                      {new Date(day.date).toLocaleDateString('pt-BR', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-sm text-slate-600">
                      {day.sessions} sessões • {day.subjects.join(', ')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-800">{day.totalTime}min</p>
                    <p className="text-sm text-slate-600">tempo total</p>
                  </div>
                  <Badge className={`${getPerformanceColor(day.performance)} border-0`}>
                    {day.performance}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <History className="h-5 w-5" />
            <span>Sessões Detalhadas ({filteredSessions.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredSessions.map((session) => (
              <div key={session.id} className="p-4 bg-slate-50 rounded-lg border hover:bg-slate-100 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{session.subject}</p>
                      <p className="text-sm text-slate-600">{session.topic}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-700">{session.duration}min</p>
                      <p className="text-xs text-slate-500">{session.date}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm">
                      <span className="text-green-600 font-medium">{session.correctAnswers} certas</span>
                      <span className="text-slate-400 mx-2">•</span>
                      <span className="text-red-600 font-medium">{session.totalAnswers - session.correctAnswers} erradas</span>
                    </div>
                    <Badge className={`${getPerformanceColor((session.correctAnswers / session.totalAnswers) * 100)} border-0 text-xs`}>
                      {Math.round((session.correctAnswers / session.totalAnswers) * 100)}%
                    </Badge>
                  </div>
                  
                  {session.notes && (
                    <div className="text-xs text-slate-600 bg-white px-2 py-1 rounded max-w-xs truncate">
                      {session.notes}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {filteredSessions.length === 0 && (
        <div className="text-center py-12">
          <History className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            {searchTerm ? "Nenhuma sessão encontrada" : "Nenhuma sessão registrada"}
          </h3>
          <p className="text-slate-600 mb-4">
            {searchTerm 
              ? "Tente ajustar os termos de busca" 
              : "Comece estudando para ver seu histórico aqui"
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default StudyHistory;