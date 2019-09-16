import React from 'react'
import './ImageLinkForm.css';

const ImageLinkForm = ({OnInputChange, OnSubmit}) => {
    return (
        <div>
            <p className='f3'>
                {'This will detect faces in your pictures. Give it a try'}
            </p>
            <div className="center">
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70' type='text' onChange={OnInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple pointer' onClick={OnSubmit}>Submit</button>
                </div>
              </div>
        </div>
    )
}

export default ImageLinkForm
