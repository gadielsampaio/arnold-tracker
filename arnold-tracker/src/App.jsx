import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, Calendar, TrendingUp, Info, Play, Pause, RotateCcw, 
  ChevronRight, Lightbulb, CalendarX, Image as ImageIcon 
} from 'lucide-react';

// Estrutura do treino (12 semanas)
const TRAINING_PROGRAM = {
  weeks: {
    1: { phase: 'Adaptação', reps: '12-15', sets: 3, rest: 60, rpe: '6-7', isDeload: false },
    2: { phase: 'Adaptação', reps: '10-12', sets: 3, rest: 60, rpe: '7', isDeload: false },
    3: { phase: 'Hipertrofia', reps: '8-12', sets: 4, rest: 90, rpe: '7-8', isDeload: false },
    4: { phase: 'Hipertrofia', reps: '8-12', sets: 4, rest: 90, rpe: '8', isDeload: false },
    5: { phase: 'Hipertrofia', reps: '6-10', sets: 4, rest: 90, rpe: '8-9', isDeload: false },
    6: { phase: 'Deload', reps: '12-15', sets: 3, rest: 60, rpe: '5-6', isDeload: true },
    7: { phase: 'Força', reps: '6-8', sets: 5, rest: 120, rpe: '8-9', isDeload: false },
    8: { phase: 'Força', reps: '5-7', sets: 5, rest: 120, rpe: '9', isDeload: false },
    9: { phase: 'Força', reps: '4-6', sets: 5, rest: 150, rpe: '9-10', isDeload: false },
    10: { phase: 'Deload', reps: '10-12', sets: 3, rest: 60, rpe: '6', isDeload: true },
    11: { phase: 'Intensificação', reps: '6-10', sets: 4, rest: 90, rpe: '9', isDeload: false },
    12: { phase: 'Intensificação', reps: '8-12', sets: 4, rest: 90, rpe: '8-9', isDeload: false }
  },
  days: {
    1: {
      name: 'Peito + Costas',
      warmup: ['5min mobilidade ombros e torácico', '2 séries leves do primeiro exercício'],
      exercises: [
        { 
           name: 'Supino Reto', 
           superset: false,
          tips: ['Manter escápulas retraídas', 'Barra na linha dos mamilos', 'Cotovelos 45° do corpo'],
          searchTerm: 'barbell bench press'
        },
        { 
           name: 'Remada Curvada', 
           superset: false,
          tips: ['Coluna neutra', 'Puxar até o abdômen', 'Apertar escápulas no topo'],
          searchTerm: 'barbell bent over row'
        },
        { 
           name: 'Supino Inclinado', 
           superset: 'A',
          tips: ['Banco 30-45°', 'Explosão na subida', 'Controle na descida'],
          searchTerm: 'dumbbell incline bench press'
        },
        { 
           name: 'Pulldown', 
           superset: 'A',
          tips: ['Peito para frente', 'Puxar até clavícula', 'Squeeze de 1 seg'],
          searchTerm: 'cable lat pulldown'
        },
        { 
           name: 'Crucifixo', 
           superset: 'B',
          tips: ['Leve cotovelo flexionado', 'Alongar bem embaixo', 'Contrair no topo'],
          searchTerm: 'dumbbell fly'
        },
        { 
           name: 'Remada Cavalinho', 
           superset: 'B',
          tips: ['Tronco estável', 'Cotovelos próximos', 'Não usar momentum'],
          searchTerm: 'cable seated row'
        },
        { 
           name: 'Pullover', 
           superset: false,
          tips: ['Amplitude máxima', 'Respirar fundo', 'Sentir dorsal + peitoral'],
          searchTerm: 'dumbbell pullover'
        }
      ]
    },
    2: {
      name: 'Pernas',
      warmup: ['5min mobilidade quadril e tornozelos', '2 séries leves de agachamento'],
      exercises: [
        { 
           name: 'Agachamento Livre', 
           superset: false,
          tips: ['Quadril abaixo do joelho', 'Peso nos calcanhares', 'Core ativado'],
          searchTerm: 'barbell squat'
        },
        { 
           name: 'Leg Press 45°', 
           superset: false,
          tips: ['Pés na largura dos ombros', 'Não travar joelhos', 'Descer até 90°'],
          searchTerm: 'leg press'
        },
        { 
           name: 'Stiff', 
           superset: false,
          tips: ['Pernas levemente flexionadas', 'Barra rente às pernas', 'Posterior queimando'],
          searchTerm: 'barbell stiff leg deadlift'
        },
        { 
           name: 'Cadeira Extensora', 
           superset: 'A',
          tips: ['Subir rápido', 'Descer devagar', 'Squeeze no topo'],
          searchTerm: 'lever leg extension'
        },
        { 
           name: 'Cadeira Flexora', 
           superset: 'A',
          tips: ['Quadril colado no banco', 'Controlar excêntrica', 'Amplitude total'],
          searchTerm: 'lever lying leg curl'
        },
        { 
           name: 'Elevação Panturrilha em pé', 
           superset: false,
          tips: ['Subir máximo possível', 'Pausa de 2 seg', 'Descer até alongar'],
          searchTerm: 'smith machine calf raise'
        },
        { 
           name: 'Elevação Panturrilha sentado', 
           superset: false,
          tips: ['Trabalha sóleo', 'Volume alto', 'Queimação total'],
          searchTerm: 'seated calf raise'
        }
      ]
    },
    3: {
      name: 'Ombros + Trapézio',
      warmup: ['5min mobilidade ombros', '2 séries leves de desenvolvimento'],
      exercises: [
        { 
           name: 'Desenvolvimento com Barra', 
           superset: false,
          tips: ['Pegada ligeiramente > ombros', 'Core travado', 'Barra na frente'],
          searchTerm: 'barbell military press'
        },
        { 
           name: 'Elevação Lateral', 
           superset: false,
          tips: ['Dedinho para cima', 'Não passar da linha dos ombros', 'Controle total'],
          searchTerm: 'dumbbell lateral raise'
        },
        { 
           name: 'Desenvolvimento Arnold', 
           superset: 'A',
          tips: ['Rotação completa', 'Explosão na subida', 'Bilateral simultâneo'],
          searchTerm: 'dumbbell arnold press'
        },
        { 
           name: 'Elevação Frontal', 
           superset: 'A',
          tips: ['Até altura dos olhos', 'Sem balanço', 'Contrair deltoide anterior'],
          searchTerm: 'dumbbell front raise'
        },
        { 
           name: 'Crucifixo Invertido', 
           superset: false,
          tips: ['Peito no banco', 'Cotovelos levemente flexionados', 'Trabalhar posterior'],
          searchTerm: 'dumbbell reverse fly'
        },
        { 
           name: 'Encolhimento com Barra', 
           superset: 'B',
          tips: ['Puxar ombros para cima', 'Sem rolar ombros', 'Pausa no topo'],
          searchTerm: 'barbell shrug'
        },
        { 
           name: 'Encolhimento com Halteres', 
           superset: 'B',
          tips: ['Mais amplitude', 'Controle excêntrico', 'Queimação final'],
          searchTerm: 'dumbbell shrug'
        }
      ]
    },
    4: {
      name: 'Braços',
      warmup: ['3min mobilidade cotovelos', '1 série leve de rosca'],
      exercises: [
        { 
           name: 'Rosca Direta com Barra', 
           superset: false,
          tips: ['Cotovelos fixos', 'Sem balanço', 'Apertar bíceps no topo'],
          searchTerm: 'barbell curl'
        },
        { 
           name: 'Tríceps Testa', 
           superset: false,
          tips: ['Cotovelos fixos e juntos', 'Amplitude máxima', 'Controlar descida'],
          searchTerm: 'barbell lying triceps extension'
        },
        { 
           name: 'Rosca Martelo', 
           superset: 'A',
          tips: ['Pegada neutra', 'Trabalha braquial', 'Alternado ou simultâneo'],
          searchTerm: 'dumbbell hammer curl'
        },
        { 
           name: 'Tríceps Corda', 
           superset: 'A',
          tips: ['Abrir corda embaixo', 'Cotovelos colados', 'Squeeze de 1 seg'],
          searchTerm: 'cable rope pushdown'
        },
        { 
           name: 'Rosca Scott', 
           superset: 'B',
          tips: ['Braços bem apoiados', 'Alongar bem embaixo', 'Contrair no topo'],
          searchTerm: 'barbell preacher curl'
        },
        { 
           name: 'Tríceps Mergulho', 
           superset: 'B',
          tips: ['Inclinar tronco à frente', 'Descer até 90°', 'Explosão na subida'],
          searchTerm: 'tricep dips'
        },
        { 
           name: 'Rosca Concentrada', 
           superset: false,
          tips: ['Cotovelo apoiado', 'Controle total', 'Queimação brutal'],
          searchTerm: 'dumbbell concentration curl'
        }
      ]
    },
    5: {
      name: 'Costas + Posterior + Abdômen',
      warmup: ['5min mobilidade coluna', '2 séries leves de pulldown'],
      exercises: [
        { 
           name: 'Barra Fixa (ou Pulldown)', 
           superset: false,
          tips: ['Pegada pronada larga', 'Peito para a barra', 'Descer controlado'],
          searchTerm: 'pull up'
        },
        { 
           name: 'Remada Baixa', 
           superset: false,
          tips: ['Puxar até abdômen', 'Apertar escápulas', 'Não usar lombar'],
          searchTerm: 'cable seated row'
        },
        { 
           name: 'Pulldown Pegada Aberta', 
           superset: 'A',
          tips: ['Ênfase em dorsais', 'Puxar para baixo e trás', 'Sentir latíssimo'],
          searchTerm: 'cable wide grip lat pulldown'
        },
        { 
           name: 'Mesa Flexora', 
           superset: 'A',
          tips: ['Quadril fixo na mesa', 'Subir até 90°', 'Descer devagar'],
          searchTerm: 'lying leg curl'
        },
        { 
           name: 'Remada Unilateral', 
           superset: false,
          tips: ['Apoiar bem', 'Puxar até quadril', 'Rotação mínima'],
          searchTerm: 'dumbbell one arm row'
        },
        { 
           name: 'Hiperextensão', 
           superset: 'B',
          tips: ['Lombar + posterior', 'Não hiperextender', 'Controlar movimento'],
          searchTerm: 'back extension'
        },
        { 
           name: 'Abdominal Supra', 
           superset: 'B',
          tips: ['Tirar escápulas do chão', 'Expirar ao subir', 'Sem puxar pescoço'],
          searchTerm: 'crunch'
        },
        { 
           name: 'Prancha', 
           superset: false,
          tips: ['Corpo reto', 'Core ativado', 'Aguente o tempo'],
          searchTerm: 'plank'
        }
      ]
    }
  }
};

