export interface Block {
  id: string;
  label: string;
  type: "math" | "data" | "ml" | "control";
  inputs?: string[];
  pythonCode: string;
}

export interface Lesson {
  slug: string;
  title: string;
  subtitle: string;
  track: "Explorer" | "Builder" | "Researcher";
  pencilTask: string;
  blocks: Block[];
  codeTemplate: string;
  codeSolution: string;
  codeTests: string[];
  scimlDescription: string;
}

const lessons: Lesson[] = [
  {
    slug: "area-of-a-square",
    title: "The Area of a Square",
    subtitle: "From hand-drawn math to predicting crop yield",
    track: "Explorer",
    pencilTask:
      "Draw a square on the grid. Count the cells to find the area. What formula did you use?",
    blocks: [
      {
        id: "set-side",
        label: "Set side length to",
        type: "math",
        inputs: ["number"],
        pythonCode: "side = {input}",
      },
      {
        id: "calculate-area",
        label: "Calculate area (side x side)",
        type: "math",
        pythonCode: "area = side * side",
      },
      {
        id: "show-result",
        label: "Show result",
        type: "data",
        pythonCode: "print(f'Area: {area} square units')",
      },
    ],
    codeTemplate: `# Lesson: Area of a Square
# Your scratchpad answer: _________

def square_area(side):
    # TODO: Fill in the formula
    pass

# Test it
print(f"Area of square with side 5: {square_area(5)}")
print(f"Area of square with side 10: {square_area(10)}")
`,
    codeSolution: `def square_area(side):
    return side * side
`,
    codeTests: [
      "assert square_area(5) == 25",
      "assert square_area(10) == 100",
      "assert square_area(0) == 0",
    ],
    scimlDescription:
      "Draw a field shape on the farm grid. The app will count pixels to calculate area and predict crop yield (10 crops per unit area). This is numerical integration!",
  },
  {
    slug: "slope-of-a-curve",
    title: "The Slope of a Curve",
    subtitle: "From drawing triangles to gradient descent",
    track: "Builder",
    pencilTask:
      "Draw y = x². At x = 2, draw a tiny triangle with run = 0.1. Calculate the slope (rise/run). Try smaller runs to see what happens.",
    blocks: [
      {
        id: "define-function",
        label: "Define f(x) =",
        type: "math",
        inputs: ["number"],
        pythonCode: "f = lambda x: {input}",
      },
      {
        id: "pick-point",
        label: "Pick x =",
        type: "math",
        inputs: ["number"],
        pythonCode: "x = {input}",
      },
      {
        id: "compute-derivative",
        label: "Compute derivative (approximate)",
        type: "ml",
        pythonCode: "h = 0.001\nslope = (f(x + h) - f(x)) / h",
      },
      {
        id: "show-slope",
        label: "Show slope",
        type: "data",
        pythonCode: "print(f'Slope at x={x}: {slope}')",
      },
    ],
    codeTemplate: `# Lesson: The Slope of a Curve
# Your scratchpad answer: ________

def f(x):
    # TODO: Your function here
    pass

# Compute deriative numerically
def derivative(func, x, h=0.001):
    return (func(x + h) - func(x)) / h

# Test
x = 2
print(f"f({x}) = {f(x)}")
print(f"Slope at x={x}: {derivative(f, x)}")
`,
    codeSolution: `def f(x):
    return x ** 2

def derivative(func, x, h=0.001):
    return (func(x + h) - func(x)) / h
`,
    codeTests: [
      "assert abs(derivative(lambda x: x**2, 2) - 4) < 0.01",
      "assert abs(derivative(lambda x: x**2, 3) - 6) < 0.01",
    ],
    scimlDescription:
      "Watch the Gradient Descent Hiker! Start at any point on a 2D terrain. The hiker uses the slope (derivative) to walk downhill. Adjust learning rate to see if they converge or overshoot!",
  },
  {
    slug: "patterns-in-grids",
    title: "Patterns in Grids",
    subtitle: "From counting neighbors to edge detection",
    track: "Explorer",
    pencilTask:
      "Draw a 5x5 grid. Shade some cells to make a pattern (like a letter 'L'). Count how many shaded neighbors each cell has. What pattern emerges?",
    blocks: [
      {
        id: "load-grid",
        label: "Load grid",
        type: "data",
        pythonCode:
          "grid = [[0,1,0,0,0], [0,1,0,0,0], [0,1,1,1,0], [0,0,0,0,0], [0,0,0,0,0]]",
      },
      {
        id: "count-neighbors",
        label: "Count shaded neighbors",
        type: "math",
        pythonCode:
          "neighbors = sum(grid[i-1][j-1:j+2] + grid[i][j-1:j+1] + grid[i+1][j-1:j+2])",
      },
      {
        id: "highlight-pattern",
        label: "Highlight pattern",
        type: "ml",
        pythonCode: "pattern = [count for count in neighbors if count > 3]",
      },
    ],
    codeTemplate: `# Lesson: Patterns in Grids
# Your scratchpad answer: _________

def count_neighbors(grid, i, j):
    # TODO: Count shaded neighbors (up to 8 directions)
    pass

# Test it
grid = [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0]
]
for i in range(len(grid)):
    for j in range(len(grid[0])):
        neighbors = count_neighbors(grid, i, j)
        print(f"Cell ({i},{j}): {grid[i][j]} has {neighbors} neighbors")
`,
    codeSolution: `def count_neighbors(grid, i, j):
    directions = [(-1,-1), (-1,0), (-1,1), (0,-1), (0,1), (1,-1), (1,0), (1,1)]
    count = 0
    for di, dj in directions:
        ni, nj = i + di, j + dj
        if 0 <= ni < len(grid) and 0 <= nj < len(grid[0]):
            count += grid[ni][nj]
    return count
`,
    codeTests: [
      "assert count_neighbors([[0,1],[1,1]], 1, 1) == 2",
      "assert count_neighbors([[1,0],[0,0]], 0, 0) == 0",
    ],
    scimlDescription:
      "Edge Detection App! Draw a shape on a grid. The app applies a convolution kernel to detect edges. This is the foundation of computer vision and CNNs!",
  },
];

export function getLessons(): Lesson[] {
  return lessons;
}

export function getLesson(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}
