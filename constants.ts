import { LevelData } from './types';

export const LEVELS: LevelData[] = [
  {
    id: 1,
    title: "Nivel 1: Conceptos Básicos",
    description: "Introducción al azar, espacio muestral y la Regla de Laplace.",
    tutorialTitle: "Fundamentos de Probabilidad",
    tutorialContent: [
      "La probabilidad mide qué tan posible es que ocurra un evento.",
      "Usamos la Regla de Laplace para experimentos regulares:",
      "Probabilidad = (Casos Favorables) / (Casos Totales)",
      "Ejemplo: Al lanzar una moneda, hay 2 casos totales (Cara, Sello). La probabilidad de 'Cara' es 1/2."
    ],
    questions: [
      {
        id: 101,
        question: "Lanzas una moneda al aire. ¿Cuál es la probabilidad de obtener 'Cara'?",
        options: ["1/2", "1/3", "1/4", "1"],
        correctAnswerIndex: 0,
        explanation: "Hay 2 resultados posibles (Cara, Sello) y solo 1 favorable (Cara). P = 1/2."
      },
      {
        id: 102,
        question: "Lanzas un dado de 6 caras. ¿Cuál es la probabilidad de obtener un número par?",
        options: ["1/6", "1/2", "1/3", "2/3"],
        correctAnswerIndex: 1,
        explanation: "Los números pares son {2, 4, 6}. Son 3 casos favorables de 6 posibles. 3/6 se simplifica a 1/2."
      },
      {
        id: 103,
        question: "En una bolsa hay 3 bolas rojas y 2 bolas azules. ¿Cuál es la probabilidad de sacar una bola roja?",
        options: ["2/5", "3/5", "1/5", "3/2"],
        correctAnswerIndex: 1,
        explanation: "Total de bolas = 3 + 2 = 5. Bolas rojas = 3. La probabilidad es 3/5."
      },
      {
        id: 104,
        question: "Lanzas un dado. ¿Cuál es la probabilidad de sacar un número menor que 3?",
        options: ["1/2", "1/6", "1/3", "2/5"],
        correctAnswerIndex: 2,
        explanation: "Los números menores que 3 son {1, 2}. Son 2 casos favorables de 6. 2/6 se simplifica a 1/3."
      },
      {
        id: 105,
        question: "Se elige al azar una letra de la palabra 'MURCIELAGO'. ¿Cuál es la probabilidad de que sea una vocal?",
        options: ["1/2", "3/10", "1/5", "5/8"],
        correctAnswerIndex: 0,
        explanation: "MURCIELAGO tiene 10 letras y 5 vocales (A, E, I, O, U). P = 5/10, simplificado es 1/2."
      }
    ]
  },
  {
    id: 2,
    title: "Nivel 2: Eventos Compuestos Simples",
    description: "Lanzamiento de dos monedas y extracciones básicas.",
    tutorialTitle: "Espacios Muestrales Más Grandes",
    tutorialContent: [
      "Cuando combinamos eventos (como lanzar dos monedas), el espacio muestral crece.",
      "Para dos monedas, los resultados son: {Cara-Cara, Cara-Sello, Sello-Cara, Sello-Sello}. Total: 4.",
      "Recuerda siempre simplificar tus fracciones al máximo (ej. 2/4 = 1/2)."
    ],
    questions: [
      {
        id: 201,
        question: "Lanzas dos monedas. ¿Cuál es la probabilidad de obtener dos caras (C-C)?",
        options: ["1/2", "1/4", "1/3", "3/4"],
        correctAnswerIndex: 1,
        explanation: "El único caso favorable es {C-C} de 4 posibles ({CC, CS, SC, SS}). P = 1/4."
      },
      {
        id: 202,
        question: "Lanzas dos monedas. ¿Cuál es la probabilidad de obtener al menos una cara?",
        options: ["1/4", "1/2", "3/4", "2/3"],
        correctAnswerIndex: 2,
        explanation: "Casos favorables: {CC, CS, SC}. Son 3 de 4 posibles. P = 3/4."
      },
      {
        id: 203,
        question: "Una ruleta tiene colores: Rojo, Rojo, Azul, Verde. ¿Probabilidad de que NO salga Verde?",
        options: ["1/4", "1/2", "3/4", "2/3"],
        correctAnswerIndex: 2,
        explanation: "Total: 4 sectores. No Verde son {Rojo, Rojo, Azul} -> 3 sectores. P = 3/4."
      },
      {
        id: 204,
        question: "Sacas una carta de una baraja inglesa (52 cartas). ¿Probabilidad de sacar un As?",
        options: ["1/52", "1/13", "4/13", "1/26"],
        correctAnswerIndex: 1,
        explanation: "Hay 4 Ases en 52 cartas. 4/52 se simplifica dividiendo por 4 a 1/13."
      },
      {
        id: 205,
        question: "En una caja hay fichas numeradas del 1 al 10. ¿Probabilidad de sacar un múltiplo de 3?",
        options: ["3/10", "1/3", "1/5", "2/5"],
        correctAnswerIndex: 0,
        explanation: "Múltiplos de 3 entre 1 y 10: {3, 6, 9}. Son 3 casos de 10. P = 3/10."
      }
    ]
  },
  {
    id: 3,
    title: "Nivel 3: Suma de Dados",
    description: "Trabajando con dos dados y sumas de resultados.",
    tutorialTitle: "Lanzando Dos Dados",
    tutorialContent: [
      "Al lanzar dos dados, cada uno tiene 6 caras. Esto genera un total de 6 x 6 = 36 combinaciones posibles.",
      "En la tabla a continuación puedes ver todas las sumas posibles. La fila superior representa el Dado 1 y la columna izquierda el Dado 2.",
      "Observa que el 7 es el resultado más común (diagonal amarilla), mientras que el 2 y el 12 solo aparecen una vez."
    ],
    questions: [
      {
        id: 301,
        question: "Lanzas dos dados. ¿Cuál es la probabilidad de que la suma sea 7?",
        options: ["1/6", "1/12", "7/36", "1/9"],
        correctAnswerIndex: 0,
        explanation: "Combinaciones que suman 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). Son 6 de 36. 6/36 = 1/6."
      },
      {
        id: 302,
        question: "Lanzas dos dados. ¿Cuál es la probabilidad de sacar 'dobles' (mismo número en ambos)?",
        options: ["1/12", "1/6", "1/36", "5/36"],
        correctAnswerIndex: 1,
        explanation: "Dobles: (1,1), (2,2), (3,3), (4,4), (5,5), (6,6). Son 6 de 36, que simplificado es 1/6."
      },
      {
        id: 303,
        question: "Lanzas dos dados. ¿Cuál es la probabilidad de que la suma sea 12?",
        options: ["1/12", "1/6", "1/36", "1/18"],
        correctAnswerIndex: 2,
        explanation: "Solo hay un caso favorable: (6,6). Total 36. P = 1/36."
      },
      {
        id: 304,
        question: "Lanzas dos dados. ¿Probabilidad de que la suma sea menor o igual a 3?",
        options: ["1/18", "1/12", "1/6", "1/9"],
        correctAnswerIndex: 1,
        explanation: "Sumas posibles: 2 (1,1) y 3 (1,2), (2,1). Total 3 casos. 3/36 = 1/12."
      },
      {
        id: 305,
        question: "Lanzas dos dados. ¿Probabilidad de que la suma sea 1?",
        options: ["1/36", "0", "1/6", "Imposible saber"],
        correctAnswerIndex: 1,
        explanation: "La suma mínima posible con dos dados es 1+1=2. Es un evento imposible. P = 0."
      }
    ]
  },
  {
    id: 4,
    title: "Nivel 4: Desafío Final",
    description: "Eventos complementarios y lógica un poco más avanzada.",
    tutorialTitle: "Eventos Seguros, Imposibles y Complementarios",
    tutorialContent: [
      "Evento Seguro: Probabilidad = 1 (100%).",
      "Evento Imposible: Probabilidad = 0.",
      "Evento Complementario: P(A) + P(No A) = 1.",
      "A veces es más fácil calcular lo que NO quieres y restarlo de 1."
    ],
    questions: [
      {
        id: 401,
        question: "Lanzas un dado. ¿Cuál es la probabilidad de NO sacar un 6?",
        options: ["1/6", "5/6", "1/2", "2/3"],
        correctAnswerIndex: 1,
        explanation: "P(Sacar 6) = 1/6. El complemento es 1 - 1/6 = 5/6."
      },
      {
        id: 402,
        question: "En una urna hay 10 bolas: 5 rojas, 3 verdes, 2 azules. ¿Probabilidad de NO sacar azul?",
        options: ["1/5", "4/5", "3/10", "7/10"],
        correctAnswerIndex: 1,
        explanation: "Azules = 2. No azules = 8. Total = 10. P = 8/10 = 4/5."
      },
      {
        id: 403,
        question: "Se elige un número al azar del 1 al 20. ¿Probabilidad de que sea primo?",
        options: ["2/5", "9/20", "1/2", "3/10"],
        correctAnswerIndex: 0,
        explanation: "Primos: 2, 3, 5, 7, 11, 13, 17, 19. Son 8 números. 8/20 = 2/5."
      },
      {
        id: 404,
        question: "Lanzas tres monedas. ¿Cuál es la probabilidad de obtener exactamente 2 caras (C)?",
        options: ["3/8", "1/2", "1/4", "3/4"],
        correctAnswerIndex: 0,
        explanation: "Casos: CCC, CCS, CSC, SCC, CSS, SCS, SSC, SSS. Favorables (2 caras): CCS, CSC, SCC (3). P = 3/8."
      },
      {
        id: 405,
        question: "Sacas una carta de una baraja (52). ¿Probabilidad de que sea Roja o sea un Rey?",
        options: ["15/26", "7/13", "1/2", "6/13"],
        correctAnswerIndex: 1,
        explanation: "Cartas rojas (26) + Reyes negros (2). Total favorables = 28. 28/52 = 7/13."
      }
    ]
  }
];