export default function ProductCard({ product, addToCart, isInCart }) {
    return (
        <div className="border p-4 rounded-lg shadow-md bg-white flex flex-col h-full">
            <img className="w-full h-50 object-contain mb-4" src={product.image} alt={product.title} />
            <h2 className="text-lg font-semibold text-black flex-grow">
                {product.title}
            </h2>
            <p className="text-gray-700 mt-2">&#8377;{product.price}</p>
            <button onClick={() => addToCart(product)}
                disabled={isInCart}
                className={`mt-4 w-full py-2 ${isInCart ? "bg-gray-400" : "bg-blue-500"} text-white rounded`}>
                {isInCart ? "Added to Cart" : "Add to Cart"}
            </button>



        </div >

    )
}