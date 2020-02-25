import React, { Component } from 'react'
import axios from '../config/axios'
import { Grid } from 'semantic-ui-react'

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          searchString: "",
          planets: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // this.setState({
        //   users: users
        // });
        this.refs.search.focus();
    }
    
    handleChange() {
        this.setState({
            searchString: this.refs.search.value
        });
        setTimeout(async() => {
            // if (this.state.value.length < 1) return this.setState(initialState)
            let searchString = this.state.searchString;
            await axios.get(`planets/?search=${searchString}`).then((data)=>{
                data = data['data']['results'];
                console.log('data', data);
                let searchArray = [];
                for(let i=0; i<data.length; i++){
                    let searchData = {};
                    searchData['name'] = data[i]['name'];
                    searchData['population'] = data[i]['population']; 
                    // searchData['price'] = data[i]['population']
                    searchArray.push(searchData);
                }
                console.log('search', searchArray);
                this.setState({
                    isLoading: false,
                    planets: searchArray
                })
            })
        }, 300)

    }

    render() {
        // let _users = this.state.planets;
        // let search = this.state.searchString.trim().toLowerCase();
    
        // if (search.length > 0) {
        //   _users = _users.filter(function(user) {
        //     return user.name.toLowerCase().match(search);
        //   });
        // }
    
        return (
            <div>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>

                        <input
                            type="text"
                            value={this.state.searchString}
                            ref="search"
                            onChange={this.handleChange}
                            placeholder=""
                        />
                        <ul>
                            {this.state.planets.map(l => {
                            return (
                                <li>
                                {l.name} 
                                {/* <a href="#">{l.population}</a> */}
                                </li>
                            );
                            })}
                        </ul>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Home
