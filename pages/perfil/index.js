import React from 'react'
import ReactDOM from 'react-dom'
import data from '../../database.json'

class SearchUser extends React.Component{
    constructor(props){
        super(props)
        this.state = {value: ''}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event){
        this.setState({value: event.target.value})
    }
    handleSubmit(event){
        document.location.href= '/perfil/' + this.state.value
        //alert('Nome: ' + data.users[this.state.value + '@s.whatsapp.net'].name)
        event.preventDefault()=== 'checkbox' ? target.checked : target.value;
        const name = target.name;
    }

    render() {
        return (<div>
            <h1>Buscar usuário</h1>
        <form onSubmit={this.handleSubmit}>
            <label>
                Número:
                <input type="text" value={this.state.value} onChange={this.handleChange}/>
            </label>
            <input type="submit" value="Buscar" />
        </form>
        </div>)
    }
}

export default SearchUser
