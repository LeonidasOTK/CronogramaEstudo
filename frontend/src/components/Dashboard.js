import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  Clock, 
  BookOpen, 
  Target, 
  TrendingUp,
  Calendar,
  Award,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { getMockData } from "../mock";

const Dashboard = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento de dados
    setTimeout(() => {
      setData(getMockData());
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

  const { studyStats, subjects, recentSessions, upcomingReviews } = data;

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
                <p className="text-3xl font-bold text-slate-800">{studyStats.totalHours}h</p>
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
                <p className="text-3xl font-bold text-slate-800">{studyStats.studiedSubjects}</p>
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
                <p className="text-3xl font-bold text-slate-800">{studyStats.successRate}%</p>
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
                <p className="text-3xl font-bold text-slate-800">{studyStats.streakDays}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Progresso por Matéria</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {subjects.slice(0, 5).map((subject) => (
              <div key={subject.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-700">{subject.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {subject.progress}%
                  </Badge>
                </div>
                <Progress value={subject.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Revisões Próximas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingReviews.map((review) => (
                <div key={review.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      review.priority === 'high' ? 'bg-red-500' :
                      review.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-slate-800">{review.subject}</p>
                      <p className="text-sm text-slate-600">{review.topic}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-700">{review.date}</p>
                    <Badge variant="outline" className={`text-xs ${
                      review.type === 'urgente' ? 'border-red-500 text-red-600' :
                      review.type === 'semanal' ? 'border-amber-500 text-amber-600' :
                      'border-blue-500 text-blue-600'
                    }`}>
                      {review.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <History className="h-5 w-5" />
            <span>Atividade Recente</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border hover:bg-slate-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{session.subject}</p>
                    <p className="text-sm text-slate-600">{session.topic}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-700">{session.duration}min</p>
                    <p className="text-xs text-slate-500">{session.date}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-slate-600">{session.correctAnswers}/{session.totalAnswers}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;