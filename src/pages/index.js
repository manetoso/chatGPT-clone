import { useRef } from 'react'
import Head from 'next/head'

import { Avatar } from '@/components/Avatar'
import { TypingEffect } from '@/components/TypingEffect'
import { ChatGPTIcon, PlusIcon, SendIcon } from '@/components/Icons'

import { useMessageStore } from '@/store/messages'

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Some AI Chat GPT</title>
      </Head>
      <div className='w-full relative bg-gptgray h-screen'>
        <Aside />
        {children}
      </div>
    </>
  )
}
function Aside() {
  return (
    <aside className='bg-gptdarkgray fixed flex w-64 h-screen flex-col'>
      <nav className='flex flex-col flex-1 h-full p-2 space-y-1'>
        <button className='flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20'>
          <PlusIcon />
          New chat
        </button>
      </nav>
    </aside>
  )
}
function UserAvar() {
  return (
    <img
      src='https://lh3.googleusercontent.com/a/AEdFTp6qvZ51gZaS10OcmT1Rhc-4GsSybi9QMZjSCcGl=s576-p-rw-no'
      alt='avatar'
    />
  )
}
function Message({ ia, message }) {
  const background = ia ? 'bg-gptlightgray' : 'bg-gptgray'
  const avatar = ia ? <ChatGPTIcon /> : <UserAvar />
  const textElement = ia ? <TypingEffect text={message} /> : message
  return (
    <div className={`${background}`}>
      <article className='flex gap-4 p-6 m-auto max-w-3xl text-gray-100'>
        <Avatar>{avatar}</Avatar>
        <div className='min-h-[20px] flex flex-1 flex-col items-start gap-4 whitespace-pre-wrap'>
          <div className='prose-invert w-full break-words'>
            <p>{textElement}</p>
          </div>
        </div>
      </article>
    </div>
  )
}
function Chat() {
  const messages = useMessageStore((state) => state.messages)
  return (
    <div className='flex flex-col h-full flex-1 pl-64'>
      <main>
        {messages.map((message) => (
          <Message key={message.id} {...message} />
        ))}
      </main>
      <ChatForm />
    </div>
  )
}
function ChatForm() {
  const sendPrompt = useMessageStore((state) => state.sendPrompt)
  const textAreaRef = useRef()
  const handleSubmit = (event) => {
    event?.preventDefault()
    const { value } = textAreaRef.current
    if (value === '') return
    sendPrompt({ prompt: value })
    textAreaRef.current.value = ''
    textAreaRef.current.style.height = '24px'
  }
  const handleChange = () => {
    const el = textAreaRef.current
    el.style.height = '0px'
    const scrollHeight = el.scrollHeight
    el.style.height = scrollHeight + 'px'
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit()
    }
  }
  return (
    <section className='absolute bottom-0 w-full left-0 ml-32'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-row max-w-xs md:max-w-md lg:max-w-3xl pt-6 m-auto mb-6'
      >
        <div className='relative flex flex-col flex-grow w-full px-4 py-3 text-white border rounded-md shadow-lg bg-gptlightgray border-gray-900/50'>
          <textarea
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            ref={textAreaRef}
            rows={1}
            tabIndex={0}
            autoFocus
            defaultValue=''
            className='w-full h-[24px] resize-none bg-transparent m-0 border-0 outline-none'
          />
          <button
            type='submit'
            className='absolute p-1 rounded-md bottom-2.5 right-2.5'
          >
            <SendIcon />
          </button>
        </div>
      </form>
    </section>
  )
}

export default function Home() {
  return (
    <Layout>
      <Chat />
    </Layout>
  )
}
