import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../store/user'

type Props = {}

export default function Index({}: Props) {
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(setUserInfo({token:""}))
  }
  useEffect(() => {
    
  },[])
  return (
    <div>
      index
      <button onClick={logout}>退出</button>
    </div>
  )
}