import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { subscribeToStateChanges, fetchStates } from '@actions/ws'
import FullScreenLoader from '@components/FullScreenLoader'

class FetchStates extends React.Component {
  componentDidMount() {
    this.props.subscribeToStateChanges()
    this.props.fetchStates()
  }

  render() {
    if (this.props.loading) {
      return <FullScreenLoader />
    } else {
      return <React.Fragment>{ this.props.children }</React.Fragment>
    }
  }
}

function mapStoreToProps({ entities }) {
  return { loading: entities.loading }
}

function mapActions(dispatch) {
  return bindActionCreators({ subscribeToStateChanges, fetchStates }, dispatch)
}

export default connect(mapStoreToProps, mapActions)(FetchStates)

