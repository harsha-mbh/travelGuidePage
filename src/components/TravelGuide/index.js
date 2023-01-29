import {Component} from 'react'
import Loader from 'react-loader-spinner'
import PackageItem from '../PackageItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
}

class TravelGuide extends Component {
  state = {
    packageList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.setState(
      {apiStatus: apiStatusConstants.loading},
      this.getPackageDetails,
    )
  }

  getPackageDetails = async () => {
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(apiUrl)
    const data = await response.json()
    const formattedData = data.packages.map(eachPackage => ({
      id: eachPackage.id,
      name: eachPackage.name,
      imageUrl: eachPackage.image_url,
      description: eachPackage.description,
    }))
    this.setState({
      packageList: formattedData,
      apiStatus: apiStatusConstants.success,
    })
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {packageList} = this.state
    return (
      <ul className="package-list-container">
        {packageList.map(eachPackage => (
          <PackageItem packageDetails={eachPackage} key={eachPackage.id} />
        ))}
      </ul>
    )
  }

  renderPackageDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'LOADING':
        return this.renderLoadingView()
      case 'SUCCESS':
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="app-heading">Travel Guide</h1>
        {this.renderPackageDetails()}
      </div>
    )
  }
}

export default TravelGuide
