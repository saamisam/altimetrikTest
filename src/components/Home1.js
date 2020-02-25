import React, { Component } from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import axios from '../config/axios'
const initialState = { isLoading: false, results: [], value: '' }
import _ from 'lodash'

export default class Home extends Component {
    state = initialState

    handleResultSelect = (e, { result }) => this.setState({ value: result.title })
  
    handleSearchChange = (e, { value }) => {
    
        console.log('value', value);

        this.setState({ isLoading: true, value })
    
        setTimeout(async() => {
            if (this.state.value.length < 1) return this.setState(initialState)
            
            await axios.get(`planets/?search=${value}`).then((data)=>{
                data = data['data']['results'];
                console.log('data', data);
                let searchArray = [];
                for(let i=0; i<data.length; i++){
                    let searchData = {};
                    searchData['description'] = data[i]['name'];
                    searchData['onClick'] = 
                    // searchData['price'] = data[i]['population']
                    searchArray.push(searchData);
                }
                console.log('search', searchArray);
                this.setState({
                    isLoading: false,
                    results: searchArray
                })
            })
        }, 300)
    }
  

    render() {
        const { isLoading, value, results } = this.state
        return (
            <div>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                    <Grid>
                        {/* <Grid.Column width={6}>
                            <Search
                                loading={isLoading}
                                // onResultSelect={this.handleResultSelect}
                                onSearchChange={this.handleSearchChange}
                                results={results}
                                value={value}
                                {...this.props}
                            />
                        </Grid.Column> */}
                        {/* <Grid.Column width={10}>
                        <Segment>
                            <Header>State</Header>
                            <pre style={{ overflowX: 'auto' }}>
                            {JSON.stringify(this.state, null, 2)}
                            </pre>
                            <Header>Options</Header>
                            <pre style={{ overflowX: 'auto' }}>
                            {JSON.stringify(source, null, 2)}
                            </pre>
                        </Segment>
                        </Grid.Column> */}
                    </Grid>
                
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}
