import {Component} from 'react'

import {v4} from 'uuid'
import './index.css'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appoinmentList: [],
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appoinmentList: prevState.appoinmentList.map(eachAppo => {
        if (id === eachAppo.id) {
          return {...eachAppo, isStarred: !eachAppo.isStarred}
        }
        return eachAppo
      }),
    }))
  }

  filter = () => {
    const {isFilterActive} = this.state

    this.setState({isFilterActive: !isFilterActive})
  }

  onChangeSearch = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onSubmitAppoinment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const newData = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppoinment = {
      id: v4(),
      title: titleInput,
      date: newData,
      isStarred: false,
    }
    this.setState(prevState => ({
      appoinmentList: [...prevState.appoinmentList, newAppoinment],
      titleInput: '',
      dateInput: '',
    }))
  }

  filterAppoinmentList = () => {
    const {appoinmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return appoinmentList.filter(eachFilter => eachFilter.isStarred === true)
    }
    return appoinmentList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppoinmentList = this.filterAppoinmentList()
    return (
      <div className="bg-container">
        <div className="card-container">
          <div>
            <div className="card-details">
              <form className="form" onSubmit={this.onSubmitAppoinment}>
                <h1 className="heading">Add Appointment</h1>
                <labe htmlFor="labelId">Title</labe>
                <input
                  type="text"
                  id="labelId"
                  className="input-text"
                  placeholder="Title"
                  value={titleInput}
                  onChange={this.onChangeSearch}
                />

                <labe htmlFor="labelID">Date</labe>
                <input
                  type="date"
                  id="labelID"
                  className="input-text"
                  value={dateInput}
                  onChange={this.onChangeDate}
                />
                <button
                  type="submit"
                  className={`btn-button ${filterClassName}`}
                >
                  ADD
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
            <hr />
          </div>
          <div className="heading-container">
            <h1>Appointments</h1>
            <button type="button" onClick={this.filter} className="btn-starred">
              Starred
            </button>
          </div>
          <ul>
            {filteredAppoinmentList.map(each => (
              <AppointmentItem
                appointmentDetails={each}
                key={each.id}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
