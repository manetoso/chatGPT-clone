export function Avatar({ children }) {
  return (
    <figure className='w-8 h-8 flex items-center justify-center rounded-sm bg-gptlogo'>
      {children}
    </figure>
  )
}
