import { create } from 'zustand'

type State = {
  activeVisitor: string | null,
  setActiveVisitor: (visitorId: string | null) => void
}

export const useVisitorStore = create<State>((set) => ({
  activeVisitor: null,
  setActiveVisitor: (visitor) => set({ activeVisitor: visitor }),
}))