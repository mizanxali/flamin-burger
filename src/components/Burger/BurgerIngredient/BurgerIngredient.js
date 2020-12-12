import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './BurgerIngredient.css'

class BurgerIngredient extends Component {
    render() {
        let ingredient = null;

        switch (this.props.type) {
            case 'breadbottom' : ingredient = <div className="BreadBottom"></div>;
            break;
            case 'breadtop' : ingredient = (
                <div className="BreadTop">
                    <div className="Seeds1"></div>
                    <div className="Seeds2"></div>
                </div>
            );
            break;
            case 'meat' : ingredient = <div className="Meat"></div>
            break;
            case 'cheese' : ingredient = <div className="Cheese"></div>
            break;
            case 'lettuce' : ingredient = <div className="Lettuce"></div>
            break;
            case 'tomato' : ingredient = <div className="Tomato"></div>
            break;
            default : ingredient = null;
        }

        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient