import React, { Component } from 'react';
import Search from './Search'
import './List.css';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showHideList: "filter-menu"
        }
    }

    showList = () => {
        this.setState({
            showHideList: "filter-menu open"
        })
    }

    hideList = () => {
        this.setState({
            showHideList: "filter-menu"
        })
    }

    render(){
        const locations = this.props.locations;
        const listClass = this.state.showHideList;
        return(
            <div>
                <div className="btn-open">
                    <i className="fa fa-bars" aria-hidden="true" onClick={this.showList}></i>
                </div>
                <div className={listClass}>
                    <div className="btn-close" >
                        <i className="fa fa-times" aria-hidden="true" onClick={this.hideList}></i>
                    </div>
                        <h4>Athens Locations</h4>
                    <Search searchHandler={this.props.searchHandler} search={this.props.search}/>
                    <div className="filtered-locations" >
                        <ul className="list-group" id="list" >
                            {locations.map((location) =>(
                                <li className="list-group-item "
                                    tabIndex="0"
                                    id={location.title}
                                    key={location.id}
                                    onClick={this.props.clickHandler}
                                >
                                    {location.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default List

