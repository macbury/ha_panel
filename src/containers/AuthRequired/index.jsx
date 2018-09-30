import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { auth } from '@actions/ws'

import FullScreenLoader from '@components/FullScreenLoader'

class AuthRequired extends React.Component {
  componentDidMount() {
    this.props.auth('localhost:8123/api/websocket', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIxODc3MzU0Y2E3NTA0YTdhODZiYjZkN2QwOGRjODgwZCIsImlhdCI6MTUzODA3OTE0NCwiZXhwIjoxODUzNDM5MTQ0fQ.1rk9Cijob1B6d_LrTOEBn-O5qhL5nSSvKm2XooeGhPs')
  }

  render() {
    if (this.props.ws == 'OK') {
      return (
        <React.Fragment>
          { this.props.children }
        </React.Fragment>
      )
    } else {
      return <FullScreenLoader />
    }
  }
}

function mapStoreToProps({ ws }) {
  return { ws }
}

function mapActions(dispatch) {
  return bindActionCreators({ auth }, dispatch)
}

export default connect(mapStoreToProps, mapActions)(AuthRequired)
