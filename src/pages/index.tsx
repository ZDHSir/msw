import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../store/user'
import http from '../utils/axios';
import { useSelector } from '../hooks/useSelector';
import { setTodoList, setDoneList } from '../store/todoList';
import { List } from 'antd';

type Props = {}

export default function Index({}: Props) {
  const dispatch = useDispatch()
  const todoList = useSelector(state => state.todo.todoList)
  const doneList = useSelector(state => state.todo.doneList)
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
      const { result, statusCode } = (await http.get("/user/info")) as any
      console.log({statusCode, result})
  }
  return (
    <div style={{padding: "10px"}}>
      <h3>Todo</h3>
      <br></br>
      <List
        size="small"
        header={<div>TodoList</div>}
        footer={<div></div>}
        bordered
        dataSource={todoList}
        renderItem={(item) => <List.Item>{item.name}</List.Item>}
      />
      <br></br>
      <List
        size="small"
        header={<div>DoneList</div>}
        footer={<div></div>}
        bordered
        dataSource={doneList}
        renderItem={(item) => <List.Item>{item.name}</List.Item>}
      />
      <button onClick={todoListSetter}>设置</button>
      {/* index
      <button onClick={logout}>退出</button>
      <button onClick={getUserInfo}>请求用户信息</button> */}
    </div>
  )
}