import { Button, Menu, message, Modal, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import './App.css';
import Folder from './component/Folder';

function App() {
  const [visible, setVisible] = useState(false);
  const [num, setNum] = useState(0);
  const [left, setLeft] = useState(-999)
  const [top, setTop] = useState(-999)
  const [width, ] = useState(180)
  const listArr = ['name1', 'name2', 'name3']
  const [list, setList] = useState(listArr)

  // 右键文件夹事件回调
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

  // 点击事件回调
  const handleAppClick = () => {
    setVisible(false)
  }

  // 新建事件回调
  const handleMenuClick = (a: { key: any }) => {
    list.push(`新建文件夹${num ? num : ''}`)
    let newNum = num + 1;
    setNum(newNum);

    const temp = [...list];
    setList(temp);
    setVisible(false);
  }

  // 删除文件夹事件回调
  const deleteFolder = (a: any) => {
    const temp = [...list].filter(item => item !== a);
    setList(temp);
  }

  return (
    <div className="App" onContextMenu={handleContextMenu} onClick={handleAppClick}>
      {
        list.map((data, index) => {
          return <Folder data={data} deleteFolder={deleteFolder} key={index}></Folder>
        })
      }

      {/* 新建菜单 */}
      <div className="AppMenu" style={{ display: visible ? 'block' : 'none' }}>
        <Menu
          onClick={handleMenuClick}
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
