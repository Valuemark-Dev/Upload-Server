import { Router } from 'express';
import facets from './facets';
import multer from 'multer';
var fs = require('fs');

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
			console.log(req.body.type);
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

	api.get('/', (req, res) => {
		res.json({
			message: 'Here Upload server is ready to use!',
			path: req.route.path,
		})
	});

	api.post('/', upload.single('file'), (req, res, next) => {
		const file = req.file;
		if (!file) {
			const error = new Error('Please upload a file');
			error.httpStatusCode = 400;
			return next(error);
		}
		res.send(file);
	});

	api.post('/signature', uploadSignature.single('file'), (req, res, next) => {
		const file = req.file;
		if (!file) {
			const error = new Error('Please upload a signature file');
			error.httpStatusCode = 400;
			return next(error);
		}
		res.send(file);
	});

	api.post('/document', uploadDocument.single('file'), (req, res, next) => {
		const file = req.file;
		if (!file) {
			const error = new Error('Please upload a document file');
			error.httpStatusCode = 400;
			return next(error);
		}
		res.send(file);
	});

	api.post('/avatar', uploadAvatar.single('file'), (req, res, next) => {
		const file = req.file;
		if (!file) {
			const error = new Error('Please upload a avatar file');
			error.httpStatusCode = 400;
			return next(error);
		}
		res.send(file);
	});

	return api;
}
