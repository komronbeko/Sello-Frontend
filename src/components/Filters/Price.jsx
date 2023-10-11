const Price = () => {
    return (
        <div className="sort">
            <h4>Price</h4>
            <div className='from-price'>
                <label htmlFor="inp-from">From</label>
                <input type="text" id='inp-from' name='from' placeholder="0 so'm" />
            </div>
            <div className='to-price'>
                <label htmlFor="inp-to">To</label>
                <input type="text" id='inp-to' name='to' placeholder="30 000 000 so'm" />
            </div>
        </div>
    )
}

export default Price