export interface SubjectPlan {
  unit: string;
  studyItems: string[];
  practice: string;
  tip?: string;
}

export interface DayPlan {
  dayNum: number;
  dateStr: string;
  goal: string;
  dataStructures: SubjectPlan;
  maths: SubjectPlan;
  phaseNum: number;
  phaseName: string;
}

export const STUDY_PLAN: DayPlan[] = [
  {
    dayNum: 1,
    dateStr: "Saturday, 4 July",
    goal: "Understand what Data Structures are and get comfortable with the first matrix topics in Maths.",
    phaseNum: 1,
    phaseName: "Foundations",
    dataStructures: {
      unit: "Unit I: Basic Concepts",
      studyItems: [
        "Definitions of Data, Data Structures, and Abstract Data Type (ADT). Understand that an ADT defines *what* operations are possible, not *how* they're implemented.",
        "Algorithm specification — how to write an algorithm in pseudocode (steps, inputs, outputs, termination).",
        "Data Abstraction — separating interface from implementation.",
        "Performance analysis — Time and Space complexity, Big-O, Big-Omega, Big-Theta notation with simple examples (e.g. complexity of a for-loop vs nested loop).",
        "Linear vs Non-linear data structures — arrays/linked lists (linear) vs trees/graphs (non-linear), with real examples.",
        "Recursive algorithms — write out factorial and Fibonacci recursively, trace through the call stack by hand."
      ],
      practice: "Write the algorithm (pseudocode) for factorial, Fibonacci, and one simple searching idea, then compute their time complexity.",
      tip: "This unit is mostly definitions — expect 2-3 mark short questions from here. Make a one-page cheat sheet of all definitions today; you'll revise it in Phase 4."
    },
    maths: {
      unit: "Unit 1: Linear Algebra Basics",
      studyItems: [
        "System of linear equations and how they're written as the matrix equation Ax = b.",
        "Row reduction (Gaussian elimination) to solve systems — practice converting a matrix to row echelon form.",
        "Column reduction and echelon forms — understand the difference from row reduction."
      ],
      practice: "Solve 3-4 systems of 3 linear equations using row reduction by hand, checking your answer by substitution.",
      tip: "Row reduction is a skill, not a fact — you must solve numericals daily, not just read the method."
    }
  },
  {
    dayNum: 2,
    dateStr: "Sunday, 5 July",
    goal: "Learn linked list types and continue building matrix skills.",
    phaseNum: 1,
    phaseName: "Foundations",
    dataStructures: {
      unit: "Unit II: Singly & Circular Linked Lists",
      studyItems: [
        "Singly Linked List structure (node = data + pointer) and operations: insertion (beginning/end/middle), deletion, traversal, search.",
        "Concatenating two linked lists — how to join the tail of one list to the head of another.",
        "Circularly Linked Lists — how the last node points back to the first, and how this changes insertion/deletion logic (no NULL check at the end)."
      ],
      practice: "Draw node diagrams by hand for insertion at beginning, middle, and end of a singly linked list — this is the most commonly asked diagram question.",
      tip: "Always draw the pointer arrows step by step — examiners give marks for correct diagrams even if the algorithm has small errors."
    },
    maths: {
      unit: "Unit 1: Matrix Properties",
      studyItems: [
        "Rank of a matrix — definition and how to find it using row echelon form.",
        "Cramer's Rule — solving linear systems using determinants.",
        "Congruence of matrices and their properties (brief conceptual understanding)."
      ],
      practice: "Solve 2-3 systems using Cramer's Rule and compare with row reduction — note when Cramer's Rule fails (determinant = 0).",
      tip: "Cramer's Rule questions are quick to solve and commonly asked — make sure you have the determinant formula for 3x3 matrices memorised."
    }
  },
  {
    dayNum: 3,
    dateStr: "Monday, 6 July",
    goal: "Finish linked lists (doubly, polynomial, sparse matrix) and master eigenvalues.",
    phaseNum: 1,
    phaseName: "Foundations",
    dataStructures: {
      unit: "Unit II: Doubly Linked Lists & Applications",
      studyItems: [
        "Doubly Linked List structure (node = data + next pointer + prev pointer) and its operations — insertion, deletion, traversal in both directions.",
        "Advantages of doubly linked lists over singly linked (backward traversal, easier deletion).",
        "Polynomial representation using linked lists — each node holds coefficient + exponent; learn how to add two polynomials represented this way.",
        "Sparse matrix representation using linked lists — storing only non-zero elements as (row, column, value) nodes."
      ],
      practice: "Represent the polynomial 4x^3 + 3x^2 + 2 as a linked list on paper, and manually add it to another polynomial linked list.",
      tip: "Polynomial addition using linked lists is a classic long-answer question — practice writing the full algorithm, not just the concept."
    },
    maths: {
      unit: "Unit 1: Eigenvalues & Cayley-Hamilton",
      studyItems: [
        "Eigenvalues and eigenvectors of a matrix — finding them via the characteristic equation det(A - λI) = 0.",
        "Geometrical multiplicity vs algebraic multiplicity of eigenvalues.",
        "Cayley-Hamilton theorem — every matrix satisfies its own characteristic equation; how to use it to find inverse or powers of a matrix."
      ],
      practice: "Find eigenvalues and eigenvectors for two 3x3 matrices, then verify Cayley-Hamilton theorem on one of them.",
      tip: "Cayley-Hamilton is almost guaranteed to appear — practice the trick of using it to compute A inverse or higher powers of A without direct multiplication."
    }
  },
  {
    dayNum: 4,
    dateStr: "Tuesday, 7 July",
    goal: "Start Stacks and begin differential equations.",
    phaseNum: 1,
    phaseName: "Foundations",
    dataStructures: {
      unit: "Unit III: Stacks",
      studyItems: [
        "Stack definition (LIFO) and operations: push, pop, peek, isEmpty, isFull.",
        "Array implementation of stack vs Linked list implementation — know both, including overflow/underflow conditions.",
        "Application: Valid Expression Checking / Parenthesis matching — how a stack detects mismatched or unbalanced brackets.",
        "Application: Reversal of a string using a stack."
      ],
      practice: "Trace through the parenthesis-matching algorithm by hand for the string '{[()]}' and for an invalid one like '{[(])}' to see how mismatches are caught.",
      tip: "Draw the stack's state (contents) after every push/pop when solving these problems — examiners want to see the step-by-step stack trace."
    },
    maths: {
      unit: "Unit 2: Differential Equations Introduction",
      studyItems: [
        "What a differential equation and mathematical model are; general, particular, implicit and singular solutions.",
        "Lipschitz condition and Picard's Theorem (statement only) — just understand what existence/uniqueness of a solution to an IVP (Initial Value Problem) means."
      ],
      practice: "Read through 2 solved examples of IVPs from your textbook/notes to see how a particular solution is picked from a general one.",
      tip: "Lipschitz condition and Picard's theorem are usually asked as short theory/statement questions — you don't need to prove them, just state and explain clearly."
    }
  },
  {
    dayNum: 5,
    dateStr: "Wednesday, 8 July",
    goal: "Master stack-based conversions and exact differential equations.",
    phaseNum: 1,
    phaseName: "Foundations",
    dataStructures: {
      unit: "Unit III: Expression Conversion & Evaluation",
      studyItems: [
        "Infix to Postfix Conversion algorithm using a stack (operator precedence and associativity rules).",
        "Postfix Expression Evaluation using a stack.",
        "Recursion implementation using a stack — how function calls are managed via a call stack (relate back to Day 1's recursion topic)."
      ],
      practice: "Convert 3 infix expressions to postfix by hand (e.g. A+B*C-D/E), then evaluate one postfix expression using the stack method.",
      tip: "Infix-to-Postfix is one of the highest-yield topics in this unit — practice at least 4-5 different expressions until the precedence rules are automatic."
    },
    maths: {
      unit: "Unit 2: Exact & Separable Equations",
      studyItems: [
        "Exact differential equations and integrating factors — condition for exactness (∂M/∂y = ∂N/∂x) and how to solve when it holds.",
        "Separable equations and equations reducible to this form."
      ],
      practice: "Solve 3 exact differential equations and 2 separable ones from your notes/textbook.",
      tip: "Exactness-check-then-solve is a fixed method — memorise the steps in order so you never skip the integrating factor step when the equation isn't exact."
    }
  },
  {
    dayNum: 6,
    dateStr: "Thursday, 9 July",
    goal: "Learn Queues fully and finish first-order ODE special forms.",
    phaseNum: 1,
    phaseName: "Foundations",
    dataStructures: {
      unit: "Unit IV: Queues",
      studyItems: [
        "Queue definition (FIFO) and operations: enqueue, dequeue, front, rear.",
        "Array and Linked implementations of a queue, including the array 'wrap-around' problem that motivates circular queues.",
        "Circular Queue — insertion and deletion operations, and how it solves the wasted-space problem of a simple array queue.",
        "Priority Queue — definition and implementation (items served by priority, not arrival order).",
        "Dequeue (Double Ended Queue) — introduction, insertion/deletion from both ends."
      ],
      practice: "Write the full algorithm for circular queue insertion and deletion, including the overflow/underflow conditions using the modulo operator.",
      tip: "Circular queue overflow/underflow conditions are a common trap — write out the exact condition using (rear+1)%size == front and practice it until it's automatic."
    },
    maths: {
      unit: "Unit 2: Bernoulli & Special Forms",
      studyItems: [
        "Bernoulli's equation and how to convert it to a linear form using substitution.",
        "Orthogonal trajectories — families of curves that intersect at right angles.",
        "Equations of first order but not first degree; Clairaut's form; Extraneous loci."
      ],
      practice: "Solve 2 Bernoulli's equation problems and 1 orthogonal trajectory problem.",
      tip: "Bernoulli's equation always follows the same substitution pattern (v = y^(1-n)) — memorise this one substitution and the rest is mechanical."
    }
  },
  {
    dayNum: 7,
    dateStr: "Friday, 10 July",
    goal: "Quick but thorough pass on searching, then homogeneous ODEs.",
    phaseNum: 2,
    phaseName: "Core Buildout",
    dataStructures: {
      unit: "Unit V: Searching Methods",
      studyItems: [
        "Linear Search — algorithm and O(n) time complexity, works on unsorted data.",
        "Binary Search — algorithm, O(log n) time complexity, requires sorted data; trace through mid-point calculation carefully."
      ],
      practice: "Dry-run binary search on a sorted array of 15 elements, writing down low/high/mid at each step until the element is found or search fails.",
      tip: "This is a short, easy-scoring unit — don't spend more than a day on it, but make sure you can write the binary search algorithm from memory without notes."
    },
    maths: {
      unit: "Unit 3: Homogeneous 2nd Order ODEs",
      studyItems: [
        "General solution of a homogeneous equation of second order; principle of superposition.",
        "Wronskian — its properties and how it's used to test linear independence of solutions.",
        "Linear homogeneous and non-homogeneous equations of higher order with constant coefficients (introductory understanding)."
      ],
      practice: "Solve 2 second-order homogeneous ODEs with constant coefficients by finding the characteristic (auxiliary) equation and roots.",
      tip: "Always start by writing the auxiliary equation — real distinct roots, real equal roots, and complex roots each give a different solution form, so know all three cases."
    }
  },
  {
    dayNum: 8,
    dateStr: "Saturday, 11 July",
    goal: "Comparison-based sorting basics, plus Euler's equation and undetermined coefficients.",
    phaseNum: 2,
    phaseName: "Core Buildout",
    dataStructures: {
      unit: "Unit VI: Simple Sorting Methods",
      studyItems: [
        "Bubble Sort — algorithm, and how adjacent swaps push the largest element to the end each pass.",
        "Insertion Sort — algorithm, building the sorted portion one element at a time.",
        "Selection Sort — algorithm, repeatedly picking the minimum from the unsorted portion."
      ],
      practice: "Take the array [8, 3, 5, 1, 9, 2] and perform a full dry run of all three sorts, writing the array state after every pass.",
      tip: "Sorting dry-runs are guaranteed exam questions — practice writing out every single pass, not just the final sorted array, since partial marks depend on showing steps."
    },
    maths: {
      unit: "Unit 3: Euler's Equation & Undetermined Coefficients",
      studyItems: [
        "Euler's equation (Cauchy-Euler equation) — how substitution x = e^t converts it to constant-coefficient form.",
        "Method of undetermined coefficients for solving non-homogeneous linear ODEs with constant coefficients."
      ],
      practice: "Solve 1 Euler's equation and 2 non-homogeneous ODEs using undetermined coefficients (try different right-hand sides: polynomial, exponential, sine/cosine).",
      tip: "For undetermined coefficients, memorise the standard 'trial solution' table for each type of right-hand side (polynomial, e^ax, sin/cos) — this saves huge time in the exam."
    }
  },
  {
    dayNum: 9,
    dateStr: "Sunday, 12 July",
    goal: "Advanced sorting (Shell, Quick, Merge) and variation of parameters.",
    phaseNum: 2,
    phaseName: "Core Buildout",
    dataStructures: {
      unit: "Unit VI: Divide-and-Conquer Sorting",
      studyItems: [
        "Shell Sort — algorithm using gap sequences, an improvement over insertion sort.",
        "Quick Sort — Divide-and-Conquer approach, choosing a pivot, partitioning, and recursive calls.",
        "Merge Sort — Divide-and-Conquer approach, splitting the array and merging sorted halves."
      ],
      practice: "Dry-run Quick Sort and Merge Sort separately on the array [6, 2, 7, 1, 9, 4], drawing the recursion tree for Merge Sort.",
      tip: "Quick Sort and Merge Sort recursion trees are common diagram-based questions — practice drawing the tree, not just the final answer."
    },
    maths: {
      unit: "Unit 3: Variation of Parameters & Reduction of Order",
      studyItems: [
        "Method of variation of parameters for solving non-homogeneous linear ODEs (used when undetermined coefficients doesn't apply, e.g. for tan x, sec x).",
        "Reduction of order of an ODE when one solution is already known."
      ],
      practice: "Solve 2 problems using variation of parameters, being careful with the Wronskian in the formula.",
      tip: "Variation of parameters has a fixed formula involving the Wronskian — write the formula at the top of your working every time to avoid sign errors."
    }
  },
  {
    dayNum: 10,
    dateStr: "Monday, 13 July",
    goal: "Compare all sorting methods; start systems of linear ODEs.",
    phaseNum: 2,
    phaseName: "Core Buildout",
    dataStructures: {
      unit: "Unit VI: Complexity Comparison",
      studyItems: [
        "Time complexity of each sorting method (best, average, worst case) — Bubble/Insertion/Selection: O(n^2); Shell: better than O(n^2); Quick: O(n log n) average, O(n^2) worst; Merge: O(n log n) always.",
        "Space complexity — note Merge Sort needs O(n) extra space, while Quick Sort is in-place.",
        "Stability of sorting algorithms — which ones preserve the relative order of equal elements (Bubble, Insertion, Merge are stable; Selection, Quick are not)."
      ],
      practice: "Make a single-page comparison table: Algorithm | Best | Average | Worst | Space | Stable (Y/N). Keep this for final revision.",
      tip: "This comparison table is exam gold — it directly answers 'compare sorting methods' questions, which are almost always asked as a table or short-note question."
    },
    maths: {
      unit: "Unit 4: Systems of Linear ODEs",
      studyItems: [
        "Systems of linear differential equations, types of linear systems.",
        "Differential operators and their use in solving systems of ODEs.",
        "Matrix Method for solving systems with constant coefficients — expressing the system as X' = AX and using eigenvalues/eigenvectors."
      ],
      practice: "Solve 1 system of two linear ODEs using the matrix method, reusing your eigenvalue technique from Day 3.",
      tip: "Notice how this unit reuses eigenvalues from Unit 1 — if Day 3 felt shaky, quickly revisit it now since it directly supports this topic."
    }
  },
  {
    dayNum: 11,
    dateStr: "Tuesday, 14 July",
    goal: "Introduce trees; continue with two-equation systems and stability.",
    phaseNum: 2,
    phaseName: "Core Buildout",
    dataStructures: {
      unit: "Unit VII: Tree Basics",
      studyItems: [
        "Tree terminology — root, node, leaf, degree, subtree, depth, height.",
        "Binary tree definition and properties (max nodes at a level, relation between leaf and degree-2 nodes).",
        "Binary Tree Representations — Array representation (index-based) vs Linked representation (node with left/right pointers)."
      ],
      practice: "Draw a binary tree with 7 nodes and represent it both ways — as an array and as a linked structure with pointers.",
      tip: "Binary tree property questions (e.g. 'prove a binary tree with n leaf nodes has n-1 internal nodes of degree 2') are common proof-based questions — learn at least 2 such proofs."
    },
    maths: {
      unit: "Unit 4: Two Equations & Stability",
      studyItems: [
        "Systems of two equations in two unknown functions, homogeneous linear systems with constant coefficients.",
        "Stability of solutions; equilibrium points.",
        "The phase plane and phase portrait — a conceptual introduction to visualising solution behaviour."
      ],
      practice: "Solve 1 problem finding equilibrium points and classifying stability for a given 2x2 linear system.",
      tip: "Phase plane questions are often more conceptual/descriptive than computational — be ready to explain in words what a stable vs unstable equilibrium looks like."
    }
  },
  {
    dayNum: 12,
    dateStr: "Wednesday, 15 July",
    goal: "Binary Search Trees, then Pfaffian and total differential equations.",
    phaseNum: 2,
    phaseName: "Core Buildout",
    dataStructures: {
      unit: "Unit VII: Binary Search Trees",
      studyItems: [
        "BST property — left subtree < node < right subtree.",
        "BST Creation — building a tree by inserting values one at a time.",
        "BST Insertion, Deletion (all 3 cases: leaf node, one child, two children), and Search operations.",
        "Binary Tree Traversals — Inorder, Preorder, Postorder (recursive definitions) — note Inorder traversal of a BST gives sorted output.",
        "Threaded Binary Trees — how NULL pointers are replaced with threads to enable faster traversal without a stack."
      ],
      practice: "Build a BST by inserting the sequence [50, 30, 70, 20, 40, 60, 80], then write out Inorder, Preorder and Postorder traversals, and show deletion of node 30 (two children case).",
      tip: "BST deletion with two children (replace with inorder successor/predecessor) is the trickiest case and the most frequently tested — practice it until it's automatic."
    },
    maths: {
      unit: "Unit 4: Pfaffian & Total Differential Equations",
      studyItems: [
        "Pfaffian Differential Equation Pdx + Qdy + Rdz = 0.",
        "Necessary and sufficient condition for existence of integrals of the above (proof not required, just the condition and how to apply it).",
        "Total differential equation — solving using the condition of integrability."
      ],
      practice: "Solve 1-2 Pfaffian differential equation problems, checking the integrability condition first.",
      tip: "Always check the integrability condition first before attempting to solve — it's usually the first mark allocated in this type of question."
    }
  },
  {
    dayNum: 13,
    dateStr: "Thursday, 16 July",
    goal: "Master AVL tree rotations — the single most important DS topic — then start vector calculus.",
    phaseNum: 3,
    phaseName: "Heavy Topics",
    dataStructures: {
      unit: "Unit VII: AVL Trees",
      studyItems: [
        "AVL Tree definition — a self-balancing BST where the balance factor (height of left subtree - height of right subtree) is always -1, 0, or +1.",
        "The four rotation cases: LL (single right rotation), RR (single left rotation), LR (left-right double rotation), RL (right-left double rotation).",
        "Insertion into an AVL tree, checking balance factor after each insertion and applying the correct rotation."
      ],
      practice: "Insert the sequence [10, 20, 30, 40, 50, 25] into an empty AVL tree one node at a time, drawing the tree and identifying/applying every rotation needed.",
      tip: "AVL rotations are the single highest-weightage diagram question in Data Structures — do NOT skip this practice step, insert at least 2 different sequences today until you can spot the rotation type instantly from the balance factor."
    },
    maths: {
      unit: "Unit 5: Vector Calculus Introduction",
      studyItems: [
        "Triple product of vectors (scalar triple product and vector triple product) and their geometric meaning.",
        "Introduction to vector functions — functions whose output is a vector depending on a scalar parameter.",
        "Operations with vector-valued functions — limits and continuity of vector functions."
      ],
      practice: "Compute the scalar triple product for 2 sets of three vectors, and find the derivative of one simple vector function.",
      tip: "Scalar triple product = 0 means the three vectors are coplanar — this fact is a common short-answer trap question, so remember it explicitly."
    }
  },
  {
    dayNum: 14,
    dateStr: "Friday, 17 July",
    goal: "B-trees, B+ trees and Heaps; then graphs and vector differential operators.",
    phaseNum: 3,
    phaseName: "Heavy Topics",
    dataStructures: {
      unit: "Unit VII: B-Trees, Heaps & Unit VIII: Graphs",
      studyItems: [
        "B-tree definition — a balanced multi-way search tree used in databases/file systems, and its properties (minimum degree, node capacity).",
        "B+ tree — how it differs from a B-tree (all data at leaf level, leaves linked for range queries).",
        "Heap — definition, Min Heap and Max Heap properties, insertion and deletion (heapify up/down).",
        "Priority Queue implementation using a Heap — how insert and extract-min/max work in O(log n).",
        "Graph ADT and Graph Representations — Adjacency Matrix vs Adjacency List, with space trade-offs.",
        "Graph Traversals — BFS (queue-based) and DFS (stack/recursion-based) and Graph Searching."
      ],
      practice: "Build a Max Heap from the array [4, 10, 3, 5, 1], insert one new element with heapify-up, then perform BFS and DFS on a small 6-node graph, listing the visit order for each.",
      tip: "This is the heaviest single day — if short on time, prioritise Heap insertion/deletion and BFS/DFS traversal order over B-tree/B+ tree details, since traversals are asked more frequently."
    },
    maths: {
      unit: "Unit 5: Vector Fields & Differential Operators",
      studyItems: [
        "Vector fields, arc length, and applications of vector functions.",
        "Differential operators: gradient (of a scalar field), divergence (of a vector field), and curl (of a vector field)."
      ],
      practice: "Compute the gradient of a scalar function f(x,y,z), and the divergence and curl of a given vector field — 1 problem each.",
      tip: "Grad, div, and curl each apply to a specific type of field (scalar → grad; vector → div/curl) — a common mistake is trying to take divergence of a scalar field, so double check field type before applying operator."
    }
  },
  {
    dayNum: 15,
    dateStr: "Saturday, 18 July",
    goal: "Full revision day — Data Structures Units I to IV, and Maths Units 1 to 2.",
    phaseNum: 3,
    phaseName: "Heavy Topics",
    dataStructures: {
      unit: "Revise Units I–IV",
      studyItems: [
        "Review: Unit I: definitions, ADT, recursion, complexity notation — read your Day 1 cheat sheet.",
        "Review: Unit II: linked list types, polynomial/sparse matrix representation — re-draw one insertion/deletion diagram from memory.",
        "Review: Unit III: stack operations, infix-postfix conversion, postfix evaluation — redo one conversion problem without looking at notes.",
        "Review: Unit IV: queue types, circular queue conditions, priority queue, dequeue — rewrite the circular queue overflow/underflow condition from memory."
      ],
      practice: "Pick 1 algorithm from each of these 4 units and write it completely from memory, then check against your notes for gaps.",
      tip: "Revision means active recall, not re-reading — always try to write the algorithm from memory first, then check, rather than just reading it again."
    },
    maths: {
      unit: "Revise Units 1–2",
      studyItems: [
        "Review: Unit 1: row reduction, Cramer's Rule, eigenvalues/eigenvectors, Cayley-Hamilton — redo one eigenvalue problem from scratch.",
        "Review: Unit 2: exact/separable equations, Bernoulli's equation, Clairaut's form — redo one Bernoulli's equation problem from scratch."
      ],
      practice: "Time yourself solving 2 problems (one from each unit) as if in an exam — note how long each takes.",
      tip: "Timing yourself now reveals which topics need more speed practice before the real exam — don't skip this timing exercise."
    }
  },
  {
    dayNum: 16,
    dateStr: "Sunday, 19 July",
    goal: "Full revision day — Data Structures Units V to VIII, and Maths Units 3 to 5.",
    phaseNum: 3,
    phaseName: "Heavy Topics",
    dataStructures: {
      unit: "Revise Units V–VIII",
      studyItems: [
        "Review: Unit V: linear and binary search — write binary search from memory.",
        "Review: Unit VI: all sorting methods and your comparison table from Day 10 — redo one dry run of Quick Sort or Merge Sort from memory.",
        "Review: Unit VII: BST operations, AVL rotations, heaps — this is your weakest-likely area, so redo one AVL insertion sequence from memory.",
        "Review: Unit VIII: graph representations, BFS/DFS — redo one BFS and one DFS trace from memory on a new small graph."
      ],
      practice: "If you only have time to deeply revise one topic today, make it AVL rotations — it has the highest mark-to-difficulty ratio in the whole syllabus.",
      tip: "If you only have time to deeply revise one topic today, make it AVL rotations — it has the highest mark-to-difficulty ratio in the whole syllabus."
    },
    maths: {
      unit: "Revise Units 3–5",
      studyItems: [
        "Review: Unit 3: homogeneous/non-homogeneous ODEs, Euler's equation, undetermined coefficients, variation of parameters — redo one undetermined coefficients problem.",
        "Review: Unit 4: systems of linear ODEs (matrix method), Pfaffian equations — redo one matrix-method system problem.",
        "Review: Unit 5: triple product, vector fields, grad/div/curl — redo one grad/div/curl computation."
      ],
      practice: "Keep a small 'formula card' listing the auxiliary equation cases, the variation-of-parameters formula, and grad/div/curl definitions — carry it right up to exam day for last-minute glances.",
      tip: "Keep a small 'formula card' listing the auxiliary equation cases, the variation-of-parameters formula, and grad/div/curl definitions — carry it right up to exam day for last-minute glances."
    }
  },
  {
    dayNum: 17,
    dateStr: "Monday, 20 July",
    goal: "Full previous-year question practice for Data Structures.",
    phaseNum: 4,
    phaseName: "Final Push",
    dataStructures: {
      unit: "Previous Year Questions",
      studyItems: [
        "Do: Find 2-3 previous year Data Structures question papers (ask seniors, check college resources, or your department notice board/library).",
        "Do: Attempt at least one full paper under timed, exam-like conditions (close notes, set a timer for the actual exam duration).",
        "Focus: Give extra attention to AVL tree rotations, sorting dry-runs, infix-to-postfix conversion, and BST insertion/deletion — these repeat most often across years.",
        "Do: After attempting, mark your own paper against your notes and note down every topic where you lost marks."
      ],
      practice: "Solving under real time pressure reveals gaps that casual reading never will — treat today's paper exactly like the real exam.",
      tip: "Solving under real time pressure reveals gaps that casual reading never will — treat today's paper exactly like the real exam."
    },
    maths: {
      unit: "Light Touch",
      studyItems: [
        "Do: If time allows after the DS paper, quickly redo 1-2 tricky problems from your weak list (from Day 15/16 timing exercise)."
      ],
      practice: "If time allows after the DS paper, quickly redo 1-2 tricky problems from your weak list (from Day 15/16 timing exercise).",
      tip: "It's fine to give Maths less time today since tomorrow is fully dedicated to it — don't burn out before the Maths practice day."
    }
  },
  {
    dayNum: 18,
    dateStr: "Tuesday, 21 July",
    goal: "Full previous-year question practice for Maths (Linear Algebra I / ODE).",
    phaseNum: 4,
    phaseName: "Final Push",
    dataStructures: {
      unit: "Light Touch",
      studyItems: [
        "Do: Quickly redo 1-2 of yesterday's weak-list problems if time allows, especially any AVL or BST question you got wrong."
      ],
      practice: "Quickly redo 1-2 of yesterday's weak-list problems if time allows, especially any AVL or BST question you got wrong.",
      tip: "Keep this light — the goal today is Maths confidence, not new DS material."
    },
    maths: {
      unit: "Previous Year Questions",
      studyItems: [
        "Do: Find 2-3 previous year papers for Linear Algebra I / ODE from seniors, department resources, or your library.",
        "Do: Attempt at least one full paper under timed conditions, closed notes.",
        "Focus: Give extra attention to eigenvalues/Cayley-Hamilton, solving 2nd order ODEs (all 3 root cases), variation of parameters, and grad/div/curl — these are the highest-yield topics.",
        "Do: Mark your own paper, and list every problem type where you made an error or ran out of time."
      ],
      practice: "If a topic keeps tripping you up across multiple previous-year papers, that's exactly what to review one more time on Day 19.",
      tip: "If a topic keeps tripping you up across multiple previous-year papers, that's exactly what to review one more time on Day 19."
    }
  },
  {
    dayNum: 19,
    dateStr: "Wednesday, 22 July",
    goal: "Final light revision day — consolidate, don't cram new material. Exams begin tomorrow.",
    phaseNum: 4,
    phaseName: "Final Push",
    dataStructures: {
      unit: "Final Consolidation",
      studyItems: [
        "Morning: Re-read your Data Structures cheat sheet (definitions, complexity table, comparison table) — 1-2 hours, no new problem-solving.",
        "Evening: Skim through your weak-topic list from Days 17-18 one final time; do NOT attempt new, unfamiliar problems today."
      ],
      practice: "The goal today is confidence and consolidation, not new learning — trust the work you've put in over the last 18 days.",
      tip: "The goal today is confidence and consolidation, not new learning — trust the work you've put in over the last 18 days."
    },
    maths: {
      unit: "Final Consolidation",
      studyItems: [
        "Afternoon: Re-read your Maths formula card (auxiliary equation cases, variation of parameters formula, grad/div/curl, Cayley-Hamilton) — 1-2 hours.",
        "Night: Pack your exam stationery/admit card, and sleep early — a rested mind outperforms a few extra hours of last-minute cramming."
      ],
      practice: "The goal today is confidence and consolidation, not new learning — trust the work you've put in over the last 18 days.",
      tip: "The goal today is confidence and consolidation, not new learning — trust the work you've put in over the last 18 days."
    }
  }
];
