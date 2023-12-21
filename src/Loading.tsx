import { useState, useEffect } from "react"
import App from "./App"
import LoadingBar from "./components/LoadingBar"

const Loading: React.FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (loading) {
      const timeoutId = setTimeout(() => setLoading(false), 6000)

      return () => clearTimeout(timeoutId)
    }
  }, [loading])

  useEffect(() => {
    const imgPaths = [
      'me-landscape.png',
      'me.png',
      'me2.png',
      'passionfruit-youth.png',
      'slime-scholars.png',
      'visual-sorting-algorithm.png',
    ]

    const preloadImgs = (paths: string[]) => {
      paths.forEach((path: string) => {
        const img = new Image()
        img.src = process.env.PUBLIC_URL + '/imgs/' + path
        console.log(img)
      })
    }

    preloadImgs(imgPaths)

  }, [])

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