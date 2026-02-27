import Slider from './Slider'

export default function Banner() {
    const data = [
        { "img": "https://i.ibb.co.com/1YY3cVH1/banner.jpg" },
        { "img": "https://i.ibb.co.com/1YY3cVH1/banner.jpg" },
        { "img": "https://i.ibb.co.com/1YY3cVH1/banner.jpg" },
    ]
    return (
        <div>
            <Slider data={data} />
        </div>
    );
}