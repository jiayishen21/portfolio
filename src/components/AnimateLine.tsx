import React from "react"
import { motion } from "framer-motion"

interface Props {
  content: string
}

const AnimateLine: React.FC<Props> = (props: Props) => {


  return (
    <>
      <motion.div>
        {props.content}
      </motion.div>  
    </>
  )
}

export default AnimateLine

