import React, { Component } from 'react';
import './App.css';
import Map from './Map.js';
import ImageUpload from './proposal_handler.js';
import IdeasList from './ideas_list.js';
import AcceptedIdeasList from './accepted_idea_list.js';
class App extends Component {
    constructor(){
        super();
        this.state={
            activeMode:"MainPage",
            ideasInVote:[],
            ideas:[],
            onMarkerClick:()=>{this.setState({activeMode:"AcceptedIdeas"})},
            grafiti:[{image:null,lat:56.838,lng:60.605514,title:"крутое граффити1",description:'оч крутое графити1!'},
                {image:null,lat:56.968607,lng:60.985514,title:"крутое граффити2",description:'оч крутое графити2!'},
                {image:null,lat:57.968607,lng:61.605514,title:"крутое граффити3",description:'оч крутое графити3!'}]
        };
    }

    AddIdea(idea){
        console.log(idea);
        console.log(this.state.ideasInVote);
        this.setState({
          ideasInVote:this.state.ideasInVote.concat(idea)
          });
    }

    addGrafiti(grafiti){
        this.setState({
            grafiti:this.state.grafiti.concat(grafiti)
        })
    }

    changePage(value){
        this.setState({
            activeMode:value
            });
    }

    render() {
        //var grafiti=[{lat:56.838,lng:60.605514,title:"крутое граффити1",description:'оч крутое графити1!',{lat:56.968607,lng:60.985514,title:"крутое граффити2",description:'оч крутое графити2!'},{lat:57.968607,lng:61.605514,title:"крутое граффити3",description:'оч крутое графити3!'}]
        let renderItem;
        switch (this.state.activeMode) {
            case "MainPage":
                renderItem=<Map grafiti={this.state.grafiti} onMarkerClick={this.state.onMarkerClick.bind(this)} handleMapClick={()=>(null)}/>;
                break;
            case "ProposalHandler":
                renderItem = (<ImageUpload addIdea={this.AddIdea.bind(this)} />);
                break;
            case "AcceptedIdeas":
                renderItem = (<AcceptedIdeasList addGrafiti={this.addGrafiti.bind(this)} ideas={this.state.grafiti}/>);
                break;
            case "VotingForIdeas":
                renderItem = (<IdeasList ideas={this.state.ideasInVote}/>);
                break;
        }
        return (
            <div className="App">
                <div className = "main_buttons">
                    <button className ="App-header" onClick={this.changePage.bind(this,"MainPage")}>
                        Главная
                    </button>
                    <button className ="App-header" onClick={this.changePage.bind(this,"AcceptedIdeas")}>
                        Список реализованных идей
                    </button>
                    <button className ="App-header" onClick={this.changePage.bind(this,"ProposalHandler")}>
                        Предложить идею
                    </button>
                    <button className ="App-header" onClick={this.changePage.bind(this,"VotingForIdeas")}>
                        Голосование
                    </button>
                </div>
                {renderItem}
            </div>
        );
    }
}

export default App;
