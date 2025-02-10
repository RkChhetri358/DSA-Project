import React from 'react'
import { useOutletContext } from "react-router-dom";
export default function Frontpage() {
     const [backgroundColor] = useOutletContext();
  return (
    <div>Frontpage</div>
  )
}
