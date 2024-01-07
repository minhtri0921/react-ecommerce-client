import React, { useEffect, useState } from "react";
import { Navbar } from "../components";
import Menu from "../components/Menu";
import axios from "axios";

const AdminPage = () => {
  const initialProductState = {
    "name": "",
    "description": "",
    "gender": "men",
    "price": "",
    "inventoryQuantity": 30,
    "categoryId": "",
    "imageList": "",
    "colorList": ["blue", "black", "red"],
    "sizeList": ["S", "M", "L", "XL"],
  };
  const [product, setProduct] = useState(initialProductState);
  const [productList, setProductList] = useState([]);
  const [showFields, setShowFields] = useState(false);
  const [isEditting, setIsEditting] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          "https://wm-shop-be.onrender.com/api/v1/customer/products?categoryId=&keyword=&orderByPrice=&limit=50"
        );
        setProductList(response.data.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();

    // const getCatById = async (id) => {
    //   try {
    //     const response = await axios.get(
    //       `https://wm-shop-be.onrender.com/api/v1/products/${id}`
    //     );
    //     setProduct
    //   } catch (error) {
    //     console.error("Error fetching products:", error);
    //   }
    // };
  }, []);

  const handleAddProduct = async () => {
    console.log(product);
    try {
      // Chuyển đối tượng product sang dạng JSON
      const productJSON = JSON.stringify(product);
        console.log(productJSON);
      await axios.post(
        "https://wm-shop-be.onrender.com/api/v1/products",
        productJSON, // Sử dụng dữ liệu JSON thay vì đối tượng
        { headers: { "Content-Type": "application/json" } } // Đặt header để xác định loại nội dung
      );
  
      const response = await axios.get(
        "https://wm-shop-be.onrender.com/api/v1/customer/products?categoryId=&keyword=&orderByPrice=&limit=50"
      );
      setProductList(response.data.data.data);
  
      setProduct(initialProductState);
  
      setShowFields(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  const editProduct = async () => {
    try {
      await axios.put("http://localhost:3001/products/editById", product);
    } catch (err) {
      console.log("Error edit Product " + err);
    }

    setShowFields(false);
    setIsEditting(false);
    setProduct(initialProductState);
    window.location.reload();
  };

  const handleEditProduct = (productId) => {
    const editingProduct = productList.find((prd) => {
      return prd.id === productId;
    });
    setProduct(editingProduct);
    setShowFields(true);
    setIsEditting(true);
  };

  const handleDeleteProduct = async (productId) => {
    console.log(productId);
    try {
      // Gửi request để xóa sản phẩm dựa vào productId
      await axios.put(`https://wm-shop-be.onrender.com/api/v1/products/changeStatus?productId=${productId}&status=false`);

      // Lấy danh sách sản phẩm mới sau khi xóa
      // const response = await axios.get("http://localhost:3001/products");
      // setProductList(response.data);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
//   console.log(productList);
  return (
    <>
      <Navbar showButtons={false} />
      <div className="container my-3 py-3">
        <h1 className="text-center">Admin Page</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-8 col-lg-6 col-sm-10 mx-auto">
            <button
              className="my-2 px-4 mx-auto btn btn-dark"
              onClick={() => setShowFields(!showFields)}
            >
              {showFields ? "Hide" : "Add"}
            </button>
            <Menu></Menu>
            {showFields && (
              <>
                <h2>{isEditting ? "Edit Prodcut" : "Add Product"}</h2>
                <div className="form my-3">
                  <label htmlFor="title">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={product.title}
                    onChange={(e) =>
                      setProduct({ ...product, "name": e.target.value })
                    }
                    placeholder="Enter product title"
                  />
                </div>
                <div className="form my-3">
                  <label htmlFor="price">Price</label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    value={product.price}
                    onChange={(e) =>
                      setProduct({ ...product, "price": e.target.value })
                    }
                    placeholder="Enter product price"
                  />
                </div>
                <div className="form my-3">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={product.description}
                    onChange={(e) =>
                      setProduct({ ...product, "description": e.target.value })
                    }
                    placeholder="Enter product description"
                  />
                </div>
                <div className="form my-3">
                  <label htmlFor="category">Category</label>
                  <select
                    className="form-control"
                    id="category"
                    value={product.categoryId}
                    onChange={(e) =>
                      setProduct({ ...product, "categoryId": e.target.value })
                    }
                  >
                    <option value="5">Jackets</option>
                    <option value="4">Hoodies</option>
                    <option value="3">T-Shirts</option>
                    <option value="1">Trousers</option>
                  </select>
                </div>
                <div className="form my-3">
                  <label htmlFor="image">ImageURL</label>
                  <input
                    type="text"
                    className="form-control"
                    id="image"
                    value={product.image}
                    onChange={(e) =>
                      setProduct({ ...product, "imageList": [e.target.value] })
                    }
                    placeholder="Enter product image URL"
                  />
                </div>

                <button
                  className="my-2 px-4 mx-auto btn btn-dark"
                  onClick={isEditting ? editProduct : handleAddProduct}
                >
                  {isEditting ? "Edit" : "Add"}
                </button>
              </>
            )}

            <hr />
            <h2>Product List</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <img
                        src={product.avatar}
                        alt={product.title}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleEditProduct(product.id)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
