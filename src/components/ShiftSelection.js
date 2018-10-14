import React, { Component } from 'react'
import moment from 'moment'
import DayPickerInput from 'react-day-picker/DayPickerInput'

import 'react-day-picker/lib/style.css'
import { Button, Label, Input } from 'bloomer'

import { Link } from 'react-router-dom'
// import { getActiveModifiers } from 'bloomer/lib/bulma'

import api from './api'

class ShiftSelection extends Component {
  constructor () {
    super()
    this.state = {
      toDate: '',
      fromDate: '',
      toHour: '',
      fromHour: '',
      toMin: '',
      fromMin: '',
      staffRequired: '',
      addShift: undefined
    }
    this.setFromAmPm = this.setFromAmPm.bind(this)
  }

  saveShift (e) {
    e.preventDefault()
    let { id, shiftID } = this.props
    let { staffRequired, toHour, fromHour, toMin, fromMin } = this.state
    let startMoment = moment(this.state.fromDate).hour(fromHour).minute(fromMin)
    let endMoment = moment(this.state.toDate).hour(toHour).minute(toMin).format('YYYY-MM-DD HH:mm:ss')
    let formatStartMoment = moment(startMoment).format('YYYY-MM-DD HH:mm:ss')
    let formatEndMoment = moment(endMoment).format('YYYY-MM-DD HH:mm:ss')

    this.setState({ addShift: undefined })
    if (shiftID) {
      api.editShift(formatStartMoment, formatEndMoment, id, staffRequired, shiftID)
        .then(res => {
          this.setState({ toDate: '',
            fromDate: '',
            toHour: '',
            toMin: '',
            fromMin: '',
            staffRequired: '',
            addShift: true })
          window.alert('You created a shift')
        })
    } else {
      api.createShift(formatStartMoment, formatEndMoment, id, staffRequired)
        .then(res => {
          console.log('res')
          this.setState({ toDate: '',
            fromDate: '',
            toHour: '',
            toMin: '',
            fromAmPm: '',
            fromMin: '',
            staffRequired: '',
            addShift: true })
          window.alert('You created a shift')
        })
    }
  }
  handleFromDateChange (day) {
    this.setState({ fromDate: day })
  }
  handleToDateChange (value) {
    this.setState({ toDate: value })
  }
  setFromHour (value) {
    if (this.state.fromAmPm === 'PM') {
      this.setState({ fromHour: (+value + +12) })
    } else {
      this.setState({ fromHour: value })
    }
  }
  setFromMinute (value) {
    this.setState({ fromMin: value })
  }
  setFromAmPm (value) {
    this.setState({ fromAmPm: value })
  }
  setToHour (value) {
    this.setState({ toHour: value })
  }
  setToMinute (value) {
    this.setState({ toMin: value })
  }
  setToAmPm (value) {
    if (value === 'PM') {
      let stringify = parseInt(this.state.toHour, 10) + 12
      this.setState({ toHour: stringify })
    }
  }
  staffRequired (e, value) {
    e.preventDefault()
    this.setState({ staffRequired: value })
  }
  render () {
    // const { staffRequired } = this.state
    const { addShift } = this.state
    if (addShift === undefined) {
      return (
        <div><p className='itemList1'><strong>Add a Shift</strong></p>
          <span className='DayPickerInput'>
            <DayPickerInput placeholder='Start Date' onDayChange={(day) => this.handleFromDateChange(day, 'fromdate')} />
          </span>
          <span className='DayPickerInput'>
            <DayPickerInput placeholder='End Date' onDayChange={(day) => this.handleToDateChange(day)} />
          </span>
          <div className='calendarItem'>
            <div>
              <span>
                <div className='calendarItem'><strong>Start Time: </strong><select className='timeSelector2' placeholder='AM/PM' onChange={(e) => this.setFromAmPm(e.target.value)}>
                  <option placeholder='AM/PM'>AM/PM</option>
                  <option value='AM' className='timeSelector2'>AM</option>
                  <option value='PM' className='timeSelector2'>PM</option>
                </select>
                </div></span><br />

              <span>
                <select className='timeSelector2' placeholder='hours' onBlur={(e) => this.setFromHour(e.target.value)}>
                  <option placeholder='hours'>hours</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                  <option value='10'>10</option>
                  <option value='11'>11</option>
                  <option value='12'>12</option>
                </select>
                <select className='timeSelector2' placeholder='minutes' onBlur={(e) => this.setFromMinute(e.target.value)}>
                  <option placeholder='minutes'>minutes</option>
                  <option value='00'>00</option>
                  <option value='15'>15</option>
                  <option value='30'>30</option>
                  <option value='45'>45</option>
                </select>
              </span>
            </div><br />

            <span><div className='calendarItem'><strong>Stop Time: </strong><select className='timeSelector2' placeholder='AM/PM' onChange={(e) => this.setToAmPm(e.target.value)}>
              <option placeholder='AM/PM'>AM/PM</option>
              <option value='AM'>AM</option>
              <option value='PM'>PM</option>
            </select>
            </div></span><br />

            <span>
              <select className='timeSelector2' placeholder='hours' onBlur={(e) => this.setToHour(e.target.value)}>
                <option placeholder='hours'>hours</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
                <option value='10'>10</option>
                <option value='11'>11</option>
                <option value='12'>12</option>
              </select><select className='timeSelector2' placeholder='minutes' onBlur={(e) => this.setToMinute(e.target.value)}>
                <option placeholder='minutes'>minutes</option>
                <option value='00'>00</option>
                <option value='15'>15</option>
                <option value='30'>30</option>
                <option value='45'>45</option>
              </select>
            </span><br />

            <span><label><strong className='calendarItem'>Staff Required: </strong>
            </label><input className='emailInput2' type='number' name='quantity' min='1' onChange={(e) => this.staffRequired(e, e.target.value)} />
            </span>
          </div>
          <button><Link to='/CalendarList' className='titles' onClick={e => this.saveShift(e)}>Save Shift</Link></button>
        </div>)
    } else {
      return (
        <div>
          <span className='DayPickerInput'>
            <DayPickerInput placeholder='Start Date' onDayChange={(day) => this.handleFromDateChange(day, 'fromdate')} />
          </span>
          <span className='DayPickerInput'>
            <DayPickerInput placeholder='End Date'onDayChange={(day) => this.handleToDateChange(day)} />
          </span>
          <div className='calendarItem'>
            <div>
              <span>
                <div className='calendarItem'><strong>Start Time: </strong><select className='timeSelector2' placeholder='AM/PM' onChange={(e) => this.setFromAmPm(e.target.value)}>
                  <option placeholder='AM/PM'>AM/PM</option>
                  <option value='AM' className='timeSelector2'>AM</option>
                  <option value='PM' className='timeSelector2'>PM</option>
                </select>
                </div></span><br />

              <span>
                <select className='timeSelector2' placeholder='hours' onBlur={(e) => this.setFromHour(e.target.value)}>
                  <option placeholder='hours'>hours</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                  <option value='10'>10</option>
                  <option value='11'>11</option>
                  <option value='12'>12</option>
                </select><select className='timeSelector2' placeholder='minutes' onBlur={(e) => this.setFromMinute(e.target.value)}>
                  <option placeholder='minutes'>minutes</option>
                  <option value='00'>00</option>
                  <option value='15'>15</option>
                  <option value='30'>30</option>
                  <option value='45'>45</option>
                </select>
              </span><br />

              <span><div className='calendarItem'><strong>Stop Time: </strong><select className='timeSelector2' placeholder='AM/PM' onChange={(e) => this.setToAmPm(e.target.value)}>
                <option placeholder='AM/PM'>AM/PM</option>
                <option value='AM'>AM</option>
                <option value='PM'>PM</option>
              </select>
              </div></span><br />

              <span>
                <select className='timeSelector2' placeholder='hours' onBlur={(e) => this.setToHour(e.target.value)}>
                  <option placeholder='hours'>hours</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                  <option value='10'>10</option>
                  <option value='11'>11</option>
                  <option value='12'>12</option>
                </select><select className='timeSelector2' placeholder='minutes' onBlur={(e) => this.setToMinute(e.target.value)}>
                  <option placeholder='minutes'>minutes</option>
                  <option value='00'>00</option>
                  <option value='15'>15</option>
                  <option value='30'>30</option>
                  <option value='45'>45</option>
                </select>
              </span><br />

              <span><label><strong className='calendarItem'>Staff Required: </strong>
              </label><input className='emailInput2' type='number' name='quantity' min='1' onChange={(e) => this.staffRequired(e, e.target.value)} />
              </span>
            </div>
            <button><Link to='/CalendarList' className='titles' onClick={e => this.saveShift(e)}>Add Another Shift</Link></button>
          </div>
        </div>)
    }
  }
}
export default ShiftSelection
