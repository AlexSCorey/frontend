import React, { Component } from 'react'
import moment from 'moment'
import api from './api'

class MyShifts extends Component {
  constructor () {
    super()
    this.state = {
      myShifts: {},
      loaded: false
    }
  }
  componentDidMount () {
    this.getMySchedule()
  }
  getMySchedule () {
    api.getMySchedule()
      .then(res => {
        this.setState({ myShifts: res,
          loaded: true })
      })
  }
  render () {
    let { loaded, myShifts } = this.state
    if (loaded) {
      return (<div>
        <div className='titles'>Your Schedule
          <div>{myShifts.map((shift) =>
            <div className='itemList3' key={shift.shift_id}>
              <div><strong>{shift.calendar_name}</strong></div>
              <div>{moment(shift.start_time).utcOffset(shift.start_time).format('MMM Do h:mma')}-{moment(shift.end_time).utcOffset(shift.end_time).format('MMM Do h:mma')}</div>
            </div>
          )}</div>
        </div></div>)
    } else if (loaded && myShifts.length === 0) {
      return (<div />)
    } else {
      return (<div>Loading</div>)
    }
  }
}
export default MyShifts
