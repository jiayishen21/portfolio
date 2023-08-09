import React from "react"

interface Props {
  projectNumber: number
  setCurProject: React.Dispatch<React.SetStateAction<number>>
  imgPath: string

  setOnMenu: React.Dispatch<React.SetStateAction<boolean>>
  setSwitchMenu: React.Dispatch<React.SetStateAction<number>>
}

const MenuProject: React.FC<Props> = (props: Props) => {


  return (
    <>
      <img
        className="image"
        src={`${process.env.PUBLIC_URL}${props.imgPath}`}
        draggable="false"
        onClick={() => {
          props.setCurProject(props.projectNumber)
          props.setOnMenu(false)
          props.setSwitchMenu(500)
        }}
      />
    </>
  )
}

export default MenuProject
