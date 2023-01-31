import { useEffect } from "react"

export default function ServiceList() {

    const loadServices = async () => {
        const response = await fetch('http://localhost:3000/services');
        const services = await response.json();
        console.log(services);
    }


        useEffect(() => {
            loadServices();
        }, [])
        return(
            <>
                <h1>Services List</h1>
            </>
        )

}