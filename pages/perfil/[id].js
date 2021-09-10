import data from '../../database.json'
export async function getServerSideProps(context) {
    const id = context.query.id
    const user = data.users[id + '@s.whatsapp.net']

    return {
        props: {
            name: user.name,
            exp: user.exp, 
            coins: user.limit,
            age: user.age,
        }
    }
}

function Perfil(props){

    return <div>
        <h1>Nome: {props.name}</h1>
        <h2>Exp: {props.exp}</h2>
        <h2>Coins: {props.coins}</h2>
        <h2>Idade: {props.age}</h2>
        </div>

} 
export default Perfil
