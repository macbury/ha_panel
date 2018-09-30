import React from 'react'
import Switch from '@components/Switch'
import styles from './styles.scss'

export default class Pages extends React.Component {
  render() {
    return (
      <div className={styles.pages}>
        <div className={styles.page} data-page-title="Switches">
          <Switch entityId="switch.kitchen_light" color="orange" />
          <Switch entityId="switch.wake_on_lan" color="steel" />
          <Switch entityId="switch.humidifier" color="grayBlue" />
          <Switch entityId="switch.coffee_maker" color="emerald"/>
        </div>
      </div>
    )
  }
}


          
