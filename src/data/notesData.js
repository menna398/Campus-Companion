export const notes = [
  {
    id: 1,
    courseCode: "CS301",
    courseName: "Algorithms",
    notebookColor: "#6F91B5",
    notebookCount: 12,
    lastEdited: "Oct 14, 2026",
    title: "Lecture 12: Binary Trees & Traversal Algorithms",
    date: "Oct 14",
    description:
      "A Binary Tree is a hierarchical data structure in which each node has at most two children, referred to as the left child and the right child.",
    sections: [
      {
        title: "Standard Traversal Methods:",
        points: [
          "Pre-order (Root, Left, Right) - useful for copy operations",
          "In-order (Left, Root, Right) - outputs values in sorted ascending order for BSTs",
          "Post-order (Left, Right, Root) - useful for deletion algorithms",
        ],
      },
    ],
    code: `void printInorder(Node node) {
    if (node == null) return;
    printInorder(node.left);
    System.out.print(node.key + " ");
    printInorder(node.right);
}`,
  },

  {
    id: 2,
    courseCode: "CS301",
    courseName: "Algorithms",
    notebookColor: "#6F91B5",
    notebookCount: 12,
    lastEdited: "Oct 12, 2026",
    title: "Lecture 11: Priority Queues",
    date: "Oct 12",
    description:
      "Priority queues are abstract data structures where each element is associated with a priority.",
    sections: [
      {
        title: "Key Concepts:",
        points: [
          "Binary Heaps",
          "Insertion and extraction operations",
          "Priority-based ordering",
          "Complexity analysis",
        ],
      },
    ],
    code: `insert(element)
extractMax()
peek()`,
  },

  {
    id: 3,
    courseCode: "MATH210",
    courseName: "Linear Algebra",
    notebookColor: "#88A786",
    notebookCount: 8,
    lastEdited: "Oct 09, 2026",
    title: "Vector Orthogonality",
    date: "Oct 09",
    description:
      "Two vectors are orthogonal when their dot product is equal to zero.",
    sections: [
      {
        title: "Important Concepts:",
        points: [
          "Dot product definition",
          "Orthogonal vectors",
          "Projection onto subspaces",
          "Gram-Schmidt process",
        ],
      },
    ],
    code: `u · v = 0`,
  },

  {
    id: 4,
    courseCode: "LIT150",
    courseName: "Rhetoric",
    notebookColor: "#B49BCB",
    notebookCount: 5,
    lastEdited: "Oct 08, 2026",
    title: "Platonic Dialogue Rhetoric",
    date: "Oct 08",
    description:
      "Gorgias examines the relationship between rhetoric, persuasion, and philosophical inquiry.",
    sections: [
      {
        title: "Main Ideas:",
        points: [
          "Gorgias argument structure",
          "Rhetoric and persuasion",
          "Plato's critique of sophistry",
        ],
      },
    ],
    code: `Rhetoric → Persuasion → Philosophical Inquiry`,
  },
];

export const notebooks = [
  {
    id: 1,
    code: "CS301",
    name: "Algorithms",
    color: "#6F91B5",
    count: 12,
  },
  {
    id: 2,
    code: "MATH210",
    name: "Linear Algebra",
    color: "#88A786",
    count: 8,
  },
  {
    id: 3,
    code: "LIT150",
    name: "Rhetoric",
    color: "#B49BCB",
    count: 5,
  },
];
