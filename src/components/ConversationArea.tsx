import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardFooter } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { PlusCircle, Send, Bot, Hospital, Navigation } from "lucide-react";
import {
  Conversation,
  HospitalRecommendation,
  MedicalReport,
  Message,
} from "@/App";

interface ConversationAreaProps {
  isHomePage: boolean;
  currentConversation: Conversation | null;
  onNewConversation: () => void;
  onSendMessage: (message: string) => Promise<void>;
  onRecommendHospital: () => Promise<void>;
}

export const ConversationArea: React.FC<ConversationAreaProps> = ({
  isHomePage,
  currentConversation,
  onNewConversation,
  onSendMessage,
  onRecommendHospital,
}) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendingHospitalState, setRecommendingHospitalState] =
    useState("Recommend Hospital");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (currentConversation) {
      setMessages(currentConversation.messages);
      if (
        currentConversation.messages.find((item) => item.type === "hospital")
      ) {
        setRecommendingHospitalState("Recommended");
      } else {
        setRecommendingHospitalState("Recommend Hospital");
      }
    } else {
      setMessages([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentConversation]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    setIsLoading(true);
    setInput("");
    setIsLoading(false);
    onSendMessage(input);
  };

  const handleRecommendHospital = async () => {
    if (!recommendingHospitalState) return;
    setRecommendingHospitalState("Recommending...");
    await onRecommendHospital();
    setRecommendingHospitalState("Recommended");
  };

  const renderThinkingState = () => (
    <div className="flex items-center space-x-2 shrink-0">
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce shrink-0"></div>
      <div
        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce shrink-0"
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div
        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce shrink-0"
        style={{ animationDelay: "0.4s" }}
      ></div>
    </div>
  );

  return (
    <div className="flex-grow flex flex-col bg-gray-50 max-w-4xl mx-auto w-full">
      <Card className="flex-grow flex flex-col m-4 border-gray-200 shadow-sm">
        <CardContent className="flex-grow overflow-auto p-6">
          {isHomePage ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <Bot className="h-16 w-16 mb-6 text-gray-400" />
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                Welcome to AI Medical Assistant
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Your intelligent health companion, ready to answer your medical
                questions
              </p>
              <Button
                onClick={onNewConversation}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Start New Conversation
              </Button>
            </div>
          ) : (
            <ScrollArea className="h-full pr-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  } mb-6`}
                >
                  <div
                    className={`flex items-start ${
                      message.type === "user" ? "flex-row-reverse" : ""
                    } space-x-2`}
                  >
                    <Avatar
                      className={`w-8 h-8 ${
                        message.type === "user" ? "ml-2" : ""
                      }`}
                    >
                      <AvatarFallback>
                        {message.type === "user" ? "U" : "AI"}
                      </AvatarFallback>
                    </Avatar>
                    <Card
                      className={`max-w-[8Recommended HospitalRecommended Hospital0%] ${
                        message.type === "user"
                          ? "bg-green-500 text-white"
                          : "bg-white"
                      }`}
                    >
                      <CardContent className="p-3">
                        {message.type === "user" ? (
                          <p>{message.content as string}</p>
                        ) : message.type === "ai" ? (
                          message.content === "thinking" ? (
                            renderThinkingState()
                          ) : (
                            <div className="space-y-6 p-4 bg-white">
                              <h3 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-300 pb-2">
                                Medical Report
                              </h3>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                  <h4 className="font-semibold text-gray-800 mb-2">
                                    Basic Information
                                  </h4>
                                  <p className="text-gray-700">
                                    <strong>Age:</strong>{" "}
                                    {
                                      (message.content as MedicalReport)
                                        .basicInfo?.age
                                    }
                                  </p>
                                  <p className="text-gray-700">
                                    <strong>Gender:</strong>{" "}
                                    {
                                      (message.content as MedicalReport)
                                        .basicInfo?.gender
                                    }
                                  </p>
                                  <p className="text-gray-700">
                                    <strong>Medical History:</strong>
                                    <br />
                                    {
                                      (message.content as MedicalReport)
                                        .basicInfo?.medicalHistory
                                    }
                                  </p>
                                  <p className="text-gray-700">
                                    <strong>Family History:</strong>
                                    <br />
                                    {
                                      (message.content as MedicalReport)
                                        .basicInfo?.familyHistory
                                    }
                                  </p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                  <h4 className="font-semibold text-gray-800 mb-2">
                                    Symptoms
                                  </h4>
                                  <ul className="list-disc list-inside text-gray-700">
                                    {(
                                      message.content as MedicalReport
                                    ).prompts?.symptoms?.map((symptom, i) => (
                                      <li key={i}>{symptom}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                <h4 className="font-semibold text-gray-800 mb-2">
                                  Diagnosis
                                </h4>
                                <p className="text-gray-700">
                                  <strong>Possible Disease:</strong>{" "}
                                  {
                                    (message.content as MedicalReport)
                                      ?.diagnosis?.possibleDisease
                                  }
                                </p>
                                <p className="text-gray-700">
                                  <strong>Recommended Department:</strong>{" "}
                                  {
                                    (message.content as MedicalReport)
                                      ?.diagnosis?.department
                                  }
                                </p>
                                <p className="text-gray-700">
                                  <strong>Treatment Options:</strong>{" "}
                                  {
                                    (message.content as MedicalReport)
                                      ?.diagnosis?.treatmentOptions
                                  }
                                </p>
                              </div>

                              <div className="flex justify-end">
                                <Button
                                  onClick={handleRecommendHospital}
                                  disabled={
                                    recommendingHospitalState !==
                                    "Recommend Hospital"
                                  }
                                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition"
                                >
                                  <Hospital className="mr-2 h-5 w-5" />
                                  {recommendingHospitalState}
                                </Button>
                              </div>
                            </div>
                          )
                        ) : (
                          <div className="bg-white rounded-lg p-6 space-y-4 border border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                              <Navigation className="w-6 h-6 text-gray-600 mr-2" />
                              Recommended Hospital
                            </h3>
                            <p className="text-lg text-gray-800">
                              <span className="font-semibold">Name:</span>{" "}
                              {
                                (message.content as HospitalRecommendation)
                                  .hospitalName
                              }
                            </p>
                            <p className="text-lg text-gray-800">
                              <span className="font-semibold">Address:</span>{" "}
                              {
                                (message.content as HospitalRecommendation)
                                  .address
                              }
                            </p>
                            <div className="flex justify-between text-lg text-gray-700">
                              <span>
                                <span className="font-semibold">Distance:</span>{" "}
                                {(
                                  message.content as HospitalRecommendation
                                ).distance.toFixed(2)}{" "}
                                km
                              </span>
                              <span>
                                <span className="font-semibold">Contact:</span>{" "}
                                {
                                  (message.content as HospitalRecommendation)
                                    .contact
                                }
                              </span>
                            </div>
                            <p className="text-lg text-gray-800">
                              <span className="font-semibold">Department:</span>{" "}
                              {
                                (message.content as HospitalRecommendation)
                                  .department
                              }
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </ScrollArea>
          )}
        </CardContent>
        {!isHomePage && messages.length === 0 && (
          <CardFooter>
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="Please describe your symptoms..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                disabled={isLoading}
                className="flex-grow bg-white"
              />
              <Button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                {isLoading ? "Sending..." : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};
