/* eslint-disable react/prop-types */

const UniversalFilter = ({ data, title }) => {
    return (
        <div className="sort">
            <h4>{title}</h4>
            <ul className='sort-type'>
                {
                    data.map(el => {
                        if(el){
                            return <li key={el}><input type="checkbox" name="discount" /><label>{el}</label></li>
                        }
                    })
                }
            </ul>
        </div>
    )
}

export default UniversalFilter