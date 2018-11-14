import Link from 'next/link'
import Layout from '../components/MyLayout.js'
import { get } from '../lib/request'
import { isAuthenticated } from '../lib/auth'
import { Card, Icon, Image } from 'semantic-ui-react'

const imageStyle = {
    maxHeight: '150px',
    objectFit: 'cover'
}

const PostLink = (props) => (
    <Link as={`/restaurant/${props.id}`} href={`/restaurant?id=${props.id}&name=${props.name}`}>
    <Card>
    <Image src={props.img} style={imageStyle} />
        <Card.Content>
            
            <Card.Header>{props.name}</Card.Header>
            <Card.Meta>{props.rating} <Icon name="star"/></Card.Meta>
        </Card.Content>
    </Card>
    </Link>
)

const Index = (props) => (
    <Layout auth={props.auth}>
        <h1>Food Delivery</h1>
        <Card.Group>
        
        {props.restaurants.map((restaurant) => (
            <PostLink key={restaurant.restaurant_id} id={restaurant.restaurant_id} name={restaurant.name} rating={restaurant.rating} img={restaurant.img_url}></PostLink>
        ))}
        
        </Card.Group>
    </Layout>
)

Index.getInitialProps = async function(context) {
    const {data} = await get('/restaurants/list')

    console.log(`Data fetched. Count: ${data.length}`)

    return {
        restaurants: data,
        auth: isAuthenticated(context)
    }
  }

export default Index