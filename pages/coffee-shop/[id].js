import {useRouter} from 'next/router'

const CoffeeShop = () => {
    const router = useRouter()
    console.log(router);
    return (
        <div>
            CoffeeShop
        </div>
    )
}

export default CoffeeShop
