import pool from '../configs/db-config.js';

export default class ProvinceRepository {

    async getAllAsync() {
        const result = await pool.query(
            'SELECT * FROM provinces ORDER BY display_order'
        );

        return result.rows;
    }

    async getByIdAsync(id) {
        const result = await pool.query(
            'SELECT * FROM provinces WHERE id = $1',
            [id]
        );

        return result.rows[0] || null;
    }

    async createAsync(entity) {
        const sql = `
            INSERT INTO provinces
            (name, full_name, latitude, longitude, display_order)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;

        const values = [
            entity.name,
            entity.full_name,
            entity.latitude,
            entity.longitude,
            entity.display_order
        ];

        const result = await pool.query(sql, values);

        return result.rows[0];
    }

    async updateAsync(entity) {
        const sql = `
            UPDATE provinces
            SET
                name = $1,
                full_name = $2,
                latitude = $3,
                longitude = $4,
                display_order = $5
            WHERE id = $6
            RETURNING *
        `;

        const values = [
            entity.name,
            entity.full_name,
            entity.latitude,
            entity.longitude,
            entity.display_order,
            entity.id
        ];

        const result = await pool.query(sql, values);

        return result.rows[0] || null;
    }

    async deleteAsync(id) {
        const result = await pool.query(
            'DELETE FROM provinces WHERE id = $1 RETURNING *',
            [id]
        );

        return result.rowCount > 0;
    }
}