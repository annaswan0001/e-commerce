import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addProductsStart,
  fetchProductsStart,
  deleteProductStart,
} from "../../redux/Products/productsActions";
import Modal from "./../../components/Modal/Modal";
import FormInput from "./../../components/Forms/Input/Input";
import Button from "./../../components/Forms/Button/Button";
import FormSelect from "../../components/Forms/Select/Select";
import { useSelector } from "react-redux";
import "./Admin.scss";

const mapState = (state) => ({
  productsData: state.products.visibleIds.map((id) => state.products.byId[id]),
});

const Admin = (props) => {
  const [hideModal, setHideModal] = useState(true);
  const toggleModal = (truthy) => setHideModal(truthy);

  const [productName, setProductName] = useState("");
  const [productColor, setProductColor] = useState("");
  const [ProductImageURL, setProductImageURL] = useState([]);
  const [productPrice, setProductPrice] = useState(0);
  const [productPriceSale, setProductPriceSale] = useState(0);
  const [productCategory, setProductCategory] = useState("mens");
  const [productId, setProductId] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const blankInventory = { size: "0-3", inventory: 1 };
  const [productInventory, setProductInventory] = useState([
    { ...blankInventory },
  ]);

  const dispatch = useDispatch();

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
    console.log({
      productCategory,
      productName,
      ProductImageURL,
      productPrice,
      productColor,
      productDescription,
      productInventory,
      productId,
      productPriceSale,
    });
    dispatch(
      addProductsStart({
        productCategory,
        productName,
        ProductImageURL,
        productPrice,
        productColor,
        productInventory,
        productId,
        productPriceSale,
        productDescription,
      })
    );
    resetForm();
  };

  const resetForm = () => {
    setHideModal(true);
    setProductCategory("mens");
    setProductName("");
    setProductImageURL([]);
    setProductPrice(0);
    setProductPriceSale(0);
    setProductColor("all");
    setProductInventory([{ ...blankInventory }]);
    setProductId("");
    setProductDescription("");
  };

  const handleInventoryChange = (e) => {
    const updatedInventory = [...productInventory];
    updatedInventory[e.target.dataset.idx][e.target.className] = e.target.value;
    setProductInventory(updatedInventory);
  };

  const onChangePicture = (e) => {
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        const newFile = e.target.files[i];
        newFile["id"] = Math.random();
        setProductImageURL((prevState) => [...prevState, newFile]);
      }
    }
  };

  const addInventory = () => {
    setProductInventory([...productInventory, { ...blankInventory }]);
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
            <FormInput
              type="text"
              name="productId"
              value={productId}
              placeholder="Product ID"
              handleChange={(e) => setProductId(e.target.value)}
            />
            <FormInput
              type="text"
              name="productDescription"
              value={productDescription}
              placeholder="Product description"
              handleChange={(e) => setProductDescription(e.target.value)}
            />
            <Button type="button" value="Add Inventory" onClick={addInventory}>
              Add inventory
            </Button>

            {productInventory.map((val, idx) => {
              const sizeId = `size-${idx}`;
              const inventoryId = `inventory-${idx}`;
              return (
                <div key={`size-${idx}`} className="wrrapperInventory">
                  <FormSelect
                    label={`Size ${idx + 1}`}
                    name={sizeId}
                    data-idx={idx}
                    id={sizeId}
                    className="size"
                    value={productInventory[idx].size}
                    onChange={handleInventoryChange}
                    options={[
                      {
                        value: "0-3",
                        name: "0-3",
                      },
                      {
                        value: "3-6",
                        name: "3-6",
                      },
                      {
                        value: "6-9",
                        name: "6-9",
                      },
                      {
                        value: "9-12",
                        name: "9-12",
                      },
                      {
                        value: "1 year",
                        name: "1 year",
                      },
                      {
                        value: "1.5 year",
                        name: "1.5 year",
                      },
                      {
                        value: "2 year",
                        name: "2 year",
                      },
                    ]}
                    handleChange={(e) => setProductCategory(e.target.value)}
                  />
                  <label htmlFor={inventoryId}>Inventory</label>
                  <FormInput
                    type="number"
                    min="0"
                    max="10000.00"
                    step="1"
                    name={inventoryId}
                    data-idx={idx}
                    id={inventoryId}
                    className="inventory"
                    value={productInventory[idx].inventory}
                    onChange={handleInventoryChange}
                  />
                </div>
              );
            })}

            <FormSelect
              label="Color"
              options={[
                {
                  value: "green",
                  name: "green",
                },
                {
                  value: "yellow",
                  name: "yellow",
                },
                {
                  value: "blue",
                  name: "blue",
                },
                {
                  value: "red",
                  name: "red",
                },
                {
                  value: "browm",
                  name: "browm",
                },
                {
                  value: "beige",
                  name: "beige",
                },
                {
                  value: "rose ",
                  name: "rose",
                },
                {
                  value: "black",
                  name: "black",
                },
                {
                  value: "orange",
                  name: "orange",
                },
                {
                  value: "gray",
                  name: "gray",
                },
                {
                  value: "turquoise",
                  name: "turquoise",
                },
                {
                  value: "violet",
                  name: "violet",
                },
                {
                  value: "mustard",
                  name: "mustard",
                },
                {
                  value: "all",
                  name: "all",
                },
                {
                  value: "multi",
                  name: "multi",
                },
              ]}
              handleChange={(e) => setProductColor(e.target.value)}
            />

            <FormInput
              type="file"
              name="ProductImageURL"
              multiple
              placeholder="Product Image URL"
              // webkitdirectory="true"
              handleChange={(e) => onChangePicture(e)}
            />

            <div>Price</div>
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

            <div>Sale Price</div>
            <FormInput
              type="number"
              min="0"
              max="10000.00"
              step="1"
              name="productPriceSale"
              value={productPriceSale}
              placeholder="productPriceSale"
              handleChange={(e) => setProductPriceSale(e.target.value)}
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
                    {/* {console.log(productsData)}; */}
                    {(productsData || []).map((product, index) => {
                      const {
                        productName,
                        productImgUrls,
                        productPrice,
                        documentId,
                        productId,
                        productInventory,
                        productCategory,
                      } = product;

                      return (
                        <tr key={index}>
                          <td>
                        
                            
                            <img className="thumb" src={productImgUrls[0]} />
                          </td>
                          <td>{productCategory}</td>
                          <td>{productName}</td>
                          <td>£{productPrice}</td>
                          <td>ID:{productId}</td>
                          <td>
                            {productInventory.map((item, i) => {
                              return (
                                <button key={item.size}>
                                  Size:{item.size}- Quantity:{item.inventory}
                                </button>
                              );
                            })}
                          </td>
                          <td>
                            <Button
                              onClick={() =>
                                dispatch(deleteProductStart(documentId))
                              }
                            >
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
