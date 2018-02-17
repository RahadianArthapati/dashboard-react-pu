import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Icon } from 'antd'
import { SearchGroup } from 'components'

const Search = ({
  field,
  keyword,
  onSearch,
}) => {
  const searchGroupProps = {
    field,
    keyword,
    title: 'Search',
    size: 'large',
    select: true,
    selectOptions: [{ value: 'name', name: 'NAMA' }, { value: 'nip', name: 'NIP' }],
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
    </Row>
  )
}

Search.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  field: PropTypes.string,
  keyword: PropTypes.string,
}

export default Form.create()(Search)
