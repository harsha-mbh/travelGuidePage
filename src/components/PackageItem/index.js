import './index.css'

const PackageItem = props => {
  const {packageDetails} = props
  const {name, imageUrl, description} = packageDetails
  return (
    <li className="package-card">
      <img src={imageUrl} alt={name} className="thumbnail" />
      <h1 className="package-heading">{name}</h1>
      <p className="package-description">{description}</p>
    </li>
  )
}

export default PackageItem
