
import { Button, Card, CardBody, CardTitle, CardText } from "reactstrap";
import { Modal, ModalHeader, ModalBody } from "reactstrap";


export default function CartModal({ cart, removeFromCart, quantityChange, closeModal, totalProducts }) {

    const totalCost = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <Modal isOpen={closeModal} >
            <ModalHeader>CART</ModalHeader>
            <ModalBody>
                {cart.length === 0 ? (
                    <p className="text-black">Your cart is empty</p>
                ) : (<ul className="space-y-4">
                    {cart.map((item) => (

                        <Card className="d-flex flex-row mb-2" key={item.id}>

                            <img
                                style={{
                                    width: 150,
                                    height: 150,
                                }}
                                alt={item.name || "product"}
                                src={item.image}
                            />
                            <CardBody className="d-flex flex-col">
                                <CardTitle tag="h5">{item.title || "NO TITLE"}</CardTitle>
                                <CardText className="text-left">&#8377;{item.price ? item.price : 0}
                                </CardText>
                                <div className="d-flex justify-between">
                                    <div className="d-flex gap-2 align-items-center">

                                        <Button color="primary"
                                            onClick={() => quantityChange("dec", item.id)}
                                        >
                                            -
                                        </Button>
                                        <h3 className="mt-2">{item.quantity || 0}</h3>
                                        <Button
                                            color="primary"
                                            onClick={() => quantityChange("inc", item.id)}
                                        >
                                            +
                                        </Button>

                                    </div>
                                    <Button color="danger" onClick={() => removeFromCart(item.id)}> Remove</Button>
                                </div>


                            </CardBody>
                        </Card>

                    ))}

                </ul>
                )}
                <div className="mt-4 pt-4 border-t">
                    <p className="text-black font-semibold">
                        Total Products: {totalProducts}
                    </p>
                    <p className="text-black font-semibold">
                        Total Cost: ${totalCost.toFixed(2)}
                    </p>


                </div>
                <button className="mt-4 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={closeModal}>Close</button>

            </ModalBody>
        </Modal >
    )
}