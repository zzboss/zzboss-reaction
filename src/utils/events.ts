import { CSSProperties } from "react"
import { NavLinkRenderProps } from "react-router"

const activeChange = ({isActive}: NavLinkRenderProps, pros?: CSSProperties) => {
  return {
    ...pros,
    color: isActive ? 'blue' : 'black'
  }
}

export {
  activeChange
}