import React, {Component} from 'react';

class Header extends Component {

    state = {
        title: '',
        auth: '',
        desc: '',
        stat: 'Add',
        editMode: false,
    };

    handleSubmit(e) {
        const {title, auth, desc} = this.state;
        if (this.state.stat === 'Add') {
            this.props.Add(title, auth, desc);
        }
        else {
            this.props.Up(title, auth, desc);
            this.setState({
                stat: 'Add',
            })
        }

    }

    handleChange1(e) {
        this.setState({
            title: e.target.value
        });
    }

    handleChange2(e) {
        this.setState({
            auth: e.target.value
        });
    }

    handleChange3(e) {
        this.setState({
            desc: e.target.value
        });
    }

    handleClear(e) {
        e.preventDefault();
        this.setState({
            title: '',
            auth: '',
            desc: '',
            stat: 'Add',
        });
        this.props.UpData("x", "x", "x");
    }

    render() {
        if (!this.state.editMode && this.props.UpData()[0] !== "" && this.props.UpData()[1] !== this.state.title) {
            this.setState({
                title: this.props.UpData()[1],
                auth: this.props.UpData()[2],
                desc: this.props.UpData()[3],
                stat: "Edit",
                editMode: true
            });
        }

        return (
            <ul className="nav justify-content-center">
                <li className="nav-item" style={{marginTop: "10px"}}>
                </li>

                <li className="nav-item ">
                    <div>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className="input-group mb-3 p-5">
                                <input type="text" className="form-control" placeholder={"Title"}
                                       value={this.state.title}
                                       onChange={this.handleChange1.bind(this)}/>
                                <input type="text" className="form-control" placeholder={"Auth"}
                                       value={this.state.auth}
                                       onChange={this.handleChange2.bind(this)}/>
                                <input type="text" className="form-control" placeholder={"Desc"}
                                       value={this.state.desc}
                                       onChange={this.handleChange3.bind(this)}/>
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="submit"
                                            value="Submit">{this.state.stat}</button>
                                    <button className="btn btn-secondary" onClick={this.handleClear.bind(this)}
                                            value="Submit">Clear
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>
                </li>
            </ul>
        );
    }
}

export default Header;

