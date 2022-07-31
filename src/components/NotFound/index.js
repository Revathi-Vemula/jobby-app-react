import Header from '../Header'
import './index.css'

const caption = `we're sorry, the page you requested could not be found`
const NotFound = () => (
  <>
    <Header />
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="route-not-found"
      />
      <h1 className="heading">Page Not Found</h1>
      <p className="caption">{caption}</p>
    </div>
  </>
)

export default NotFound