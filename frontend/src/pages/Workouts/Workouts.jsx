import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import "./Workouts.css";

function Workouts() {
  const [location, setLocation] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("");
  const [trainingGoal, setTrainingGoal] = useState("mass");
  const [activeExerciseId, setActiveExerciseId] = useState(null);
  const [maxReps, setMaxReps] = useState("");
  const [workingWeight, setWorkingWeight] = useState("");
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const locations = [
    { id: "home", title: "🏠 Дім", description: "Тренування вдома" },
    { id: "gym", title: "🏋️ Зал", description: "Повноцінний тренажерний зал" },
    { id: "street", title: "🌳 Вулиця", description: "Турніки, бруси та спортивний майданчик" },
  ];

  const trainingGoals = [
    { id: "mass", title: "Набір маси", description: "6–8 повторень, середньо-важка вага" },
    { id: "maintenance", title: "Підтримка", description: "8–12 повторень, помірна вага" },
    { id: "deficit", title: "Схуднення", description: "8–12 повторень, більше контролю та обʼєму" },
    { id: "strength", title: "Сила", description: "6–8 повторень, важча робоча вага" },
  ];

  const equipmentByLocation = {
    home: [
      { id: "pullup_bar", name: "Турнік", muscleGroups: ["back", "biceps", "abs"] },
      { id: "dumbbells", name: "Гантелі", muscleGroups: ["chest", "back", "shoulders", "biceps", "triceps", "legs"] },
      { id: "bodyweight", name: "Власна вага", muscleGroups: ["chest", "triceps", "legs", "abs"] },
    ],
    gym: [
      { id: "barbell", name: "Штанга", muscleGroups: ["chest", "back", "shoulders", "biceps", "triceps", "legs"] },
      { id: "dumbbells", name: "Гантелі", muscleGroups: ["chest", "back", "shoulders", "biceps", "triceps", "legs"] },
      { id: "cable_machine", name: "Блоковий тренажер", muscleGroups: ["chest", "back", "shoulders", "biceps", "triceps", "abs"] },
      { id: "leg_press", name: "Жим ногами", muscleGroups: ["legs"] },
      { id: "pullup_bar", name: "Турнік", muscleGroups: ["back", "biceps", "abs"] },
    ],
    street: [
      { id: "pullup_bar", name: "Турнік", muscleGroups: ["back", "biceps", "abs"] },
      { id: "parallel_bars", name: "Бруси", muscleGroups: ["chest", "triceps", "shoulders", "abs"] },
      { id: "bodyweight", name: "Власна вага", muscleGroups: ["chest", "triceps", "legs", "abs"] },
    ],
  };

  const muscleGroups = [
    { id: "back", name: "Спина", icon: "🦍", recommendation: "Рекомендовано 2–3 вправи" },
    { id: "chest", name: "Груди", icon: "🏋️", recommendation: "Рекомендовано 2–3 вправи" },
    { id: "shoulders", name: "Плечі", icon: "⚡", recommendation: "Рекомендовано 2–3 вправи" },
    { id: "biceps", name: "Біцепс", icon: "💪", recommendation: "Рекомендовано 2–3 вправи" },
    { id: "triceps", name: "Трицепс", icon: "🔥", recommendation: "Рекомендовано 2–3 вправи" },
    { id: "legs", name: "Ноги", icon: "🦵", recommendation: "Рекомендовано 3–4 вправи" },
    { id: "abs", name: "Прес", icon: "🧱", recommendation: "Рекомендовано 2 вправи" },
  ];

  const exercises = [
  { id: 1, name: "Підтягування широким хватом", muscleGroup: "back", equipment: "pullup_bar", type: "bodyweight", difficulty: "Середній рівень", description: "Базова вправа для розвитку найширших м'язів спини." },
  { id: 2, name: "Підтягування середнім хватом", muscleGroup: "back", equipment: "pullup_bar", type: "bodyweight", difficulty: "Середній рівень", description: "Вправа для спини з рівномірним навантаженням." },
  { id: 3, name: "Австралійські підтягування", muscleGroup: "back", equipment: "pullup_bar", type: "bodyweight", difficulty: "Початковий рівень", description: "Полегшений варіант підтягувань для спини." },

  { id: 4, name: "Підтягування зворотним хватом", muscleGroup: "biceps", equipment: "pullup_bar", type: "bodyweight", difficulty: "Середній рівень", description: "Добре навантажує біцепс і верх спини." },
  { id: 5, name: "Підтягування вузьким зворотним хватом", muscleGroup: "biceps", equipment: "pullup_bar", type: "bodyweight", difficulty: "Середній рівень", description: "Варіант підтягувань з більшим акцентом на біцепс." },
  { id: 6, name: "Утримання у верхній точці", muscleGroup: "biceps", equipment: "pullup_bar", type: "bodyweight", difficulty: "Складний рівень", description: "Статична вправа для сили біцепса та хвата." },

  { id: 7, name: "Підйом ніг у висі", muscleGroup: "abs", equipment: "pullup_bar", type: "bodyweight", difficulty: "Середній рівень", description: "Ефективна вправа для м'язів преса." },
  { id: 8, name: "Підйом колін у висі", muscleGroup: "abs", equipment: "pullup_bar", type: "bodyweight", difficulty: "Початковий рівень", description: "Полегшений варіант для нижньої частини преса." },
  { id: 9, name: "Скручування у висі", muscleGroup: "abs", equipment: "pullup_bar", type: "bodyweight", difficulty: "Складний рівень", description: "Вправа для преса та косих м'язів живота." },

  { id: 10, name: "Віджимання на брусах з нахилом вперед", muscleGroup: "chest", equipment: "parallel_bars", type: "bodyweight", difficulty: "Середній рівень", description: "Варіант з акцентом на грудні м'язи." },
  { id: 11, name: "Глибокі віджимання на брусах", muscleGroup: "chest", equipment: "parallel_bars", type: "bodyweight", difficulty: "Складний рівень", description: "Збільшена амплітуда для кращого розтягнення грудей." },
  { id: 12, name: "Негативні віджимання на брусах", muscleGroup: "chest", equipment: "parallel_bars", type: "bodyweight", difficulty: "Початковий рівень", description: "Повільне опускання для розвитку сили грудей." },

  { id: 13, name: "Віджимання на брусах на трицепс", muscleGroup: "triceps", equipment: "parallel_bars", type: "bodyweight", difficulty: "Середній рівень", description: "Варіант з акцентом на трицепс." },
  { id: 14, name: "Вузькі віджимання на брусах", muscleGroup: "triceps", equipment: "parallel_bars", type: "bodyweight", difficulty: "Середній рівень", description: "Більше навантажує трицепс завдяки положенню корпусу." },
  { id: 15, name: "Негативні віджимання на трицепс", muscleGroup: "triceps", equipment: "parallel_bars", type: "bodyweight", difficulty: "Початковий рівень", description: "Контрольоване опускання для розвитку сили трицепса." },

  { id: 16, name: "Утримання у верхній точці на брусах", muscleGroup: "shoulders", equipment: "parallel_bars", type: "bodyweight", difficulty: "Початковий рівень", description: "Статична вправа для плечей і стабілізаторів." },
  { id: 17, name: "Віджимання на брусах з короткою амплітудою", muscleGroup: "shoulders", equipment: "parallel_bars", type: "bodyweight", difficulty: "Середній рівень", description: "Варіант з додатковим навантаженням на плечі." },
  { id: 18, name: "Плечове утримання на брусах", muscleGroup: "shoulders", equipment: "parallel_bars", type: "bodyweight", difficulty: "Середній рівень", description: "Статичне навантаження для плечового поясу." },

  { id: 19, name: "Утримання кутика на брусах", muscleGroup: "abs", equipment: "parallel_bars", type: "bodyweight", difficulty: "Складний рівень", description: "Статична вправа для преса та стабілізаторів." },
  { id: 20, name: "Підйом колін на брусах", muscleGroup: "abs", equipment: "parallel_bars", type: "bodyweight", difficulty: "Початковий рівень", description: "Вправа для нижньої частини преса." },
  { id: 21, name: "Підйом прямих ніг на брусах", muscleGroup: "abs", equipment: "parallel_bars", type: "bodyweight", difficulty: "Середній рівень", description: "Складніший варіант для преса." },

  { id: 22, name: "Віджимання від підлоги", muscleGroup: "chest", equipment: "bodyweight", type: "bodyweight", difficulty: "Початковий рівень", description: "Класична вправа з власною вагою для грудей." },
  { id: 23, name: "Широкі віджимання", muscleGroup: "chest", equipment: "bodyweight", type: "bodyweight", difficulty: "Початковий рівень", description: "Варіант з більшим акцентом на грудні м'язи." },
  { id: 24, name: "Віджимання з паузою внизу", muscleGroup: "chest", equipment: "bodyweight", type: "bodyweight", difficulty: "Середній рівень", description: "Покращує контроль і силу грудей." },

  { id: 25, name: "Вузькі віджимання", muscleGroup: "triceps", equipment: "bodyweight", type: "bodyweight", difficulty: "Середній рівень", description: "Варіант віджимань з акцентом на трицепс." },
  { id: 26, name: "Алмазні віджимання", muscleGroup: "triceps", equipment: "bodyweight", type: "bodyweight", difficulty: "Складний рівень", description: "Складна вправа для трицепса." },
  { id: 27, name: "Віджимання від лавки на трицепс", muscleGroup: "triceps", equipment: "bodyweight", type: "bodyweight", difficulty: "Початковий рівень", description: "Проста вправа для трицепса з власною вагою." },

  { id: 28, name: "Присідання з власною вагою", muscleGroup: "legs", equipment: "bodyweight", type: "bodyweight", difficulty: "Початковий рівень", description: "Базова вправа для ніг без додаткового обладнання." },
  { id: 29, name: "Випади вперед", muscleGroup: "legs", equipment: "bodyweight", type: "bodyweight", difficulty: "Початковий рівень", description: "Вправа для квадрицепсів і сідниць." },
  { id: 30, name: "Болгарські присідання без ваги", muscleGroup: "legs", equipment: "bodyweight", type: "bodyweight", difficulty: "Середній рівень", description: "Одностороння вправа для ніг." },

  { id: 31, name: "Скручування на прес", muscleGroup: "abs", equipment: "bodyweight", type: "bodyweight", difficulty: "Початковий рівень", description: "Проста вправа для прямого м'яза живота." },
  { id: 32, name: "Планка", muscleGroup: "abs", equipment: "bodyweight", type: "bodyweight", difficulty: "Початковий рівень", description: "Статична вправа для преса і корпусу." },
  { id: 33, name: "Велосипед на прес", muscleGroup: "abs", equipment: "bodyweight", type: "bodyweight", difficulty: "Середній рівень", description: "Вправа для преса та косих м'язів живота." },

  { id: 34, name: "Жим гантелей лежачи", muscleGroup: "chest", equipment: "dumbbells", type: "weighted", difficulty: "Середній рівень", description: "Вправа для грудей з гантелями." },
  { id: 35, name: "Розведення гантелей лежачи", muscleGroup: "chest", equipment: "dumbbells", type: "weighted", difficulty: "Середній рівень", description: "Ізольована вправа для грудних м'язів." },
  { id: 36, name: "Жим гантелей під кутом", muscleGroup: "chest", equipment: "dumbbells", type: "weighted", difficulty: "Середній рівень", description: "Вправа для верхньої частини грудей." },

  { id: 37, name: "Тяга гантелі в нахилі", muscleGroup: "back", equipment: "dumbbells", type: "weighted", difficulty: "Середній рівень", description: "Вправа для спини з акцентом на найширші м'язи." },
  { id: 38, name: "Тяга двох гантелей у нахилі", muscleGroup: "back", equipment: "dumbbells", type: "weighted", difficulty: "Середній рівень", description: "Вправа для середини спини." },
  { id: 39, name: "Пуловер з гантеллю", muscleGroup: "back", equipment: "dumbbells", type: "weighted", difficulty: "Середній рівень", description: "Вправа для спини та грудної клітки." },

  { id: 40, name: "Жим гантелей сидячи", muscleGroup: "shoulders", equipment: "dumbbells", type: "weighted", difficulty: "Середній рівень", description: "Базова вправа для розвитку плечей." },
  { id: 41, name: "Жим гантелей стоячи", muscleGroup: "shoulders", equipment: "dumbbells", type: "weighted", difficulty: "Середній рівень", description: "Вправа для сили та маси плечей." },
  { id: 42, name: "Махи гантелями в сторони", muscleGroup: "shoulders", equipment: "dumbbells", type: "weighted", difficulty: "Початковий рівень", description: "Ізольована вправа для середньої дельти." },

  { id: 43, name: "Підйом гантелей на біцепс", muscleGroup: "biceps", equipment: "dumbbells", type: "weighted", difficulty: "Початковий рівень", description: "Ізольована вправа для біцепса." },
  { id: 44, name: "Молоткові згинання", muscleGroup: "biceps", equipment: "dumbbells", type: "weighted", difficulty: "Початковий рівень", description: "Вправа для біцепса і плечопроменевого м'яза." },
  { id: 45, name: "Концентрований підйом гантелі", muscleGroup: "biceps", equipment: "dumbbells", type: "weighted", difficulty: "Середній рівень", description: "Ізольована вправа для біцепса." },

  { id: 46, name: "Французький жим гантелі", muscleGroup: "triceps", equipment: "dumbbells", type: "weighted", difficulty: "Середній рівень", description: "Ізольована вправа для трицепса." },
  { id: 47, name: "Розгинання руки з гантеллю назад", muscleGroup: "triceps", equipment: "dumbbells", type: "weighted", difficulty: "Початковий рівень", description: "Вправа для трицепса в нахилі." },
  { id: 48, name: "Розгинання гантелі над головою", muscleGroup: "triceps", equipment: "dumbbells", type: "weighted", difficulty: "Середній рівень", description: "Вправа для довгої головки трицепса." },

  { id: 49, name: "Присідання з гантелями", muscleGroup: "legs", equipment: "dumbbells", type: "weighted", difficulty: "Початковий рівень", description: "Вправа для ніг з додатковим навантаженням." },
  { id: 50, name: "Випади з гантелями", muscleGroup: "legs", equipment: "dumbbells", type: "weighted", difficulty: "Середній рівень", description: "Вправа для ніг і сідниць." },
  { id: 51, name: "Румунська тяга з гантелями", muscleGroup: "legs", equipment: "dumbbells", type: "weighted", difficulty: "Середній рівень", description: "Вправа для задньої поверхні стегна." },

  { id: 52, name: "Жим штанги лежачи", muscleGroup: "chest", equipment: "barbell", type: "weighted", difficulty: "Середній рівень", description: "Базова вправа для розвитку грудних м'язів." },
  { id: 53, name: "Жим штанги під кутом", muscleGroup: "chest", equipment: "barbell", type: "weighted", difficulty: "Середній рівень", description: "Вправа для верхньої частини грудей." },
  { id: 54, name: "Жим штанги вузьким хватом", muscleGroup: "chest", equipment: "barbell", type: "weighted", difficulty: "Середній рівень", description: "Вправа для грудей і трицепса." },

  { id: 55, name: "Станова тяга", muscleGroup: "back", equipment: "barbell", type: "weighted", difficulty: "Складний рівень", description: "Базова силова вправа для спини, ніг і корпусу." },
  { id: 56, name: "Тяга штанги в нахилі", muscleGroup: "back", equipment: "barbell", type: "weighted", difficulty: "Середній рівень", description: "Базова вправа для товщини спини." },
  { id: 57, name: "Шраги зі штангою", muscleGroup: "back", equipment: "barbell", type: "weighted", difficulty: "Початковий рівень", description: "Вправа для трапецієподібних м'язів." },

  { id: 58, name: "Жим штанги стоячи", muscleGroup: "shoulders", equipment: "barbell", type: "weighted", difficulty: "Середній рівень", description: "Базова вправа для плечей." },
  { id: 59, name: "Жим штанги сидячи", muscleGroup: "shoulders", equipment: "barbell", type: "weighted", difficulty: "Середній рівень", description: "Варіант жиму для плечей." },
  { id: 60, name: "Тяга штанги до підборіддя", muscleGroup: "shoulders", equipment: "barbell", type: "weighted", difficulty: "Середній рівень", description: "Вправа для середньої дельти та трапецій." },

  { id: 61, name: "Підйом штанги на біцепс", muscleGroup: "biceps", equipment: "barbell", type: "weighted", difficulty: "Середній рівень", description: "Базова вправа для біцепса." },
  { id: 62, name: "Підйом EZ-штанги", muscleGroup: "biceps", equipment: "barbell", type: "weighted", difficulty: "Середній рівень", description: "Зручний варіант підйому на біцепс." },
  { id: 63, name: "Зворотний підйом штанги", muscleGroup: "biceps", equipment: "barbell", type: "weighted", difficulty: "Середній рівень", description: "Вправа для біцепса і передпліч." },

  { id: 64, name: "Французький жим штанги лежачи", muscleGroup: "triceps", equipment: "barbell", type: "weighted", difficulty: "Середній рівень", description: "Базова вправа для трицепса зі штангою." },
  { id: 65, name: "Жим штанги вузьким хватом на трицепс", muscleGroup: "triceps", equipment: "barbell", type: "weighted", difficulty: "Середній рівень", description: "Силова вправа для трицепса." },
  { id: 66, name: "Французький жим сидячи", muscleGroup: "triceps", equipment: "barbell", type: "weighted", difficulty: "Середній рівень", description: "Вправа для довгої головки трицепса." },

  { id: 67, name: "Присідання зі штангою", muscleGroup: "legs", equipment: "barbell", type: "weighted", difficulty: "Складний рівень", description: "Одна з основних вправ для розвитку ніг." },
  { id: 68, name: "Румунська тяга зі штангою", muscleGroup: "legs", equipment: "barbell", type: "weighted", difficulty: "Середній рівень", description: "Вправа для задньої поверхні стегна." },
  { id: 69, name: "Випади зі штангою", muscleGroup: "legs", equipment: "barbell", type: "weighted", difficulty: "Середній рівень", description: "Вправа для ніг, балансу та сідниць." },

  { id: 70, name: "Жим ногами", muscleGroup: "legs", equipment: "leg_press", type: "weighted", difficulty: "Середній рівень", description: "Тренажерна вправа для квадрицепсів і сідниць." },
  { id: 71, name: "Жим ногами вузькою постановкою", muscleGroup: "legs", equipment: "leg_press", type: "weighted", difficulty: "Середній рівень", description: "Варіант з більшим акцентом на квадрицепси." },
  { id: 72, name: "Жим ногами широкою постановкою", muscleGroup: "legs", equipment: "leg_press", type: "weighted", difficulty: "Середній рівень", description: "Варіант з акцентом на сідниці та внутрішню частину стегна." },

  { id: 73, name: "Тяга верхнього блока", muscleGroup: "back", equipment: "cable_machine", type: "weighted", difficulty: "Початковий рівень", description: "Вправа для спини у блоковому тренажері." },
  { id: 74, name: "Горизонтальна тяга блока", muscleGroup: "back", equipment: "cable_machine", type: "weighted", difficulty: "Середній рівень", description: "Вправа для середини спини." },
  { id: 75, name: "Тяга блока прямими руками", muscleGroup: "back", equipment: "cable_machine", type: "weighted", difficulty: "Середній рівень", description: "Ізольована вправа для найширших м'язів." },

  { id: 76, name: "Зведення рук у кросовері", muscleGroup: "chest", equipment: "cable_machine", type: "weighted", difficulty: "Середній рівень", description: "Ізольована вправа для грудних м'язів." },
  { id: 77, name: "Жим у кросовері вперед", muscleGroup: "chest", equipment: "cable_machine", type: "weighted", difficulty: "Середній рівень", description: "Вправа для грудей у блоковому тренажері." },
  { id: 78, name: "Нижнє зведення рук у кросовері", muscleGroup: "chest", equipment: "cable_machine", type: "weighted", difficulty: "Середній рівень", description: "Варіант для верхньої частини грудей." },

  { id: 79, name: "Махи в кросовері в сторони", muscleGroup: "shoulders", equipment: "cable_machine", type: "weighted", difficulty: "Середній рівень", description: "Ізольована вправа для середньої дельти." },
  { id: 80, name: "Тяга канату до обличчя", muscleGroup: "shoulders", equipment: "cable_machine", type: "weighted", difficulty: "Середній рівень", description: "Вправа для задньої дельти та стабілізаторів плеча." },
  { id: 81, name: "Підйом руки вперед у блоці", muscleGroup: "shoulders", equipment: "cable_machine", type: "weighted", difficulty: "Початковий рівень", description: "Вправа для передньої дельти." },

  { id: 82, name: "Згинання рук на нижньому блоці", muscleGroup: "biceps", equipment: "cable_machine", type: "weighted", difficulty: "Початковий рівень", description: "Ізольована вправа для біцепса." },
  { id: 83, name: "Згинання рук з канатом", muscleGroup: "biceps", equipment: "cable_machine", type: "weighted", difficulty: "Початковий рівень", description: "Варіант для біцепса і передпліч." },
  { id: 84, name: "Одноручне згинання в кросовері", muscleGroup: "biceps", equipment: "cable_machine", type: "weighted", difficulty: "Середній рівень", description: "Ізольована вправа для біцепса." },

  { id: 85, name: "Розгинання рук на блоці", muscleGroup: "triceps", equipment: "cable_machine", type: "weighted", difficulty: "Початковий рівень", description: "Ізольована вправа для трицепса." },
  { id: 86, name: "Розгинання рук з канатом", muscleGroup: "triceps", equipment: "cable_machine", type: "weighted", difficulty: "Початковий рівень", description: "Варіант для кращого скорочення трицепса." },
  { id: 87, name: "Французьке розгинання на блоці", muscleGroup: "triceps", equipment: "cable_machine", type: "weighted", difficulty: "Середній рівень", description: "Вправа для довгої головки трицепса." },

  { id: 88, name: "Скручування на верхньому блоці", muscleGroup: "abs", equipment: "cable_machine", type: "weighted", difficulty: "Середній рівень", description: "Вправа для преса з додатковим опором." },
  { id: 89, name: "Косі скручування на блоці", muscleGroup: "abs", equipment: "cable_machine", type: "weighted", difficulty: "Середній рівень", description: "Вправа для косих м'язів живота." },
  { id: 90, name: "Підйом корпусу з канатом", muscleGroup: "abs", equipment: "cable_machine", type: "weighted", difficulty: "Середній рівень", description: "Варіант скручувань для преса у блоці." },
];

  const availableEquipment = location ? equipmentByLocation[location] : [];

  const availableMuscleGroupIds = [
    ...new Set(
      availableEquipment
        .filter((equipment) => selectedEquipment.includes(equipment.id))
        .flatMap((equipment) => equipment.muscleGroups)
    ),
  ];

  const availableMuscleGroups = muscleGroups.filter((group) =>
    availableMuscleGroupIds.includes(group.id)
  );

  const availableExercises = exercises.filter(
    (exercise) =>
      selectedMuscleGroup === exercise.muscleGroup &&
      selectedEquipment.includes(exercise.equipment)
  );

  const currentMuscleGroup = muscleGroups.find(
    (group) => group.id === selectedMuscleGroup
  );

  function resetExerciseData() {
    setActiveExerciseId(null);
    setMaxReps("");
    setWorkingWeight("");
    setGeneratedPlan(null);
  }

  function handleLocationSelect(locationId) {
    setLocation(locationId);
    setSelectedEquipment([]);
    setSelectedMuscleGroup("");
    resetExerciseData();
  }

  function toggleEquipment(equipmentId) {
    if (selectedEquipment.includes(equipmentId)) {
      setSelectedEquipment(selectedEquipment.filter((item) => item !== equipmentId));
    } else {
      setSelectedEquipment([...selectedEquipment, equipmentId]);
    }

    setSelectedMuscleGroup("");
    resetExerciseData();
  }

  function handleMuscleGroupSelect(groupId) {
    setSelectedMuscleGroup(groupId);
    resetExerciseData();
  }

  function handleOpenMaxTest(exerciseId) {
    setActiveExerciseId(exerciseId);
    setMaxReps("");
    setWorkingWeight("");
    setGeneratedPlan(null);
  }

  function roundWeight(weight) {
    return Math.round(weight / 2.5) * 2.5;
  }

  function calculateOneRepMax(weight, reps) {
    return weight * (1 + reps / 30);
  }

  function getWeightedPlan(oneRepMax) {
    if (trainingGoal === "mass" || trainingGoal === "strength") {
      const firstWeight = roundWeight(oneRepMax * 0.78);
      const secondWeight = roundWeight(oneRepMax * 0.74);

      return [
        { weight: firstWeight, reps: 8 },
        { weight: firstWeight, reps: 8 },
        { weight: secondWeight, reps: 6 },
        { weight: secondWeight, reps: 6 },
      ];
    }

    const firstWeight = roundWeight(oneRepMax * 0.68);
    const secondWeight = roundWeight(oneRepMax * 0.63);

    return [
      { weight: firstWeight, reps: 12 },
      { weight: firstWeight, reps: 10 },
      { weight: secondWeight, reps: 10 },
      { weight: secondWeight, reps: 8 },
    ];
  }

  function getBodyweightPlan(max) {
    if (trainingGoal === "mass" || trainingGoal === "strength") {
      return [
        Math.max(1, Math.round(max * 0.7)),
        Math.max(1, Math.round(max * 0.7)),
        Math.max(1, Math.round(max * 0.6)),
        Math.max(1, Math.round(max * 0.6)),
      ];
    }

    return [
      Math.max(1, Math.round(max * 0.65)),
      Math.max(1, Math.round(max * 0.65)),
      Math.max(1, Math.round(max * 0.55)),
      Math.max(1, Math.round(max * 0.55)),
    ];
  }

  function generateWorkoutPlan(exercise) {
    const reps = Number(maxReps);
    const weight = Number(workingWeight);

    if (!reps || reps <= 0) return;

    if (exercise.type === "weighted") {
      if (!weight || weight <= 0) return;

      const oneRepMax = calculateOneRepMax(weight, reps);
      const plan = getWeightedPlan(oneRepMax);

      setGeneratedPlan({
        type: "weighted",
        oneRepMax: Math.round(oneRepMax),
        plan,
      });

      return;
    }

    setGeneratedPlan({
      type: "bodyweight",
      plan: getBodyweightPlan(reps),
    });
  }

  return (
    <Layout>
      <section className="workouts">
        <div className="workouts-header">
          <h1>Тренування</h1>
          <p>Налаштуй умови тренування та отримай персональний план</p>
        </div>

        <div className="warmup-warning">
          <h3>⚠️ Розминка перед тренуванням</h3>
          <p>
            Перед основними вправами виконайте розминку 5–10 хвилин:
            суглобова гімнастика, легке кардіо або 1–2 розминочні підходи.
          </p>
        </div>

        <div className="workout-block">
          <h2>🎯 Ціль тренування</h2>

          <div className="goal-grid">
            {trainingGoals.map((goal) => (
              <button
                type="button"
                key={goal.id}
                className={`goal-card ${trainingGoal === goal.id ? "active-goal" : ""}`}
                onClick={() => {
                  setTrainingGoal(goal.id);
                  resetExerciseData();
                }}
              >
                <h3>{goal.title}</h3>
                <p>{goal.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="workout-block">
          <h2>Де ви тренуєтесь?</h2>

          <div className="location-grid">
            {locations.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`location-card ${location === item.id ? "active-location" : ""}`}
                onClick={() => handleLocationSelect(item.id)}
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </button>
            ))}
          </div>
        </div>

        {location && (
          <div className="workout-block">
            <h2>Яке обладнання доступне?</h2>

            <div className="equipment-grid">
              {availableEquipment.map((equipment) => (
                <button
                  type="button"
                  key={equipment.id}
                  className={`equipment-card ${
                    selectedEquipment.includes(equipment.id) ? "active-equipment" : ""
                  }`}
                  onClick={() => toggleEquipment(equipment.id)}
                >
                  <span className="checkbox">
                    {selectedEquipment.includes(equipment.id) ? "✓" : ""}
                  </span>
                  <span>{equipment.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {location && selectedEquipment.length > 0 && (
          <div className="workout-block">
            <h2>Яку групу м'язів тренуємо?</h2>

            <div className="muscle-grid">
              {availableMuscleGroups.map((group) => (
                <button
                  type="button"
                  key={group.id}
                  className={`muscle-card ${
                    selectedMuscleGroup === group.id ? "active-muscle" : ""
                  }`}
                  onClick={() => handleMuscleGroupSelect(group.id)}
                >
                  <span>{group.icon}</span>
                  <h3>{group.name}</h3>
                  <p>{group.recommendation}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedMuscleGroup && currentMuscleGroup && (
          <div className="muscle-recommendation">
            <h3>
              {currentMuscleGroup.icon} {currentMuscleGroup.name}
            </h3>
            <p>{currentMuscleGroup.recommendation}</p>
          </div>
        )}

        {selectedMuscleGroup && (
          <div className="workout-block">
            <h2>Доступні вправи</h2>

            {availableExercises.length > 0 ? (
              <div className="exercise-grid">
                {availableExercises.map((exercise) => (
                  <div className="exercise-card" key={exercise.id}>
                    <div className="exercise-image">🏋️</div>

                    <div className="exercise-content">
                      <h3>{exercise.name}</h3>
                      <span>{exercise.difficulty}</span>
                      <p>{exercise.description}</p>

                      <button type="button" onClick={() => handleOpenMaxTest(exercise.id)}>
                        Перевірити максимум
                      </button>

                      {activeExerciseId === exercise.id && (
                        <div className="max-test">
                          <h4>Вкажіть ваш максимум</h4>

                          {exercise.type === "weighted" && (
                            <input
                              type="number"
                              min="1"
                              placeholder="Вага, кг"
                              value={workingWeight}
                              onChange={(event) => setWorkingWeight(event.target.value)}
                            />
                          )}

                          <input
                            type="number"
                            min="1"
                            placeholder="Максимум повторень"
                            value={maxReps}
                            onChange={(event) => setMaxReps(event.target.value)}
                          />

                          <button type="button" onClick={() => generateWorkoutPlan(exercise)}>
                            Згенерувати підходи
                          </button>

                          {generatedPlan && (
                            <div className="generated-plan">
                              <h4>Ваш тренувальний план</h4>

                              {generatedPlan.type === "weighted" && (
                                <p className="one-rep-max">
                                  Орієнтовний максимум на 1 повторення: {generatedPlan.oneRepMax} кг
                                </p>
                              )}

                              {generatedPlan.type === "weighted"
                                ? generatedPlan.plan.map((set, index) => (
                                    <p key={index}>
                                      {index + 1} підхід — {set.weight} кг × {set.reps} повторень
                                    </p>
                                  ))
                                : generatedPlan.plan.map((reps, index) => (
                                    <p key={index}>
                                      {index + 1} підхід — {reps} повторень
                                    </p>
                                  ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-exercises">Для вибраних параметрів вправ поки немає</p>
            )}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Workouts;