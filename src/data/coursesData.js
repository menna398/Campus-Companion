export const courses = [
  {
    id: 1,

    code: "CS301",

    title: "Data Structures & Algorithms",

    professor: "Prof. Evelyn Vance",

    location: "Turing Hall 402",

    schedule: "Mon/Wed 10:00 AM – 11:30 AM",

    progress: 75,

    nextClass: "Monday 10:00 AM (Turing 402)",

    color: "#7094b8",

    professorImage: "https://i.pravatar.cc/150?img=47",

    description:
      "This course covers the design, analysis, and implementation of fundamental data structures and algorithms. Topics include sorting, searching, trees (balanced and AVL trees), heaps, graphs, hashing, and analysis of algorithms using asymptotic notations. Emphasizes classical mathematical proofs and rigorous runtime guarantees.",

    objectives: [
      {
        text: "Understand Big-O, Big-Theta, and Big-Omega asymptotic notations",
        completed: true,
      },
      {
        text: "Implement search, sorting and binary tree balancing mechanics",
        completed: true,
      },
      {
        text: "Utilize graphs and shortest path algorithms in classical networks",
        completed: false,
      },
    ],

    gradeBreakdown: [
      {
        name: "Programming Projects",
        percentage: 40,
        color: "#91aa91",
      },
      {
        name: "Midterm Exams",
        percentage: 30,
        color: "#7094b8",
      },
      {
        name: "Final Project Exam",
        percentage: 30,
        color: "#edc39f",
      },
    ],

    milestone: {
      date: "OCT 25",
      title: "Project 2: Graph Implementations",
      description: "Requires custom DFS/BFS algorithms",
    },

    assignments: [
      {
        id: 1,
        title: "Project 1: Sorting Algorithms",
        dueDate: "Oct 12, 2026",
        description: "Implement and compare different sorting algorithms.",
      },
      {
        id: 2,
        title: "Project 2: Graph Implementations",
        dueDate: "Oct 25, 2026",
        description: "Implement DFS and BFS graph algorithms.",
      },
      {
        id: 3,
        title: "Binary Search Trees",
        dueDate: "Nov 02, 2026",
        description: "Implement balanced binary search trees.",
      },
    ],

    grades: [
      {
        id: 1,
        name: "Quiz 1",
        score: 18,
        total: 20,
        weight: 10,
      },
      {
        id: 2,
        name: "Midterm Exam",
        score: 42,
        total: 50,
        weight: 30,
      },
      {
        id: 3,
        name: "Practical Exam",
        score: 27,
        total: 30,
        weight: 20,
      },
      {
        id: 4,
        name: "Final Exam",
        score: 0,
        total: 100,
        weight: 40,
      },
    ],

    resources: [
      {
        id: 1,
        title: "Course Syllabus",
        type: "PDF",
        size: "2.4 MB",
      },
      {
        id: 2,
        title: "Week 01 - Introduction",
        type: "Lecture Notes",
        size: "1.8 MB",
      },
      {
        id: 3,
        title: "Algorithms Reference",
        type: "PDF",
        size: "4.2 MB",
      },
      {
        id: 4,
        title: "Graph Algorithms Resources",
        type: "External Resource",
        size: "Link",
      },
    ],
  },

  {
    id: 2,

    code: "MATH210",

    title: "Linear Algebra & Statistics",

    professor: "Dr. Liam Mercer",

    location: "Science Block B",

    schedule: "Tue/Thu 11:30 AM – 01:00 PM",

    progress: 60,

    nextClass: "Tomorrow 11:30 AM (Auditorium B)",

    color: "#91aa91",

    professorImage: "https://i.pravatar.cc/150?img=12",

    description:
      "This course introduces the fundamental concepts of linear algebra and statistics, including vectors, matrices, probability, distributions, and statistical analysis.",

    objectives: [
      {
        text: "Understand vectors and matrix operations",
        completed: true,
      },
      {
        text: "Apply statistical analysis techniques",
        completed: true,
      },
      {
        text: "Analyze real-world statistical datasets",
        completed: false,
      },
    ],

    gradeBreakdown: [
      {
        name: "Assignments",
        percentage: 30,
        color: "#91aa91",
      },
      {
        name: "Midterm Exam",
        percentage: 30,
        color: "#7094b8",
      },
      {
        name: "Final Exam",
        percentage: 40,
        color: "#edc39f",
      },
    ],

    milestone: {
      date: "NOV 10",
      title: "Statistics Project",
      description: "Submit the final statistical analysis",
    },

    assignments: [
      {
        id: 1,
        title: "Matrix Operations",
        dueDate: "Oct 15, 2026",
        description: "Solve matrix and vector operation exercises.",
      },
      {
        id: 2,
        title: "Statistics Analysis",
        dueDate: "Oct 28, 2026",
        description: "Analyze a real-world statistical dataset.",
      },
    ],

    grades: [
      {
        id: 1,
        name: "Quiz 1",
        score: 19,
        total: 20,
        weight: 10,
      },
      {
        id: 2,
        name: "Midterm Exam",
        score: 44,
        total: 50,
        weight: 30,
      },
      {
        id: 3,
        name: "Practical",
        score: 28,
        total: 30,
        weight: 20,
      },
      {
        id: 4,
        name: "Final Exam",
        score: 0,
        total: 100,
        weight: 40,
      },
    ],

    resources: [
      {
        id: 1,
        title: "Course Syllabus",
        type: "PDF",
        size: "2.1 MB",
      },
      {
        id: 2,
        title: "Linear Algebra Notes",
        type: "Lecture Notes",
        size: "3.2 MB",
      },
      {
        id: 3,
        title: "Statistics Reference",
        type: "PDF",
        size: "2.8 MB",
      },
    ],
  },

  {
    id: 3,

    code: "LIT150",

    title: "Classical Literature & Rhetoric",

    professor: "Prof. Charles Hawthorne",

    location: "Library West",

    schedule: "Mon/Wed 02:00 PM – 03:30 PM",

    progress: 45,

    nextClass: "Wednesday 02:00 PM (West Wing)",

    color: "#c4afd5",

    professorImage: "https://i.pravatar.cc/150?img=33",

    description:
      "This course explores classical literature, rhetoric, and the development of influential literary traditions.",

    objectives: [
      {
        text: "Analyze classical literary texts",
        completed: true,
      },
      {
        text: "Understand rhetorical techniques",
        completed: true,
      },
      {
        text: "Develop critical literary analysis",
        completed: false,
      },
    ],

    gradeBreakdown: [
      {
        name: "Essays",
        percentage: 30,
        color: "#91aa91",
      },
      {
        name: "Midterm",
        percentage: 30,
        color: "#7094b8",
      },
      {
        name: "Final Exam",
        percentage: 40,
        color: "#edc39f",
      },
    ],

    milestone: {
      date: "NOV 18",
      title: "Literary Analysis",
      description: "Submit the classical literature analysis.",
    },

    assignments: [
      {
        id: 1,
        title: "Literary Analysis Essay",
        dueDate: "Oct 20, 2026",
        description: "Write an analysis of a selected classical text.",
      },
      {
        id: 2,
        title: "Rhetoric Presentation",
        dueDate: "Nov 05, 2026",
        description: "Prepare a presentation about classical rhetoric.",
      },
    ],

    grades: [
      {
        id: 1,
        name: "Quiz 1",
        score: 17,
        total: 20,
        weight: 10,
      },
      {
        id: 2,
        name: "Midterm",
        score: 40,
        total: 50,
        weight: 30,
      },
      {
        id: 3,
        name: "Practical",
        score: 25,
        total: 30,
        weight: 20,
      },
      {
        id: 4,
        name: "Final Exam",
        score: 0,
        total: 100,
        weight: 40,
      },
    ],

    resources: [
      {
        id: 1,
        title: "Course Syllabus",
        type: "PDF",
        size: "1.9 MB",
      },
      {
        id: 2,
        title: "Classical Literature Notes",
        type: "Lecture Notes",
        size: "2.5 MB",
      },
    ],
  },

  {
    id: 4,

    code: "PHYS250",

    title: "Introduction to Quantum Physics",

    professor: "Dr. Arthur Pendelton",

    location: "Hall 202",

    schedule: "Tue/Thu 09:00 AM – 10:30 AM",

    progress: 30,

    nextClass: "Thursday 09:00 AM (Hall 202)",

    color: "#edc39f",

    professorImage: "https://i.pravatar.cc/150?img=11",

    description:
      "An introduction to the principles of quantum physics, wave mechanics, particles, and quantum systems.",

    objectives: [
      {
        text: "Understand fundamental quantum concepts",
        completed: true,
      },
      {
        text: "Analyze basic quantum systems",
        completed: false,
      },
      {
        text: "Apply quantum mechanics equations",
        completed: false,
      },
    ],

    gradeBreakdown: [
      {
        name: "Labs",
        percentage: 30,
        color: "#91aa91",
      },
      {
        name: "Midterm",
        percentage: 30,
        color: "#7094b8",
      },
      {
        name: "Final Exam",
        percentage: 40,
        color: "#edc39f",
      },
    ],

    milestone: {
      date: "DEC 01",
      title: "Quantum Lab Project",
      description: "Complete the quantum mechanics laboratory.",
    },

    assignments: [
      {
        id: 1,
        title: "Quantum Mechanics Worksheet",
        dueDate: "Oct 18, 2026",
        description: "Solve introductory quantum mechanics problems.",
      },
      {
        id: 2,
        title: "Quantum Lab",
        dueDate: "Nov 12, 2026",
        description: "Complete the assigned laboratory experiment.",
      },
    ],

    grades: [
      {
        id: 1,
        name: "Quiz 1",
        score: 16,
        total: 20,
        weight: 10,
      },
      {
        id: 2,
        name: "Midterm",
        score: 38,
        total: 50,
        weight: 30,
      },
      {
        id: 3,
        name: "Practical",
        score: 24,
        total: 30,
        weight: 20,
      },
      {
        id: 4,
        name: "Final Exam",
        score: 0,
        total: 100,
        weight: 40,
      },
    ],

    resources: [
      {
        id: 1,
        title: "Quantum Physics Syllabus",
        type: "PDF",
        size: "2.2 MB",
      },
      {
        id: 2,
        title: "Week 01 - Quantum Basics",
        type: "Lecture Notes",
        size: "2.7 MB",
      },
    ],
  },

  {
    id: 5,

    code: "CS304",

    title: "Human-Computer Interaction",

    professor: "Prof. Marcus Aurelius",

    location: "Lab 1A",

    schedule: "Friday 01:00 PM – 04:00 PM",

    progress: 80,

    nextClass: "Friday 01:00 PM (Lab 1A)",

    color: "#7094b8",

    professorImage: "https://i.pravatar.cc/150?img=52",

    description:
      "This course focuses on user-centered design, usability, interaction design, prototyping, and evaluation of digital interfaces.",

    objectives: [
      {
        text: "Understand user-centered design principles",
        completed: true,
      },
      {
        text: "Create interactive prototypes",
        completed: true,
      },
      {
        text: "Evaluate interface usability",
        completed: false,
      },
    ],

    gradeBreakdown: [
      {
        name: "Projects",
        percentage: 40,
        color: "#91aa91",
      },
      {
        name: "Midterm",
        percentage: 30,
        color: "#7094b8",
      },
      {
        name: "Final Project",
        percentage: 30,
        color: "#edc39f",
      },
    ],

    milestone: {
      date: "OCT 30",
      title: "Prototype Evaluation",
      description: "Evaluate and present the final interface prototype.",
    },

    assignments: [
      {
        id: 1,
        title: "User Research",
        dueDate: "Oct 10, 2026",
        description: "Conduct research and identify user requirements.",
      },
      {
        id: 2,
        title: "Interactive Prototype",
        dueDate: "Oct 30, 2026",
        description: "Create an interactive prototype for the project.",
      },
    ],

    grades: [
      {
        id: 1,
        name: "Quiz 1",
        score: 19,
        total: 20,
        weight: 10,
      },
      {
        id: 2,
        name: "Midterm",
        score: 46,
        total: 50,
        weight: 30,
      },
      {
        id: 3,
        name: "Practical",
        score: 29,
        total: 30,
        weight: 20,
      },
      {
        id: 4,
        name: "Final Project",
        score: 0,
        total: 100,
        weight: 40,
      },
    ],

    resources: [
      {
        id: 1,
        title: "HCI Syllabus",
        type: "PDF",
        size: "2.0 MB",
      },
      {
        id: 2,
        title: "UX Research Guide",
        type: "Lecture Notes",
        size: "3.4 MB",
      },
    ],
  },

  {
    id: 6,

    code: "ECON101",

    title: "Macroeconomics & Markets",

    professor: "Dr. Sarah Paulson",

    location: "Hall 105",

    schedule: "Friday 09:00 AM – 11:30 AM",

    progress: 50,

    nextClass: "Friday 09:00 AM (Hall 105)",

    color: "#91aa91",

    professorImage: "https://i.pravatar.cc/150?img=44",

    description:
      "An introduction to macroeconomic theory, financial markets, economic indicators, inflation, unemployment, and economic growth.",

    objectives: [
      {
        text: "Understand fundamental macroeconomic concepts",
        completed: true,
      },
      {
        text: "Analyze financial market behavior",
        completed: true,
      },
      {
        text: "Evaluate economic indicators",
        completed: false,
      },
    ],

    gradeBreakdown: [
      {
        name: "Assignments",
        percentage: 30,
        color: "#91aa91",
      },
      {
        name: "Midterm",
        percentage: 30,
        color: "#7094b8",
      },
      {
        name: "Final Exam",
        percentage: 40,
        color: "#edc39f",
      },
    ],

    milestone: {
      date: "NOV 22",
      title: "Market Analysis",
      description: "Submit the macroeconomic market analysis.",
    },

    assignments: [
      {
        id: 1,
        title: "Economic Indicators",
        dueDate: "Oct 14, 2026",
        description: "Analyze current economic indicators.",
      },
      {
        id: 2,
        title: "Market Analysis",
        dueDate: "Nov 22, 2026",
        description: "Prepare a detailed market analysis report.",
      },
    ],

    grades: [
      {
        id: 1,
        name: "Quiz 1",
        score: 18,
        total: 20,
        weight: 10,
      },
      {
        id: 2,
        name: "Midterm",
        score: 41,
        total: 50,
        weight: 30,
      },
      {
        id: 3,
        name: "Practical",
        score: 26,
        total: 30,
        weight: 20,
      },
      {
        id: 4,
        name: "Final Exam",
        score: 0,
        total: 100,
        weight: 40,
      },
    ],

    resources: [
      {
        id: 1,
        title: "Macroeconomics Syllabus",
        type: "PDF",
        size: "1.8 MB",
      },
      {
        id: 2,
        title: "Market Fundamentals",
        type: "Lecture Notes",
        size: "2.9 MB",
      },
    ],
  },
];
