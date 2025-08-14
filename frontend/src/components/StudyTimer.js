import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Play, 
  Pause, 
  Square, 
  Clock,
  BookOpen,
  Target,
  Save
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { getMockData } from "../mock";

const StudyTimer = () => {
  const [time, setTime] = useState(25 * 60); // 25 minutos por padrão
  const [initialTime, setInitialTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState("");
  const [notes, setNotes] = useState("");
  const intervalRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    const data = getMockData();
    setSubjects(data.subjects);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            toast({
              title: "Tempo Esgotado!",
              description: "Sua sessão de estudos foi concluída.",
            });
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, toast]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (!selectedSubject || !topic) {
      toast({
        title: "Dados Incompletos",
        description: "Selecione uma matéria e digite o tópico antes de iniciar.",
        variant: "destructive"
      });
      return;
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setTime(initialTime);
  };

  const saveSession = () => {
    if (!selectedSubject || !topic) {
      toast({
        title: "Dados Incompletos",
        description: "Preencha pelo menos a matéria e o tópico.",
        variant: "destructive"
      });
      return;
    }

    const studiedTime = Math.floor((initialTime - time) / 60);
    
    if (studiedTime < 1) {
      toast({
        title: "Sessão Muito Curta",
        description: "Estude por pelo menos 1 minuto antes de salvar.",
        variant: "destructive"
      });
      return;
    }

    // Aqui seria salvo no backend
    const sessionData = {
      subject: selectedSubject,
      topic,
      subtopic,
      duration: studiedTime,
      correctAnswers: parseInt(correctAnswers) || 0,
      wrongAnswers: parseInt(wrongAnswers) || 0,
      notes,
      date: new Date().toISOString()
    };

    console.log('Salvando sessão:', sessionData);

    toast({
      title: "Sessão Salva!",
      description: `${studiedTime} minutos de estudo registrados.`,
    });

    // Reset form
    setTopic("");
    setSubtopic("");
    setCorrectAnswers("");
    setWrongAnswers("");
    setNotes("");
    setTime(initialTime);
  };

  const setTimerPreset = (minutes) => {
    if (!isRunning) {
      const seconds = minutes * 60;
      setTime(seconds);
      setInitialTime(seconds);
    }
  };

  const progress = ((initialTime - time) / initialTime) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Cronômetro de Estudos</h2>
        <p className="text-blue-100">Gerencie suas sessões de estudo com controle automático de tempo</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Timer */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Cronômetro</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="relative">
              <div className="w-48 h-48 mx-auto">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-slate-200"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                    className="text-blue-500 transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-slate-800">{formatTime(time)}</div>
                    <div className="text-sm text-slate-500">
                      {Math.floor((initialTime - time) / 60)} min estudados
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              {!isRunning ? (
                <Button onClick={startTimer} className="bg-green-600 hover:bg-green-700" size="lg">
                  <Play className="h-4 w-4 mr-2" />
                  Iniciar
                </Button>
              ) : (
                <Button onClick={pauseTimer} className="bg-amber-600 hover:bg-amber-700" size="lg">
                  <Pause className="h-4 w-4 mr-2" />
                  Pausar
                </Button>
              )}
              <Button onClick={stopTimer} variant="outline" size="lg">
                <Square className="h-4 w-4 mr-2" />
                Parar
              </Button>
            </div>

            <div className="flex justify-center space-x-2">
              <Button
                variant={initialTime === 15 * 60 ? "default" : "outline"}
                size="sm"
                onClick={() => setTimerPreset(15)}
                disabled={isRunning}
              >
                15min
              </Button>
              <Button
                variant={initialTime === 25 * 60 ? "default" : "outline"}
                size="sm"
                onClick={() => setTimerPreset(25)}
                disabled={isRunning}
              >
                25min
              </Button>
              <Button
                variant={initialTime === 45 * 60 ? "default" : "outline"}
                size="sm"
                onClick={() => setTimerPreset(45)}
                disabled={isRunning}
              >
                45min
              </Button>
              <Button
                variant={initialTime === 60 * 60 ? "default" : "outline"}
                size="sm"
                onClick={() => setTimerPreset(60)}
                disabled={isRunning}
              >
                60min
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Study Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Detalhes da Sessão</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="subject">Matéria *</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma matéria" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.name}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="topic">Tópico *</Label>
              <Input
                id="topic"
                placeholder="Ex: Conceitos básicos, Exercícios..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="subtopic">Subtópico</Label>
              <Input
                id="subtopic"
                placeholder="Detalhe específico do estudo"
                value={subtopic}
                onChange={(e) => setSubtopic(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="correct">Questões Certas</Label>
                <Input
                  id="correct"
                  type="number"
                  min="0"
                  value={correctAnswers}
                  onChange={(e) => setCorrectAnswers(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="wrong">Questões Erradas</Label>
                <Input
                  id="wrong"
                  type="number"
                  min="0"
                  value={wrongAnswers}
                  onChange={(e) => setWrongAnswers(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                placeholder="Anote insights, dificuldades ou pontos importantes..."
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <Button onClick={saveSession} className="w-full" size="lg">
              <Save className="h-4 w-4 mr-2" />
              Salvar Sessão
            </Button>

            {/* Study Stats Preview */}
            {(correctAnswers || wrongAnswers) && (
              <Card className="bg-slate-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Performance</span>
                    </div>
                    <Badge variant="outline">
                      {correctAnswers && wrongAnswers ? 
                        `${Math.round((parseInt(correctAnswers) / (parseInt(correctAnswers) + parseInt(wrongAnswers))) * 100)}%` 
                        : '---'
                      }
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudyTimer;