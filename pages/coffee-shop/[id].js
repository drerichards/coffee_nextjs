import { useRouter } from 'next/router'
import coffeeShopsData from '../../data/coffee-stores.json'
import Head from "next/head"
import Link from "next/link"

export function getStaticProps(staticProps) {
    const params = staticProps.params

    return {
        props: {
            coffeeShop: coffeeShopsData.find(store => (
                store.id.toString() === params.id
            ))
        }
    }
}

export function getStaticPaths () {
    //map all the ids to paths so that you don't have to hard code 
    const paths = coffeeShopsData.map(store => (
        {
            params: {
                id: store.id.toString()
            }
        }
    ))
    return {
        paths,
        fallback: true
    }
}

const CoffeeShop = props => {
    const router = useRouter()
    // console.log('router', router)
    // console.log('props', props)

    if (router.isFallback) {
        return <div>Loading...</div>
    }
    const { address, name, neighbourhood } = props.coffeeShop

    return (
        <div>
            <Head>
                <title>{name}</title>
            </Head>
            <h2>
                <Link href="/"><a>
                    Home
                </a></Link>
            </h2>

            <p>{name}</p>
            <p>{address}</p>
            <p>{neighbourhood}</p>
        </div>
    )
}

export default CoffeeShop
