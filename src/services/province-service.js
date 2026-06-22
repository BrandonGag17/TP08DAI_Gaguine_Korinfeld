import ProvinceRepository from '../repositories/province-repository.js';

export default class ProvinceService {

    constructor() {
        this.repo = new ProvinceRepository();
    }


    async getAllAsync() {
        return await this.repo.getAllAsync();
    }


    async getByIdAsync(id) {
        return await this.repo.getByIdAsync(id);
    }


    async createAsync(entity) {

        if (!entity.name || entity.name.trim().length < 3) {
            throw new Error(
                "El nombre no puede estar vacío y debe tener al menos 3 caracteres."
            );
        }

        return await this.repo.createAsync(entity);
    }


    async updateAsync(entity) {

        if (!entity.id) {
            throw new Error("Debe indicar el id de la provincia.");
        }


        if (!entity.name || entity.name.trim().length < 3) {
            throw new Error(
                "El nombre modificado debe tener al menos 3 caracteres."
            );
        }

        return await this.repo.updateAsync(entity);
    }


    async deleteAsync(id) {
        return await this.repo.deleteAsync(id);
    }

}