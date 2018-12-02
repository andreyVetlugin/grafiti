import React,{Component} from  'react';
import Idea from './idea.js';
import './ideas_list.css';

class IdeasList extends Component{
    render(){
        let ideas=this.props.ideas;
        let items=ideas.map((item)=><Idea description ={item.description} title = {item.title} image={item.image}/>)
        return(
            <div className='items'>
                {items}
            </div>
        );
    }
}
export default IdeasList;