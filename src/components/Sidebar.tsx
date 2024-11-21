import React, { useState } from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { PlusCircle, Trash2, Paintbrush, Menu } from "lucide-react";
import { Conversation } from "@/App";

interface SidebarProps {
  conversations: Conversation[];
  currentConversationId: string | undefined;
  onNewConversation: () => void;
  onSelectConversation: (conversation: Conversation) => void;
  onDeleteConversation: (conversationId: string) => void;
  onClearHistory: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  currentConversationId,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
  onClearHistory,
  isExpanded,
  onToggleExpand,
}) => {
  const [hoveredConversationId, setHoveredConversationId] = useState<
    string | null
  >(null);

  return (
    <div
      className={`bg-gray-100 flex flex-col transition-all duration-300 ${
        isExpanded ? "w-72" : "w-32"
      }`}
    >
      <div className="p-4 flex items-center justify-between">
        <Button
          onClick={onNewConversation}
          className={`bg-green-500 hover:bg-green-600 text-white ${
            isExpanded ? "w-full" : "w-12 h-12"
          }`}
        >
          <PlusCircle className={`h-5 w-5 ${isExpanded ? "mr-2" : ""}`} />
          {isExpanded && "New Conversation"}
        </Button>
        <Button variant="ghost" onClick={onToggleExpand} className="ml-2">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <Separator className="mt-2" />
      <ScrollArea className="flex-grow">
        {conversations.map((conv, index) => (
          <div key={conv.id}>
            <div
              className={`w-full justify-start py-4 px-5 text-left relative hover:bg-gray-200 ${
                conv.id === currentConversationId ? "bg-gray-300" : ""
              }`}
              onClick={() => onSelectConversation(conv)}
              onMouseOver={() => setHoveredConversationId(conv.id)}
              onMouseOut={() => setHoveredConversationId(null)}
            >
              {isExpanded ? (
                <>{conv.title}</>
              ) : (
                <span className="text-center w-full">{index + 1}</span>
              )}
              {isExpanded && hoveredConversationId === conv.id && (
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0 absolute right-2 top-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteConversation(conv.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Separator />
          </div>
        ))}
      </ScrollArea>
      <div className="p-4">
        <Separator className="my-2" />
        <Button
          variant="ghost"
          onClick={onClearHistory}
          className="w-full text-gray-600"
        >
          <Paintbrush className="mr-2 h-4 w-4" />
          {isExpanded && "Clear History"}
        </Button>
      </div>
    </div>
  );
};
