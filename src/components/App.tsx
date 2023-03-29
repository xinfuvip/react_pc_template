import { useAtom } from 'jotai'
import { countAtom, doubledCountAtom, fetchDataAtom } from 'models/count'

function App() {
  // const { isLoading, error, data } = useQuery<any, Error>('repoData', () =>
  //   fetch('https://example.com/profile').then((res) => res.json())
  // )

  // if (isLoading) return <span>Loading...</span>

  // if (error) return <span>`An error has occurred: ${error.message}`</span>

  const [count, setCount] = useAtom(countAtom)
  const [doubledCount] = useAtom(doubledCountAtom)

  const [json] = useAtom(fetchDataAtom)

  return (
    <div className="bg-warmgray">
      <div className="justify-center">
        {count}
        <h2>{doubledCount}</h2>
        <button onClick={() => setCount((c) => c + 1)}>one up</button>
      </div>

      <div
        className="mx-auto
       max-w-screen-xl py-14 px-4 sm:py-24 sm:px-6 lg:px-8"
      >
        <div className="text-center">
          <h2 className="text-amber font-semibold uppercase tracking-wide  font-800 text-6xl">
            Welcome to
          </h2>
          <p className="my-3 text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl sm:font-bold ">
            reactjs-vite-tailwindcss-boilerplate
          </p>
          <p className="text-xl text-gray-400">Start building for free.</p>
          <p className="mt-5 items-center"></p>
        </div>
      </div>
    </div>
  )
}

export default App
