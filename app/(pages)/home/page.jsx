import { headers } from "next/headers";
import Homepage from "../../components/home/Homepage"

const page = async () => {
    const header = await headers();
    const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]

    console.log(ip);

    return (
        <div className="">
            <Homepage />
        </div>
    )
}
export default page