import React, { useState } from 'react';
import './index.css'
import { Modal, Menu } from 'antd';
import { FileOutlined } from '@ant-design/icons';

function Folder(props: { data: any, deleteFolder: any }) {
  const { data, deleteFolder } = props;
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [left, setLeft] = useState(-999)
  const [top, setTop] = useState(-999)
  const [width, ] = useState(180)

  // 右键文件夹事件回调
  const handleContextMenu = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setIsMenuVisible(true);

    const scrollWidth = document.body.scrollWidth;
    const scrollHeight = document.body.scrollHeight;
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

  // 文件夹点击事件回调
  const handleFolderClick = () => {
    setIsMenuVisible(false)
  }

  // 确定事件回调
  const handleOk = () => {
    setIsModalVisible(false);
  };

  // 取消事件回调
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 文件夹打开或删除事件回调
  const handleMenuClick = (a: { key: any }) => {
    if (a.key === '0') {
      // 打开文件夹
      setIsModalVisible(true)
    } else {
      // 删除文件夹
      deleteFolder(data);
    }
  }

  return (
    <div className="Folder" onContextMenu={handleContextMenu} onClick={handleFolderClick}>
      <FileOutlined style={{ fontSize: '84px', color: '#08c' }} />
      <span className='folder-name'>{data}</span>

      {/* 弹窗 */}
      <Modal mask={false} title={data} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        {data}
      </Modal>

      {/* 打开删除菜单 */}
      <div className="AppMenu" style={{ display: isMenuVisible ? 'block' : 'none' }}>
        <Menu
          onClick={handleMenuClick}
          style={{ width, border: '1px solid #cacaca', position: 'absolute', left: left+'px', top: top+'px' }}
        >
          <Menu.Item key="0">
            打开
          </Menu.Item>
          <Menu.Item key="1">
            删除
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
}

export default Folder;
