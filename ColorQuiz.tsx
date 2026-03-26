import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Label } from "@/app/components/ui/label";
import { Progress } from "@/app/components/ui/progress";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";

interface ColorQuizProps {
  onComplete: (palette: string) => void;
}

/**
 * Question mapping based on ColorPaletteScene.java logic:
 * Index 0: Winter, Index 1: Summer, Index 2: Spring, Index 3: Autumn
 */
const questions = [
  {
    id: 1,
    question: "1. What is your natural hair colour?",
    options: [
      { value: "coolHair", label: "Cool/Dark Tones", points: [1, 0, 0, 0] }, // firsthair -> counts[0] (Winter)
      { value: "ashyHair", label: "Ashy/Muted Tones", points: [0, 1, 0, 0] }, // secondHair -> counts[1] (Summer)
      { value: "hair3rd", label: "Soft/Warm Tones", points: [0, 0, 1, 0] },   // thirdHair -> counts[3] (Spring - mapped as index 2 here)
      { value: "hair4th", label: "Deep/Warm Tones", points: [0, 0, 0, 1] },   // fourthHair -> counts[2] (Autumn - mapped as index 3 here)
    ],
  },
  {
    id: 2,
    question: "2. What colour are your eyes?",
    options: [
      { value: "eyeOne", label: "Clear/Cool", points: [0, 1, 0, 0] },   // eyeOne -> counts[1]
      { value: "eyeTwo", label: "Bright/Warm", points: [0, 0, 1, 0] },  // eyeTwo -> counts[2]
      { value: "eyeThree", label: "Soft/Warm", points: [0, 0, 0, 1] },  // eyeThree -> counts[3]
      { value: "eyeFour", label: "Deep/Clear", points: [1, 0, 0, 0] },  // eyeFour -> counts[0]
    ],
  },
  {
    id: 3,
    question: "3. How would you describe your skin tone?",
    options: [
      { value: "skinOne", label: "Fair/Cool", points: [1, 0, 0, 0] },   // skinOne -> counts[0]
      { value: "skinTwo", label: "Soft/Cool", points: [0, 1, 0, 0] },   // skinTwo -> counts[1]
      { value: "skinThree", label: "Medium/Warm", points: [0, 0, 1, 0] }, // skinThree -> counts[2]
      { value: "skinFour", label: "Deep/Warm", points: [0, 0, 0, 1] },   // skinFour -> counts[3]
    ],
  },
  {
    id: 4,
    question: "4. Which metal tone do you look best with?",
    options: [
      { value: "metalSilver", label: "Silver", points: [0, 0, 1, 1] }, // counts[2]++ and counts[3]++
      { value: "metalGold", label: "Gold", points: [1, 1, 0, 0] },    // counts[0]++ and counts[1]++
    ],
  },
];

export function ColorQuiz({ onComplete }: ColorQuizProps) {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = () => {
    if (!selectedAnswer) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      // Calculate result using ColorPaletteScene logic
      const counts = [0, 0, 0, 0]; // Winter, Summer, Spring, Autumn

      newAnswers.forEach((answer, index) => {
        const question = questions[index];
        const option = question.options.find(opt => opt.value === answer);
        if (option) {
          option.points.forEach((point, i) => {
            counts[i] += point;
          });
        }
      });

      // Find max count
      let maxCount = counts[0];
      let maxIdx = 0;
      for (let i = 1; i < counts.length; i++) {
        if (counts[i] > maxCount) {
          maxCount = counts[i];
          maxIdx = i;
        }
      }

      // Palette names based on ColorPaletteScene array
      const palettes = ["winter", "summer", "spring", "autumn"];
      const finalPalette = palettes[maxIdx];

      onComplete(finalPalette);
      navigate("/results");
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <div className="mb-8 text-center">
            <h2
                className="text-4xl text-primary mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
            >
              colour Palette Quiz
            </h2>
            <p
                className="text-muted-foreground"
                style={{ fontFamily: 'var(--font-body)' }}
            >
              Welcome! Let's find your best-suited colour palette.
            </p>
          </div>

          <div className="mb-6">
            <Progress value={progress} className="h-2" />
            <p
                className="text-sm text-muted-foreground mt-2 text-right"
                style={{ fontFamily: 'var(--font-body)' }}
            >
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          <Card className="shadow-xl border-border/50">
            <CardContent className="pt-8 pb-6">
              <h3
                  className="text-2xl mb-6"
                  style={{ fontFamily: 'var(--font-heading)' }}
              >
                {questions[currentQuestion].question}
              </h3>

              <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option) => (
                      <div
                          key={option.value}
                          className={`flex items-center space-x-3 border rounded-lg p-4 transition-colors cursor-pointer ${
                              selectedAnswer === option.value ? "border-primary bg-primary/5" : "border-border/50 hover:bg-secondary/30"
                          }`}
                          onClick={() => setSelectedAnswer(option.value)}
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label
                            htmlFor={option.value}
                            className="flex-1 cursor-pointer"
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {option.label}
                        </Label>
                      </div>
                  ))}
                </div>
              </RadioGroup>

              <Button
                  onClick={handleNext}
                  disabled={!selectedAnswer}
                  className="w-full mt-6 bg-primary hover:bg-primary/90"
                  style={{ fontFamily: 'var(--font-body)' }}
              >
                {currentQuestion < questions.length - 1 ? (
                    <>
                      Next <ChevronRight className="ml-2 w-4 h-4" />
                    </>
                ) : (
                    "See Results ✨"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}