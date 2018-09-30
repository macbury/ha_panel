import React from 'react'
import PropTypes from 'prop-types'
import styles from './style.scss'
import Icon from '@mdi/react'

export default class Tile extends React.Component {

  get color() {
    let key = this.props.color ? 'bg-'+this.props.color : 'bg-black'
    return styles[key]
  }

  render() {
    let { title, tile, badge } = styles
    let { name, icon } = this.props
    return(
      <div className={`${this.color} ${tile}`} onClick={::this.onClick}>
        <span className={styles.icon}>
          <Icon path={icon} size={2} color="white"/>
        </span>
        <span className={title}>{name}</span>
      </div>
    )
  }

  onClick(e) {
    e.preventDefault()
    this.props.onClick()
  }
}

Tile.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
}


