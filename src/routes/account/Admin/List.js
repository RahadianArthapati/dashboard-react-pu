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
  onEditItem,
  onStatusItem,
}) {

  const handleMenuClick = (key, record) => {
    return {
      [UPDATE]: onEditItem,
    }[key](record)
  }

  const columns = [
    {
      title: 'NAMA',
      dataIndex: 'name',
      key: 'name',
    },{
      title: 'NIP',
      dataIndex: 'nip',
      key: 'nip',
    },{
    title: 'GOLONGAN',
    dataIndex: 'golongan',
    key: 'golongan',
    },{
      title: 'UNIT KERJA',
      dataIndex: 'unit_kerja',
      key: 'unit_kerja',
    },{
      title: 'STATUS JAFUNG',
      dataIndex: 'status',
      key: 'status',
      //render: status => <span>{status ? '已启用' : '已禁用'}</span>,
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
      loading={loading.effects['query']}
      pagination={pagination}
      onPageChange={onPageChange}
      locale={{emptyText: 'No Data'}}
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
