import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../store/user'
import {request} from "../utils/http";

type Props = {}

export default function Index({}: Props) {
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(setUserInfo({token:""}))
  }
  const getUserInfo = async() => {
      const { result, statusCode } = await request.get("/user/info")
      console.log({statusCode, result})
  }
  return (
    <div>
      index
      <button onClick={logout}>退出</button>
      <button onClick={getUserInfo}>请求用户信息</button>
    </div>
  )
}