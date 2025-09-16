import axios from 'axios'

async function getUsuariosSecuencial() {
    const users = await axios.get("https://jsonplaceholder.typicode.com/users");
    const tres = users.data.filter(n => n.id < 4);
  
    for (const n of tres) { //si uso forEach no me deja usar el await para cantPublis
        console.log(n.name + ' tiene ' + await cantPublis(n.id));
    }
}
  

async function getUsuariosConcurrente(){
    const users = await axios.get("https://jsonplaceholder.typicode.com/users");
    const tres = users.data.filter( n => n.id < 4 );

    const resultados = await Promise.all( //necesita un array de promesas para funcionar
        tres.map(async n => { //devuelve un array de promesas
            const cantidad = await cantPublis(n.id);
            return `${n.name} tiene ${cantidad}`;
        })
    );
    
    resultados.forEach(r => console.log(r));
        
}
    
async function cantPublis(id){
    const publis = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
    return publis.data.length;
}

getUsuariosSecuencial();
//getUsuariosConcurrente();