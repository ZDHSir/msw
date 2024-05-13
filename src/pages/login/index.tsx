import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { setUserInfo } from '../../store/user'
import {request} from "../../utils/http";

type Props = {}

export default function Login({}: Props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const login = () => {
    request.post("/user/login", {method:"POST"}).then(res => res.json()).then(({result}) => {
      dispatch(setUserInfo(result))
    })
    navigate("/")
  }
  return (
    <div>
      Login 
      <button onClick={login}>跳转首页</button>
    </div>
  )
}