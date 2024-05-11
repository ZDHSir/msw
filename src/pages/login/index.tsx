import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { setUserInfo } from '../../store/user'

type Props = {}

export default function Login({}: Props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const login = () => {
    dispatch(setUserInfo({token:"1231111"}))
    navigate("/")
  }
  return (
    <div>
      Login 
      <button onClick={login}>跳转首页</button>
    </div>
  )
}