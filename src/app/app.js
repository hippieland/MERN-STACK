

import React, { Component } from 'react';

class App extends Component {

    constructor(){
        super();
        this.state = {
            titulo:'',
            descripcion: '',
            claves: [],
            fuente: '',
            tiporecurso: '',
            cobertura: '',
            resources: [],
            _id: ''

        };
        this.handleChange = this.handleChange.bind(this);
        this.addResource = this.addResource.bind(this);
    }

    addResource(e){
        //console.log(this.state);
        if(this.state._id){
            fetch('/api/resources', this.state._id, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Resource updated'});
                this.setState({
                    titulo:'',
            descripcion: '',
            claves: [],
            fuente: '',
            tiporecurso: '',
            cobertura: '',
            resources: [],
            _id: ''
                });
            this.fetchResources();
            });
        } else{
            fetch('/api/resources', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({html: 'Resource saved'});
                    this.setState({
                        titulo:'',
                descripcion: '',
                claves: [],
                fuente: '',
                tiporecurso: '',
                cobertura: ''
                    });
                    this.fetchResources();
                })
                .catch(err => console.error(err));
        }
        e.preventDefault();
    } 

    componentDidMount(){
        this.fetchResources();
    }
    fetchResources(){
        fetch('/api/resources')
            .then(res => res.json())
            .then(data => {
                this.setState({resources: data});
                console.log(this.state.resources);
            });
    }

    editResource(id){
        fetch('/api/resources/' + id)
            .then(res => res.json())
            .then(data => {
                console.log(data.titulo)
                this.setState({
                    titulo: data.titulo,
                    descripcion: data.descripcion,
                    claves: data.claves,
                    fuente: data.fuente,
                    tiporecurso: data.tiporecurso,
                    cobertura: data.cobertura,
                    _id: data._id
                })
                });
    }

    deleteResource(id){
        if (confirm('Want to delete the resource?')) {
            fetch('/api/resources/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Resource deleted'});
                this.fetchResources();
            });
        }
        
    }

    handleChange(e) {
        //console.log(e.target)
        const { name, value } = e.target;
        this.setState({
            [name] : value
        });
    }

    render() {
        return (
            <div>
                {/* NAVIGATION */}
                <nav className="green darken-4">
                    <div className="container">
                        <a className="brand.logo" href="/">Mern Crud</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addResource}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input value={this.state.titulo} name="titulo" onChange={this.handleChange} type="text" placeholder="Titulo"/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea value={this.state.descripcion} className="materialize-textarea" onChange={this.handleChange} name="descripcion" placeholder="Descripcion"></textarea>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea value={this.state.fuente} className="materialize-textarea" name="fuente" onChange={this.handleChange} placeholder="Fuente"></textarea>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea value={this.state.cobertura} className="materialize-textarea" name="cobertura" onChange={this.handleChange} placeholder="Cobertura"></textarea>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea value={this.state.tiporecurso} className="materialize-textarea" name="tiporecurso" onChange={this.handleChange} placeholder="Tipo Recuros"></textarea>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea className="materialize-textarea" value={this.state.claves} name="claves" onChange={this.handleChange} placeholder="Claves"></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-green darken-4">Enviar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Titulo</th>
                                        <th>Descripcion</th>
                                        <th>Fuente</th>
                                        <th>Claves</th>
                                        <th>Tipo Recurso</th>
                                        <th>Cobertura</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.resources.map(resource => {
                                            return (
                                                <tr key={resource._id}>
                                                    <td>{resource.titulo}</td>
                                                    <td>{resource.descripcion}</td>
                                                    <td>{resource.fuente}</td>
                                                    <td>{resource.claves}</td>
                                                    <td>{resource.tiporecurso}</td>
                                                    <td>{resource.cobertura}</td>
                                                    <td>
                                                        <button onClick={() => this.editResource(resource._id)} className="btn green darken-4">
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button className="btn green darken-4" onClick={() => this.deleteResource(resource._id)} style={{margin: '4px'}}>
                                                             <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;