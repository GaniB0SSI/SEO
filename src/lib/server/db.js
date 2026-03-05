import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PORT, DB_PASSWORD, DB_NAME } from '$env/static/private';

const pool = mysql.createPool({
	host: DB_HOST,
	user: DB_USER,
	port: Number(DB_PORT),
	password: DB_PASSWORD,
	database: DB_NAME,
	waitForConnections: true,
	connectionLimit: 10
});

export async function query(sql, params = []) {
	const [rows] = await pool.execute(sql, params);
	return rows;
}

export async function testDbConnection() {
	await pool.query('SELECT 1');
}
