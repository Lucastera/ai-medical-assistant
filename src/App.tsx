import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { LogOut, Home } from 'lucide-react'
import { Sidebar } from '@/components/Sidebar'
import { ConversationArea } from '@/components/ConversationArea'
import { LoginPage } from '@/components/LoginPage'
import { RegisterPage, User } from '@/components/RegisterPage'

// Simulate AI response
const simulateAIResponse = (input: string): Promise<MedicalReport> => {
  console.log(input)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        basicInfo: {
          age: 45,
          gender: "male",
          medicalHistory: "No significant medical history",
          familyHistory: "Father had heart disease",
        },
        prompts: {
          symptoms: ["chest pain", "shortness of breath"],
        },
        diagnosis: {
          possibleDisease: "acute coronary syndrome (ACS)",
          department: "emergency department",
          treatmentOptions:
            "tests such as electrocardiograms (ECGs), blood tests, and possibly cardiac imaging studies like echocardiography or coronary angiography to confirm the diagnosis and determine the extent of damage to the heart",
        },
      })
    }, 1000)
  })
}

const simulateHospitalRec = (): Promise<HospitalRecommendation> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        hospitalName: "United Christian Hospital",
        address: "130 Hip Wo Street, Kwun Tong, Kowloon",
        distance: 10440.38,
        contact: "2379 9611",
        department: "Accident & Emergency Department"
      })
    }, 1000)
  })
}

// Simulate user authentication
const simulateAuth = (username: string, password: string): Promise<{ success: boolean; username: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, username })
    }, 500)
  })
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

export interface Message {
  type: 'user' | 'ai' | 'hospital';
  content: string | MedicalReport | HospitalRecommendation;
}

export interface MedicalReport {
  basicInfo: {
    age: number;
    gender: string;
    medicalHistory: string;
    familyHistory: string;
  };
  prompts: {
    symptoms: string[];
  };
  diagnosis: {
    possibleDisease: string;
    department: string;
    treatmentOptions: string;
  };
}

export interface HospitalRecommendation {
  hospitalName: string;
  address: string;
  distance: number;
  contact: string;
  department: string;
}

