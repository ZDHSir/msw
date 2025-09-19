import React from 'react'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../store/user'
import http from '../utils/axios';
import { useSelector } from '../hooks/useSelector';
import { setTodoList, setDoneList } from '../store/todoList';
import { Button } from 'antd';
import { useNavigate, useNavigation, useRoutes } from 'react-router';

type Props = {}

export default function Index({}: Props) {
  const dispatch = useDispatch()
  const todoList = useSelector(state => state.todo.todoList)
  const doneList = useSelector(state => state.todo.doneList)
  const nav = useNavigate();
  const todoListSetter = () => {
    dispatch(setTodoList([{id: 1, name: "123", content: "做作业"}]))
  }
  const doneListSetter = () => {
    console.log({todoList});
    dispatch(setDoneList([{id: 1, name: "123", content: "做作业"}]))
  }
  const logout = () => {
    dispatch(setUserInfo({token:""}))
  }
  const getUserInfo = async() => {
      const { result, statusCode } = (await http.get("/api/user/info")) as any
      console.log({statusCode, result})
  }
  return (
    <div style={{padding: "10px"}}>
      <h3>Todo</h3>
      <br></br>
      <Button onClick={()=>{
        nav('/home')
      }}>
        点击跳转home
      </Button>
      <Button onClick={()=>{
        nav('/vn007')
      }}>
        点击跳转vn007
      </Button>
      <Button onClick={()=>{
        nav('/swiper')
      }}>
        点击跳转swiper
      </Button>
    </div>
  )
}