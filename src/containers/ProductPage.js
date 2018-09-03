import React from 'react';
import {connect} from 'react-redux';
import {fetchProduct} from "../actions/productsAction";

class ProductPage extends React.Component {
    state = {
        productId: this.props.match.params.id,
        amount: 1
    };

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchProduct(this.state.productId))
    }

    handleAmountChange() {
        return (event) => this.setState({amount: event.target.value});
    }

    addToCartOnClick = () => {
        const myItem = {id: this.state.productId, amount: this.state.amount};
        //check if the cart already exist in the cart
        // localStorage.getItem(this.state.productId) ?
            localStorage.setItem(this.state.productId, JSON.stringify(myItem))
            // console.log('You already have this item');
            // document.cookie = "add_to_cart_product_id=" + this.state.productId +
            //     " number_of_products=" + this.state.amount + ";path=/";
    };

    render() {
        const {product, isFetching} = this.props;
        const {amount} = this.state;

        return <React.Fragment>
            {product
                ? <div style={{opacity: isFetching ? 0.5 : 1}}>
                    <h4>{product.name}</h4>
                    <ul>
                        <li>{`id: ${product.id}`}</li>
                        <li>{`price: ${product.price}`}</li>
                        <li>{`categoryId: ${product.category_id}`}</li>
                    </ul>
                    <label htmlFor="numberOfProducts">Choose number of products:</label>
                    <input type="number" value={amount} onChange={this.handleAmountChange()}/>
                    <button onClick={this.addToCartOnClick}>Add to cart</button>
                </div>
                : (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
            }
        </React.Fragment>
    }
}

const mapStateToProps = state => {
    const {productDetailsReducer} = state;
    const {
        isFetching,
        lastUpdated,
        product
    } = productDetailsReducer || {isFetching: true, product: null};

    return {
        isFetching,
        product,
        lastUpdated,
    }
};


export default connect(mapStateToProps)(ProductPage)

