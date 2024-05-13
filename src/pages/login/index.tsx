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
    // dispatch(setUserInfo({token:"1231111"}))
    request.post("/user/login", {method:"POST"}).then(res => res.json()).then(result => {
      console.log(111,{result})
    })
    // navigate("/")
  }
  const testFetch = async() => {
    const promise = fetch("user/login", {method:"POST"})
    console.log(promise.finally())
  }
  return (
    <div>
      Login 
      <button onClick={login}>跳转首页</button>
      <button onClick={testFetch}>点击</button>
    </div>
  )
}