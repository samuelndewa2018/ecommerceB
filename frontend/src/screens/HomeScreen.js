import { useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import NewProduct from "../components/NewProduct";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  MdChevronLeft,
  MdChevronRight,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "NEW_FETCH_REQUEST":
      return { ...state, loading: true };
    case "NEW_FETCH_SUCCESS":
      return { ...state, newproducts: action.payload, loading: false };
    case "NEW_FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products, newproducts }, dispatch] = useReducer(
    logger(reducer),
    {
      products: [],
      newproducts: [],
      loading: true,
      error: "",
    }
  );
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      dispatch({ type: "NEW_FETCH_REQUEST" });

      try {
        const result = await axios.get("/api/products");
        const newresult = await axios.get("/api/newproducts");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        dispatch({ type: "NEW_FETCH_SUCCESS", payload: newresult.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
        dispatch({ type: "NEW_FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);

  // scrolls
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  // scrolls
  const slideLeft2 = () => {
    var slider = document.getElementById("slider2");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight2 = () => {
    var slider = document.getElementById("slider2");
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  // scrolls
  const slideLeft3 = () => {
    var slider = document.getElementById("slider3");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight3 = () => {
    var slider = document.getElementById("slider3");
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  // sorting products
  const productSortedDate = products?.slice(0);
  productSortedDate?.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return (
    <div>
      <Helmet>
        <title>Amazona</title>
      </Helmet>
      {!loading && <h2>Featured Products</h2>}
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="containerPro">
            <MdChevronLeft
              className="rightScroll"
              onClick={slideLeft}
              size={40}
            />

            <div
              className="ProdictCotainer"
              id="slider"
              style={{ scrollBehavior: "smooth" }}
            >
              {products.map((product) => (
                <Row key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                  <Product product={product}></Product>
                </Row>
              ))}
            </div>
            <MdChevronRight
              className="leftScroll"
              onClick={slideRight}
              size={40}
            />
          </div>
        )}
      </div>
      {!loading && <h2>New Products</h2>}
      <div className="products">
        {loading ? (
          ""
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="containerPro">
            <MdChevronLeft
              className="rightScroll"
              onClick={slideLeft2}
              size={40}
            />

            <div
              className="ProdictCotainer"
              id="slider2"
              style={{ scrollBehavior: "smooth" }}
            >
              {newproducts.map((newproduct) => (
                <Row
                  key={newproduct.slug}
                  sm={6}
                  md={4}
                  lg={3}
                  className="mb-3"
                >
                  <NewProduct newproduct={newproduct}></NewProduct>
                </Row>
              ))}
            </div>
            <MdChevronRight
              className="leftScroll"
              onClick={slideRight2}
              size={40}
            />
          </div>
        )}
      </div>
      {!loading && <h2>Offer Products</h2>}
      <div className="products">
        {loading ? (
          ""
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="containerPro">
            <MdChevronLeft
              className="rightScroll"
              onClick={slideLeft3}
              size={40}
            />

            <div
              className="ProdictCotainer"
              id="slider3"
              style={{ scrollBehavior: "smooth" }}
            >
              {productSortedDate.map((product) => (
                <Row key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                  <Product product={product}></Product>
                </Row>
              ))}
            </div>
            <MdChevronRight
              className="leftScroll"
              onClick={slideRight3}
              size={40}
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
