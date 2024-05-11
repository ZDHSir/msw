import React, { useEffect } from 'react'
import { useSelector } from '../hooks/useSelector'

type Props = {
    children: React.ReactNode
}

export default function Auth({ children }: Props) {
  const user = useSelector(state => state.user)
  useEffect(() => {
      if(!user.token){
        window.location.href = "#/login"
      }
  }, [user])
  return (
    <div>{children}</div>
  )
}