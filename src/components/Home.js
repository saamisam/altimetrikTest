import React, { Component } from 'react'
import axios from '../config/axios'
import { Grid, Modal, Button, Table } from 'semantic-ui-react'

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          open: false,
          searchString: "",
          planets: [],
          planetData: null,
          planetName: null
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // this.setState({
        //   users: users
        // });
        this.refs.search.focus();
    }
    
    logout ()  {
        console.log('comes here');
        localStorage.removeItem('session');
        console.log(this.props.history)
        // <Redirect to='/login'  />
        this.props.history.go("/login");
    }
    

    getDetails(){
        
    }

    handleChange() {
        this.setState({
            searchString: this.refs.search.value
        });
        setTimeout(async() => {
            // if (this.state.value.length < 1) return this.setState(initialState)
            let searchString = this.state.searchString;

                if(searchString != ''){
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
                }else{
                    this.setState({
                        planets: []
                    })
                }
        }, 300)

    }

    show = (dimmer) => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })
    planetData(data){
        let completeData = []
        for(let planet in data){
            let planetData = (
                <Table.Row>
                    <Table.Cell textAlign="left">{planet}</Table.Cell>
                    <Table.Cell>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</Table.Cell>
                    {/* <Table.Cell>&nbsp;&nbsp;&nbsp;&nbsp;</Table.Cell> */}
                    {/* <Table.Cell>&nbsp;&nbsp;&nbsp;&nbsp; </Table.Cell> */}

                    <Table.Cell textAlign="Right">{data[planet]}</Table.Cell>
                </Table.Row>
            );
            completeData.push(planetData)
        }
        this.setState({
            planetData: completeData
        })
    }
    popup = (name)=>{
        // const { open, dimmer } = this.state
        console.log('name', name);
        axios.get(`planets/?search=${name}`).then((data)=>{
            console.log('data', data);
            this.setState({
                planetName: name,
                // planetData: data['data']['results'][0]
            })
            this.planetData(data['data']['results'][0])
            this.setState({ open: true })
        })

    }

    render() {
        const { open, dimmer } = this.state
        // let _users = this.state.planets;
        // let search = this.state.searchString.trim().toLowerCase();
    
        // if (search.length > 0) {
        //   _users = _users.filter(function(user) {
        //     return user.name.toLowerCase().match(search);
        //   });
        // }
    
        return (
            <div className='background'>
                <Modal dimmer={dimmer} open={open} onClose={this.close}>
                <Modal.Header>{this.state.planetName}</Modal.Header>
                    <div className='content'>
                        <Modal.Content >
                            {this.state.planetData}
                        </Modal.Content>
                    </div>
                    <Modal.Actions>
                        <Button color='black' onClick={this.close}>
                            CLOSE
                        </Button>

                    </Modal.Actions>
                </Modal>
 

                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    
                    <Grid.Column style={{ maxWidth: 530 }}>
                        <h1 style={{color: "white"}}>“The Force will be with you. Always.” Obi-Wan Kenobi</h1>

                        <input
                            type="text"
                            value={this.state.searchString}
                            ref="search"
                            onChange={this.handleChange}
                            placeholder="Planet Search"
                        />

                        <ul>
                            {this.state.planets.map(l => {
                                let fontLenght = (l.population.length) + 14;
                            return (
                                <li onClick={this.popup.bind(this, l.name)}  style={{fontSize: fontLenght}}>
                                {l.name} 
                                {/* <a href="#">{l.population}</a> */}
                                </li>
                            );
                            })}
                        </ul>
                        <br/>
                        {/* <br/> */}
                        <Button color='red' onClick={this.logout.bind(this)}>Logout</Button>

                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Home
