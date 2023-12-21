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

      '/white-logos/express.png',
      '/white-logos/javascript.png',
      '/white-logos/mongodb.png',
      '/white-logos/next.png',
      '/white-logos/postgres.png',
      '/white-logos/python.png',
      '/white-logos/react.png',
      '/white-logos/typescript.png',
      '/white-logos/waterloo.png',

      '/menu/passionfruit-youth.png',
      '/menu/slime-scholars.png',
      '/menu/visual-sorting-algorithms.png',
      '/passionfruit-youth/0.png',
      '/passionfruit-youth/1.png',
      '/passionfruit-youth/2.png',
      '/passionfruit-youth/main.png',
      '/passionfruit-youth/next-project.png',
      '/slime-scholars/0.png',
      '/slime-scholars/1.png',
      '/slime-scholars/2.png',
      '/slime-scholars/3.png',
      '/slime-scholars/4.png',
      '/slime-scholars/main.png',
      '/slime-scholars/next-project.png',
      '/visual-sorting-algorithms/0.png',
      '/visual-sorting-algorithms/1.png',
      '/visual-sorting-algorithms/2.png',
      '/visual-sorting-algorithms/main.png',
      '/visual-sorting-algorithms/next-project.png',
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