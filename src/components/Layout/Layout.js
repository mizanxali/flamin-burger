import React from 'react'
import Aux from '../../hoc/Auxiliary'
import './Layout.css'

const layout = (props) => {
    return(
        <Aux>
            <div className="header">Toolbar, SideDrawer, Backdrop</div>
            <main className="content">
                {props.children}
            </main>
        </Aux>
    );
}

export default layout