import UserProfile from '../UserProfile'
import './index.css'

const FiltersGroup = props => {
  const {
    salaryRangesList,
    employmentTypesList,
    onChangeEmploymentType,
    onChangeSalaryRange,
  } = props

  const changeEmploymentType = event => {
    onChangeEmploymentType(event)
  }

  const changeSalaryRange = event => {
    onChangeSalaryRange(event)
  }

  const renderEmploymentFilters = employmentType => {
    const {label, employmentTypeId} = employmentType

    return (
      <li key={employmentType.employmentTypeId} className="list-item">
        <input
          type="checkbox"
          className="checkbox-input"
          id={employmentTypeId}
          value={employmentTypeId}
          onChange={changeEmploymentType}
        />
        <label htmlFor={employmentTypeId} className="label-name">
          {label}
        </label>
      </li>
    )
  }

  const renderSalaryRangeFilters = salaryRange => {
    const {salaryRangeId, label} = salaryRange

    return (
      <li key={salaryRange.salaryRangeId}>
        <input
          type="radio"
          value={salaryRangeId}
          className="checkbox-input"
          id={salaryRangeId}
          name="salaryRange"
          onChange={changeSalaryRange}
        />
        <label className="label-name" htmlFor={salaryRangeId}>
          {label}
        </label>
      </li>
    )
  }

  return (
    <div className="filters-profile-group">
      <UserProfile />
      <hr className="separator" />
      <div className="filters-container">
        <div className="filter-container">
          <h1 className="filter-heading">Type of Employment</h1>
          <ul className="filters-list">
            {employmentTypesList.map(eachType =>
              renderEmploymentFilters(eachType),
            )}
          </ul>
        </div>
        <hr className="separator-1" />
        <h1 className="filter-heading">Salary Range</h1>
        <ul className="filters-list">
          {salaryRangesList.map(eachRange =>
            renderSalaryRangeFilters(eachRange),
          )}
        </ul>
      </div>
    </div>
  )
}

export default FiltersGroup
