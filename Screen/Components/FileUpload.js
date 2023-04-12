
import React, { useState } from 'react';
import axios from 'axios';

//class FileUpload extends React.Component {
const FileUpload = () => {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
const [url] = useState("https://huma.bzh/api/");

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async (e) => {
        /*const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);*/
        var dataToSend = {
            file: file,
            fileName: fileName,
            //imgsource: image.base64,
        }

        var formBody = [];
        for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        /*  var object = {};
          formData.forEach((value, key) => object[key] = value);
          var Datajson = JSON.stringify(object);*/
        formBody = formBody.join('&');

        try {
            const res = await fetch(url+'api/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
                body: formBody
            }).then(data => data.json());

        } catch (ex) {
            console.log(ex);
        }
    };

    // render() {
    return (
        <div className="App">
            <input type="file" name="image" id="image" onChange={saveFile} />
            <button onClick={uploadFile}>Upload</button>
        </div>
    );
    //}
}

export default FileUpload;