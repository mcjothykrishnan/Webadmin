import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { editProductAction } from "../../actions/products-actions";
import { useHistory } from "react-router-dom";
import { showAlert, hideAlertAction } from "../../actions/alert-actions";
import "./index.css";

const EditProduct = () => {
  const history = useHistory();
  const productEdit = useSelector((state) => state.products.editProduct);
  const alert = useSelector((state) => state.alert.alert);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    preview: "",
  });
  console.log(product, "editForm");
  // fill state
  useEffect(() => {
    setProduct(productEdit);
  }, [productEdit]);

  const onChangeForm = (event) => {
    if (event.target.type === "file") {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        let value = reader.result;
        setProduct({
          ...product,
          preview: value,
        });
      };
    } else {
      setProduct({
        ...product,
        [event.target.name]: event.target.value,
      });
    }
  };

  const submitEditProduct = async (event) => {
    event.preventDefault();
    // validate form
    if (product.name.trim() === "" || product.price <= 0) {
      const alert = {
        msg: "All fields are required.",
      };
      showAlert(alert);
      return;
    }
    // if no errors
    hideAlertAction();
   
    await editProductAction(product);
    history.push("/");
  };

  const goBack = () => {
    history.push("/");
  };

  return (
    <div>
      <h2 className="table__title">Edit product</h2>
      <form className="form" onSubmit={submitEditProduct}>
        <section className="form__section">
          <label>User Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={onChangeForm}
          />
        </section>
        <section className="form__section">
          <label>User Income</label>
          <input
            type="number"
            name="price"
            min="0"
            value={product.price}
            onChange={onChangeForm}
          />
        </section>
        <section className="form__section">
          <label>User Image</label>
          {product.preview && (
            <img
              src={product.preview}
              alt=""
              style={{width: "100px", height: "10vh", objectFit: "cover"}} 
            />
          )}
          <input type="file" onChange={onChangeForm} />
        </section>
        <div className="button__container">
          <button
            type="button"
            className="button button--cancel"
            onClick={goBack}
          >
            Cancel
          </button>
          <button className="button button--confirm">Confirm</button>
        </div>
        {alert ? <p className="alert-message">{alert.msg}</p> : null}
      </form>
    </div>
  );
};

export default EditProduct;
