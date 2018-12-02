import React,{Component} from  'react';
import './proposal_handler.css'
import ReactDOM from 'react-dom'

class ProposalHandler extends Component{
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
        this.props.addIdea([{description:Description,title:Title,image:Image}]);
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
                <center>
                <textarea className="input_title" placeholder='Название' ref='title'>
                </textarea>
                <textarea className="input_description" placeholder='Описание' ref='description'>
                </textarea>

                <ImageUpload addImage={this.addImageIdea.bind(this)}/>
                <button onClick={this.addIdea}className="add_button">
                   Добавить
                </button>
                </center>
            </div>
        );
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
export default ProposalHandler;
{/*
<div className="imgPreview">
    {$imagePreview}
</div>*/}
