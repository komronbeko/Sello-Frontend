/* eslint-disable react/prop-types */

import { Grid } from "@mui/material"
import Card from "../Card/Card"

const ProductsWrapper = ({ data }) => {
  return (
    <Grid container columnGap={2} rowSpacing={3} marginTop={1}>
      {data.map((el) => (
        <Grid item key={el.id}>
          <Card
            image={el.photo}
            discount={el.discount?.rate}
            id={el.id}
            price={el.price}
            title={el.name}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default ProductsWrapper