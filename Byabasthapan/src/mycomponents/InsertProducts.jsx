import React, { useState, useEffect } from 'react';
import './InsertProducts.css';
import { useOutletContext } from "react-router-dom";
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { FaBox, FaTrash, FaPercent, FaMoneyBill, FaShoppingCart, FaPrint, FaPlusCircle, FaTag, FaDollarSign, FaCogs, FaCalendarAlt, FaTags } from "react-icons/fa";
import { Table, Button, Form, Container, Row, Col, Alert } from "react-bootstrap";

function getDate() {
    return new Date().toLocaleString();
}


export default function InsertProducts() {
    const [backgroundColor] = useOutletContext();
    const [array, setArray] = useState([]);

    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(getDate()), 1000);

        return () => clearInterval(interval);
    }, []);

    const [productName, setProductName] = useState("");
    const [costPrice, setCostPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [vatPercent, setVatPercent] = useState(0);
    const [profitPercent, setProfitPercent] = useState(0);
    const [manufactureDate, setManufactureDate] = useState();
    const [expireDate, setExpireDate] = useState();
    const [alertMessage, setAlertMessage] = useState(null);
    const [currentTime, setCurrentTime] = useState(getDate());
    let grandTotal = 0;
    // Dynamic Calculations
    const vatAmount = (vatPercent / 100) * costPrice; 
    const costWithoutVat = costPrice * quantity;       
    const totalCost = costWithoutVat + vatAmount * quantity;
    const markedPrice = costPrice + ((profitPercent + 5) / 100) * costPrice + vatAmount;

    const handleOnAddClick = () => {
        if (quantity > 0) {
            setArray([...array, {

                productName,
                costPrice,
                quantity,
                vatPercent,
                profitPercent,
                markedPrice,
                totalCost,
                manufactureDate,
                expireDate

            }]);
            resetFields();
        }
        else {
            alert("Please enter valid details.");
        }
    };
    const resetFields = () => {
        setProductName("");
        setCostPrice(0);
        setQuantity(0);
        setVatPercent(0);
        setProfitPercent(0);
        grand_Total = 0;
    };



    const handleInsert = () => {
        const url = 'https://localhost:44365/api/ViewPurchase/Insert_Items';

        array.forEach((item) => {
            const data = {
                Date: getDate(),
                Product_Name: item.productName,
                Cost_price: item.costPrice,
                Quantity: item.quantity,
                Profit_Percent: item.profitPercent,
                Vat_Percent: item.vatPercent,
                Vat: item.vatAmount,
                Marked_Price: item.markedPrice,
                ManufactureDate: item.manufactureDate || null,
                ExpireDate: item.expireDate || null,
                Total: item.totalCost
            };
            axios.post(url, data)

                .catch((error) => alert(error));
        });

        setShowAlert(true);
        setArray([]);
        resetFields();
    };

    const handleDelete = (index) => {
        setArray(array.filter((_, i) => i !== index));
    };


    const handlePrint = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Byabasthapan", 80, 10);
        doc.setFontSize(14);
        doc.text("Purchase Details", 80, 20);

        const headers = [["SN", "Name", "Cost Price", "Quantity", "Profit%", "Marked Price", "Vat%", "Total"]];
        let grand_Total = 0;
        const data = array.map((item, index) => {
            grand_Total += item.totalCost;
            return [
                index + 1, item.productName, item.Cost_price, item.quantity, item.profitPercent, item.markedPrice,
                item.vatPercent, item.totalCost
            ];
        });

        doc.autoTable({
            startY: 30,
            head: headers,
            body: data,
            foot: [["", "", "", "", "Grand Total:", `Rs. ${grand_Total}`]]
        });
        doc.save("purchase_details.pdf");
    };

    return (
        <>
            <Container>
                <h2 className="text-center my-4">🛒 Insert Items</h2>
                <p className="text-center text-muted">Date & Time: {currentTime}</p>
                {showAlert && (
                    <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                        ✅ Data inserted successfully!
                    </Alert>
                )}
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label><FaBox /> Product Name</Form.Label>
                            <Form.Control
                                type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Insert product..."
                            />
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group>
                            <Form.Label><FaDollarSign /> Cost Price</Form.Label> 
                            <Form.Control type="number" min={0} value={costPrice} onChange={(e) => setCostPrice(Number(e.target.value))} />
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group>
                            <Form.Label><FaCogs /> Quantity</Form.Label>
                            <Form.Control type="number" min={0} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label><FaPercent /> Vat %</Form.Label> {/* Updated icon */}
                            <Form.Control type="number" min={0} value={vatPercent} onChange={(e) => setVatPercent(Number(e.target.value))} />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label><FaCalendarAlt /> Manufacture Date</Form.Label> {/* Updated icon */}
                            <Form.Control type="date" value={manufactureDate || ""} onChange={(e) => setManufactureDate(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label><FaCalendarAlt /> Expire Date</Form.Label> {/* Updated icon */}
                            <Form.Control type="date" value={expireDate || ""} onChange={(e) => setExpireDate(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label><FaPercent /> Profit % Margin</Form.Label> {/* Updated icon */}
                            <Form.Control type="number" min={0} value={profitPercent} onChange={(e) => setProfitPercent(Number(e.target.value))} />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label><FaTags /> Marked Price</Form.Label> {/* Updated icon */}
                            <Form.Control
                                type="number" value={markedPrice} readOnly
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={3}>
                        <h5>Total: Rs:{totalCost}</h5>
                    </Col>
                   
                </Row>

                <Row className="mb-3">
                    <Button variant="success" onClick={handleOnAddClick}>➕ Add</Button>
                </Row>


                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>SN</th><th>Name</th><th>Cost Price</th><th>Quantity</th>
                            <th>Profit%</th>
                            <th>Marked Price</th><th>VAT%</th><th>Total</th><th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {array.map((item, i) => {
                            grandTotal += item.totalCost;
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{item.productName}</td>
                                    <td>{item.costPrice}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.profitPercent}</td>
                                    <td>{item.markedPrice}</td>
                                    <td>{item.vatPercent}%</td>
                                    <td>{item.totalCost}</td>
                                    <td><Button variant="danger" onClick={() => handleDelete(i)}><FaTrash /></Button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>

                <br />
                <Row className="mb-3">

                    <Col md={3}>
                        <h5>Total Cost Price Rs: {grandTotal}</h5>
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
        </>
    );
}
