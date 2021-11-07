import router, { useRouter } from 'next/router'
import coffeeShopsData from '../../data/coffee-stores.json'
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
    return {
        paths: [
            { params: { id: '0' } },
            { params: { id: '1' } }
        ],
        fallback: true
    }
}

const CoffeeShop = props => {
    const router = useRouter()
    console.log('router', router)
    console.log('props', props)
    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2>
                <Link href="/"><a>
                    Home
                </a></Link>
            </h2>
            CoffeeShop Page {router.query.id}
            <p>{props.coffeeShop.name}</p>
        </div>
    )
}

export default CoffeeShop
