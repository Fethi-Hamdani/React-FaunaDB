import React, {Component} from 'react';
import Card from './Card.jsx'
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Cards extends Component {

    render() {
        return (
            <div className="card-deck justify-content-center p-5">
                {this.props.Data && this.props.Data.map(e => {
                        return (
                            <ReactCSSTransitionGroup transitionName="example"
                                                     transitionAppear={true} transitionAppearTimeout={500}
                                                     transitionEnter={false} transitionLeave={false}>
                                <Card Data={e} Delete={this.props.Delete} Edit={this.props.Edit}/>
                            </ReactCSSTransitionGroup>
                        );
                    }
                )}
            </div>
        );
    }
}

export default Cards;