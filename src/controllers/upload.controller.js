import { request, response } from "express";
import { path } from 'path'



const uploadFile = (req = request, res = response) => {
    // res.send('ok')
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send({ msg: 'No hay archivos que subir' });
        return;
    }

    console.log('req.files >>>', req.files); // eslint-disable-line

    const { file } = req.files

    uploadPath = path.join(__dirname, '../uploads/', file.name)

    sampleFile.mv(uploadPath, function(err) {
        if (err) {
            return res.status(500).send(err);
        }

        res.send('File uploaded to ' + uploadPath);
    });
}

export const methods = { uploadFile }