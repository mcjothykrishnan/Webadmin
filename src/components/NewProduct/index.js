import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addProductAction } from "../../actions/products-actions";
import { showAlert, hideAlertAction } from "../../actions/alert-actions";
import "./index.css";

const Newproduct = ({ history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [preview, setPreview] = useState("");

  // access the store state
  const loading = useSelector((state) => state.products.loading); // true o false
  const error = useSelector((state) => state.products.error); // true o false
  const alert = useSelector((state) => state.alert.alert);

  const submitNewProduct = async (event) => {
    event.preventDefault();
    // validate form
    if (name.trim() === "" || price <= 0) {
      const alert = {
        msg: "All fields are required.",
      };
      showAlert(alert);
      return;
    }
    // if no errors
    hideAlertAction();
    // create new product
    await addProductAction({ name, price, preview });
    // redirect to main component
    history.push("/");
  };

  const onAddImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const goBack = () => {
    history.push("/");
  };

  return (
    <div>
      <h2 className="table__title">New User</h2>
      <form className="form" onSubmit={submitNewProduct}>
        <section className="form__section">
          <label>User Name</label>
          <input
            type="text"
            placeholder="User name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </section>
        <section className="form__section">
          <label>User Income</label>
          <input
            type="number"
            name="price"
            placeholder="User Income"
            min="0"
            value={price}
            onChange={(event) => setPrice(Number(event.target.value))}
          />
        </section>
        <section className="form__section">
          <label>User Image</label>
          {preview && (
            <img
              src={preview}
              alt=""
              style={{ width: "100px", height: "10vh", objectFit: "cover" }}
            />
          )}
          <input type="file" onChange={onAddImage} />
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
      {loading ? <p>Loading...</p> : null}
      {error ? <p>Ups! An error ocurred.</p> : null}
    </div>
  );
};

export default Newproduct;
