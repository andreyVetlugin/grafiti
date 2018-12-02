import React,{Component} from  'react';
import Idea from './idea.js';
import './ideas_list.css';
import IdeaList from './ideas_list';
import Map from './Map.js';
import ReactDOM from 'react-dom';

class AddGraffitiPlace extends Component{
    constructor(props) {
        super(props);
        this.state = {imageIdea: null};
    }
    addIdea = () =>{
        var descriptionField=ReactDOM.findDOMNode(this.refs.description);
        var titleField=ReactDOM.findDOMNode(this.refs.title);
        let Description = descriptionField.value;
        let Title = titleField.value;
        let Image=this.state.imageIdea;
        this.props.addGrafiti([{lat:this.props.newGrafiti.lat,lng:this.props.newGrafiti.lng,description:Description,title:Title,image:Image}]);
        this.props.addSuccessfull();
    };
    addImageIdea=(value)=>{
        this.state.imageIdea=value
        this.setState({
            imageIdea:value
        })
    }
    render(){
        let descriptionInput;
        let coordinates=[];
        return (
            <div className >
                <textarea className="input_title" placeholder='Название' ref='title'>
                </textarea>
                <textarea className="input_description" placeholder='Описание' ref='description'>
                </textarea>
                <center>
                    <ImageUpload addImage={this.addImageIdea.bind(this)}/>
                    <button onClick={this.addIdea}className="add_button">
                        Добавить
                    </button>
                </center>
            </div>
        );
    }
}

class AcceptedIdeaList extends Component{
    constructor(props){
        super(props);
        this.state={addMode:0,clickLat:undefined,clickLng:undefined,grafiti:undefined};
    }

    handleMapClick(event){
        console.log("HERE!");
        let lat = event.latLng.lat();
        let lng = event.latLng.lng();
        console.log(this.state.clickLat);
        this.setState({addMode:2,clickLat:lat,clickLng:lng,grafiti:{lat:lat,lng:lng}})
        console.log(this.state.addMode);
        console.log(this.state.clickLat);
    }

    addSuccessfull(){
        this.setState({addMode:0});
    }

    addGraffitiPlace(){
      this.setState({addMode:1});
    }

    render(){
        let ideas=this.props.ideas;
        let items=ideas.map((item)=><Idea description ={item.description} title = {item.title} image={item.image}/>)
        let renderItem;
        if (this.state.addMode===0){
            renderItem=(<div className='items'>
                {items}
                <button onClick={this.addGraffitiPlace.bind(this)}className="add_button">
                    Добавить
                </button>
            </div>);
        }else if (this.state.addMode===1){
            renderItem=<Map grafiti={ideas} handleMapClick={this.handleMapClick.bind(this)}/>;
        }else {
            renderItem=<AddGraffitiPlace addGrafiti={this.props.addGrafiti} newGrafiti={this.state.grafiti} grafiti={this.props.ideas} addSuccessfull={this.addSuccessfull.bind(this)}/>;
        }
        return renderItem;
    }
}


class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {file: '',imagePreviewUrl: ''};
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        this.props.addImage(this.state.imagePreviewUrl);
        console.log('handle uploading-', this.state.file);
    }

    _handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file);
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (
                <div className="imgPreview">
                    <img src={imagePreviewUrl} />
                </div>
            );
        }else{
            $imagePreview=null;
        }

        return (
            <div >
                <form clasName="input" onSubmit={(e)=>this._handleSubmit(e)}>
                    <input className="fileInput"
                           type="file"
                           onChange={(e)=>this._handleImageChange(e)} />
                    <button className="submitButton"
                            type="submit"
                            onClick={(e)=>this._handleSubmit(e)}>Загрузить картинку</button>
                    {$imagePreview}
                </form>
            </div>
        )
    }
}


export default AcceptedIdeaList;