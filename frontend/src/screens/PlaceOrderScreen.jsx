import { Link, useNavigate } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {Button, Row, Col, ListGroup, Image, Card} from "react-bootstrap"
import CheckoutSteps from "../components/CheckoutSteps"
import { toast } from "react-toastify"
import Loader from "../components/Loader"
import { useCreateOrderMutation } from "../slices/orderApiSlice"
import { clearCartItems} from "../slices/cartSlice"
import Message from "../components/Message.jsx";

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state)=> state.cart)
    console.log(cart)

    const [createOrder, {isLoading, error} ] = useCreateOrderMutation();


    const placeOrderHandler = async () =>{
      try{
        console.log("yay");
        console.log({
          orderItems: cart.cartItems,
          paymentMethod: cart.paymentMethod,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        });
        const res = await createOrder({
          orderItems: cart.cartItems,
          saveShippingAddress: cart.saveShippingAddress,
          paymentMethod: cart.paymentMethod,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice
        }).unwrap();
        dispatch(clearCartItems());
        navigate(`/order/${res._id}`);
      }catch(error){
        toast.error(error);
      }
    }

    // useEffect(()=>{
    //     if(!cart.shippingAddress.address){
    //         navigate("/shipping");
    //     } else if (!cart.savePaymentMethod){
    //         navigate("/payment")
    //     }
    // }, [cart.paymentMethod, cart.savePaymentMethod.address, navigate])
  return (
    <>
    <CheckoutSteps step1 step2 step3 step4/>
    <Row>
        <Col md={8}>
        <ListGroup variant="flus">
          <ListGroup.Item>
            <h2>shipping</h2>
            <p>
              <strong>Address:</strong>
              {cart.saveShippingAddress.address}, {cart.saveShippingAddress.city},
              {cart.saveShippingAddress.city}, {cart.saveShippingAddress.postalCode}, {},
              {cart.saveShippingAddress.country}
            </p>
          </ListGroup.Item>

          <ListGroup.Item>
            <strong>{cart.paymentMethod}</strong>
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ): (
              <ListGroup variant="flush">
                {cart.cartItems.map((item, index)=>(
                  <ListGroup.Item key = {index}>
                    <Row>
                      <Col md={3}>
                      <Image src={item.image} alt={item.name}
                      fluid rounded />
                      </Col>
                      <Col>
                      <Link to ={`/product/${item.product}`}>
                        {item.name}
                       </Link>
                      </Col>
                      <Col>
                      {item.qty} X ${item.price} = $ {item.qty * item.price} 
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        </ListGroup>
        </Col>
        <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items:</Col>
                <Col>
                ${cart.itemsPrice}
                 </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Shipping:</Col>
                <Col>
                ${cart.shippingPrice}
                 </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Tax:</Col>
                <Col>
                ${cart.taxPrice}
                 </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Total:</Col>
                <Col>
                ${cart.totalPrice}
                 </Col>
              </Row>
            </ListGroup.Item>

            {/* <ListGroup.Item>
              {error && <Message variant ="danger"> {error} </Message>}
            </ListGroup.Item> */}

            <ListGroup.Item>
              <Button 
                type= "button"
                className="btn-block"
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}
                >
                  Place Order
                </Button>

                {isLoading && <Loader/>}
            </ListGroup.Item>

          </ListGroup>
        </Card>
        </Col>
    </Row>
    </>
  )
}

export default PlaceOrderScreen