const App: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginUsername, setLoginUsername] = useState('')
  const [isHomePage, setIsHomePage] = useState(true)
  const [showLoginPage, setShowLoginPage] = useState(true)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // Validate token with the server
      // For now, we'll just set isLoggedIn to true
      setIsLoggedIn(true)
      setLoginUsername(localStorage.getItem('username') || '')
      loadConversations()
    }
  }, [])

  const loadConversations = () => {
    const storedConversations = localStorage.getItem('conversations')
    if (storedConversations) {
      setConversations(JSON.parse(storedConversations))
    }
  }

  const saveConversations = (newConversations: Conversation[]) => {
    localStorage.setItem('conversations', JSON.stringify(newConversations))
  }

  const handleNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: `Chat at ${new Date().toLocaleString()}`,
      messages: []
  };
    const updatedConversations = [...conversations, newConversation]
    setConversations(updatedConversations)
    setCurrentConversation(newConversation)
    setIsHomePage(false)
    saveConversations(updatedConversations)
  }

  const handleSelectConversation = (conversation: Conversation) => {
    setCurrentConversation(conversation)
    setIsHomePage(false)
  }

  const handleDeleteConversation = (conversationId: string) => {
    console.log('aa')
    const updatedConversations = conversations.filter(conv => conv.id !== conversationId)
    setConversations(updatedConversations)
    saveConversations(updatedConversations)
    if (currentConversation?.id === conversationId) {
      setCurrentConversation(null)
      setIsHomePage(true)
    }
  }

  const handleClearHistory = () => {
    setConversations([])
    setCurrentConversation(null)
    setIsHomePage(true)
    localStorage.removeItem('conversations')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setLoginUsername('')
    setConversations([])
    setCurrentConversation(null)
    setIsHomePage(true)
    setShowLoginPage(true)
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  }

  const handleGoHome = () => {
    setIsHomePage(true)
    setCurrentConversation(null)
  }

  const handleLogin = async (username: string, password: string) => {
    // Simulate API call
    const result = await simulateAuth(username, password)
    if (result.success) {
      setIsLoggedIn(true)
      setLoginUsername(username)
      localStorage.setItem('token', 'fake-jwt-token')
      localStorage.setItem('username', username)
      loadConversations()
    }
  }

  const handleRegister = async (userData: User) => {
    // Simulate API call
    const result = await simulateAuth(userData.username, userData.password)
    if (result.success) {
      setIsLoggedIn(true)
      setLoginUsername(userData.username)
      localStorage.setItem('token', 'fake-jwt-token')
      localStorage.setItem('username', userData.username)
    }
  }

  const handleSendMessage = async (message: string) => {
    if (!currentConversation) return

    const userMessage: Message = { type: 'user', content: message }
    const updatedConversation = {
      ...currentConversation,
      messages: [...currentConversation.messages, userMessage]
    }
    setCurrentConversation(updatedConversation)
    const newConversations = conversations.map(conv => conv.id === updatedConversation.id ? updatedConversation : conv)
    setConversations(newConversations)
    saveConversations(newConversations)

    // Simulate AI thinking
    const thinkingMessage: Message = { type: "ai", content: "thinking" };
    const thinkingConversation = {
      ...updatedConversation,
      messages: [...updatedConversation.messages, thinkingMessage]
    }
    setCurrentConversation(thinkingConversation)
    const thinkingConversations = conversations.map(conv => conv.id === thinkingConversation.id ? thinkingConversation : conv)
    setConversations(thinkingConversations)
    saveConversations(thinkingConversations)


    // Simulate AI response
    const newMessages = [...thinkingConversation.messages];
    const lastMessage = newMessages.pop();
    if (
      lastMessage &&
      lastMessage.type === "ai" &&
      lastMessage.content === "thinking"
    ) {
      const aiResponse = await simulateAIResponse(message)
      const aiMessage: Message = { type: 'ai', content: aiResponse }
      newMessages.push(aiMessage);
    } else {
      newMessages.push(lastMessage as Message);
    }

    const finalConversation = {
      ...updatedConversation,
      messages: newMessages
    }
    setCurrentConversation(finalConversation)
    const finalConversations = conversations.map(conv => conv.id === finalConversation.id ? finalConversation : conv)
    setConversations(finalConversations)
    saveConversations(finalConversations)
  }

  const handleRecommendHospital = async () => {
    if (!currentConversation) return

    const hospitalRecommendation = await simulateHospitalRec()

    const hospitalMessage: Message = { type: 'hospital', content: hospitalRecommendation }
    const updatedConversation = {
      ...currentConversation,
      messages: [...currentConversation.messages, hospitalMessage]
    }
    setCurrentConversation(updatedConversation)
    const newConversations = conversations.map(conv => conv.id === updatedConversation.id ? updatedConversation : conv)
    setConversations(newConversations)
    saveConversations(newConversations)
  }

  if (!isLoggedIn) {
    return showLoginPage ? (
      <LoginPage onLogin={handleLogin} onSwitchToRegister={() => setShowLoginPage(false)} />
    ) : (
      <RegisterPage onRegister={handleRegister} onSwitchToLogin={() => setShowLoginPage(true)} />
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">AI Medical Assistant</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Welcome, {loginUsername}</span>
          <Button variant="ghost" onClick={handleGoHome} className="text-gray-600 hover:text-gray-800">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button variant="ghost" onClick={handleLogout} className="text-gray-600 hover:text-gray-800">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>
      <div className="flex flex-grow">
        <Sidebar
          conversations={conversations}
          currentConversationId={currentConversation?.id}
          onNewConversation={handleNewConversation}
          onSelectConversation={handleSelectConversation}
          onDeleteConversation={handleDeleteConversation}
          onClearHistory={handleClearHistory}
          isExpanded={isSidebarExpanded}
          onToggleExpand={() => setIsSidebarExpanded(!isSidebarExpanded)}
        />
        <ConversationArea
          isHomePage={isHomePage}
          currentConversation={currentConversation}
          onNewConversation={handleNewConversation}
          onSendMessage={handleSendMessage}
          onRecommendHospital={handleRecommendHospital}
        />
      </div>
    </div>
  )
}

export default App