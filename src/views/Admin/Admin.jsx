import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addProductsStart,
  fetchProductsStart,
  deleteProductStart
} from "../../redux/Products/productsActions";
import Modal from "./../../components/Modal/Modal";
import FormInput from "./../../components/Forms/Input/Input";
import Button from "./../../components/Forms/Button/Button";
import FormSelect from "../../components/Forms/Select/Select";
import { useSelector } from "react-redux";
import "./Admin.scss";

const mapState = ({ products }) => ({
  productsData: products.products,
});

const Admin = (props) => {
  const [hideModal, setHideModal] = useState(true);
  const [productName, setProductName] = useState("");
  const [productColor, setProductColor] = useState("");
  const [productSize, setProductSize] = useState("");
  const [ProductImageURL, setProductImageURL] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState("mens");
  const dispatch = useDispatch();
  const toggleModal = (truthy) => setHideModal(truthy);

  const { productsData } = useSelector(mapState);

  const configModal = {
    hideModal,
    toggleModal,
  };

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addProductsStart({
        productCategory,
        productName,
        ProductImageURL,
        productPrice,
        productColor,
        productSize
      })
    );
    resetForm();
  };

  const resetForm = () => {
    setHideModal(true);
    setProductCategory("mens");
    setProductName("");
    setProductImageURL("");
    setProductPrice(0);
  };

  return (
    <div className="admin">
      <div className="callToActions">
        <ul>
          <li>
            <Button onClick={() => toggleModal(false)}>Add new product</Button>
          </li>
        </ul>
      </div>

      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>
            <h2>Add new product</h2>

            <FormSelect
              label="Category"
              options={[
                {
                  value: "mens",
                  name: "Mens",
                },
                {
                  value: "womens",
                  name: "Womens",
                },
              ]}
              handleChange={(e) => setProductCategory(e.target.value)}
            />

            <FormInput
              type="text"
              name="productName"
              value={productName}
              placeholder="Product Name"
              handleChange={(e) => setProductName(e.target.value)}
            />
             <FormSelect
              label="Category"
              options={[
                {
                  value: "зеленый",
                  name: "green",
                },
                {
                  value: "желтый",
                  name: "yellow",
                },
                {
                  value: "синий",
                  name: "blue",
                },
                {
                  value: "красный",
                  name: "red",
                },
                {
                  value: "коричневый",
                  name: "browm",
                },
                {
                  value: "бежевый",
                  name: "beige",
                },
                {
                  value: "розовый ",
                  name: "rose",
                },
                {
                  value: "черный",
                  name: "black",
                },
                {
                  value: "оранжевый",
                  name: "orange",
                },
                {
                  value: "серый",
                  name: "gray",
                },
                {
                  value: "бирюзовый",
                  name: "turquoise",
                },
                {
                  value: "фиолетовый",
                  name: "violet",
                },
                {
                  value: "горчичный",
                  name: "mustard",
                },

              ]}
              handleChange={(e) => setProductCategory(e.target.value)}
            />
            <FormInput
              type="text"
              name="productSize"
              value={productSize}
              placeholder="Product Size"
              handleChange={(e) => setProductSize(e.target.value)}
            />

            <FormInput
              type="url"
              name="ProductImageURL"
              value={ProductImageURL}
              placeholder="Product Image URL"
              handleChange={(e) => setProductImageURL(e.target.value)}
            />

            <FormInput
              type="number"
              min="0"
              max="10000.00"
              step="1"
              name="productPrice"
              value={productPrice}
              placeholder="Price"
              handleChange={(e) => setProductPrice(e.target.value)}
            />

            <Button type="submit">Add product</Button>
          </form>
        </div>
      </Modal>

      <div className="manageProducts">
        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <th>
                <h1>Manage Products</h1>
              </th>
            </tr>
            <tr>
              <td>
                <table
                  className="results"
                  border="0"
                  cellPadding="10"
                  cellSpacing="0"
                >
                  <tbody>
                    {console.log(productsData)};
                    {productsData.map((product, index) => {
                      const {
                        productName,
                        ProductImageURL,
                        productPrice,
                        documentId,
                      } = product;


                      return (
                        <tr key={index}>
                          <td>
                            <img className="thumb" src={ProductImageURL} />
                          </td>
                          <td>{productName}</td>
                          <td>£{productPrice}</td>
                          <td>£{documentId}</td>
                          <td>
                          <Button onClick={() => dispatch(deleteProductStart(documentId))}>
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Admin;
