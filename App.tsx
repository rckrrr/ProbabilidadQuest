import React, { useState, useEffect, useCallback } from 'react';
import { Brain, Trophy, ChevronRight, RefreshCcw, BookOpen, Star, Lock, CheckCircle, XCircle, Home, Trash2 } from 'lucide-react';
import { ViewState, LevelData, UserProgress, Question } from './types';
import { LEVELS } from './constants';

const App: React.FC = () => {
  // State
  const [view, setView] = useState<ViewState>(ViewState.MENU);
  const [progress, setProgress] = useState<UserProgress>({ unlockedLevels: 1, scores: {} });
  const [activeLevelId, setActiveLevelId] = useState<number | null>(null);
  
  // Quiz State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [quizHistory, setQuizHistory] = useState<boolean[]>([]); // Track correct/incorrect for current session

  // --- Persistence ---
  useEffect(() => {
    const saved = localStorage.getItem('probability_quest_progress');
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('probability_quest_progress', JSON.stringify(newProgress));
  };

  const clearProgress = () => {
    if (window.confirm("¿Estás seguro de que quieres borrar todo tu progreso?")) {
      const reset = { unlockedLevels: 1, scores: {} };
      saveProgress(reset);
      setView(ViewState.MENU);
    }
  };

  // --- Navigation Helpers ---
  const startLevel = (levelId: number) => {
    setActiveLevelId(levelId);
    setView(ViewState.TUTORIAL);
  };

  const startQuiz = () => {
    setCurrentQuestionIdx(0);
    setScore(0);
    setQuizHistory([]);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setView(ViewState.QUIZ);
  };

  const handleOptionSelect = (idx: number) => {
    if (isAnswerChecked) return;
    setSelectedOption(idx);
  };

  const checkAnswer = () => {
    if (selectedOption === null || activeLevelId === null) return;
    
    const level = LEVELS.find(l => l.id === activeLevelId);
    if (!level) return;

    const question = level.questions[currentQuestionIdx];
    const isCorrect = selectedOption === question.correctAnswerIndex;

    if (isCorrect) setScore(s => s + 1);
    setQuizHistory(prev => [...prev, isCorrect]);
    setIsAnswerChecked(true);
  };

  const nextQuestion = () => {
    if (activeLevelId === null) return;
    const level = LEVELS.find(l => l.id === activeLevelId);
    if (!level) return;

    if (currentQuestionIdx < level.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      finishLevel();
    }
  };

  const finishLevel = () => {
    if (activeLevelId === null) return;
    
    // Update Progress
    const passed = score >= 3;
    let newUnlocked = progress.unlockedLevels;
    
    if (passed && activeLevelId === progress.unlockedLevels && activeLevelId < LEVELS.length) {
      newUnlocked = activeLevelId + 1;
    }

    const newScores = { ...progress.scores };
    // Only update score if it's better
    if (!newScores[activeLevelId] || score > newScores[activeLevelId]) {
      newScores[activeLevelId] = score;
    }

    saveProgress({
      unlockedLevels: newUnlocked,
      scores: newScores
    });

    setView(ViewState.RESULTS);
  };

  const getActiveLevelData = (): LevelData | undefined => {
    return LEVELS.find(l => l.id === activeLevelId);
  };

  // --- Render Views ---

  const renderMenu = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white relative">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl text-center max-w-md w-full border border-white/20 z-10">
        <div className="flex justify-center mb-6">
          <div className="bg-white p-4 rounded-full shadow-lg">
            <Brain className="w-16 h-16 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2">Probabilidad Quest</h1>
        <p className="text-indigo-100 mb-8">Domina el azar, desbloquea niveles y conviértete en un experto.</p>
        
        <button 
          onClick={() => setView(ViewState.LEVEL_SELECT)}
          className="w-full py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-50 transition-all transform hover:scale-105 flex items-center justify-center gap-2 mb-4"
        >
          <Trophy className="w-5 h-5" />
          Jugar
        </button>

        {Object.keys(progress.scores).length > 0 && (
          <button 
             onClick={clearProgress}
             className="text-sm text-indigo-200 hover:text-white underline flex items-center justify-center gap-1 w-full"
          >
            <Trash2 className="w-4 h-4" /> Borrar Progreso
          </button>
        )}
      </div>

      <div className="mt-8 text-indigo-200 text-sm font-medium z-0">
        Creado por Felipe Martínez Y.
      </div>
    </div>
  );

  const renderLevelSelect = () => (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <button onClick={() => setView(ViewState.MENU)} className="p-2 rounded-full hover:bg-slate-200 transition">
            <Home className="w-6 h-6 text-slate-700" />
          </button>
          <h2 className="text-2xl font-bold text-slate-800">Selecciona un Nivel</h2>
          <div className="w-10"></div> {/* Spacer */}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LEVELS.map((level) => {
            const isLocked = level.id > progress.unlockedLevels;
            const highScore = progress.scores[level.id];
            
            return (
              <button
                key={level.id}
                disabled={isLocked}
                onClick={() => startLevel(level.id)}
                className={`relative group text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                  isLocked 
                    ? 'border-slate-200 bg-slate-100 cursor-not-allowed opacity-70' 
                    : 'border-indigo-100 bg-white hover:border-indigo-500 hover:shadow-lg cursor-pointer'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${isLocked ? 'bg-slate-200' : 'bg-indigo-100 text-indigo-600'}`}>
                    {isLocked ? <Lock className="w-6 h-6 text-slate-400" /> : <Star className="w-6 h-6" />}
                  </div>
                  {highScore !== undefined && (
                    <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                      <Trophy className="w-3 h-3" />
                      {highScore}/5
                    </div>
                  )}
                </div>
                
                <h3 className={`text-xl font-bold mb-2 ${isLocked ? 'text-slate-500' : 'text-slate-800'}`}>
                  {level.title}
                </h3>
                <p className={`text-sm ${isLocked ? 'text-slate-400' : 'text-slate-500'}`}>
                  {level.description}
                </p>

                {!isLocked && (
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                    <ChevronRight className="w-6 h-6 text-indigo-500" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderTutorial = () => {
    const level = getActiveLevelData();
    if (!level) return null;

    return (
      <div className="min-h-screen bg-indigo-600 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
          <div className="p-8 bg-indigo-50 border-b border-indigo-100 shrink-0">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-6 h-6 text-indigo-600" />
              <span className="uppercase tracking-wider text-xs font-bold text-indigo-500">Tutorial</span>
            </div>
            <h2 className="text-3xl font-bold text-indigo-900">{level.tutorialTitle}</h2>
          </div>
          
          <div className="p-8 space-y-6 overflow-y-auto">
            {level.tutorialContent.map((paragraph, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <p className="text-lg text-slate-700 leading-relaxed">{paragraph}</p>
              </div>
            ))}

            {/* Level 3 Specific Visualization: 6x6 Dice Sum Table */}
            {level.id === 3 && (
              <div className="mt-8 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <p className="text-sm text-slate-500 mb-4 text-center italic font-medium">
                  Tabla de Sumas: Dado 1 (Filas) + Dado 2 (Columnas)
                </p>
                <div className="grid grid-cols-7 gap-1 text-sm max-w-md mx-auto">
                  {/* Header Row */}
                  <div className="flex items-center justify-center font-bold text-indigo-300">+</div>
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <div key={`h-${n}`} className="aspect-square flex items-center justify-center font-bold text-indigo-600 bg-indigo-50 rounded">
                      {n}
                    </div>
                  ))}

                  {/* Rows */}
                  {[1, 2, 3, 4, 5, 6].map(row => (
                    <React.Fragment key={`row-${row}`}>
                      {/* Row Header */}
                      <div className="aspect-square flex items-center justify-center font-bold text-indigo-600 bg-indigo-50 rounded">
                        {row}
                      </div>
                      {/* Sum Cells */}
                      {[1, 2, 3, 4, 5, 6].map(col => {
                        const sum = row + col;
                        const isSeven = sum === 7;
                        return (
                          <div 
                            key={`cell-${row}-${col}`} 
                            className={`aspect-square flex items-center justify-center rounded border transition-colors ${
                              isSeven 
                                ? 'bg-yellow-100 border-yellow-300 text-yellow-800 font-bold ring-1 ring-yellow-200' 
                                : 'bg-white border-slate-100 text-slate-500'
                            }`}
                          >
                            {sum}
                          </div>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded"></div>
                  <span>La suma 7 aparece 6 veces (diagonal)</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0">
            <button 
              onClick={startQuiz}
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              Comenzar Nivel <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderQuiz = () => {
    const level = getActiveLevelData();
    if (!level) return null;
    const question = level.questions[currentQuestionIdx];

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setView(ViewState.LEVEL_SELECT)} className="text-slate-400 hover:text-slate-600">
              <XCircle className="w-6 h-6" />
            </button>
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">{level.title}</h3>
              <p className="font-medium text-slate-800">Pregunta {currentQuestionIdx + 1} de {level.questions.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right mr-2">
              <span className="block text-xs text-slate-400 uppercase">Aciertos</span>
              <span className="font-bold text-indigo-600 text-xl">{score}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-200">
          <div 
            className="h-full bg-indigo-500 transition-all duration-300" 
            style={{ width: `${((currentQuestionIdx) / level.questions.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 max-w-3xl w-full mx-auto p-6 flex flex-col justify-center">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6">
            <h2 className="text-2xl font-medium text-slate-800 mb-8 leading-snug">{question.question}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((opt, idx) => {
                let btnClass = "border-2 border-slate-200 hover:border-indigo-200 hover:bg-indigo-50";
                
                if (isAnswerChecked) {
                  if (idx === question.correctAnswerIndex) {
                    btnClass = "border-green-500 bg-green-50 text-green-700";
                  } else if (idx === selectedOption) {
                    btnClass = "border-red-500 bg-red-50 text-red-700";
                  } else {
                    btnClass = "border-slate-100 text-slate-400 opacity-50";
                  }
                } else if (selectedOption === idx) {
                  btnClass = "border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-200";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={isAnswerChecked}
                    className={`p-6 rounded-xl text-lg font-medium transition-all duration-200 text-left flex items-center justify-between group ${btnClass}`}
                  >
                    <span>{opt}</span>
                    {isAnswerChecked && idx === question.correctAnswerIndex && <CheckCircle className="w-6 h-6 text-green-600" />}
                    {isAnswerChecked && idx === selectedOption && idx !== question.correctAnswerIndex && <XCircle className="w-6 h-6 text-red-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Area */}
          <div className={`transition-all duration-500 transform ${isAnswerChecked ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}>
             {isAnswerChecked && (
               <div className={`rounded-xl p-6 mb-24 ${selectedOption === question.correctAnswerIndex ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'}`}>
                 <h4 className={`font-bold mb-2 ${selectedOption === question.correctAnswerIndex ? 'text-green-800' : 'text-red-800'}`}>
                   {selectedOption === question.correctAnswerIndex ? '¡Correcto!' : 'Incorrecto'}
                 </h4>
                 <p className="text-slate-700">{question.explanation}</p>
               </div>
             )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 flex justify-center z-20">
          <div className="max-w-3xl w-full flex justify-end">
            {!isAnswerChecked ? (
              <button 
                onClick={checkAnswer}
                disabled={selectedOption === null}
                className={`px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all ${
                  selectedOption === null 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                Comprobar
              </button>
            ) : (
              <button 
                onClick={nextQuestion}
                className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2"
              >
                {currentQuestionIdx < level.questions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Nivel'}
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const passed = score >= 3;
    const isLastLevel = activeLevelId === LEVELS.length;

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center border border-slate-100">
          <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${passed ? 'bg-green-100' : 'bg-red-100'}`}>
            {passed ? (
              <Trophy className="w-12 h-12 text-green-600" />
            ) : (
              <RefreshCcw className="w-12 h-12 text-red-600" />
            )}
          </div>
          
          <h2 className="text-3xl font-bold text-slate-800 mb-2">{passed ? '¡Nivel Completado!' : '¡Inténtalo de nuevo!'}</h2>
          <p className="text-slate-500 mb-8">
            Has acertado <span className="font-bold text-slate-900 text-lg">{score}</span> de 5 preguntas.
            {passed 
              ? (isLastLevel ? " ¡Eres un maestro de la probabilidad!" : " Has desbloqueado el siguiente nivel.")
              : " Necesitas al menos 3 aciertos para avanzar."}
          </p>

          <div className="space-y-3">
            {passed && !isLastLevel && (
              <button 
                onClick={() => {
                   if (activeLevelId) startLevel(activeLevelId + 1);
                }}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-colors"
              >
                Siguiente Nivel
              </button>
            )}
            
            <button 
              onClick={() => {
                if (activeLevelId) startLevel(activeLevelId);
              }}
              className={`w-full py-3 rounded-xl font-bold transition-colors border-2 ${passed ? 'border-slate-200 text-slate-600 hover:bg-slate-50' : 'bg-indigo-600 text-white hover:bg-indigo-700 border-transparent'}`}
            >
              Reintentar
            </button>

            <button 
              onClick={() => setView(ViewState.LEVEL_SELECT)}
              className="w-full py-3 text-slate-500 hover:text-slate-800 font-medium"
            >
              Volver al Mapa
            </button>
          </div>
        </div>
      </div>
    );
  };

  switch (view) {
    case ViewState.MENU: return renderMenu();
    case ViewState.LEVEL_SELECT: return renderLevelSelect();
    case ViewState.TUTORIAL: return renderTutorial();
    case ViewState.QUIZ: return renderQuiz();
    case ViewState.RESULTS: return renderResults();
    default: return renderMenu();
  }
};

export default App;