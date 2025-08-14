import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { 
  RefreshCw, 
  Calendar, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  BookOpen
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { getMockData } from "../mock";

const ReviewManager = () => {
  const [reviews, setReviews] = useState([]);
  const [completedReviews, setCompletedReviews] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    const data = getMockData();
    setReviews(data.upcomingReviews);
  }, []);

  const handleMarkAsCompleted = (reviewId) => {
    const newCompleted = new Set(completedReviews);
    if (newCompleted.has(reviewId)) {
      newCompleted.delete(reviewId);
      toast({
        title: "Revisão Reaberta",
        description: "A revisão foi marcada como pendente.",
      });
    } else {
      newCompleted.add(reviewId);
      toast({
        title: "Revisão Concluída!",
        description: "A revisão foi marcada como concluída.",
      });
    }
    setCompletedReviews(newCompleted);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "urgente":
        return "bg-red-500 text-white";
      case "semanal":
        return "bg-amber-500 text-white";
      case "mensal":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === "all" || review.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const pendingReviews = filteredReviews.filter(r => !completedReviews.has(r.id));
  const doneReviews = filteredReviews.filter(r => completedReviews.has(r.id));

  const generateMoreReviews = () => {
    // Simulação de geração automática de revisões
    const newReviews = [
      {
        id: Date.now() + 1,
        subject: "Direito Administrativo",
        topic: "Licitações",
        date: "Em 4 dias",
        type: "semanal",
        priority: "medium",
        interval: "7d"
      },
      {
        id: Date.now() + 2,
        subject: "Matemática",
        topic: "Equações",
        date: "Em 5 dias",
        type: "mensal",
        priority: "low",
        interval: "30d"
      }
    ];

    setReviews([...reviews, ...newReviews]);
    toast({
      title: "Revisões Atualizadas!",
      description: `${newReviews.length} novas revisões foram programadas.`,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Ciclo de Revisões</h2>
        <p className="text-purple-100">Gerencie suas revisões programadas com base no sistema de repetição espaçada</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Programadas</p>
                <p className="text-3xl font-bold text-slate-800">{reviews.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Pendentes</p>
                <p className="text-3xl font-bold text-slate-800">{pendingReviews.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Concluídas</p>
                <p className="text-3xl font-bold text-slate-800">{completedReviews.size}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Taxa de Conclusão</p>
                <p className="text-3xl font-bold text-slate-800">
                  {reviews.length > 0 ? Math.round((completedReviews.size / reviews.length) * 100) : 0}%
                </p>
              </div>
              <RefreshCw className="h-8 w-8 text-purple-500" />
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
              placeholder="Buscar revisões..."
              className="pl-10 max-w-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-3 py-2 border border-slate-300 rounded-md text-sm"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="all">Todas as Prioridades</option>
            <option value="high">Alta</option>
            <option value="medium">Média</option>
            <option value="low">Baixa</option>
          </select>
        </div>
        <Button onClick={generateMoreReviews} className="bg-purple-600 hover:bg-purple-700">
          <RefreshCw className="h-4 w-4 mr-2" />
          Atualizar Revisões
        </Button>
      </div>

      {/* Review Cycle Info */}
      <Card className="bg-gradient-to-r from-slate-50 to-slate-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Sistema de Repetição Espaçada</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-sm font-medium text-red-600">24 Horas</div>
              <div className="text-xs text-slate-600">Revisão imediata</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-sm font-medium text-amber-600">7 Dias</div>
              <div className="text-xs text-slate-600">Consolidação</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-sm font-medium text-blue-600">15 Dias</div>
              <div className="text-xs text-slate-600">Reforço</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-sm font-medium text-green-600">30 Dias</div>
              <div className="text-xs text-slate-600">Fixação</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-sm font-medium text-purple-600">60 Dias</div>
              <div className="text-xs text-slate-600">Manutenção</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Reviews */}
      {pendingReviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <span>Revisões Pendentes ({pendingReviews.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingReviews.map((review) => (
                <div key={review.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border hover:bg-slate-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <Checkbox
                      checked={completedReviews.has(review.id)}
                      onCheckedChange={() => handleMarkAsCompleted(review.id)}
                    />
                    <div className={`w-3 h-3 rounded-full ${
                      review.priority === 'high' ? 'bg-red-500' :
                      review.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-slate-800">{review.subject}</p>
                      <p className="text-sm text-slate-600">{review.topic}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-700">{review.date}</p>
                      <p className="text-xs text-slate-500">Intervalo: {review.interval}</p>
                    </div>
                    <Badge className={getTypeColor(review.type)}>
                      {review.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completed Reviews */}
      {doneReviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Revisões Concluídas ({doneReviews.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {doneReviews.map((review) => (
                <div key={review.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200 opacity-75">
                  <div className="flex items-center space-x-4">
                    <Checkbox
                      checked={true}
                      onCheckedChange={() => handleMarkAsCompleted(review.id)}
                    />
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="font-medium text-slate-800 line-through">{review.subject}</p>
                      <p className="text-sm text-slate-600 line-through">{review.topic}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-700">{review.date}</p>
                      <p className="text-xs text-green-600">Concluída</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {filteredReviews.length === 0 && (
        <div className="text-center py-12">
          <RefreshCw className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            {searchTerm || filterPriority !== "all" ? "Nenhuma revisão encontrada" : "Nenhuma revisão programada"}
          </h3>
          <p className="text-slate-600 mb-4">
            {searchTerm || filterPriority !== "all" 
              ? "Tente ajustar os filtros de busca" 
              : "As revisões são geradas automaticamente conforme você estuda"
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewManager;