import React, { Component } from 'react'
import { Delete, Button } from 'bloomer'

import api from './api'

class SingleShiftView extends Component {
  constructor () {
    super()
    this.state = {
      assignedUsers: [],
      unassignedUsers: [],
      msg: null,
      loaded: false,
      roles: {}
    }
  }
  componentDidMount () {
    this.getStaff()
  }
  getStaff () {
    let { id, shiftsId } = this.props
    api.getStaff(id, shiftsId)
      .then(res => {
        this.setState({ assignedUsers: res.assigned_users,
          unassignedUsers: res.unassigned_users,
          roles: res.roles,
          loaded: true })
      })
  }
  removeStaff (e, userID, userName) {
    e.preventDefault()
    let { id, shiftsId } = this.props
    let calendarID = id
    api.removeStaffFromShift(calendarID, shiftsId, userID)
      .then(res => {
        this.setState({ msg: `You Successfully removed ${userName}` })
      })
    let users = this.state.assignedUsers
    console.log('here')
    users = users.filter((user) => user.id !== userID)
    this.setState({ assignedUsers: users })
  }
  assignStaff (value) {
    let { id, shiftsId } = this.props
    api.assignStaff(value, id, shiftsId)
      .then(res => {
        window.alert(res)
      })
  }
  render () {
    let { assignedUsers, unassignedUsers, loaded, roles } = this.state
    if (loaded) {
      if ((roles.indexOf('owner') > -1) || (roles.indexOf('manager') > -1)) {
        return (
          <div>
            <div className='itemList1'>Assigned Staff</div>
            <div>{assignedUsers.map((user) =>
              <div key={user.id}>
                <div className='itemList3'>{user.name}&nbsp;
                  <delete userid={user.id} onClick={e => this.removeStaff(e, user.id, user.name)}>
                    <i className='far fa-trash-alt' /></delete>
                </div>
              </div>
            )}</div>
            <div>
              <div className='itemList1'>Unassigned Staff</div>
              <div>{unassignedUsers.map((user) =>
                <div key={user.id * Math.random()}><div className='itemList3'>{user.name}&nbsp;
                  <button className='requestSwap' type='checkbox' value={user.id} onClick={e => this.assignStaff(e.target.value)}>Assign</button>
                </div>
                </div>
              )}</div>
            </div>
          </div>
        )
      } else {
        return (
          <div>
            <div className='itemList1'>Assigned Staff</div>
            <div>{assignedUsers.map((user) =>
              <div key={user.id}>
                <div className='itemList3'>{user.name}
                </div>
              </div>
            )}</div>
            <div>
              <div className='itemList1'>Unassigned Staff</div>
              <div>{unassignedUsers.map((user) =>
                <div className='itemList3'>{user.name}
                </div>
              )}</div>
            </div>
          </div>
        )
      }
    } else {
      return (<div class='lds-roller'><div /><div /><div /><div /><div /><div /><div /><div /></div>)
    }
  }
}
export default SingleShiftView
