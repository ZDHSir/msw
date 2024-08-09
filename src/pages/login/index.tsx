import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { setUserInfo } from '../../store/user'
import http from '../../utils/axios';

type Props = {}

export default function Login({}: Props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const login = async() => {
    try {
      const data = await http.post("/user/login", {username: "admin", password: "123456"}) as any
      dispatch(setUserInfo(data.result))
      navigate("/")
    } catch (error) {
      console.log({error});
    }
  }
  return (
    <div>
      登陆界面 
      <button onClick={login}>跳转首页</button>
    </div>
  )
}