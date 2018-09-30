import React from 'react'
import PropTypes from 'prop-types'
import Tile from '@components/Tile'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { callService } from '@actions/ws'

import { mdiToggleSwitchOffOutline, mdiToggleSwitch } from '@mdi/js'

class Switch extends React.Component {

  get entityId() {
    return this.props.entityId
  }

  get entity() {
    return this.props.items[this.entityId]
  }

  get attributes() {
    return this.entity.attributes
  }

  get name() {
    return this.attributes.friendly_name
  }

  get icon() {
    return this.entity.state == 'on' ? mdiToggleSwitch : mdiToggleSwitchOffOutline
  }

  render() {
    return(
      <Tile 
        color="blue" 
        icon={this.icon}
        name={this.name}
        onClick={::this.onClick} />
    )
  }

  onClick() {
    this.props.callService('switch', 'toggle', { entity_id: this.entityId })
  }
}

Switch.propTypes = {
  entityId: PropTypes.string
}

function mapStoreToProps({ entities }) {
  let { items } = entities
  return { items }
}

function mapActions(dispatch) {
  return bindActionCreators({ callService }, dispatch)
}

export default connect(mapStoreToProps, mapActions)(Switch)

