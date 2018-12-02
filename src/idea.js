
import React,{Component} from  'react';
import './idea.css';


class Idea extends Component{
    constructor(props){
        super();
        this.state={
            moreButtonIsOn:false
        };
    }

    moreHandler(){
        this.setState(
            {moreButtonIsOn:!this.state.moreButtonIsOn}
        );
    }

    render(){
        let moreButton=(<button className='more_button' onClick={this.moreHandler.bind(this)}>
        Описание
        </button>);
        let item=(
            <div className='idea_box'>
                <img src={this.props.image} />
            <ul>
                <li><text className='idea_title'>
                    <h1>
                    {this.props.title}
                    </h1>
                </text></li>
                    {this.state.moreButtonIsOn?null:moreButton}
                <li><text className='idea_fast_description'>
                    {this.state.moreButtonIsOn?this.props.description:null}
                </text></li>
            </ul>
            </div>
        );
        return(item);
    }
}
export default Idea;