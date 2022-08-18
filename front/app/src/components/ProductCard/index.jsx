import "../../Css/CardProducts.css"

export default function ProductCard({title, image}) {

    return (
        <div className="product-card">
            <h3 className="product-title">{title}</h3>
            <img src={image} className="product-image" />
        </div>
    );
   }
   