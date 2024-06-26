import { useEffect, useState } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const Index = () => {
  const [currentModule, setCurrentModule] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formattedAnswers, setFormattedAnswers] = useState([]);

  const modules = [
    {
      id: uuidv4(),
      name: "IDEALISTIC",
      questions: [
        "I have ambitious aims of making a difference.",
        "My leadership journey has progressed as I anticipated",
        "I have spent fewer than 4 years in full time service or ministry.",
        "With hard work and determination, I have been able to persevere through the ministry challenges that have come my way.",
      ],
    },
    {
      id: uuidv4(),
      name: "DISILLUSIONED",
      questions: [
        "My plans are likely to succeed.",
        "I’m beginning to believe the journey of service will be much harder than I anticipated.",
        "I question whether I can remain effective in my role long-term.",
        "I wonder if I’m really making the difference I anticipated making.",
      ],
    },
    {
      id: uuidv4(),
      name: "CYNICAL",
      questions: [
        "If I had the option of changing careers, I would.",
        "The problems we’re confronting are just too big to make a meaningful difference.",
        "The passion I once had for the ministry I serve has been depleted.",
        "As a leader, it is my job to bring about outcomes at my organization.",
      ],
    },
    {
      id: uuidv4(),
      name: "HOPEFUL",
      questions: [
        "It is my job to be faithful; it is God’s job to bring about outcomes.",
        "When I face a challenge, I spend meaningful time praying for guidance.",
        "Knowing that Jesus promised trials, I strive to keep the “light and momentary” nature of trials I face in perspective, looking toward a promised future.",
        "Though I have faced many challenges, God has been faithful.",
      ],
    },
  ];

  const totalQuestions = modules[currentModule].questions.length;
  const progress = (currentQuestion / totalQuestions) * 100;

  const handleAnswer = (value) => {
    setAnswers({
      ...answers,
      [currentModule]: {
        ...answers[currentModule],
        [currentQuestion]: value,
      },
    });
  };
  useEffect(() => {
    console.log("answer triggered");
    setTimeout(() => {
      if (answers[currentModule]?.[currentQuestion] === undefined) return;
      handleNext();
    }, 500);
  }, [answers]);

  const handleNext = () => {
    if (answers[currentModule]?.[currentQuestion] === undefined)
      return alert("Please select an answer");
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentModule < modules.length - 1) {
      setCurrentModule(currentModule + 1);
      setCurrentQuestion(0);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentModule > 0) {
      setCurrentModule(currentModule - 1);
      setCurrentQuestion(modules[currentModule - 1].questions.length - 1);
    }
  };

  const handleSubmitAnswer = () => {
    if (answers[currentModule]?.[currentQuestion] === undefined)
      return alert("Please select an answer");
    const formattedAnswers = modules.map((module, i) => ({
      moduleName: module.name,
      questions: module.questions.map((question, index) => {
        return {
          question,
          answer: [
            "Strongly Disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly Agree",
          ][answers[i][index]],
        };
      }),
    }));
    setFormattedAnswers(formattedAnswers);
    setShowModal(true);
  };

  return (
    <div className="assessment_container_wrapper p-10 bg-[#8fcbd3] w-full h-screen flex items-center justify-center">
      <div className="assessment_container flex flex-col justify-between bg-white rounded-lg w-3/4 min-h-[550px] p-10">
        {/* modules */}
        <div className="modules_stepper">
          <div className="modules grid grid-cols-4 gap-5 ">
            {modules.map((module, index) => (
              <div
                key={module.id}
                className={`module col-span-1 flex flex-col items-center gap-y-3 ${
                  currentModule === index && "text-[#20adb4] font-bold"
                }`}
              >
                {/* bar */}
                <div className="w-full bg-gray-200 h-[5px] transition-all duration-200 delay-150 rounded-full">
                  <div
                    className={`bar h-[5px] rounded-full  ${
                      currentModule > index ||
                      (currentModule === index && currentQuestion > 0)
                        ? "bg-[#20adb4]"
                        : "bg-gray-200"
                    }
                        `}
                    style={{
                      width:
                        currentModule > index
                          ? "100%"
                          : currentModule === index
                          ? `${progress}%`
                          : "0%",
                    }}
                  ></div>
                </div>
                <div className="module_name text-xl">{module.name}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Question no /outof */}
        <div className="justify-center flex items-center text-red-500 text-xl">
          <span className="font-medium">{currentQuestion + 1}</span> /{" "}
          {totalQuestions}
        </div>

        {/* Question */}

        <div className="question w-full text-center text-2xl">
          {modules[currentModule].questions[currentQuestion]}
        </div>

        {/* Custom Slider */}
        <div className="slider_wrapper relative ">
          <div className="slider_track relative w-full">
            <div className="h-[4px] absolute top-1 w-full  rounded-full  bg-gray-200">
              <div
                className={`h-[8px]  absolute left-0 bg-[#20adb4] rounded-full`}
                style={{
                  width: `${
                    answers[currentModule]?.[currentQuestion] * 25 || 0
                  }%`,
                }}
              ></div>
            </div>
          </div>
          <div className="slider w-[125%]  relative flex justify-between">
            {[0, 1, 2, 3, 4].map((value) => (
              <a
                key={value}
                onClick={() => handleAnswer(value)}
                className={`slider_point absolute  cursor-pointer ${
                  answers[currentModule]?.[currentQuestion] === value
                    ? "bg-[#20adb4]"
                    : "bg-gray-500"
                }
                  size-[18px] p-2  z-10 rounded-full flex items-center justify-center"
                
                `}
                style={{
                  left: `${value * 20}%`,
                }}
              ></a>
            ))}
          </div>
          <div className="slider_labels w-[125%] relative flex justify-between">
            {[
              "Strongly Disagree",
              "Disagree",
              "Neutral",
              "Agree",
              "Strongly Agree",
            ].map((value, i) => (
              <span
                key={value}
                onClick={() => handleAnswer(i)}
                className={`slider_value absolute top-5 text-end cursor-pointer  z-10 rounded-full flex items-center justify-center`}
                style={{ left: `${i * 20}%` }}
              >
                {value}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="buttons flex justify-between gap-5">
          <button
            onClick={handlePrev}
            className="font-bold text-gray-700 flex items-center gap-x-3 hover:bg-gray-100 p-2 rounded-md"
          >
            <FaLongArrowAltLeft />
            Prev
          </button>
          {currentModule === modules.length - 1 &&
          currentQuestion === totalQuestions - 1 ? (
            <button
              onClick={handleSubmitAnswer}
              className="font-bold text-gray-700 flex items-center gap-x-3 hover:bg-gray-100 p-2 rounded-md"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="font-bold text-gray-700 flex items-center gap-x-3 hover:bg-gray-100 p-2 rounded-md"
            >
              Next <FaLongArrowAltRight />
            </button>
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50  flex items-center justify-center">
          <div className="bg-white max-h-[80%] overflow-y-auto p-10 rounded-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4">Submitted Answers</h2>
            <div className="space-y-4">
              {formattedAnswers.map((module) => (
                <div key={module.moduleName} className="border p-4 rounded">
                  <h3 className="text-xl font-bold mb-2">
                    {module.moduleName}
                  </h3>
                  <ul className="space-y-2">
                    {module.questions.map((q, index) => (
                      <li key={index}>
                        <strong>Q: </strong>
                        {q.question}
                        <br />
                        <strong>A: </strong>
                        {q.answer}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setAnswers({});
                  setCurrentModule(0);
                  setCurrentQuestion(0);
                  setFormattedAnswers([]);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
