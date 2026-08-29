export interface Lesson {
  slug: string;
  title: string;
  subtitle: string;
  track: "Explorer" | "Builder" | "Researcher";
  concept: string;
  scimlApp: string;
  pencilTask: string;
  codeTemplate: string;
  codeSolution: string;
  codeTests: string;
  scimlDescription: string;
}

export const lessons: Lesson[] = [
  {
    slug: "pixels-are-just-numbers",
    title: "Lesson 1: Pixels Are Just Numbers",
    subtitle: "How a computer sees an apple before it knows it is an apple",
    track: "Explorer",
    concept: "Images as matrices of RGB numbers",
    scimlApp: "Pixel Painter",
    pencilTask: `On the grid below, draw a simple apple using only 3 colors:
RED = (255, 0, 0)    GREEN = (0, 255, 0)    YELLOW = (255, 255, 0)

Draw a 4x4 apple. Then write the 3 numbers for each colored cell.
This is exactly how a computer stores a picture: as a grid of numbers.`,
    codeTemplate: `import numpy as np

# A computer sees an image as a grid of numbers.
# This 4x4 image has 3 color channels: Red, Green, Blue
# Each cell holds 3 numbers: [R, G, B]

apple_image = np.array([
    # Row 0: mostly green (leaf)
    [[0, 255, 0], [255, 0, 0], [255, 0, 0], [0, 255, 0]],
    # Row 1: red apple body
    [[255, 0, 0], [255, 0, 0], [255, 0, 0], [255, 0, 0]],
    # Row 2: red apple body
    [[255, 0, 0], [255, 0, 0], [255, 0, 0], [255, 0, 0]],
    # Row 3: yellow bottom
    [[255, 255, 0], [255, 255, 0], [255, 255, 0], [255, 255, 0]],
])

print("Shape of image:", apple_image.shape)
print("This means: 4 rows, 4 columns, 3 color channels")
print()

# TODO: Print the color of the pixel at row 1, column 1
# Hint: apple_image[row, column]
pixel = ???
print("Pixel at [1,1]:", pixel)

# TODO: What color is at row 0, column 0? Print it!
`,
    codeSolution: `import numpy as np

apple_image = np.array([
    [[0, 255, 0], [255, 0, 0], [255, 0, 0], [0, 255, 0]],
    [[255, 0, 0], [255, 0, 0], [255, 0, 0], [255, 0, 0]],
    [[255, 0, 0], [255, 0, 0], [255, 0, 0], [255, 0, 0]],
    [[255, 255, 0], [255, 255, 0], [255, 255, 0], [255, 255, 0]],
])

print("Shape of image:", apple_image.shape)
print("This means: 4 rows, 4 columns, 3 color channels")
print()

pixel = apple_image[1, 1]
print("Pixel at [1,1]:", pixel)

print("Pixel at [0,0]:", apple_image[0, 0])
`,
    codeTests: `assert apple_image.shape == (4, 4, 3)
assert list(apple_image[1,1]) == [255, 0, 0]`,
    scimlDescription:
      "Every photo on your phone is a giant grid of numbers. A 12-megapixel image is a matrix with 12 million RGB triples. Computers do not see colors. They read numbers. That is the first step of image recognition.",
  },
  {
    slug: "fruit-edges",
    title: "Lesson 2: Finding the Edge of a Fruit",
    subtitle: "How computers find the outline of an apple using a tiny math window",
    track: "Explorer",
    concept: "Convolution: sliding a window to detect edges",
    scimlApp: "Fruit Edge Detector",
    pencilTask: `Look at a fruit picture. The EDGE is where red suddenly becomes green or yellow.

Draw a 3x3 window around one edge pixel. Count how many inside pixels touch the center.
Now count how many outside pixels touch the center.

If inside = 5 and outside = 4, the center is probably an EDGE.
Computers find edges the same way: they count neighbors in a tiny window.`,
    codeTemplate: `import numpy as np

# A simple fruit image: 1 = fruit, 0 = background
fruit = np.array([
    [0, 0, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0],
])

# This is an edge-detector kernel: a tiny math window
kernel = np.array([
    [-1, -1, -1],
    [-1,  8, -1],
    [-1, -1, -1],
])

# TODO: Fill in the edge detector function
def find_edges(image, kernel):
    rows, cols = image.shape
    edges = np.zeros((rows, cols))

    for r in range(1, rows - 1):
        for c in range(1, cols - 1):
            window = image[r-1:r+2, c-1:c+2]
            # TODO: Multiply the window by the kernel, then sum
            # Hint: np.sum(window * kernel)
            score = ???
            edges[r, c] = score

    return edges

result = find_edges(fruit, kernel)
print("Original fruit:")
print(fruit)
print("\\nEdges found:")
print(result)
`,
    codeSolution: `import numpy as np

fruit = np.array([
    [0, 0, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0],
])

kernel = np.array([
    [-1, -1, -1],
    [-1,  8, -1],
    [-1, -1, -1],
])

def find_edges(image, kernel):
    rows, cols = image.shape
    edges = np.zeros((rows, cols))

    for r in range(1, rows - 1):
        for c in range(1, cols - 1):
            window = image[r-1:r+2, c-1:c+2]
            score = np.sum(window * kernel)
            edges[r, c] = score

    return edges

result = find_edges(fruit, kernel)
print("Original fruit:")
print(fruit)
print("\\nEdges found:")
print(result)
`,
    codeTests: `assert find_edges(np.array([[0,0,0],[0,1,0],[0,0,0]]), kernel)[1,1] == 8`,
    scimlDescription:
      "Your edge detector is a convolution. Face unlock on a phone runs a version of this math billions of times. Next you will use edges and other features to decide: apple or orange?",
  },
  {
    slug: "fruit-classifier",
    title: "Lesson 3: Apple or Orange?",
    subtitle: "Teaching a computer to classify fruit using simple math rules",
    track: "Explorer",
    concept: "Linear classification: weighted scoring",
    scimlApp: "Fruit Classifier",
    pencilTask: `Play Fruit Detective with points.

An APPLE is usually: Red (+10), Round (+5), Has a stem (+3)
An ORANGE is usually: Orange (+10), Round (+7), Bumpy skin (+4)
A BANANA is usually: Yellow (+10), Long (+8), Curved (+3)

Look at a mystery fruit. Give it points for each feature.
Add up the score. Highest score wins.

That is how the first image classifiers worked.`,
    codeTemplate: `import numpy as np

# Feature scores for each fruit
# [Redness, Roundness, Stem, Orangeness, Bumpiness, Yellowness, Length]

apple_scores =    [10,  5,  3,  0,  0,  0,  0]
orange_scores =   [ 0,  7,  0, 10,  4,  0,  0]
banana_scores =   [ 0,  0,  0,  0,  0, 10,  8]

mystery_fruits = np.array([
    # Fruit A: very red, round, has stem
    [9, 5, 3, 1, 0, 0, 0],
    # Fruit B: very orange, very round, bumpy
    [0, 7, 0, 9, 4, 0, 0],
    # Fruit C: very yellow, very long
    [0, 0, 0, 0, 0, 9, 8],
])

def classify_fruit(fruit_features):
    # TODO: Calculate the total score for each fruit type
    # Hint: np.dot() multiplies two lists and adds them up

    apple_total = np.dot(fruit_features, apple_scores)
    orange_total = ???
    banana_total = ???

    print(f"  Apple score: {apple_total}")
    print(f"  Orange score: {orange_total}")
    print(f"  Banana score: {banana_total}")

    scores = {"Apple": apple_total, "Orange": orange_total, "Banana": banana_total}
    winner = max(scores, key=scores.get)
    return winner

for i, fruit in enumerate(mystery_fruits):
    print(f"\\nMystery Fruit {chr(65+i)}:")
    answer = classify_fruit(fruit)
    print(f"  => It is an {answer}!")
`,
    codeSolution: `import numpy as np

apple_scores =    [10,  5,  3,  0,  0,  0,  0]
orange_scores =   [ 0,  7,  0, 10,  4,  0,  0]
banana_scores =   [ 0,  0,  0,  0,  0, 10,  8]

mystery_fruits = np.array([
    [9, 5, 3, 1, 0, 0, 0],
    [0, 7, 0, 9, 4, 0, 0],
    [0, 0, 0, 0, 0, 9, 8],
])

def classify_fruit(fruit_features):
    apple_total = np.dot(fruit_features, apple_scores)
    orange_total = np.dot(fruit_features, orange_scores)
    banana_total = np.dot(fruit_features, banana_scores)

    print(f"  Apple score: {apple_total}")
    print(f"  Orange score: {orange_total}")
    print(f"  Banana score: {banana_total}")

    scores = {"Apple": apple_total, "Orange": orange_total, "Banana": banana_total}
    winner = max(scores, key=scores.get)
    return winner

for i, fruit in enumerate(mystery_fruits):
    print(f"\\nMystery Fruit {chr(65+i)}:")
    answer = classify_fruit(fruit)
    print(f"  => It is an {answer}!")
`,
    codeTests: `assert classify_fruit(np.array([10,5,3,0,0,0,0])) == "Apple"`,
    scimlDescription:
      "You built a classifier. It adds weighted feature scores: the same idea as a neural network, with simpler math. Later tracks learn how computers find the best weights with gradient descent.",
  },
];

const aliases: Record<string, string> = {
  "area-of-a-square": "pixels-are-just-numbers",
  "slope-of-a-curve": "fruit-edges",
  "patterns-in-grids": "fruit-classifier",
};

export function getLessons(): Lesson[] {
  return lessons;
}

export function getLesson(slug: string): Lesson | undefined {
  const resolved = aliases[slug] ?? slug;
  return lessons.find((lesson) => lesson.slug === resolved);
}
