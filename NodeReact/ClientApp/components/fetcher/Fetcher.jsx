import * as React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from "./actions";
import Hot from "core/Hot";

export class Fetcher extends React.Component {
    constructor(props) {
        super(props);

        this.fetchRequest = this.fetchRequest.bind(this);
        this.changeHandler = this.changeHandler.bind(this);

        this.state = {
            text: ''
        }
    }

    fetchRequest = () => {
        this.props.PostData(this.state.text.trim());
        this.setState({
            text: ''
        });
    }
    changeHandler = (e) => {
        this.setState({
            text: e.target.value
        });
    }

    render() {
        return <div>
            <button onClick={this.fetchRequest}>
                Send data
            </button>
            <input type="text" value={this.state.text} onChange={this.changeHandler} />
            <br />
            <br />
            <button onClick={this.props.GetData}>
                Fetch request
            </button>
            {this.props.fetcher.dataList.map((val) => <p key={val.ParentId}>{val.Data}</p>)}
        </div>
    }
}

export default Hot(module,
    connect(
        state => ({
            fetcher: state.fetcher
        }),
        (actionCreators)
    )(Fetcher)
);