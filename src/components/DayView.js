import React, { Component } from 'react'
import { Button } from 'bloomer'
import moment from 'moment'

import api from './api'
class DayView extends Component {
  constructor () {
    super()
    this.state = {
      note: ''
    }
  }
  componentDidMount () {
    this.getShifts()
  }
  getShifts () {
    let { id } = this.props
    api.getShifts(id)
      .then(res => console.log(res, 'res in Day View'))
  }
  handleSubmit (e) {
    e.preventDefault()
    const { note } = this.state
    const { id, date } = this.props
    let formattedDate = moment(new Date(date)).format('YYYY-MM-DD')
    // console.log(formattedDate, 'date')
    // console.log(id, 'id')
    api.createNote(note, id, formattedDate)
      .then(res => res)
  }
  render () {
    let { id, date } = this.props
    return (<div>
      <h2>{moment(date).format('ddd, Do')}</h2>
      <div>{id}</div>
      <label className='emailLabel'>
      Note:
        <input type='emailInput' onChange={e => this.setState({ note: e.target.value })} required />
      </label>
      <Button type='submit' onClick={e => this.handleSubmit(e)}>Save</Button>
    </div>)
  }
}
export default DayView
