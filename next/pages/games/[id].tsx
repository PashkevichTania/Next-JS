import {useRouter} from "next/router";

export default function Game() {
    const router = useRouter()
    return <>
        <h1>ID: {router.query.id}</h1>
    </>
}
