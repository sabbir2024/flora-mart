import EditProduct from "./components/EditProduct";

export default async function page({ params }) {
    const param = await params
    const id = param.id;


    console.log('page--await params=>', id);
    return (
        <div>
            <EditProduct />
        </div>
    );
}