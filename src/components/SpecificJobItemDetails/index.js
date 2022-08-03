import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdOpenInNew} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import SimilarJobItem from '../SimilarJobItem'
import SkillItem from '../SkillItem'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class SpecificJobDetails extends Component {
  state = {
    jobItemDetails: [],
    skills: [],
    similarJobItems: [],
    lifeAtCompany: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getSpecificJobDetails()
  }

  getSpecificJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const jobItemDetails = await response.json()
      const jobDetails = jobItemDetails.job_details
      const formattedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
      }

      const lifeAtCompany = jobDetails.life_at_company
      const formattedLifeAtCompany = {
        description: lifeAtCompany.description,
        imageUrl: lifeAtCompany.image_url,
      }

      const jobSkills = jobDetails.skills.map(eachSkill => ({
        name: eachSkill.name,
        imageUrl: eachSkill.image_url,
      }))

      const similarJobs = jobItemDetails.similar_jobs
      const formattedSimilarJobs = similarJobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        title: each.title,
        rating: each.rating,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        jobItemDetails: formattedJobDetails,
        similarJobItems: formattedSimilarJobs,
        lifeAtCompany: formattedLifeAtCompany,
        skills: jobSkills,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderDetailsFailureView = () => (
    <div className="no-jobs-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="api-failure-img"
      />
      <h1 className="heading-api-failure">Oops! Something Went Wrong</h1>
      <p className="api-failure-caption">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="retry-button-api-failure"
        type="button"
        onClick={this.getSpecificJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" height="50" width="50" color="#ffffff" />
    </div>
  )

  renderJobDescription = () => {
    const {jobItemDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      jobDescription,
      employmentType,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobItemDetails

    return (
      <div className="vacancy-header">
        <div className="company-details">
          <img
            src={companyLogoUrl}
            className="company-logo-img"
            alt="job details company logo"
          />
          <div className="job-title-rating-container">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star-rating-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-emp-type-package">
          <div className="job-type-location-container">
            <div className="location-job-type">
              <MdLocationOn className="icon-location-brief" />
              <p className="location-emp-type">{location}</p>
            </div>
            <div className="location-job-type">
              <BsFillBriefcaseFill className="icon-location-brief" />
              <p className="location-emp-type">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="separator-job-item" />
        <div className="job-desc-container">
          <div className="desc-website-url">
            <h1 className="desc-heading">Description</h1>
            <a href={companyWebsiteUrl}>
              <div className="visit-text-container">
                <p>Visit</p>
                <MdOpenInNew className="open-in-new-icon" />
              </div>
            </a>
          </div>
          <p className="job-desc">{jobDescription}</p>
        </div>
      </div>
    )
  }

  renderJobDetailsView = () => {
    const {skills, lifeAtCompany} = this.state
    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="">
        {this.renderJobDescription()}
        <h1 className="heading">Skills</h1>
        <ul className="skills-container">
          {skills.map(eachSkill => (
            <SkillItem skillDetails={eachSkill} key={eachSkill.name} />
          ))}
        </ul>
        <h1 className="heading">Life At Company</h1>
        <div className="life-company">
          <p className="life-desc">{description}</p>
          <img src={imageUrl} className="company-image" alt="life at company" />
        </div>
      </div>
    )
  }

  renderApiStatusResults = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderDetailsFailureView()
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderSimilarJobItems = () => {
    const {similarJobItems} = this.state

    return (
      <ul className="similar-jobs-container">
        {similarJobItems.map(eachItem => (
          <SimilarJobItem similarJobDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          <div className="job-details-container">
            {this.renderApiStatusResults()}
          </div>
          <h1 className="heading">Similar Jobs</h1>
          {this.renderSimilarJobItems()}
        </div>
      </>
    )
  }
}

export default SpecificJobDetails