// Timer Component
function RestTimer({ restTime, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(restTime);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            if (onComplete) onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const start = () => {
    setIsRunning(true);
    setHasStarted(true);
  };
  const pause = () => setIsRunning(false);
  const reset = () => {
    setTimeLeft(restTime);
    setIsRunning(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((restTime - timeLeft) / restTime) * 100;

  if (!hasStarted) {
    return (
      <button
        onClick={start}
        className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
      >
        <Play className="w-5 h-5" />
        Iniciar Descanso ({restTime}s)
      </button>
    );
  }

  return (
    <div className="bg-zinc-800 rounded-lg p-4 space-y-3">
      <div className="relative">
        <div className="h-3 bg-zinc-900 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-600 to-green-500 transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-3xl font-black tabular-nums">
          {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
        
        <div className="flex gap-2">
          {isRunning ? (
            <button
              onClick={pause}
              className="bg-yellow-600 hover:bg-yellow-500 p-2 rounded-lg transition-colors"
            >
              <Pause className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={start}
              className="bg-green-600 hover:bg-green-500 p-2 rounded-lg transition-colors"
            >
              <Play className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={reset}
            className="bg-zinc-700 hover:bg-zinc-600 p-2 rounded-lg transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {timeLeft === 0 && (
        <div className="bg-green-600 text-white text-center py-2 rounded-lg font-bold animate-pulse">
          ✅ Descanso completo! Próxima série
        </div>
      )}
    </div>
  );
}

function App() {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentDay, setCurrentDay] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showTips, setShowTips] = useState({});
  const [showExerciseImage, setShowExerciseImage] = useState({});
  const [exerciseImages, setExerciseImages] = useState({});

  // CORREÇÃO: Inicialização "Lazy" (Lê direto do localStorage ao criar o estado)
  const [logs, setLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('arnoldTracker');
      return saved ? JSON.parse(saved).logs || {} : {};
    } catch {
      return {};
    }
  });

  // CORREÇÃO: Mesma coisa para a data
  const [startDate, setStartDate] = useState(() => {
    try {
      const saved = localStorage.getItem('arnoldTracker');
      return saved ? JSON.parse(saved).startDate || null : null;
    } catch {
      return null;
    }
  });

  // O useEffect de CARREGAR (o primeiro) foi removido pois não é mais necessário.

  // O useEffect de SALVAR continua igual:
  useEffect(() => {
    if (Object.keys(logs).length > 0 || startDate) {
      localStorage.setItem('arnoldTracker', JSON.stringify({ logs, startDate }));
    }
  }, [logs, startDate]);

  const weekData = TRAINING_PROGRAM.weeks[currentWeek];
  const dayData = currentDay ? TRAINING_PROGRAM.days[currentDay] : null;

  const updateLog = (exerciseName, field, value) => {
    const key = `w${currentWeek}-d${currentDay}-${exerciseName}`;
    setLogs(prev => ({
      ...prev,
      [key]: { ...prev[key], [field]: value }
    }));
  };

  const getLog = (exerciseName) => {
    const key = `w${currentWeek}-d${currentDay}-${exerciseName}`;
    return logs[key] || {};
  };

  const getSuggestion = (exerciseName) => {
    const log = getLog(exerciseName);
    const targetReps = weekData.reps.split('-')[1];
    
    if (log.reps && parseInt(log.reps) >= parseInt(targetReps)) {
      return '💪 Aumente 2.5-5kg na próxima';
    }
    return '';
  };

  const getPhaseColor = () => {
    if (weekData.isDeload) return 'bg-blue-600';
    if (weekData.phase === 'Adaptação') return 'bg-green-600';
    if (weekData.phase === 'Hipertrofia') return 'bg-purple-600';
    if (weekData.phase === 'Força') return 'bg-red-600';
    if (weekData.phase === 'Intensificação') return 'bg-orange-600';
    return 'bg-gray-600';
  };

  const calculateDaysElapsed = () => {
    if (!startDate) return null;
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = Math.abs(today - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateExpectedWeek = () => {
    const daysElapsed = calculateDaysElapsed();
    if (!daysElapsed) return 1;
    return Math.min(Math.ceil(daysElapsed / 7), 12);
  };

  const calculateDaysBehind = () => {
    const expectedWeek = calculateExpectedWeek();
    if (currentWeek >= expectedWeek) return 0;
    return (expectedWeek - currentWeek) * 7;
  };

  const handleStartDate = (date) => {
    setStartDate(date);
    setShowStartDatePicker(false);
  };

  const fetchExerciseGif = async (searchTerm, exerciseName) => {
    try {
      // Using ExerciseDB API via RapidAPI
      const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/name/${encodeURIComponent(searchTerm)}`, {
        headers: {
          'X-RapidAPI-Key': 'dc9f0460d0mshe804358c52eb702p1791c1jsn9c762314ddc4', // User needs to add their key
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0 && data[0].gifUrl) {
          setExerciseImages(prev => ({
            ...prev,
            [exerciseName]: data[0].gifUrl
          }));
        }
      }
    } catch (error) {
      console.error('Erro ao buscar imagem:', error);
    }
  };

  const daysElapsed = calculateDaysElapsed();
  const daysBehind = calculateDaysBehind();

  // VIEW DO DASHBOARD (Quando nenhum dia está selecionado)
  if (!currentDay) {
    return (
      <div className="min-h-screen bg-black text-gray-100 p-4 font-sans">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;800&display=swap');
          * { font-family: 'Bricolage Grotesque', sans-serif; }
        `}</style>
        
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 pt-6">
            <h1 className="text-5xl font-black mb-2 tracking-tight">ARNOLD</h1>
            <p className="text-gray-500 text-sm uppercase tracking-widest">Training Protocol</p>
          </div>

          {/* Start Date Section */}
          {!startDate ? (
            <div className="mb-8 bg-gradient-to-br from-red-600 to-red-700 border border-red-500 rounded-lg p-6">
              <h3 className="text-xl font-black mb-3 flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Quando você quer começar?
              </h3>
              <p className="text-sm text-red-100 mb-4">
                Defina a data de início para acompanhar seu progresso
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleStartDate(new Date().toISOString().split('T')[0])}
                  className="flex-1 bg-white text-red-600 font-bold py-3 px-4 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Começar Hoje
                </button>
                <button
                  onClick={() => setShowStartDatePicker(true)}
                  className="flex-1 bg-red-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-900 transition-colors"
                >
                  Escolher Data
                </button>
              </div>
              
              {showStartDatePicker && (
                <div className="mt-4 p-4 bg-black/30 rounded-lg">
                  <label className="text-sm uppercase tracking-wide mb-2 block">Data de Início</label>
                  <input
                    type="date"
                    onChange={(e) => handleStartDate(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded-lg"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="mb-8 bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Iniciado em</p>
                  <p className="text-xl font-black">{new Date(startDate).toLocaleDateString('pt-BR')}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Dias de treino</p>
                  <p className="text-3xl font-black">{daysElapsed}</p>
                </div>
              </div>
              
              {daysBehind > 0 && (
                <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 flex items-start gap-3">
                  <CalendarX className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-yellow-500 mb-1">Você está {daysBehind} dias atrás!</p>
                    <p className="text-sm text-yellow-300">
                      Deveria estar na semana {calculateExpectedWeek()}. Mas tá tudo bem, bora recuperar! 💪
                    </p>
                  </div>
                </div>
              )}
              
              <button
                onClick={() => setStartDate(null)}
                className="w-full mt-4 text-sm text-gray-500 hover:text-red-500 transition-colors"
              >
                Redefinir data de início
              </button>
            </div>
          )}

          {/* Week Selector */}
          <div className="mb-8 bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-400 uppercase tracking-wide">Semana</span>
              </div>
              <button 
                onClick={() => setShowInfo(!showInfo)}
                className="text-gray-500 hover:text-gray-300"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <select 
                value={currentWeek}
                onChange={(e) => setCurrentWeek(parseInt(e.target.value))}
                className="flex-1 bg-black border-2 border-zinc-700 text-3xl font-black p-4 rounded-lg focus:border-red-600 focus:outline-none"
              >
                {Object.keys(TRAINING_PROGRAM.weeks).map(w => (
                  <option key={w} value={w}>Semana {w}</option>
                ))}
              </select>
            </div>

            {/* Phase Badge */}
            <div className="flex items-center justify-between">
              <span className={`${getPhaseColor()} px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide`}>
                {weekData.phase}
              </span>
              <div className="text-right">
                <div className="text-2xl font-black">{weekData.rpe}</div>
                <div className="text-xs text-gray-500 uppercase">RPE Alvo</div>
              </div>
            </div>

            {/* Week Parameters */}
            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-zinc-800">
              <div className="text-center">
                <div className="text-2xl font-black">{weekData.sets}</div>
                <div className="text-xs text-gray-500 uppercase">Séries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black">{weekData.reps}</div>
                <div className="text-xs text-gray-500 uppercase">Reps</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black">{weekData.rest}s</div>
                <div className="text-xs text-gray-500 uppercase">Descanso</div>
              </div>
            </div>

            {weekData.isDeload && (
              <div className="mt-4 bg-blue-900/30 border border-blue-700 rounded-lg p-3">
                <p className="text-sm text-blue-300 text-center font-semibold">
                  🔄 SEMANA DE DELOAD - Reduza a intensidade
                </p>
              </div>
            )}
          </div>

          {/* Days Grid */}
          <div className="grid gap-4 pb-20">
            {Object.entries(TRAINING_PROGRAM.days).map(([key, day]) => (
              <button
                key={key}
                onClick={() => setCurrentDay(key)}
                className="group bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 p-6 rounded-lg text-left transition-all hover:border-red-600/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs">
                    Dia {key}
                  </span>
                  <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-red-500 transition-colors" />
                </div>
                <h3 className="text-xl font-black text-white group-hover:text-red-500 transition-colors">
                  {day.name}
                </h3>
                <p className="text-zinc-500 text-sm mt-1">
                  {day.exercises.length} Exercícios
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // VIEW DO TREINO ATIVO (Quando um dia é selecionado)
  return (
    <div className="min-h-screen bg-black text-gray-100 p-4 font-sans pb-32">
       <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;800&display=swap');
          * { font-family: 'Bricolage Grotesque', sans-serif; }
        `}</style>
      
      <div className="max-w-2xl mx-auto">
        {/* Header Navigation */}
        <div className="flex items-center gap-4 mb-8 pt-4">
          <button 
            onClick={() => setCurrentDay(null)}
            className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded-lg transition-colors"
          >
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-widest">Semana {currentWeek} • Dia {currentDay}</p>
            <h2 className="text-2xl font-black">{dayData.name}</h2>
          </div>
        </div>

        {/* Warmup Card */}
        <div className="bg-orange-900/20 border border-orange-800/50 rounded-lg p-5 mb-8">
          <h3 className="text-orange-500 font-bold flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5" />
            Aquecimento Obrigatório
          </h3>
          <ul className="space-y-2">
            {dayData.warmup.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-orange-200/80">
                <span className="mt-1.5 w-1 h-1 bg-orange-500 rounded-full" />
                {step}
              </li>
            ))}
          </ul>
        </div>

        {/* Exercises List */}
        <div className="space-y-6">
          {dayData.exercises.map((exercise, index) => {
            const log = getLog(exercise.name);
            const suggestion = getSuggestion(exercise.name);
            const isImageVisible = showExerciseImage[exercise.name];
            const hasImage = exerciseImages[exercise.name];

            return (
              <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                {/* Exercise Header */}
                <div className="p-5 border-b border-zinc-800">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      {exercise.superset && (
                        <span className="inline-block bg-indigo-900/50 text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded mb-2 border border-indigo-700/50">
                          SUPERSET {exercise.superset}
                        </span>
                      )}
                      <h3 className="text-xl font-bold leading-tight">{exercise.name}</h3>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          if (!hasImage) fetchExerciseGif(exercise.searchTerm, exercise.name);
                          setShowExerciseImage(prev => ({...prev, [exercise.name]: !prev[exercise.name]}));
                        }}
                        className={`p-2 rounded-lg transition-colors ${isImageVisible ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}
                      >
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setShowTips(prev => ({ ...prev, [exercise.name]: !prev[exercise.name] }))}
                        className={`p-2 rounded-lg transition-colors ${showTips[exercise.name] ? 'bg-yellow-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}
                      >
                        <Lightbulb className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Exercise GIF Area */}
                  {isImageVisible && (
                    <div className="mt-4 mb-4 bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center border border-zinc-700">
                      {hasImage ? (
                        <img src={hasImage} alt={exercise.name} className="w-full h-full object-contain" />
                      ) : (
                        <div className="text-zinc-500 text-sm animate-pulse">Carregando visualização...</div>
                      )}
                    </div>
                  )}

                  {/* Tips Area */}
                  {showTips[exercise.name] && (
                    <div className="mt-3 bg-yellow-900/20 p-3 rounded-lg border border-yellow-800/30">
                      <ul className="space-y-1">
                        {exercise.tips.map((tip, i) => (
                          <li key={i} className="text-xs text-yellow-200/70 flex gap-2">
                            • {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Target Params */}
                  <div className="flex gap-4 mt-3 text-sm text-zinc-500 font-mono">
                    <span>SETA: {weekData.sets} séries</span>
                    <span>REPS: {weekData.reps}</span>
                    <span>RPE: {weekData.rpe}</span>
                  </div>
                </div>

                {/* Logging Section */}
                <div className="p-5 bg-black/20 space-y-4">
                  {suggestion && (
                    <div className="text-xs text-green-400 font-bold bg-green-900/20 p-2 rounded border border-green-900/50">
                      {suggestion}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-zinc-500 uppercase font-bold mb-1 block">Carga (kg)</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          placeholder="0"
                          value={log.weight || ''}
                          onChange={(e) => updateLog(exercise.name, 'weight', e.target.value)}
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white font-bold focus:border-red-600 focus:outline-none transition-colors"
                        />
                        <Dumbbell className="w-4 h-4 text-zinc-600 absolute right-3 top-3.5" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-zinc-500 uppercase font-bold mb-1 block">Reps Realizadas</label>
                      <input 
                        type="number" 
                        placeholder="0"
                        value={log.reps || ''}
                        onChange={(e) => updateLog(exercise.name, 'reps', e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white font-bold focus:border-red-600 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <RestTimer restTime={weekData.rest} />
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 mb-8">
           <button 
             onClick={() => setCurrentDay(null)}
             className="w-full bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest py-4 rounded-lg transition-all"
           >
             Finalizar Treino
           </button>
        </div>
      </div>
    </div>
  );
}

export default App;