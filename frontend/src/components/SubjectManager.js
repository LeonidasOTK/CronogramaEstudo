import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  Clock,
  Target,
  TrendingUp
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { getMockData } from "../mock";

const SubjectManager = () => {
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [newSubject, setNewSubject] = useState({
    name: "",
    weight: "",
    topics: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    const data = getMockData();
    setSubjects(data.subjects);
  }, []);

  const handleAddSubject = () => {
    if (!newSubject.name || !newSubject.weight) {
      toast({
        title: "Dados Incompletos",
        description: "Nome e peso da matéria são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const subject = {
      id: Date.now(),
      name: newSubject.name,
      weight: parseInt(newSubject.weight),
      progress: 0,
      totalHours: 0,
      lastStudied: null,
      status: "Não Iniciado",
      topics: newSubject.topics.split(',').map(t => t.trim()).filter(t => t)
    };

    setSubjects([...subjects, subject]);
    setNewSubject({ name: "", weight: "", topics: "" });
    setShowAddForm(false);

    toast({
      title: "Matéria Adicionada!",
      description: `${subject.name} foi adicionada com sucesso.`,
    });
  };

  const handleEditSubject = (subject) => {
    setEditingSubject(subject);
    setNewSubject({
      name: subject.name,
      weight: subject.weight.toString(),
      topics: subject.topics ? subject.topics.join(', ') : ""
    });
    setShowAddForm(true);
  };

  const handleUpdateSubject = () => {
    if (!newSubject.name || !newSubject.weight) {
      toast({
        title: "Dados Incompletos",
        description: "Nome e peso da matéria são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const updatedSubjects = subjects.map(subject => 
      subject.id === editingSubject.id 
        ? {
            ...subject,
            name: newSubject.name,
            weight: parseInt(newSubject.weight),
            topics: newSubject.topics.split(',').map(t => t.trim()).filter(t => t)
          }
        : subject
    );

    setSubjects(updatedSubjects);
    setNewSubject({ name: "", weight: "", topics: "" });
    setShowAddForm(false);
    setEditingSubject(null);

    toast({
      title: "Matéria Atualizada!",
      description: `${newSubject.name} foi atualizada com sucesso.`,
    });
  };

  const handleDeleteSubject = (id) => {
    const subject = subjects.find(s => s.id === id);
    if (subject.totalHours > 0) {
      toast({
        title: "Não é possível excluir",
        description: "Esta matéria já possui horas de estudo registradas.",
        variant: "destructive"
      });
      return;
    }

    setSubjects(subjects.filter(s => s.id !== id));
    toast({
      title: "Matéria Removida",
      description: "A matéria foi removida com sucesso.",
    });
  };

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Finalizado":
        return "bg-green-100 text-green-800 border-green-200";
      case "Em Progresso":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Não Iniciado":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Gestão de Matérias</h2>
        <p className="text-green-100">Organize e acompanhe o progresso de todas as matérias do edital</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 space-x-0 sm:space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar matérias..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          {showAddForm ? "Cancelar" : "Nova Matéria"}
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card className="border-2 border-green-200">
          <CardHeader>
            <CardTitle>
              {editingSubject ? "Editar Matéria" : "Nova Matéria"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome da Matéria *</Label>
                <Input
                  id="name"
                  placeholder="Ex: Direito Constitucional"
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="weight">Peso (Número de Questões) *</Label>
                <Input
                  id="weight"
                  type="number"
                  min="1"
                  placeholder="Ex: 15"
                  value={newSubject.weight}
                  onChange={(e) => setNewSubject({ ...newSubject, weight: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="topics">Tópicos Principais (separados por vírgula)</Label>
              <Input
                id="topics"
                placeholder="Ex: Princípios Fundamentais, Direitos e Garantias, Organização do Estado"
                value={newSubject.topics}
                onChange={(e) => setNewSubject({ ...newSubject, topics: e.target.value })}
              />
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={editingSubject ? handleUpdateSubject : handleAddSubject}
                className="bg-green-600 hover:bg-green-700"
              >
                {editingSubject ? "Atualizar" : "Adicionar"} Matéria
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAddForm(false);
                  setEditingSubject(null);
                  setNewSubject({ name: "", weight: "", topics: "" });
                }}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total de Matérias</p>
                <p className="text-3xl font-bold text-slate-800">{subjects.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Progresso Médio</p>
                <p className="text-3xl font-bold text-slate-800">
                  {Math.round(subjects.reduce((acc, s) => acc + s.progress, 0) / subjects.length || 0)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Horas Totais</p>
                <p className="text-3xl font-bold text-slate-800">
                  {subjects.reduce((acc, s) => acc + s.totalHours, 0)}h
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subjects List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSubjects.map((subject) => (
          <Card key={subject.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{subject.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Peso: {subject.weight}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditSubject(subject)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteSubject(subject.id)}
                    disabled={subject.totalHours > 0}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Progresso</span>
                <Badge className={getStatusColor(subject.status)}>
                  {subject.status}
                </Badge>
              </div>
              <Progress value={subject.progress} className="h-2" />
              <div className="text-center text-lg font-semibold text-slate-700">
                {subject.progress}%
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-2 bg-slate-50 rounded">
                  <p className="text-slate-600">Horas Estudadas</p>
                  <p className="font-semibold">{subject.totalHours}h</p>
                </div>
                <div className="text-center p-2 bg-slate-50 rounded">
                  <p className="text-slate-600">Último Estudo</p>
                  <p className="font-semibold">
                    {subject.lastStudied ? new Date(subject.lastStudied).toLocaleDateString('pt-BR') : 'Nunca'}
                  </p>
                </div>
              </div>
              
              {subject.topics && subject.topics.length > 0 && (
                <div>
                  <p className="text-sm text-slate-600 mb-2">Tópicos Principais:</p>
                  <div className="flex flex-wrap gap-1">
                    {subject.topics.slice(0, 3).map((topic, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {subject.topics.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{subject.topics.length - 3} mais
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            {searchTerm ? "Nenhuma matéria encontrada" : "Nenhuma matéria cadastrada"}
          </h3>
          <p className="text-slate-600 mb-4">
            {searchTerm 
              ? "Tente ajustar os termos de busca" 
              : "Comece adicionando as matérias do seu edital"
            }
          </p>
          {!searchTerm && (
            <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Primeira Matéria
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SubjectManager;