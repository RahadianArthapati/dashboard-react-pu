import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Menu } from 'antd'
import { DataTable, DropMenu } from 'components'
import { UPDATE, STATUS, DELETE } from 'constants/options'
import styles from './List.less'

const confirm = Modal.confirm

function List ({
  accountAdmin: {
    list,
    pagination,
  },
  loading,
  updatePower,
  deletePower,
  onPageChange,
  onDeleteItem,
  onEditItem,
  onStatusItem,
}) {
  const handleDeleteItem = (record) => {
    confirm({
      title: '您确定要删除这条记录吗?',
      onOk () {
        onDeleteItem(record.id)
      },
    })
  }

  const handleMenuClick = (key, record) => {
    return {
      [UPDATE]: onEditItem,
      [STATUS]: onStatusItem,
      [DELETE]: handleDeleteItem,
    }[key](record)
  }

  const columns = [
    {
      title: 'Operation',
      key: 'operation',
      // width: 100,
      render: (text, record) => (
        <DropMenu>
          <Menu onClick={({ key }) => handleMenuClick(key, record)}>
            {updatePower && <Menu.Item key={STATUS}>{record.status ? '禁用' : '启用'}</Menu.Item>}
            {updatePower && <Menu.Item key={UPDATE}>编辑</Menu.Item>}
            {deletePower && <Menu.Item key={DELETE}>删除</Menu.Item>}
          </Menu>
        </DropMenu>
      ),
      // fixed: 'right'
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 64,
      className: styles.avatar,
      render: text => <img width={24} src={text} alt={text} />,
    }, {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'isMale',
      dataIndex: 'isMale',
      key: 'isMale',
      render: text => (<span>{text
        ? '男'
        : '女'}</span>),
    }, {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: 'Role Name',
      dataIndex: 'roleName',
      key: 'roleName',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'Created Time',
      dataIndex: 'createTime',
      key: 'createTime',
    }, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => <span>{status ? '已启用' : '已禁用'}</span>,
    }
  ]

  return (
    <DataTable
      className={styles.table}
      columns={columns}
      dataSource={list}
      loading={loading.effects['accountAdmin/query']}
      pagination={pagination}
      onPageChange={onPageChange}
      rowKey={record => record.id}
    />
  )
}

List.propTypes = {
  loading: PropTypes.object.isRequired,
  accountAdmin: PropTypes.object.isRequired,
  updatePower: PropTypes.bool.isRequired,
  deletePower: PropTypes.bool.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onStatusItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
}

export default List
