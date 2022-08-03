import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobItem from '../JobItem'
import FiltersGroup from '../FiltersGroup'

import './index.css'

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    employmentStatusInputsList: [],
    activeSalaryRangeId: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsList()
  }

  getFormattedJobData = jobData => ({
    companyLogoUrl: jobData.company_logo_url,
    employmentType: jobData.employment_type,
    id: jobData.id,
    jobDescription: jobData.job_description,
    location: jobData.location,
    packagePerAnnum: jobData.package_per_annum,
    rating: jobData.rating,
    title: jobData.title,
  })

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {
      employmentStatusInputsList,
      searchInput,
      activeSalaryRangeId,
    } = this.state

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const employmentTypesQueryResult = employmentStatusInputsList.join()
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypesQueryResult}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const response = await fetch(jobsApiUrl, options)
    if (response.ok === true) {
      const jobsList = await response.json()
      const formattedJobsList = jobsList.jobs.map(eachJob =>
        this.getFormattedJobData(eachJob),
      )
      this.setState({
        jobsList: formattedJobsList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getSearchResults = event => {
    if (event.key === 'Enter') {
      this.getJobsList()
    }
  }

  renderSearchContainer = () => {
    const {searchInput} = this.state

    return (
      <>
        <div className="search-container">
          <input
            type="search"
            placeholder="Search"
            value={searchInput}
            className="input-search"
            onChange={this.onChangeSearchInput}
            onKeyDown={this.getSearchResults}
          />
          <div>
            <button
              type="button"
              className="btn-search"
              onClick={this.getJobsList}
              testid="searchButton"
            >
              <BsSearch size={20} color="#ffffff" />
            </button>
          </div>
        </div>
      </>
    )
  }

  onChangeEmploymentType = event => {
    const {employmentStatusInputsList} = this.state

    const inputsNotSelected = employmentStatusInputsList.filter(
      eachType => eachType === event.target.id,
    )

    if (inputsNotSelected.length === 0) {
      this.setState(
        prevState => ({
          employmentStatusInputsList: [
            ...prevState.employmentStatusInputsList,
            event.target.id,
          ],
        }),
        this.getJobsList,
      )
    } else {
      const selectedEmploymentTypeInputs = employmentStatusInputsList.filter(
        eachType => eachType !== event.target.id,
      )
      this.setState(
        {employmentStatusInputsList: selectedEmploymentTypeInputs},
        this.getJobsList,
      )
    }
  }

  onChangeSalaryRange = event => {
    this.setState({activeSalaryRangeId: event.target.id}, this.getJobsList)
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" height="50" width="50" color="#0b69ff" />
    </div>
  )

  renderJobFailureView = () => (
    <div className="no-jobs-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-view"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="caption-no-jobs">
        We could not find any Jobs. Try other filters
      </p>
    </div>
  )

  renderJobItems = () => {
    const {jobsList} = this.state

    return (
      <ul className="jobs-list-container">
        {jobsList.map(eachJob => (
          <JobItem jobDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="no-jobs-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="api-failure-img"
      />
      <h1 className="heading-api-failure">OOPS! Something Went Wrong</h1>
      <p className="api-failure-caption">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry-button-api-failure"
        type="button"
        onClick={this.getJobsList}
      >
        Retry
      </button>
    </div>
  )

  renderApiResults = () => {
    const {apiStatus, jobsList} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        if (jobsList.length === 0) {
          return this.renderJobFailureView()
        }
        return this.renderJobItems()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-filters-search-container">
          <div className="job-search-container">
            <div className="search-sm-style">
              {this.renderSearchContainer()}
            </div>
            <FiltersGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              onChangeEmploymentType={this.onChangeEmploymentType}
              onChangeSalaryRange={this.onChangeSalaryRange}
            />
          </div>
          <div className="jobs-search-lg-container">
            <div className="search-lg-container">
              {this.renderSearchContainer()}
            </div>
            {this.renderApiResults()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
