const { Client } = require('pg');
const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'sa_task_db',
    user: 'postgres'
})

client.connect((err) => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected')
    }
})

function getAllUsers (req, res){
    const users = [];
    const text =    'SELECT U.id AS id, U.name AS username, G.name AS groupname, O.counter AS counter, O.follows AS follows ' +
                    'FROM users U ' +
                    'LEFT JOIN groups G on G.id = U.group_id ' +
                    'LEFT JOIN ' +
                    '( ' +
                    '   SELECT R.target_id, COUNT(R.follower_id) as counter, array_agg(DISTINCT R.follower_id) AS follows ' +
                    '   FROM relations R ' +
                    '   GROUP BY R.target_id ' +
                    ')AS O on O.target_id = U.id ' +
                    'ORDER BY U.name';

    const query = client.query(text);
    query.on('row', (row) => {
      users.push(row);
    });
    query.on('end', () => {
        return res.json(users);
    });
    query.on('error', (res) => {

    });

};

function addFollower(req, res){
    const results = [];
    const text = 'INSERT INTO relations(follower_id, target_id) values ($1, $2)';
    const values = [req.body.orig, req.body.dest];
    const query = client.query(text, values);
    query.on('row', (row) => {
        results.push(row);
    });
    query.on('end', () => {
        return res.json(results);
    });
    query.on('error', (res) => {

    });
};

function removeFollower(req, res){
    const results = [];
    const text = 'DELETE FROM relations WHERE follower_id = $1 AND target_id = $2';
    const values = [req.body.orig, req.body.dest];
    const query = client.query(text, values);
    query.on('row', (row) => {
        results.push(row);
    });
    query.on('end', () => {
        return res.json(results);
    });
    query.on('error', (res) => {

    });

};

module.exports = {
    getAllUsers: getAllUsers,
    addFollower: addFollower,
    removeFollower: removeFollower
};
