import pool from '../configs/db-config.js';

export default class ProvinceRepository {
    async getAllAsync() {
        const client = await pool.connect();
        try {
            const result = await client.query('SELECT * FROM provinces ORDER BY id');
            return result.rows;
        } finally {
            client.release();
        }
    }

    async getByIdAsync(id) {
        const client = await pool.connect();
        try {
            const result = await client.query('SELECT * FROM provinces WHERE id = $1', [id]);
            return result.rows[0] || null;
        } finally {
            client.release();
        }
    }

    async createAsync(entity) {
        const client = await pool.connect();
        try {
            const sql = `INSERT INTO provinces (name, full_name, latitude, longitude, display_order) 
                         VALUES ($1, $2, $3, $4, $5) RETURNING *`;
            const values = [entity.name, entity.full_name, entity.latitude, entity.longitude, entity.display_order];
            const result = await client.query(sql, values);
            return result.rows[0];
        } finally {
            client.release();
        }
    }

    async updateAsync(entity) {
        const client = await pool.connect();
        try {
            const sql = `UPDATE provinces SET name=$1, full_name=$2, latitude=$3, longitude=$4, display_order=$5 
                         WHERE id=$6 RETURNING *`;
            const values = [entity.name, entity.full_name, entity.latitude, entity.longitude, entity.display_order, entity.id];
            const result = await client.query(sql, values);
            return result.rows[0] || null;
        } finally {
            client.release();
        }
    }

    async deleteAsync(id) {
        const client = await pool.connect();
        try {
            const result = await client.query('DELETE FROM provinces WHERE id = $1 RETURNING *', [id]);
            return result.rowCount > 0; // Devuelve true si borró algo
        } finally {
            client.release();
        }
    }
}
