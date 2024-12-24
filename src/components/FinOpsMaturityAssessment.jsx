// src/components/FinOpsMaturityAssessment.jsx

import React, { useState } from "react";
import { Check, AlertCircle, Info } from "lucide-react";

const FinOpsMaturityAssessment = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const maturityDimensions = [
    {
      title: "Cost Visibility & Allocation",
      questions: [
        {
          id: "cv1",
          text: "Do you have complete visibility into cloud costs across all providers?",
          options: [
            { value: 1, label: "Limited visibility" },
            { value: 2, label: "Basic reporting in place" },
            { value: 3, label: "Comprehensive dashboards" },
            { value: 4, label: "Advanced analytics with forecasting" },
          ],
        },
        {
          id: "cv2",
          text: "How effectively are costs allocated to business units?",
          options: [
            { value: 1, label: "No allocation" },
            { value: 2, label: "Basic tagging strategy" },
            { value: 3, label: "Automated allocation" },
            { value: 4, label: "Full chargeback implementation" },
          ],
        },
      ],
    },
    {
      title: "Optimization Practices",
      questions: [
        {
          id: "op1",
          text: "How do you manage resource provisioning?",
          options: [
            { value: 1, label: "Manual provisioning" },
            { value: 2, label: "Basic automation" },
            { value: 3, label: "Infrastructure as Code" },
            { value: 4, label: "Full automation with optimization" },
          ],
        },
        {
          id: "op2",
          text: "What is your approach to Reserved Instances/Savings Plans?",
          options: [
            { value: 1, label: "No commitments" },
            { value: 2, label: "Basic commitments" },
            { value: 3, label: "Strategic commitment planning" },
            { value: 4, label: "Automated commitment optimization" },
          ],
        },
      ],
    },
    {
      title: "Governance & Automation",
      questions: [
        {
          id: "ga1",
          text: "How mature are your cost control policies?",
          options: [
            { value: 1, label: "No policies" },
            { value: 2, label: "Basic budgets" },
            { value: 3, label: "Automated alerts" },
            { value: 4, label: "Predictive controls" },
          ],
        },
        {
          id: "ga2",
          text: "What level of automation exists in your cost management?",
          options: [
            { value: 1, label: "Manual processes" },
            { value: 2, label: "Some automation" },
            { value: 3, label: "Extensive automation" },
            { value: 4, label: "AI-driven optimization" },
          ],
        },
      ],
    },
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const calculateResults = () => {
    const dimensionScores = maturityDimensions.map((dimension) => {
      const questionScores = dimension.questions.map((q) => answers[q.id] || 0);
      return {
        dimension: dimension.title,
        score:
          questionScores.reduce((a, b) => a + b, 0) / questionScores.length,
      };
    });

    const overallScore =
      dimensionScores.reduce((acc, dim) => acc + dim.score, 0) /
      dimensionScores.length;

    return {
      dimensionScores,
      overallScore,
      maturityLevel: getMaturityLevel(overallScore),
    };
  };

  const getMaturityLevel = (score) => {
    if (score >= 3.5) return { level: "Advanced", color: "text-green-600" };
    if (score >= 2.5) return { level: "Established", color: "text-blue-600" };
    if (score >= 1.5) return { level: "Developing", color: "text-yellow-600" };
    return { level: "Basic", color: "text-red-600" };
  };

  const allQuestionsAnswered = () => {
    return maturityDimensions.every((dimension) =>
      dimension.questions.every((question) => answers[question.id])
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          FinOps Maturity Assessment
        </h2>

        {!showResults ? (
          <>
            <div className="mb-8">
              <div className="flex justify-between mb-4">
                {maturityDimensions.map((dim, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSection(index)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentSection === index
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {dim.title}
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                {maturityDimensions[currentSection].questions.map(
                  (question) => (
                    <div
                      key={question.id}
                      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6"
                    >
                      <p className="mb-4 font-medium">{question.text}</p>
                      <div className="grid grid-cols-2 gap-4">
                        {question.options.map((option) => (
                          <button
                            key={option.value}
                            onClick={() =>
                              handleAnswer(question.id, option.value)
                            }
                            className={`p-4 rounded-lg border-2 transition-colors ${
                              answers[question.id] === option.value
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                                : "border-gray-200 dark:border-gray-700 hover:border-blue-200"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                  answers[question.id] === option.value
                                    ? "border-blue-500 bg-blue-500"
                                    : "border-gray-300"
                                }`}
                              >
                                {answers[question.id] === option.value && (
                                  <Check className="w-3 h-3 text-white" />
                                )}
                              </div>
                              <span>{option.label}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() =>
                  setCurrentSection((prev) => Math.max(0, prev - 1))
                }
                className="px-6 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                disabled={currentSection === 0}
              >
                Previous
              </button>

              {currentSection < maturityDimensions.length - 1 ? (
                <button
                  onClick={() => setCurrentSection((prev) => prev + 1)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={() => setShowResults(true)}
                  disabled={!allQuestionsAnswered()}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  View Results
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="space-y-8">
            {(() => {
              const results = calculateResults();
              return (
                <>
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">
                      Overall Maturity Level
                    </h3>
                    <p
                      className={`text-3xl font-bold ${results.maturityLevel.color}`}
                    >
                      {results.maturityLevel.level}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      Score: {results.overallScore.toFixed(1)} / 4.0
                    </p>
                  </div>

                  <div className="grid gap-6">
                    {results.dimensionScores.map((dim, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6"
                      >
                        <h4 className="font-medium mb-2">{dim.dimension}</h4>
                        <div className="relative pt-1">
                          <div className="flex mb-2 items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-blue-100 text-blue-600">
                                Score: {dim.score.toFixed(1)}
                              </span>
                            </div>
                          </div>
                          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                            <div
                              style={{ width: `${(dim.score / 4) * 100}%` }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6">
                    <h4 className="font-medium mb-4 flex items-center gap-2">
                      <Info className="w-5 h-5 text-blue-600" />
                      Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {results.overallScore < 2.5 && (
                        <>
                          <li className="flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <span>
                              Consider implementing basic cost allocation and
                              tagging strategies
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <span>
                              Establish foundational cost monitoring practices
                            </span>
                          </li>
                        </>
                      )}
                      {results.overallScore >= 2.5 &&
                        results.overallScore < 3.5 && (
                          <>
                            <li className="flex items-start gap-2">
                              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                              <span>
                                Focus on automating cost optimization processes
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                              <span>
                                Implement advanced reporting and forecasting
                              </span>
                            </li>
                          </>
                        )}
                      {results.overallScore >= 3.5 && (
                        <>
                          <li className="flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-green-600 mt-0.5" />
                            <span>
                              Consider AI-driven optimization strategies
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-green-600 mt-0.5" />
                            <span>
                              Explore predictive analytics for cost management
                            </span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => {
                        setShowResults(false);
                        setAnswers({});
                        setCurrentSection(0);
                      }}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Start Over
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinOpsMaturityAssessment;
