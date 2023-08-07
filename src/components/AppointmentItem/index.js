import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentDetails
  const srcUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleIsStarred(id)
  }
  return (
    <li className="list-container">
      <div className="item-container">
        <p className="title">{title}</p>
        <button type="button" onClick={onClickStar}>
          <img src={srcUrl} alt="star" />
        </button>
      </div>
      <p>Date:{date}</p>
    </li>
  )
}

export default AppointmentItem
