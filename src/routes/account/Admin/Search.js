import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Icon } from 'antd'
import { SearchGroup } from 'components'

const Search = ({
  field,
  keyword,
  addPower,
  onSearch,
  onAdd,
}) => {
  const searchGroupProps = {
    field,
    keyword,
    title: 'Search',
    size: 'large',
    select: true,
    selectOptions: [{ value: 'name', name: 'Name' }, { value: 'phone', name: 'Phone' }, { value: 'email', name: 'Email' }],
    selectProps: {
      defaultValue: field || 'name',
    },
    onSearch: (value) => {
      onSearch(value)
    },
  }

  return (
    <Row gutter={24}>
      <Col lg={8} md={12} sm={16} xs={24} style={{ marginBottom: 16 }}>
        <SearchGroup {...searchGroupProps} />
      </Col>
      {addPower &&
      <Col lg={{ offset: 8, span: 8 }} md={12} sm={8} xs={24} style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button size="large" type="ghost" onClick={onAdd}><Icon type="plus-circle-o" />Add</Button>
      </Col>}
    </Row>
  )
}

Search.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  field: PropTypes.string,
  keyword: PropTypes.string,
  addPower: PropTypes.bool.isRequired,
}

export default Form.create()(Search)
