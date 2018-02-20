import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Radio, Modal, Icon, Select } from 'antd'
import { InputAutoComplete } from 'components'
import { DataTable, DropMenu } from 'components'
import { UPDATE, STATUS } from 'constants/options'
import styles from './List.less'

const FormItem = Form.Item

const Option = Select.Option

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const ModalForm = ({
  modal: { curItem, type, visible },
  loading,
  form: {
    getFieldDecorator,
    validateFields,
    resetFields,
  },
  onOk,
  onCancel,

}) => {
  console.log("CURITEM", curItem);
  /*
  if (!curItem.roleList) {
    curItem.roleList = []
  }*/

  const handleOk = () => {
    validateFields((errors, values) => {
      if (errors) {
        return
      }
      const data = {
        ...values,
        id: curItem.id,
      }
      onOk(data)
    })
  }

  const modalFormOpts = {
    title: type === 'create' ? <div><Icon type="plus-circle-o" /></div> : <div><Icon type="edit" /></div>,
    visible,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: loading.effects['accountAdmin/showModal'],
    onOk: handleOk,
    onCancel,
    okText: 'OK',
    cancelText: 'Cancel',
    afterClose () {
      resetFields()
    },
  }
  const handleMenuClick = (key, record) => {
    return {
      [UPDATE]: onEditItem,
    }[key](record)
  }
  const columns = [
    {
      title: 'STATUS JAFUNG',
      dataIndex: 'status',
      key: 'status',
    },{
      title: 'JABATAN FUNGSIONAL',
      dataIndex: 'jafung',
      key: 'jafung',
    },{
    title: 'NOMOR SK',
    dataIndex: 'no_sk',
    key: 'no_sk',
    },{
      title: 'TANGGAL SK',
      dataIndex: 'date_sk',
      key: 'date_sk',
    },{
      title: 'TANGGAL MULAI',
      dataIndex: 'date_start',
      key: 'date_start',
    },{
      title: 'TANGGAL SELESAI',
      dataIndex: 'date_end',
      key: 'date_end',
    }, {
      title: '',
      key: 'action',
      render: (text, record) => (
        <DropMenu>
          <Menu onClick={({ key }) => handleMenuClick(key, record)}>
            {updatePower && <Menu.Item key={UPDATE}>Upload</Menu.Item>}
          </Menu>
        </DropMenu>
      ),
      fixed: 'right',
      width: 50
    }

  ]
  return (
    <Modal {...modalFormOpts}>
      <Form>
      <FormItem label="NIP ：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: curItem.nip,
          })(<Input />)}
        </FormItem>
        <FormItem label="NAMA ：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: curItem.name,
          })(<Input />)}
        </FormItem>
        <FormItem label="PENEMPATAN ：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: curItem.placement,
          })(<Input />)}
        </FormItem>
        <FormItem label="UNIT KERJA ：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: curItem.unit_kerja,
          })(<Input />)}
        </FormItem>
        <FormItem label="SATKER : " hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: curItem.satker,
          })(<Input />)}
        </FormItem>
        <FormItem label="PPK ：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: curItem.phone,
          })(<Input />)}
        </FormItem>
        <DataTable
      className={styles.table}
      columns={columns}
      dataSource={[]}
      loading={loading.effects['accountAdmin/query']}
      pagination={""}
      onPageChange={""}
      locale={{emptyText: 'No Data'}}
      rowKey={record => record.id}
    />
      </Form>

    </Modal>
  )
}

ModalForm.propTypes = {
  modal: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default Form.create()(ModalForm)
