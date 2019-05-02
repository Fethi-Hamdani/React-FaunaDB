import React, {Component} from 'react';

class Card extends Component {

    passDelete=()=>{
        this.props.Delete(this.props.Data[0]);
    };

    passEdit=()=>{
        this.props.Edit(this.props.Data[0]);
    };

    render() {
    const {Data} = this.props;
        return (
            <div className="row">
                <div className="col">
                    <div className="card mt-5" style={cardStyle}>
                        <div className="card-body">
                            <h5 className="card-title">{Data[1]}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{Data[2]}</h6>
                            <p className="card-text">{Data[3]}</p>
                        </div>
                        <div className="card-footer d-flex flex-row d-flex justify-content-between">
                            <button type="button" className="btn btn-danger mx-auto" onClick={this.passDelete.bind(this)}>Delete </button>
                            <button type="button" className="btn btn-warning mx-auto" onClick={this.passEdit.bind(this)} >Edit </button>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

const cardStyle = {width: '18rem'};

export default Card;
