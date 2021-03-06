import Link from 'next/link'
import Layout from '../components/MyLayout.js'
import { get } from '../lib/request'
import { isAuthenticated } from '../lib/auth'
import { Card, Icon, Image } from 'semantic-ui-react'
import { getCookieFromBrowser } from "../lib/session"

const imageStyle = {
    height: '150px',
    weight: '100%',
    objectFit: 'cover'
}

const slugify = (str) => (str.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '')            // Trim - from end of text
    )

const PostLink = (props) => (
    <Link as={`/restaurant/${slugify(props.name)}/${props.id}`} href={`/restaurant?id=${props.id}&name=${props.name}`}>
    <Card>
            <Image src={props.img} style={imageStyle} />
            <Card.Content>
            <Card.Header>{props.name}</Card.Header>
            <Card.Meta>
                <span className='date'>{props.category}</span>
            </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                {props.rating} <Icon name="star" />
            </Card.Content>
        </Card>
    </Link>
)

const Index = (props) => (
    <Layout auth={props.auth}>
        <h1>Food Delivery</h1>
        <Card.Group>
        
        {props.restaurants.map((restaurant) => (
            <PostLink key={restaurant.restaurant_id} id={restaurant.restaurant_id} name={restaurant.name} rating={restaurant.rating} img={restaurant.img_url} category={restaurant.category}></PostLink>
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