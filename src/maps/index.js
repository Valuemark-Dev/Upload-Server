import { Router } from 'express';
import axios from 'axios'
const api = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api',
    withCredentials: false,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Headers': '*',
    },
})
export default ({ config, db }) => {
	const maps = Router();
	maps.get('/', (req, res) => {
		res.json({
			message: 'Here Google map api server is ready to use!',
			path: req.route.path,
		})
	});

    maps.get('/:param1/:param2', async (req, res) => {
        try{
            const response = await api.get(`/${req.params.param1}/${req.params.param2}`,{
                params:{
                    ...req.query
                }
            });
            res.json({
                ...response.data
            });
        }catch(err){
            console.log(err);
            res.json({status:'Failed'})
        }
    });

    maps.get('/:param1/:param2/:param3', async (req, res) => {
        try{
            const response = await api.get(`/${req.params.param1}/${req.params.param2}/${req.params.param3}`,{
                params:{
                    ...req.query
                }
            });
            res.json({
                ...response.data
            });
        }catch(err){
            console.log(err);
            res.json({status:'Failed'})
        }
    });

    maps.get('/:param1/:param2/:param3/:param4', async (req, res) => {
        try{
            const response = await api.get(`/${req.params.param1}/${req.params.param2}/${req.params.param3}/${req.params.param4}`,{
                params:{
                    ...req.query
                }
            });
            res.json({
                ...response.data
            });
        }catch(err){
            console.log(err);
            res.json({status:'Failed'})
        }
    });

	return maps;
}
