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
    }[key](record)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      visibility: false
    },{
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
    }, {
      title: '',
      key: 'action',
      render: (text, record) => (
        <DropMenu>
          <Menu onClick={({ key }) => handleMenuClick(key, record)}>
            {updatePower && <Menu.Item key={UPDATE}>Edit</Menu.Item>}
          </Menu>
        </DropMenu>
      ),
      fixed: 'right',
      width: 50
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
  onPageChange: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
}

export default List
