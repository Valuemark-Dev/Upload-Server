import { Router } from 'express';
import facets from './facets';
import multer from 'multer';
import axios from 'axios'
var fs = require('fs');
const axiosInstance = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api',
    withCredentials: false,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Headers': '*',
    },
})
export default ({ config, db }) => {
	const api = Router();
	const storage = multer.diskStorage({
		destination: function (req, file, cb) {
			if (!fs.existsSync('public/upload/')){
				fs.mkdirSync('public/upload/', { recursive: true });
			}
			cb(null, 'public/upload/');
		},
		filename: function (req, file, cb) {
			const [ fname, ext ] = file.originalname.split('.');
			const randStr = Math.floor(Math.random() * 10000);
			cb(null, fname + '-' + randStr.toString() + '-' + Date.now() + '.' + ext);
		}
	});
	const storageSignature = multer.diskStorage({
		destination: function (req, file, cb) {
			if (!fs.existsSync('public/upload/signature')){
				fs.mkdirSync('public/upload/signature', { recursive: true });
			}
			cb(null, 'public/upload/signature');
		},
		filename: function (req, file, cb) {
			const [ fname, ext ] = file.originalname.split('.');
			const randStr = Math.floor(Math.random() * 10000);
			cb(null, fname + '-' + randStr.toString() + '-' + Date.now() + '.' + ext);
		}
	});
	const storageDocument = multer.diskStorage({
		destination: function (req, file, cb) {
			if (!fs.existsSync('public/upload/document')){
				fs.mkdirSync('public/upload/document', { recursive: true });
			}
			cb(null, 'public/upload/document');
		},
		filename: function (req, file, cb) {
			const [ fname, ext ] = file.originalname.split('.');
			const randStr = Math.floor(Math.random() * 10000);
			cb(null, fname + '-' + randStr.toString() + '-' + Date.now() + '.' + ext);
		}
	});
	const storageAvatar = multer.diskStorage({
		destination: function (req, file, cb) {
			if (!fs.existsSync('public/upload/avatar')){
				fs.mkdirSync('public/upload/avatar', { recursive: true });
			}
			cb(null, 'public/upload/avatar');
		},
		filename: function (req, file, cb) {
			const [ fname, ext ] = file.originalname.split('.');
			const randStr = Math.floor(Math.random() * 10000);
			cb(null, fname + '-' + randStr.toString() + '-' + Date.now() + '.' + ext);
		}
	});
	const upload = multer({ storage: storage });
	const uploadSignature = multer({ storage: storageSignature });
	const uploadDocument = multer({ storage: storageDocument });
	const uploadAvatar = multer({ storage: storageAvatar });
	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	api.get('/assist', (req, res) => {
		res.json({
			message: 'Here Assistance server is ready to use!',
			path: req.route.path,
		})
	});

	api.post('/assist/upload', upload.single('file'), (req, res, next) => {
		const file = req.file;
		if (!file) {
			const error = new Error('Please upload a file');
			error.httpStatusCode = 400;
			return next(error);
		}
		const result = {
			fieldname: file.fieldname,
			originalname: file.originalname,
			encoding: file.encoding,
			mimetype: file.mimetype,
			destination: file.destination.replace('public', 'assist'),
			filename: file.filename,
			path: file.path.replace('public', 'assist'),
			size: file.size,
		}
		res.send(result);
	});

	api.post('/assist/upload/signature', uploadSignature.single('file'), (req, res, next) => {
		const file = req.file;
		if (!file) {
			const error = new Error('Please upload a signature file');
			error.httpStatusCode = 400;
			return next(error);
		}
		console.log("destination", file.destination);
		const result = {
			fieldname: file.fieldname,
			originalname: file.originalname,
			encoding: file.encoding,
			mimetype: file.mimetype,
			destination: file.destination.replace('public', 'assist'),
			filename: file.filename,
			path: file.path.replace('public', 'assist'),
			size: file.size,
		}
		res.send(result);
	});

	api.post('/assist/upload/document', uploadDocument.single('file'), (req, res, next) => {
		const file = req.file;
		if (!file) {
			const error = new Error('Please upload a document file');
			error.httpStatusCode = 400;
			return next(error);
		}
		const result = {
			fieldname: file.fieldname,
			originalname: file.originalname,
			encoding: file.encoding,
			mimetype: file.mimetype,
			destination: file.destination.replace('public', 'assist'),
			filename: file.filename,
			path: file.path.replace('public', 'assist'),
			size: file.size,
		}
		res.send(result);
	});

	api.post('/assist/upload/avatar', uploadAvatar.single('file'), (req, res, next) => {
		const file = req.file;
		if (!file) {
			const error = new Error('Please upload a avatar file');
			error.httpStatusCode = 400;
			return next(error);
		}
		const result = {
			fieldname: file.fieldname,
			originalname: file.originalname,
			encoding: file.encoding,
			mimetype: file.mimetype,
			destination: file.destination.replace('public', 'assist'),
			filename: file.filename,
			path: file.path.replace('public', 'assist'),
			size: file.size,
		}
		res.send(result);
	});

	api.get('/assist/maps/:param1/:param2', (req, res) => {
        axiosInstance.get(`/${req.params.param1}/${req.params.param2}`,{
            params:{
                ...req.query
            }
        }).then((response) => {
            res.json({
                ...response.data
            });
        }).catch((err)=>{
            console.log(err);
            res.json({status:'Failed'});
        });
    });

    api.get('/assist/maps/:param1/:param2/:param3', (req, res) => {
        axiosInstance.get(`/${req.params.param1}/${req.params.param2}/${req.params.param3}`,{
            params:{
                ...req.query
            }
        }).then((response) => {
            res.json({
                ...response.data
            });
        }).catch((err)=>{
            console.log(err);
            res.json({status:'Failed'});
        });
    });

	api.get('/assist/maps/:param1/:param2/:param3/:param4', (req, res) => {
        axiosInstance.get(`/${req.params.param1}/${req.params.param2}/${req.params.param3}/${req.params.param4}`,{
            params:{
                ...req.query
            }
        }).then((response) => {
            res.json({
                ...response.data
            });
        }).catch((err)=>{
            console.log(err);
            res.json({status:'Failed'});
        });
    });

	return api;
}
