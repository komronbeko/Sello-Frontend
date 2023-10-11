/* eslint-disable react/prop-types */

import Card from "../Card/Card"

const ProductsWrapper = ({data}) => {
  return (
    <div className="data-body">
    {data.map((el) => {
      return <Card
        key={el.id}
        image={el.photo}
        discount={el.discount?.rate}
        id={el.id}
        price={el.price}
        title={el.name}
      />
    })}
  </div>
  )
}

export default ProductsWrapper