import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import ProvinceService from '../services/province-service.js';

const router = Router();
const service = new ProvinceService();

// get alll
router.get('/', async (req, res) => {
    try {
        const provinces = await service.getAllAsync();
        return res.status(StatusCodes.OK).json(provinces);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

// get by id
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const province = await service.getByIdAsync(id);
        if (!province) {
            return res.status(StatusCodes.NOT_FOUND).send("Not Found");
        }
        return res.status(StatusCodes.OK).json(province);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

// insertar
router.post('/', async (req, res) => {
    try {
        const newProvince = await service.createAsync(req.body);
        return res.status(StatusCodes.CREATED).json(newProvince);
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).send(error.message);
    }
});

// actualizar
router.put('/', async (req, res) => {
    try {
        const updatedProvince = await service.updateAsync(req.body);
        if (!updatedProvince) {
            return res.status(StatusCodes.NOT_FOUND).send("Not Found");
        }
        return res.status(StatusCodes.CREATED).json(updatedProvince); 
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).send(error.message);
    }
});

// delete
router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deleted = await service.deleteAsync(id);
        if (!deleted) {
            return res.status(StatusCodes.NOT_FOUND).send("Not Found");
        }
        return res.status(StatusCodes.OK).send("OK");
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

export default router;
