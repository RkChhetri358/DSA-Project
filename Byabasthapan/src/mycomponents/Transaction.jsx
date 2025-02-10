import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBox,FaPlusCircle, FaPrint,FaTrash,FaPercentage, FaTags,FaMoneyBill, FaShoppingCart } from "react-icons/fa";
import { Table, Button, Form, Container, Row, Col, Alert } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";


function getDate() {
  return new Date().toLocaleString();
}

export default function Transactions() {
  const [itemData, setItemData] = useState([]);
  const [productName, setProductName] = useState("");
  const [markedPrice, setMarkedPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [vatPercent, setVatPercent] = useState(0);
  const [total, setTotal] = useState(0);
  const [membership, setMembership] = useState(false);
  const [array, setArray] = useState([]);
  const [currentTime, setCurrentTime] = useState(getDate());
  const [showAlert, setShowAlert] = useState(false);
  let grandTotal = 0;

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(getDate()), 1000);
    getData();
    return () => clearInterval(interval);
  }, []);


  const getData = () => {
    const url = 'https://localhost:44365/api/ViewPurchase/view_Available_Items';

    
    const requestBody = {
        Product_Name: "SomeProduct", 
    };

    axios.post(url, requestBody, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((result) => {
        const data = result.data;
        if (data.StatusCode === 200) {
          setItemData(data.listNewdata);
            console.log("Fetch available items:", data.listNewdata);
        } else {
          setItemData([]); 
        }
    })
    .catch((error) => {
        console.error("Error fetching available items:", error);
        setItemData([]); 
    });
};

  const handleProductNameChange = (e) => {
    const value = e.target.value;
    setProductName(value);

    const selectedProduct = itemData.find(item => item.Product_Name === value);
    if (selectedProduct) {
      setMarkedPrice(selectedProduct.Marked_Price || 0);
      setVatPercent(selectedProduct.Vat_Percent || 0);
    }
  };

  useEffect(() => {
    let discount = (discountPercent / 100) * markedPrice;
    let priceAfterDiscount = markedPrice - discount;
    let vatAmount = (vatPercent / 100) * priceAfterDiscount;
    let totalPrice = (priceAfterDiscount + vatAmount) * quantity;
    if (membership) totalPrice *= 0.95;
    setTotal(totalPrice.toFixed(2));
  }, [markedPrice, discountPercent, vatPercent, quantity, membership]);

  const handleOnAddClick = () => {
    if (quantity > 0) {
      setArray([...array, { productName, markedPrice, quantity, discountPercent, vatPercent, total }]);
      resetFields();
    } else {
      alert("Please enter valid details.");
    }
  };

  const handleInsert = async () => {
    const url = "https://localhost:44365/api/ViewPurchase/Total_Sales";
  
    for (const item of array) {
    
      try {
        const stockResponse = await axios.post("https://localhost:44365/api/ViewPurchase/view_Available_Items", {
          Product_Name: item.productName,
          Quantity: item.quantity,
        });
  
        if (stockResponse.data.StatusCode === 400) {
          alert(`❌ Not enough stock for ${item.productName}!`);
          return;
        }
  
      
        const data = {
          Date: getDate(),
          Product_Name: item.productName,
          Marked_Price: item.markedPrice,
          Quantity: item.quantity,
          Selling_price: item.total,
          Discount_Percent: item.discountPercent,
          Vat_Percent: item.vatPercent,
        };
  
        const result = await axios.post(url, data);
        alert(result.data.StatusMessage);
  
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    }
  
    setShowAlert(true);
    setArray([]); 
  };

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Byabasthapan", 80, 10);
    doc.setFontSize(14);
    doc.text("Transaction Details", 80, 20);
  
    const headers = [["SN", "Name", "Marked Price", "Quantity", "Discount%", "VAT%", "Total"]];
    let grand_Total = 0;
    const data = array.map((item, index) => {
      grand_Total += parseFloat(item.total); 
      return [
        index + 1,
        item.productName,
        item.markedPrice,
        item.quantity,
        item.discountPercent,
        item.vatPercent,
        `Rs. ${item.total}`,
      ];
    });
  
    doc.autoTable({
      startY: 30,
      head: headers,
      body: data,
      foot: [["", "", "", "", "Grand Total:", `Rs. ${grand_Total.toFixed(2)}`]],
    });
  
    doc.save("transaction.pdf");
  };
  
  const handleDelete = (index) => {
    setArray(array.filter((_, i) => i !== index));
  };

  
  const resetFields = () => {
    setProductName("");
    setMarkedPrice(0);
    setQuantity(0);
    setDiscountPercent(0);
    setVatPercent(0);
    setTotal(0);
  };

  return (
    <Container>
      <h2 className="text-center my-4">🛒 Business Transactions</h2>
      <p className="text-center text-muted">Date & Time: {currentTime}</p>

      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          ✅ Data inserted successfully!
        </Alert>
      )}

      <Row className="mb-3">
        <Col md={8}>
          <Form.Group>
            <Form.Label><FaBox /> Product Name</Form.Label>
            <Form.Control
              type="text"
              list="productNames"
              value={productName}
              onChange={handleProductNameChange}
              placeholder="Select product..."
            />
            <datalist id="productNames">
              {itemData.map((item) => (
                <option key={item.Product_Name} value={item.Product_Name} />
              ))}
            </datalist>
          </Form.Group>
        </Col>

   
      </Row>
      <Row className="mb-3">
      <Col md={4}>
          <Form.Group>
            <Form.Label><FaShoppingCart /> Quantity</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label><FaPercentage /> Discount %</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(Number(e.target.value))}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">

        <Col md={4}>
          <Form.Group>
            <Form.Label><FaMoneyBill />VAT %</Form.Label>
            <Form.Control type="number" value={vatPercent} readOnly />
          </Form.Group>
        </Col>
      <Col md={4}>
          <Form.Group>
           <Form.Label><FaTags /> Marked Price</Form.Label> 
            <Form.Control type="number" value={markedPrice} readOnly />
          </Form.Group>
        </Col>

 
      </Row>
      <Row className="mb-3">
        <Col md={3}>
        
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <Form.Check
            type="checkbox"
            label="Membership Discount (5%)"
            checked={membership}
            onChange={() => setMembership(!membership)}
          />
        </Col>
        <Col md={3}>
          <h5>Total: Rs: {total}</h5>
        </Col>
        
      </Row>

         <Row className="mb-3">
           
                         <Button variant="success" onClick={handleOnAddClick}>➕ Add</Button>


                         </Row>
            

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>SN</th>
            <th>Name</th>
            <th>Marked Price</th>
            <th>Quantity</th>
            <th>Discount %</th>
            <th>VAT %</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
       
          {array.map((item, i) => {
            grandTotal += item.total;
            return(
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.productName}</td>
              <td>{item.markedPrice}</td>
              <td>{item.quantity}</td>
              <td>{item.discountPercent}%</td>
              <td>{item.vatPercent}%</td>
              <td>{item.total}</td>
               <td><Button variant="danger" onClick={() => handleDelete(i)}><FaTrash /></Button></td>
            </tr>
);})}
        </tbody>
      </Table>
      <Row className="mb-3">
      
      <Col md={3}>
          <h5>Total Price Rs: {grandTotal}</h5>
      </Col>

  </Row>
   
                   <Row className="mb-3" style={{ padding: 0 }}>
   
     <Col md={4} style={{ padding: '0 5px' }}>
       <Button
         variant="primary"
         size="lg"
         onClick={handleInsert}
         style={{
           backgroundColor: '#FF5722', 
           borderColor: '#E64A19', 
           fontWeight: 'bold', 
           padding: '12px 24px', 
           transition: 'all 0.3s ease', 
         }}
         onMouseOver={(e) => (e.target.style.backgroundColor = '#FF7043')} 
         onMouseOut={(e) => (e.target.style.backgroundColor = '#FF5722')}
       >
         <FaPlusCircle style={{ marginRight: '8px' }} /> Insert
       </Button>
     </Col>
     <Col md={5} style={{ padding: '0 5px' }}>
       <Button
         variant="primary"
         size="lg"
         onClick={handlePrint}
         style={{
           backgroundColor: '#4CAF50',
           borderColor: '#388E3C', 
           fontWeight: 'bold', 
           padding: '12px 24px', 
           transition: 'all 0.3s ease', 
         }}
         onMouseOver={(e) => (e.target.style.backgroundColor = '#45A049')} 
         onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
       >
         <FaPrint style={{ marginRight: '8px' }} /> Print
       </Button>
     </Col>
   </Row> 
      
    </Container>
  );
}
