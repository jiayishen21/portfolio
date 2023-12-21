import { useState, useEffect } from "react"
import App from "./App"
import LoadingBar from "./components/LoadingBar"

const Loading: React.FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (loading) {
      const timeoutId = setTimeout(() => setLoading(false), 4000)

      return () => clearTimeout(timeoutId)
    }
  }, [loading])

  return (
    <>
      {loading ?
        <LoadingBar />
        :
        <App />
      }
    </>
  )
}

export default Loading