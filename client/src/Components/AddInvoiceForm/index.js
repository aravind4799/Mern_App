import React, { useState, useEffect } from 'react'
import './AddInvoiceForm.scss'
import { fetchcustomerdetails } from '../../Api'

import * as AiIcons from 'react-icons/ai'
import * as BiIcons from 'react-icons/bi'

import { useHistory } from 'react-router-dom';
import {
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import {
    TimePicker,
    DatePicker,
    DateTimePicker,
} from 'formik-material-ui-pickers';
import DateFnsUtils from "@date-io/date-fns";

import TermsData from './TermsData';

import Notification from '../Notification';
import AddInvoiceTable from '../invoiceTable';
import place_of_supply from './Place_of_supply';

import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress, MenuItem, TextField as TF, FormControlLabel, Checkbox } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Autocomplete } from "formik-material-ui-lab";
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import axios from "axios";
import { set } from 'mongoose';

const AddInvoiceForm = ({ editRecordData, handleAddInvoiceToggle, updateInvoiceData }) => {


 
    const [sales_checked, setsales] = useState(true)
    const [purchase_checked, setpurchase] = useState(true)
    const [track_inventory_checked, settrackinventory] = useState(false)
    const [openPopUp, setOpenPopUp] = useState(false)
    const [isEditData, setIsEditData] = useState(false)
    const [addbutton_disabled, enable_addbutton] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [customer_id , setCustomerId] = useState("")

    const[products_data,setProductsData]=useState([])

    const [customer_data, setCustomerData] = useState([])

    const [billing_address,setBillingAddress] = useState({})
    const [shipping_address,setShippingAddress] = useState({})
    // const [place_to_supply,setPlaceToSupply] = useState(null)

    const [customer_details, setCustomerDetails] = useState(editRecordData ? editRecordData.customer_details:{})
    const [customer_name,setCustomerName]=useState(editRecordData ? editRecordData.customer_name:'')
    const [isDetailsUpdated,setdetailsUpdated] = useState(editRecordData ? true : false)


    const [placetosupply,setPlaceToSupply]=useState(editRecordData ? editRecordData.updated_place_of_supply : '')
    const [igst_or_gst,setTaxType]=useState(null)

    useEffect(() => {
        if(placetosupply==='Tamil Nadu'){
            setTaxType(true)
            //true means gst
        }
        else{setTaxType(false) 
            //false means igst
        }
        
    },[placetosupply,customer_details])
    // const [total,setTotal] = useState(0)
    const history = useHistory();

    var initialValues = {
        customer_details: editRecordData ? editRecordData.customer_details : {},
        invoice_number: editRecordData ? editRecordData.invoice_number : '',
        order_number: editRecordData ? editRecordData.order_number : '',
        invoice_date: editRecordData ? editRecordData.invoice_date : new Date(),
        invoice_terms: editRecordData ? editRecordData.invoice_terms : '',
        invoice_due_date: editRecordData ? editRecordData.invoice_due_date : new Date(),
        items: editRecordData ? editRecordData.items : [],
        invoice_amount: null,
        sub_total:editRecordData ? editRecordData.sub_total :0,
        discount_amount: editRecordData ? editRecordData.discount_amount :0,
        discount_type: editRecordData ? editRecordData.discount_type :0,
        shipping_charges: editRecordData ? editRecordData.shipping_charges:0,

        editRecord_id: editRecordData ? editRecordData._id : '',
        action: null
    }
    // editRecordData = null;

    const toggle_addbutton = () => enable_addbutton(!addbutton_disabled)





    useEffect(() => {
        if (editRecordData != null) {
            setIsEditData((prev_value) => (!prev_value))
        }
    }, [editRecordData])

    const fetchAPI3 = async () => {
        setCustomerData(await fetchcustomerdetails());

    }

    useEffect(() => {
        fetchAPI3();
    }, []);

    // const fetchcustomeraddress= async(id)=>{
    //     console.log(id)
    //     setBillingAddress(await fetchcustomer(id))
    // }

    // useEffect(() =>{
    //     fetchcustomeraddress(initialValues.customer_details.id);
    // },[initialValues.customer_details])





   

    return (
        <>

            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validate={(values) => {
                    const errors = {};

                    //validation for name

                    return errors;
                }}
                onSubmit={(values, { setSubmitting, resetForm,item_data }) => {
                    {console.log(item_data)}
                    setTimeout(() => {
                        setSubmitting(false);
                        resetForm();
                        // values.items=[...products_data]
                        // values.invoice_amount= total
                        // values.customer_id = customer_id;
                        // console.log('customer_id : '+customer_id);
                        // alert(JSON.stringify(values, null, 2))
                        values.customer_details=customer_details
                        values.updated_place_of_supply=placetosupply
                        setdetailsUpdated(false)
                        console.log(JSON.stringify(values, null, 2))
                        setCustomerDetails({})
                        setCustomerName('')
                        setPlaceToSupply('')
                        


                        // axios({
                        //     url: "http://localhost:5000/invoice/",
                        //     method: "POST",
                        //     data: values
                        // }).then(function (response) {
                        //         console.log(response.data);
                        //         console.log(response.status);
                        //     }).catch((err) => (console.log(err)))
                        // setNotify({
                        //     isOpen: true,
                        //     message: "Invoice Added Successfully",
                        //     type: 'success'
                        // })

                        if (values.action === 'Add') {
                            axios({
                                url: "/invoice/",
                                method: "POST",
                                data: values
                            })
                                .then(function (response) {
                                    console.log(response.data);
                                    console.log(response.status);
                                })

                                .catch((err) => (console.log(err)))
                            setNotify({
                                isOpen: true,
                                message: "Invocie Added Successfully",
                                type: 'success'
                            })
                        }
                        else {
                            axios({
                                url: "/invoice/" + values.editRecord_id,
                                method: "PUT",
                                data: values
                            })
                                .then(function (response) {
                                    console.log(response.data);
                                    console.log(response.status);
                                })
                                .catch((err) => (console.log(err)))
                            setNotify({
                                isOpen: true,
                                message: "Invoice Updated Successfully",
                                type: 'success'
                            })
                        }
                    }, 500);

                    // setOpenPopUp(true)
                }}
            >
                {({ submitForm, isSubmitting, touched, errors, setFieldValue, values,formik }) => (
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Form className='form_invoice-box'>
                            <div className='form_invoice-box-col1'>

                                <Button
                                    variant="contained"
                                    className='margin-bottom'
                                    color="secondary"
                                onClick={() => {
                                    handleAddInvoiceToggle((prev_value) => (!prev_value))
                                    axios({
                                        url: "/invoice/",
                                        method: "GET"
                                    })
                                        .then((res) => { updateInvoiceData(res.data) })
                                        .catch((err) => (console.log(err)))
                                }}
                                > <KeyboardBackspaceOutlinedIcon /> Back</Button>

                                <Field
                                    
                                    name="customer_details"
                                    component={Autocomplete}
                                    
                                    options={customer_data}
                                    getOptionLabel={(option) => option.name ? option.name : ""}
                                    value={customer_details}
                                    onChange={(e,value)=>{

                                        setCustomerDetails(value)
                                        if(!isNaN(value)){
                                        setPlaceToSupply('')                                            
                                        }
                                        else{
                                            setPlaceToSupply(value.place_of_supply)
                                        }

                                        // setdetailsUpdated(true)
                                    }}
                                    // groupBy={(options) =>{
                                    //     setFieldValue=('customer_id',options.id)
                                    //     setFieldValue=('billing_address',options.billing_address)
                                    //     setFieldValue=('shipping_address',options.shipping_address)
                                    //     setFieldValue=('place_to_supply',options.place_to_supply)
                                    //     setBillingAddress(options.billing_address)
                                    //     setShippingAddress(options.shipping_address)
                                    //     setPlaceToSupply(options.place_to_supply)
                                        
                                    //     return null;
                                    // }}
                                    onInputChange={(e,value)=>{
                                        setCustomerName(value)
                                        setdetailsUpdated(true)
                                       
                                        if(!isNaN(value)){
                                            // console.log("was here")
                                            setdetailsUpdated(false)
                                        }
                                        
                                        
                                       
                                    }}
                                    inputValue={customer_name||''}
                                    
                                
                                    renderInput={(params) => (

                                        <TF {...params} 
                                        inputprops={{ style: { fontSize: 20 } }}
                                        InputLabelProps={{ style: { fontSize: 20 } }} 
                                        className='field'
                                        label="Customer Name" 
                                        variant="standard" 
                                        helperText='Select Customer' />

                                    )}
                                />
                                {isDetailsUpdated ? 
                                <div className='billing_box'>

                                <div className='billing_box_col1' >
                                <p  className='billing_box--heading'>Billing Address</p>
                                <p>{customer_details.billing_address.ba_country}</p>
                                <p>{customer_details.billing_address.ba_address}</p>
                                <p>{customer_details.billing_address.ba_city}</p>
                                <p>{customer_details.billing_address.ba_state}</p>
                                <p>{customer_details.billing_address.ba_zipcode}</p>
                                </div>

                                <div className='billing_box_col2'>
                                <p className='billing_box--heading'>Shipping Address</p>
                                <p>{customer_details.shipping_address.sp_country}</p>
                                <p>{customer_details.shipping_address.sp_address}</p>
                                <p>{customer_details.shipping_address.sp_city}</p>
                                <p>{customer_details.shipping_address.sp_state}</p>
                                <p>{customer_details.shipping_address.sp_zipcode}</p>
                                </div>


                                <Field
                                    // name="customer_details"
                                    component={Autocomplete}
                                    options={place_of_supply}
                                    getOptionLabel={(option) => option ? option : ""}
                                    value={placetosupply}
                                    onChange={(e,value)=>{
                                        setPlaceToSupply(value)
                                    }}
                                    onInputChange={(e,value)=>{
                                        setPlaceToSupply(value)
                                    }}
                                    inputValue={placetosupply||''}
                                    renderInput={(params) => (

                                        <TF {...params} 
                                        inputprops={{ style: { fontSize: 20 } }}
                                        InputLabelProps={{ style: { fontSize: 20 } }} 
                                        className='field'
                                        label="Place of Supply" 
                                        variant="standard" 
                                        helperText='Select Location' />

                                    )}
                                />
                                </div>:null}
                                
                             
                                   
                               
                                
                               
                               
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={(e) => {
                                        const path = '/sales/addcustomer'
                                        history.push(path)
                                    }}
                                    startIcon={<AddIcon />}
                                >
                                    New Customer
                                </Button>

                                <Field className='field'
                                    component={TextField}
                                    label="Order Number"
                                    name="order_number"
                                    inputProps={{ style: { fontSize: 20 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                />
                                 <Field className='field'
                                    component={TextField}
                                    
                                    label="Invoice Number"
                                    name="invoice_number"  
                                    inputProps={{ style: { fontSize: 20 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                />
                                 <Field className='field'
                                    component={DatePicker}
                                    name="invoice_date"
                                    label="Invoice Date"
                                    minDate={new Date()}
                                    inputProps={{ style: { fontSize: 20 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                />
                                     <Field className='field'
                                    component={DatePicker}
                                    name="invoice_due_date"
                                    label="Due Date"
                                    className='field'
                                    minDate={new Date()}
                                    inputProps={{ style: { fontSize: 20 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                />
                                 <Field
                                    component={TextField}
                                    type="text"
                                    label='Terms'
                                    name='invoice_terms'
                                    className='field'
                                    select
                                    inputProps={{ style: { fontSize: 20 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}>

                                    {TermsData.map((data, index) => (
                                        <MenuItem key={index} value={data}>
                                            {data}
                                        </MenuItem>
                                    ))}
                                    </Field>

                                  

                            </div>
                            {isSubmitting && <LinearProgress />}

                            <div className='form_invoice-box-col2'>
                             <AddInvoiceTable editRecordData={editRecordData} setFieldValue={setFieldValue} taxType={igst_or_gst} ></AddInvoiceTable>
                             {/* <Button
                                    className={['field', 'button'].join('')}
                                    variant="contained"
                                    color="primary"
                                    // style={{width:'40%'}}
                                    onClick={(e) => {
                                        submitForm()
                                        // setFieldValue("action", "Add")
                                    }}
                                    disabled={isSubmitting}
                                    inputProps={{ style: { fontSize: 22 } }}
                                    InputLabelProps={{ style: { fontSize: 22 } }}
                                >
                                    Add Invoice
                            </Button> */}
                            {!addbutton_disabled && <Button
                                className={['field', 'button'].join('')}
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                startIcon={isEditData ? <EditOutlinedIcon/> : <AddIcon/>}
                                onClick={(e) => {
                                    submitForm()
                                    let Action = isEditData ? "Update" : "Add"
                                    setFieldValue("action", Action)
                                }}
                                inputProps={{ style: { fontSize: 22 } }}
                                InputLabelProps={{ style: { fontSize: 22 } }}
                            >
                                {isEditData ? "Update Invoice" : "Add Invoice"}
                            </Button>}

                            {isEditData && <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={addbutton_disabled}
                                        onChange={() => toggle_addbutton()}
                                        color="primary"
                                    />
                                }
                                label="Add This As New Invoice"
                            />}

                            {addbutton_disabled &&
                                <>
                                    <Button
                                        className={['field', 'button'].join('')}
                                        variant="contained"
                                        color="primary"
                                        onClick={(e) => {
                                            submitForm()
                                            setFieldValue("action", "Add")
                                        }}
                                        startIcon={<AddIcon/>}
                                        disabled={isSubmitting}
                                        inputProps={{ style: { fontSize: 22 } }}
                                        InputLabelProps={{ style: { fontSize: 22 } }}
                                    >
                                        Add Invocie
                            </Button>
                                </>}

                             
                            </div>
                            
                        
                
                 </Form>

                </MuiPickersUtilsProvider>



                )}
            </Formik>

            
           
                
            <Notification
                notify={notify}
                setNotify={setNotify}
            >
            </Notification>

        </>
    )
}

export default AddInvoiceForm;
