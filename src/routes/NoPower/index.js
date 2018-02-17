import React from 'react'
import { Icon } from 'antd'
import { connect } from 'dva'
import styles from './index.less'

const NoPower = () => (
  <div className="content-inner">
    <div className={styles.error}>
      <Icon type="frown-o" />
      <h1>Sorry, this page is not entitled you!</h1>
    </div>
  </div>
)

export default connect()(NoPower)
