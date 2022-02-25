require('dotenv').config();
const neo4j = require('neo4j-driver');

const uri = `neo4j://${process.env.NEO4J_HOST}:${process.env.NEO4J_PORT}`;
const driver = neo4j.driver(uri, neo4j.auth
    .basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD));
const session = driver.session();

async function add(obj){
    await session.run('CREATE (p:Pessoa{nome:$nome, email:$email}) RETURN p',{
        nome: obj.nome,
        email: obj.email
        }).then(result => console.log(result.records[0].length>0))
        .catch(error => console.log(error))
        .then(session.close);
}

async function matche(email1, email2){
    await session.run('MATCH (p1:Pessoa), (p2:Pessoa) WHERE p1.email=$email1 AND p2.email=$email2 CREATE (p1)-[:AMIGO]->(p2)',
        {email1: email1, email2:email2})
        .then(result => console.log(result.summary.counters._stats.relationshipsCreated))
        .catch(error => console.log(error))
        .then(session.close);
}

async function update(){
    await session.run('MATCH (p:Pessoa{email:$email}) SET p.email=$email2',
        {email: email1, email2:email2})
        .then(result => console.log(result.summary.counters._stats.propertiesSet))
        .catch(error => console.log(error))
        .then(session.close);
}
//async function search(){
//    await session.run('MARCH (p:Pessoa{email:$email}) RETURN p.email=$email',
//    {email: email})
//    .then(result => console.log(result.summary.counters._stats.propertiesSet))
//    .catch(error => console.log(error))
//    .then(session.close);
//}

async function delet(email){
    await session.run('MATCH (p:Pessoa{email:$email}) DETACH DELETE p',
        {email:email})
        .then(result => console.log(result.summary.counters._stats.nodesDeleted))
        .catch(error => console.log(error))
        .then(session.close);
}

 const obj = {
     
 };


module.exports = {
    add,
    matche,
    update,
    delet
}