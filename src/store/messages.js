import { create } from 'zustand'

export const useMessageStore = create((set, get) => ({
  messages: [
    // {
    //   id: 1,
    //   ia: false,
    //   message: 'what does the render fucntion do in a react component'
    // },
    // {
    //   id: 2,
    //   ia: true,
    //   message:
    //     'The render function in a React component is responsible for defining the structure and content of the component to be displayed on the screen. It returns a description of what should be displayed, typically using JSX syntax. This description is then used by React to update the real DOM to match the desired structure and content. The render function is called whenever the component state or props change, and it should return a new description if the component needs to update its display.'
    // }
  ],
  sendPrompt: async ({ prompt }) => {
    const messageIAId = get().messages.length + 1
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: state.messages.length,
          ia: false,
          message: prompt
        },
        {
          id: messageIAId,
          ia: true,
          // message: ''
          message:
            "The render function in a React component is used to display HTML elements to the user. It is called every time the component's state or props are updated, allowing the component to reflect any changes."
        }
      ]
    }))

    // try {
    //   const response = await fetch('/api/chat', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ prompt })
    //   })
    //   const json = await response.json()

    //   set((state) => ({
    //     messages: state.messages.map((entry) => {
    //       if (entry.id === messageIAId) {
    //         return {
    //           ...entry,
    //           message: json.response
    //         }
    //       }
    //       return entry
    //     })
    //   }))
    // } catch (error) {
    //   console.error(error)
    // }
  }
}))
