import React, { Component } from 'react';

export default class Search extends Component {
    render() {
        return (
            <form role="search" autoComplete="off">
                <div>
                    <input
                        type="text"
                        value={this.props.search}
                        onChange={this.props.searchHandler}
                        className="form-control"
                        placeholder="Search"
                        id="srch-term"
                        role="search"
                    />
                </div>
            </form>
        )
    }
}