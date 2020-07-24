import React from "react";
import { List, Card, Tooltip, Dropdown, Menu, Avatar } from "antd";
import {
  DownloadOutlined,
  EditOutlined,
  ShareAltOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import styles from "./index.module.less";
import numeral from 'numeral';

const itemMenu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener norefeerer"
        href="https://www.alipay.com"
      >
        1st Menu Item
      </a>
      <a
        target="_blank"
        rel="noopener norefeerer"
        href="https://www.alipay.com"
      >
        2nd Menu Item
      </a>
      <a
        target="_blank"
        rel="noopener norefeerer"
        href="https://www.alipay.com"
      >
        3rd Menu Item
      </a>
    </Menu.Item>
  </Menu>
);

const CardInfo = ({activeUser, newUser }) => (
    <div className={styles.cardInfo}>
        <div>
            <p>Active User</p><p>{activeUser}</p>
        </div>
        <div>
            <p>New User</p><p>{newUser}</p>
        </div>
    </div>
);

function formatWan(val) {
    const v = val * 1;
    if(!v || Number.isNaN(v) )
        return '';
    let result = val;
    if(val > 10000) {
        result = (
            <span>
                {Math.floor(val / 1000)}
                <span>
                    k
                </span>
            </span>
        )
    }
    return result;
}

const Applications = ({ list }) => {
  return (
    <List
      className={styles.fitlerCardList}
      rowKey="id"
      grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
      dataSource={list}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <Card
            hoverable
            bodyStyle={{ paddingBottom: 20 }}
            actions={[
              <Tooltip key="download" title="Download">
                <DownloadOutlined />
              </Tooltip>,
              <Tooltip key="edit" title="Edit">
                <EditOutlined />
              </Tooltip>,
              <Tooltip key="share" title="Share">
                <ShareAltOutlined />
              </Tooltip>,
              <Dropdown overlay={itemMenu} key="ellipsis">
                <EllipsisOutlined />
              </Dropdown>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar size="small" src={item.avatar} />}
              title={item.title}
            />
            <div>
                <CardInfo
                    activeUser={formatWan(item.activeUser)}
                    newUser={numeral(item.newUser).format('0.0')}
                />
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default Applications;
