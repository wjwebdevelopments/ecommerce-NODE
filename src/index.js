import express from 'express';
import server from './www/server';

const app = server(express());


app.listen(
	3000,
	console.log('Server running on port 3000')
);