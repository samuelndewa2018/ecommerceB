import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import CheckoutSteps from "../components/CheckoutSteps";
import Container from "react-bootstrap/Container";
import { toast } from "react-toastify";

export default function ShippingAddressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);
  const [country, setCountry] = useState(shippingAddress.country || "");
  const submitHandler = (e) => {
    e.preventDefault();

    if (!fullName && !address && !city && !postalCode && !country) {
      toast.error("Please enter all details");
    }
    if (city === "") {
      toast.error("Please select your city");
    }
    if (city === "Select your county") {
      toast.error("Please select your city");
    }
    if (
      fullName &&
      address &&
      city &&
      city !== "Select your county" &&
      postalCode
    ) {
      ctxDispatch({
        type: "SAVE_SHIPPING_ADDRESS",
        payload: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      });
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify({
          fullName,
          address,
          city,
          postalCode,
          // country,
        })
      );
      navigate("/payment");
    }
  };
  return (
    <Container className="mt-3">
      <div>
        <Helmet>
          <title>Shipping Address</title>
        </Helmet>

        <CheckoutSteps step1 step2></CheckoutSteps>
        <div className="container small-container">
          <h1 className="my-3">Shipping Address</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="city">
              <Form.Label>County</Form.Label>
              <Form.Select
                onChange={(e) => setCity(e.target.value)}
                value={city}
                required
              >
                <option>Select your county</option>
                <option>Nairobi</option>
                <option>Mombasa</option>
                <option>Kwale</option>
                <option>Kilifi</option>
                <option>Tana River</option>
                <option>Lamu</option>
                <option>Taita Taveta</option>
                <option>Garissa</option>
                <option>Wajir</option>
                <option>Mandera</option>
                <option>Marsabit</option>
                <option>Isiolo</option>
                <option>Meru</option>
                <option>Tharaka-Nithi</option>
                <option>Embu</option>
                <option>Kitui</option>
                <option>Machakos</option>
                <option>Makueni</option>
                <option>Nyandarua</option>
                <option>Nyeri</option>
                <option>Kirinyaga</option>
                <option>Murang'a</option>
                <option>Kiambu</option>
                <option>Turkana</option>
                <option>West Pokot</option>
                <option>Samburu</option>
                <option>Trans-Nzoia</option>
                <option>Uasin Gishu</option>
                <option>Elgeyo-Marakwet</option>
                <option>Nandi</option>
                <option>Baringo</option>
                <option>Laikipia</option>
                <option>Nakuru</option>
                <option>Narok</option>
                <option>Kajiado</option>
                <option>Kericho</option>
                <option>Bomet</option>
                <option>Kakamega</option>
                <option>Vihiga</option>
                <option>Bungoma</option>
                <option>Busia</option>
                <option>Siaya</option>
                <option>Kisumu</option>
                <option>Homa Bay</option>
                <option>Migori</option>
                <option>Kisii</option>
                <option>Nyamira</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="postalCode">
              <Form.Label>Phone No.</Form.Label>
              <Form.Control
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="country">
              <Form.Label>County</Form.Label>
              <Form.Control
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </Form.Group> */}
            <div className="mb-3">
              <Button variant="primary" type="submit">
                Continue
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
}
