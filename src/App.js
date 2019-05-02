import React, {Component} from 'react';
import './App.css';
import faunadb, {query as q} from "faunadb"
import Cards from "./components/Cards";
import Header from "./components/Header";

let adminKey = 'MZXECRCOKVIFETBQIFBUIRCCMFIXM4KEK53WSY2LGBIVQ6TDNBTVA42OJNYHS5DY';
let client;

async function initfauna() {
    let p = new Promise((resolve, rej) => {

        client = new faunadb.Client({
            secret: adminKey
        });

        resolve(client
            .query(q.Paginate(q.Match(q.Index("getAll")))));
    });
    return await p;
}

class App extends Component {
    state = {
        obj: [],
        edit: ["", "", ""],
    };

    constructor() {
        super();
        initfauna().then(e => {
            this.setState({obj: e.data});
        });
    }

    shouldComponentUpdate(p, s) {
        if (this.state.obj !== s.obj) {
            this.forceUpdate();
            return true;
        }
        if (this.state.edit !== s.edit) {
            this.forceUpdate();
            return true;
        }
        else
            return false
    }

    handleDelete(element) {
        client.query(q.Delete(q.Ref(q.Class("book"), element)));
        client.query(q.Get(q.Ref(q.Class("book"), element)));

        let t = this.state.obj.filter(a => {
            return a["0"] !== element;
        });

        this.setState({obj: t});
    }

    handleAdd(t, a, s) {
        client.query(
            q.Create(
                q.Class("book"), {data: {Title: t, Author: a, Description: s}}));

        initfauna().then(e => {
            this.setState({obj: e});
        });
    }

    handleEdit(element) {
        this.state.obj.map(e => {
            if (e["0"] === element) {
                return this.setState(
                    {edit: [e["0"], e["1"], e["2"], e["3"]]}
                );
            }
        });
    }

    handleUpData(t = "", a = "", s = "") {
        if ([t, a, s] === ["x", "x", "x"])
            this.setState({edit: ["", "", ""],});
        return this.state.edit;
    }

    handleUp(t, a, s) {
        client.query(
            q.Replace(
                q.Ref(q.Class("book"), this.state.edit["0"]),
                {data: {Title: t, Author: a, Description: s}}));
    }

    render() {
        return (
            <div className="App">
                <Header Add={this.handleAdd.bind(this)} UpData={this.handleUpData.bind(this)} Up={this.handleUp.bind(this)}/>
                <Cards Data={this.state.obj} Delete={this.handleDelete.bind(this)} Edit={this.handleEdit.bind(this)}/>
            </div>
        );
    }
}

export default App;