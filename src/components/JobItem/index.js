import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props

  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`}>
      <li className="job-item-container">
        <div className="vacancy-header">
          <div className="company-details">
            <img
              src={companyLogoUrl}
              className="company-logo-img"
              alt="company logo"
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
            <h1 className="desc-heading">Description</h1>
            <p className="job-desc">{jobDescription}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
