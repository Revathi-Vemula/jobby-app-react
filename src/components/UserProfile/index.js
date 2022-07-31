import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {userDetails: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getUserProfileData()
  }

  getUserProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const userProfileApiUrl = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(userProfileApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const userData = data.profile_details
      const formattedUserData = {
        name: userData.name,
        profileImageUrl: userData.profile_image_url,
        shortBio: userData.short_bio,
      }

      this.setState({
        userDetails: formattedUserData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderUserDetails = () => {
    const {userDetails} = this.state
    const {profileImageUrl, name, shortBio} = userDetails

    return (
      <div className="user-details-container">
        <img src={profileImageUrl} alt="profile" className="avatar" />
        <h1 className="user-name">{name}</h1>
        <p className="user-bio">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <button
      type="button"
      className="btn-retry"
      onClick={this.getUserProfileData}
    >
      Retry
    </button>
  )

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" height={50} color="#0b69ff" width={50} />
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderUserDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default UserProfile
