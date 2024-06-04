import { useEffect, useState } from "react";
import BackOffice from "../../components/BackOffice";
import MyModal from "../../components/MyModal";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../config";

function Product() {
  const [product,setProduct] = useState({})  // create , update
  const [products,setProducts] = useState([]) //show
  const [img , setImg] = useState({})  //file for upload

  useEffect(() => {
    fetchData();
  },[])

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('img',img)

      const res = await axios.post(
        config.apiPath + "/product/upload",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': localStorage.getItem('token')
          }
        }
      );
      if (res.data.newName !== undefined) {
        return res.data.newName;
      }
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
      return "";
    }
    
  };


  const handleSave = async() => {
   try{
      product.img = await handleUpload() 
      product.cost = parseInt(product.cost)
      product.price = parseInt(product.price )   
      
      let res; 
      
      if (product.id === undefined) {
          res = await axios.post(config.apiPath + '/product/create',product, config.headers())
      }else {
          res = await axios.put(config.apiPath + '/product/update',product , config.headers() )
      }

      if(res.data.message === 'success'){
        Swal.fire({title:'save',
          text: 'success',
          icon: 'success',
          timer:2000
      })
      document.getElementById('modalProduct_btnClose').click()
      fetchData()

      setProduct({...product, id:undefined}) //clear Id
    }
 }catch (e){
    Swal.fire({
      title: 'error',
      text: e.message,
      icon: "error"
    })
   }
}
 const fetchData = async () => {
   try {
    const res = await axios.get(
      config.apiPath + '/product/list',config.headers()
    );
      
    
    if(res.data.result !== undefined) {
      setProducts(res.data.result)
    }
   } catch (e) {
     Swal.fire({
       title: "error",
       text: e.message,
       icon: "error",
     });
   }
 };
   const clearForm = () => {
     setProduct({
       name: "",
       cost: "",
       price: "",
     });
     setImg({})
   };


   const handleRemove = async(item) => {
     try{
       const button = await Swal.fire({
         text: "remove item",
         title: "remove",
         icon: "question",
         showCancelButton: true,
         showConfirmButton: true
       })

       if(button.isConfirmed) {
        const res = await axios.delete(config.apiPath + '/product/remove/' + item.id, config.headers())
      
        if(res.data.message === 'success'){
          Swal.fire({
            title: 'remove',
            text: 'remove success',
            icon: 'success',
            times: 1000
          })
         
          fetchData()
        }
       }
     }catch (e) {
    Swal.fire({
       title: 'error',
       text: e.message,
       icon: 'error'
    })
     }
   }


  const selectedFile = (inputFile) => {
      if(inputFile !== undefined) {
        if(inputFile.length > 0 ){
          setImg(inputFile[0])
        }
      }
  }


  

   
  
  return (
    <div>
      <BackOffice>
        <div className="h4 ">Product</div>
        <button
          onClick={clearForm}
          className="btn btn-primary mr-2"
          data-toggle="modal"
          data-target="#modalProduct"
        >
          <i className="fa fa-plus mr-2"></i>เพิ่มรายการ
        </button>

        <button className="btn btn-success">
          <i className="fa fa-arrow-down mr-2"></i>Import from Excel
        </button>

        <table className="mt-3 table table-bordered table-striped">
          <thead>
            <tr>
            <tr>ภาพสินค้า</tr>
              <th>name</th>
              <th className="text-right" width="150px">
                cost
              </th>
              <th className="text-right" width="150px">
                price
              </th>
              <th width="140px"></th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((item) => {
                return (
                  <>
                    <tr>
                      <td>
                        {item.img !==  "" ? 
                        <img height={150} src={config.apiPath + '/uploads/' + item.img} /> 
                        : <></> }
                      </td>
                      <td >{item.name}</td>
                      <td className="text-right">{item.cost}</td>
                      <td className="text-right">{item.price}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-primary mr-2"
                          data-toggle="modal"
                          data-target="#modalProduct"
                          onClick={() => setProduct(item)}
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleRemove(item)}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })
            ) : (
              <></>
            )}
          </tbody>
        </table>

        <MyModal id="modalProduct" title="สินค้า">
          <div>
            <div>ชื่อสินค้า</div>
            <input
              value={product.name}
              className="form-control"
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
          </div>
          <div className="mt-3">
            <div>ราคาทุน</div>
            <input
              value={product.cost}
              className="form-control"
              onChange={(e) => setProduct({ ...product, cost: e.target.value })}
            />
          </div>
          <div className="mt-3">
            <div>ราคาขาย</div>
            <input
              value={product.price}
              className="form-control"
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
          </div>
          <div className="mt-3">
            <div>ภาพสินค้า</div>
            <input
              className="form-control"
              type="file"
              onChange={(e) => selectedFile(e.target.files)}
            />
          </div>
          <div className="mt-3">
            <button className="btn btn-primary" onClick={handleSave}>
              <i className="fa fa-check mr-2">save</i>
            </button>
          </div>
        </MyModal>
      </BackOffice>
    </div>
  );
}

export default Product;
