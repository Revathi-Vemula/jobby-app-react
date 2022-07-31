import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {} from 'react-icons/'

import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    title,
    rating,
  } = similarJobDetails

  return (
    <li className="similar-job-card">
      <div className="vacancy-header">
        <div className="company-details">
          <img
            src={companyLogoUrl}
            className="company-logo-img"
            alt="similar job company logo"
          />
          <div className="job-title-rating-container">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star-rating-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-desc-container">
          <h1 className="desc-heading">Description</h1>
          <p className="job-desc">{jobDescription}</p>
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
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
