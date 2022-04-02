import { Button, Menu, message, Modal, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import './App.css';
import Folder from './component/Folder';

function App() {
  const [visible, setVisible] = useState(false);
  let [num, setNum] = useState(0);
  const [left, setLeft] = useState(-999)
  const [top, setTop] = useState(-999)
  const [width, ] = useState(180)

  const deleteFolder = (a: any) => {
    const temp = [...list].filter(item => item !== a);
    setList(temp);
  }

  const handleContextMenu = (e: any) => {
    e.preventDefault();
    setVisible(true);
    
    const scrollWidth =  document.body.scrollWidth;
    const scrollHeight =  document.body.scrollHeight;
    let curX = e.clientX;
    let curY = e.clientY;

    if (scrollWidth - curX < width) {
      curX = scrollWidth - width - 10
    }
    if (scrollHeight - (curY + 15) < 40) {
      curY = scrollHeight - 40
    }

    setLeft(curX);
    setTop(curY);
  }

  const handleClick = (a: { key: any }) => {
    list.push(`新建文件夹${num ? num : ''}`)
    let newNum = ++num;
    setNum(newNum);

    const temp = [...list];
    setList(temp);
    setVisible(false);
  }

  const handleAppClick = () => {
    setVisible(false)
  }



  const listArr = ['name1', 'name2', 'name3']
  const [list, setList] = useState(listArr)

  return (
    <div className="App" onContextMenu={handleContextMenu} onClick={handleAppClick}>
      {
        list.map((data) => {
          return <Folder data={data} deleteFolder={deleteFolder}></Folder>
        })
      }

      {/* 新建菜单 */}
      <div className="AppMenu" style={{ display: visible ? 'block' : 'none' }}>
        <Menu
          onClick={handleClick}
          style={{ width, border: '1px solid #cacaca', position: 'absolute', left: left+'px', top: top+'px' }}
        >
          <Menu.Item key="0">
            新建
          </Menu.Item>
        </Menu>
      </div>

    </div>
  );
}

export default App;
