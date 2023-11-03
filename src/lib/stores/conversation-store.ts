import create from 'zustand'

type State = {
  activeConversation: string | null,
  setActiveConversation: (conversationId: string | null) => void
}

export const useConversationStore = create<State>((set) => ({
  activeConversation: null,
  setActiveConversation: (conversationId) => set({ activeConversation: conversationId }),
}))