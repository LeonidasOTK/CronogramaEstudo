// Mock data para simular a funcionalidade da planilha CFO PMDF

export const getMockData = () => {
  return {
    studyStats: {
      totalHours: 147,
      studiedSubjects: 12,
      successRate: 78,
      streakDays: 15
    },
    
    subjects: [
      {
        id: 1,
        name: "Direito Constitucional",
        weight: 15,
        progress: 85,
        totalHours: 25,
        lastStudied: "2024-01-15",
        status: "Em Progresso"
      },
      {
        id: 2,
        name: "Direito Administrativo",
        weight: 12,
        progress: 72,
        totalHours: 18,
        lastStudied: "2024-01-14",
        status: "Em Progresso"
      },
      {
        id: 3,
        name: "Direito Penal",
        weight: 10,
        progress: 90,
        totalHours: 22,
        lastStudied: "2024-01-13",
        status: "Finalizado"
      },
      {
        id: 4,
        name: "Direito Processual Penal",
        weight: 10,
        progress: 45,
        totalHours: 12,
        lastStudied: "2024-01-12",
        status: "Em Progresso"
      },
      {
        id: 5,
        name: "Legislação Específica PMDF",
        weight: 8,
        progress: 60,
        totalHours: 15,
        lastStudied: "2024-01-11",
        status: "Em Progresso"
      },
      {
        id: 6,
        name: "Língua Portuguesa",
        weight: 15,
        progress: 80,
        totalHours: 28,
        lastStudied: "2024-01-10",
        status: "Em Progresso"
      },
      {
        id: 7,
        name: "Raciocínio Lógico",
        weight: 10,
        progress: 65,
        totalHours: 20,
        lastStudied: "2024-01-09",
        status: "Em Progresso"
      },
      {
        id: 8,
        name: "Matemática",
        weight: 10,
        progress: 55,
        totalHours: 16,
        lastStudied: "2024-01-08",
        status: "Em Progresso"
      }
    ],

    recentSessions: [
      {
        id: 1,
        subject: "Direito Constitucional",
        topic: "Princípios Fundamentais",
        duration: 45,
        correctAnswers: 8,
        totalAnswers: 10,
        date: "Hoje, 14:30",
        notes: "Revisão dos artigos 1° a 4°"
      },
      {
        id: 2,
        subject: "Língua Portuguesa",
        topic: "Interpretação de Texto",
        duration: 30,
        correctAnswers: 12,
        totalAnswers: 15,
        date: "Ontem, 16:00",
        notes: "Foco em textos argumentativos"
      },
      {
        id: 3,
        subject: "Direito Administrativo",
        topic: "Atos Administrativos",
        duration: 60,
        correctAnswers: 15,
        totalAnswers: 20,
        date: "Ontem, 09:15",
        notes: "Conceitos e classificações"
      },
      {
        id: 4,
        subject: "Raciocínio Lógico",
        topic: "Proposições Lógicas",
        duration: 25,
        correctAnswers: 6,
        totalAnswers: 8,
        date: "2 dias atrás, 11:45",
        notes: "Tabelas verdade"
      }
    ],

    upcomingReviews: [
      {
        id: 1,
        subject: "Direito Penal",
        topic: "Crimes contra a Pessoa",
        date: "Hoje",
        type: "urgente",
        priority: "high",
        interval: "24h"
      },
      {
        id: 2,
        subject: "Direito Constitucional",
        topic: "Direitos Fundamentais",
        date: "Amanhã",
        type: "semanal",
        priority: "medium",
        interval: "7d"
      },
      {
        id: 3,
        subject: "Língua Portuguesa",
        topic: "Concordância Verbal",
        date: "Em 2 dias",
        type: "mensal",
        priority: "low",
        interval: "30d"
      },
      {
        id: 4,
        subject: "Matemática",
        topic: "Porcentagem",
        date: "Em 3 dias",
        type: "semanal",
        priority: "medium",
        interval: "7d"
      }
    ],

    studyHistory: [
      {
        id: 1,
        date: "2024-01-15",
        sessions: 3,
        totalTime: 120,
        subjects: ["Direito Constitucional", "Língua Portuguesa"],
        performance: 82
      },
      {
        id: 2,
        date: "2024-01-14",
        sessions: 2,
        totalTime: 90,
        subjects: ["Direito Administrativo", "Raciocínio Lógico"],
        performance: 75
      },
      {
        id: 3,
        date: "2024-01-13",
        sessions: 4,
        totalTime: 180,
        subjects: ["Direito Penal", "Matemática", "Legislação PMDF"],
        performance: 88
      }
    ],

    cycleReviews: {
      intervals: ["24h", "7d", "15d", "30d", "60d"],
      rules: {
        "24h": "Revisão imediata - conceitos recém estudados",
        "7d": "Revisão semanal - consolidação",
        "15d": "Revisão quinzenal - reforço",
        "30d": "Revisão mensal - fixação",
        "60d": "Revisão bimestral - manutenção"
      }
    }
  };
};