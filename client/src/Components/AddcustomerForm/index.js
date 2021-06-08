



import React, { useState, useEffect } from 'react'
import './CustomerForm_styles.scss'


import Gst_treatmentData from './Gst_treatmentData'
import place_of_supply from './Place_of_supply'
import currencyData from './CurrencyData'
import payment_terms_data from './PaymentTermsData';

import Notification from '../Notification';

import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress, MenuItem, TextField as TF, FormControlLabel, Checkbox, Menu,makeStyles } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Autocomplete } from "formik-material-ui-lab";
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';


import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import axios from "axios";


const useStyles = makeStyles((theme) => ({
    menu:{
        width:'200',
    },
    listItem: {
      whiteSpace: "pre-wrap",
    }
  }));


const AddcustomerForm = ({ editRecordData, handleAddCustomerToggle, updateCustomerData }) => {
    console.log(editRecordData)
    const classes = useStyles();
    

    
    const [isEditData, setIsEditData] = useState(false)
    const [addbutton_disabled, enable_addbutton] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    // const [salutation, setSalutation] = useState("")
    // const [first_name, setFirstName] = useState("")
    // const [last_name, setLastName] = useState("")
    // const [company_name, setCompanyName] = useState("")

    const toggle_addbutton = () => enable_addbutton(!addbutton_disabled)



    useEffect(() => {
        if (editRecordData != null) {
            setIsEditData((prev_value) => (!prev_value))
        }
    }, [editRecordData])

    var initialValues = {

        customer_type: editRecordData ? editRecordData.customer_type : '',
        salutation: editRecordData ? editRecordData.salutation : '',
        first_name: editRecordData ? editRecordData.first_name : '',
        last_name: editRecordData ? editRecordData.last_name : '',
        display_name: editRecordData ? editRecordData.display_name : '',
        company_name: editRecordData ? editRecordData.company_name : '',
        email: editRecordData ? editRecordData.email : '',
        work_number: editRecordData ? editRecordData.work_number : '',
        mobile_number: editRecordData ? editRecordData.mobile_number : '',


        BA_attention: editRecordData ? editRecordData.BA_attention : '',
        BA_country: editRecordData ? editRecordData.BA_country : '',
        BA_state: editRecordData ? editRecordData.BA_state : '',
        BA_address_street1: editRecordData ? editRecordData.BA_address_street1 : '',
        BA_address_street2: editRecordData ? editRecordData.BA_address_street2 : '',
        BA_city: editRecordData ? editRecordData.city : "",
        BA_zipcode: editRecordData ? editRecordData.BA_zipcode : '',
        BA_phone: editRecordData ? editRecordData.BA_phone : '',

        SP_attention: editRecordData ? editRecordData.SP_attention : '',
        SP_country: editRecordData ? editRecordData.SP_country : '',
        SP_state: editRecordData ? editRecordData.SP_state : '',
        SP_address_street1: editRecordData ? editRecordData.SP_address_street1 : '',
        SP_address_street2: editRecordData ? editRecordData.SP_address_street2 : '',
        SP_city: editRecordData ? editRecordData.city : "",
        SP_zipcode: editRecordData ? editRecordData.SP_zipcode : '',
        SP_phone: editRecordData ? editRecordData.SP_phone : '',

        place_of_supply: editRecordData ? editRecordData.place_of_supply : '',
        gst_treatment: editRecordData ? editRecordData.gst_treatment : '',
        tax_preference: editRecordData ? editRecordData.tax_preference : '',
        currency: editRecordData ? editRecordData.currency : '',
        opening_balance: editRecordData ? editRecordData.opening_balance : '',
        payment_terms: editRecordData ? editRecordData.payment_terms : '',
        gstin_uni: editRecordData ? editRecordData.gstin_uni : '',

        editRecord_id: editRecordData ? editRecordData._id : '',
        action: null


    }

    return (
        <>

            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validate={(values) => {
                    const errors = {};

                    if (values.email != '' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }

                    if (!values.gst_treatment) {
                        errors.gst_treatment = 'GST treatment type required'
                    }

                    if (!values.tax_preference) {
                        errors.tax_preference = 'Tax preference type required'
                    }
                    if (!values.display_name) {
                        errors.display_name = 'display name required'
                    }

                    if(!values.currency){
                        errors.currency='currency required'
                    }
                    if(!values.gstin_uni){
                        errors.gstin_uni = 'value required'
                    }
                    // if(!values.place_of_supply){
                    //     errors.place_of_supply='select place of supply'
                    // }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(() => {
                        setSubmitting(false);
                        resetForm();
                        console.log('was heer')
                        // values = {
                        //     ...values,
                        //     salutation: salutation,
                        //     first_name: first_name,
                        //     last_name: last_name,
                        //     company_name: company_name,
                        // }
                        //alert(JSON.stringify(values, null, 2));
                        console.log(JSON.stringify(values, null, 3))

                        if (values.action === 'Add') {
                            axios({
                                url: "/customers/",
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
                                message: "Customer Added Successfully",
                                type: 'success'
                            })
                        }
                        else {
                            axios({
                                url: "/customers/" + values.editRecord_id,
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
                                message: "Customer Data Updated Successfully",
                                type: 'success'
                            })
                        }
                    }, 500);

                    // setOpenPopUp(true)
                }}
            >
                {({ submitForm, isSubmitting, touched, errors, setFieldValue, handleBlur, handleChange, values }) => (


                    <Form className='form'>
                        <div className='form-box'>
                            <div className='form-box-col1'>

                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        handleAddCustomerToggle((prev_value) => (!prev_value))
                                        axios({
                                            url: "http://localhost:5000/customers/",
                                            method: "GET"
                                        })
                                            .then((res) => { updateCustomerData(res.data) })
                                            .catch((err) => (console.log(err)))
                                    }
                                    }> <KeyboardBackspaceOutlinedIcon /> Back</Button>

                                <Field
                                    component={TextField}
                                    type="text"
                                    name="customer_type"
                                    className='field'
                                    label="Customer Type"
                                    select
                                    variant="standard"
                                    margin="normal"
                                    inputProps={{ style: { fontSize: 18 } }} // font size of input text
                                    InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                >

                                    <MenuItem value='Business'>Business</MenuItem>
                                    <MenuItem value='Individual'>Individual</MenuItem>

                                </Field>


                                <div className="same-row">

                                    <Field
                                        component={TextField}
                                        type="text"
                                        name="salutation"
                                        className='field'
                                        label="Salutation"
                                        select
                                        // onChange={(e) => {
                                        //     setSalutation(e.target.value)

                                        // }}
                                        // value={salutation || values.salutation}
                                        variant="standard"
                                        style={{ width: '27%' }}
                                        margin="normal"
                                        inputProps={{ style: { fontSize: 18 } }} // font size of input text
                                        InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                    >

                                        <MenuItem value='Mr'>Mr.</MenuItem>
                                        <MenuItem value='Mrs'>Mrs.</MenuItem>
                                        <MenuItem value='Ms'>Ms.</MenuItem>
                                        <MenuItem value='Miss'>Miss.</MenuItem>
                                        <MenuItem value='Dr'>Dr.</MenuItem>

                                    </Field>


                                    <Field
                                        component={TextField}
                                        type="text"
                                        name="first_name"
                                        className='field'
                                        label="First Name"
                                        variant="standard"
                                        // onChange={(e) => { setFirstName(e.target.value) }}
                                        // value={first_name || values.first_name}
                                        margin="normal"
                                        style={{ width: '33%' }}
                                        inputProps={{ style: { fontSize: 18 } }} // font size of input text
                                        InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                    />

                                    <Field
                                        component={TextField}
                                        type="text"
                                        name="last_name"
                                        className='field'
                                        label="Last name"
                                        variant="standard"
                                        // onChange={(e) => { setLastName(e.target.value) }}
                                        // value={last_name || values.last_name}
                                        margin="normal"
                                        style={{ width: '33%' }}
                                        inputProps={{ style: { fontSize: 18 } }} // font size of input text
                                        InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                    />
                                </div>



                                <Field
                                    component={TextField}
                                    type="text"
                                    name="company_name"
                                    className='field'
                                    label="Company Name"
                                    // onChange={(e) => setCompanyName(e.target.value)}
                                    // value={company_name || values.company_name}
                                    variant="standard"
                                    margin="normal"
                                    inputProps={{ style: { fontSize: 18 } }} // font size of input text
                                    InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                />
                                <Field
                                    component={TextField}
                                    type="text"
                                    name="display_name"
                                    className='field'
                                    label="Customer Display Name"
                                    variant="standard"
                                    margin="normal"
                                    
                                    select
                                    inputProps={{ style: { fontSize: 18 } }} // font size of input text
                                    InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                >

                                    <MenuItem value={`${values.salutation} ${values.first_name} ${values.last_name}`}>{`${values.salutation} ${values.first_name} ${values.last_name}` }</MenuItem>
                                    <MenuItem value={`${values.first_name} ${values.last_name}`}>{ `${values.first_name} ${values.last_name}` }</MenuItem>
                                    <MenuItem value={`${values.last_name}, ${values.first_name}`}>{values.last_name} , {values.first_name}</MenuItem>
                                    <MenuItem value={`${values.company_name}`}>{values.company_name}</MenuItem>



                                </Field>

                                <Field
                                    component={TextField}
                                    type="email"
                                    name="email"
                                    className='field'
                                    label="Customer Email"
                                    variant="standard"
                                    margin="normal"
                                    inputProps={{ style: { fontSize: 18 } }} // font size of input text
                                    InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                />
                                
                                <div className="same-row">

                                <Field
                                    component={TextField}
                                    type="number"
                                    name="work_number"
                                    className='field'
                                    label="Work number"
                                    variant="standard"
                                    margin="normal"
                                    style={{width:'47%'}}

                                    inputProps={{ style: { fontSize: 18 } }} // font size of input text
                                    InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                />

                                <Field
                                    component={TextField}
                                    type="number"
                                    name="mobile_number"
                                    className='field'
                                    label="Mobile Number"
                                    variant="standard"
                                    margin="normal"
                                    style={{width:'47%'}}
                                    inputProps={{ style: { fontSize: 18 } }} // font size of input text
                                    InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                />
                                </div>


                                <Field
                                    component={TextField}
                                    type="text"
                                    name="gst_treatment"
                                    className='field'
                                    label="GST Treatment"
                                    select
                                    variant="standard"
                                    margin="normal"
                                    menuprops={{className: classes.menu}}

                                    inputProps={{ style: { fontSize: 18 } }} // font size of input text
                                    InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                >

                                    {Gst_treatmentData.map((data, index) => {
                                        return (
                                            <MenuItem className={classes.listItem} key={index} value={data.split('\n')[0]}>{data}</MenuItem>
                                        )
                                    })}

                                </Field>





                            </div>
                            {isSubmitting && <LinearProgress />}

                            <div className='form-box-col2'>

                                <p className='form-headings'>Billing Address</p>

                                <Field
                                    component={TextField}
                                    type="text"
                                    name="BA_attention"
                                    className='field'
                                    label="Attention"
                                    variant="standard"
                                    margin="normal"
                                    inputProps={{ style: { fontSize: 18 } }} // font size of input text
                                    InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                />

                                <div className='same-row'>
                                    <p className='form-headings-small'>Country/Region</p>
                                    <CountryDropdown
                                        className='country'
                                        name='BA_country'
                                        value={values.BA_country}
                                        onChange={(_, e) => handleChange(e)}
                                        onBlur={handleBlur}
                                    />
                                </div>

                                <div className='same-row'>
                                    <p className='form-headings-small'>State</p>
                                    <RegionDropdown
                                        country={values.BA_country}
                                        className='country'
                                        name='BA_state'
                                        value={values.BA_state}
                                        onChange={(_, e) => handleChange(e)}
                                        onBlur={handleBlur}
                                    />
                                </div>

                                <Field
                                    className='field'
                                    component={TextField}
                                    multiline
                                    rowsMax={3}
                                    name="BA_address_street1"
                                    type="text"
                                    label="Address  Street-1"
                                    inputProps={{ style: { fontSize: 18 } }}
                                    InputLabelProps={{ style: { fontSize: 18 } }}
                                />

                                <Field
                                    className='field'
                                    component={TextField}
                                    multiline
                                    rowsMax={3}
                                    name="BA_address_street2"
                                    type="text"
                                    label="Address  Street-2"
                                    inputProps={{ style: { fontSize: 18 } }}
                                    InputLabelProps={{ style: { fontSize: 18 } }}
                                />

                                <Field
                                    component={TextField}
                                    type="text"
                                    name="BA_city"
                                    className='field'
                                    label="City"
                                    variant="standard"
                                    margin="normal"
                                    inputProps={{ style: { fontSize: 18 } }} // font size of input text
                                    InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                />

                                <Field
                                    component={TextField}
                                    type="text"
                                    name="BA_zipcode"
                                    className='field'
                                    label="Zip Code"
                                    variant="standard"
                                    margin="normal"
                                    inputProps={{ style: { fontSize: 18 } }} // font size of input text
                                    InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                />

                                <Field
                                    component={TextField}
                                    type="number"
                                    name="BA_phone"
                                    className='field'
                                    label="Phone"
                                    variant="standard"
                                    margin="normal"
                                    inputProps={{ style: { fontSize: 18 } }} // font size of input text
                                    InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                />


                            </div>
                            <div className='form-box-col3'>

                                <p className='form-headings'>Shipping Address</p>

                                <Field
                                    component={TextField}
                                    type="text"
                                    name="SP_attention"
                                    className='field'
                                    label="Attention"
                                    variant="standard"
                                    margin="normal"
                                    inputProps={{ style: { fontSize: 18 } }} // font size of input text
                                    InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                />

                                <div className='same-row'>
                                    <p className='form-headings-small'>Country/Region</p>
                                    <CountryDropdown
                                        className='country'
                                        name='SP_country'
                                        value={values.SP_country}
                                        onChange={(_, e) => handleChange(e)}
                                        onBlur={handleBlur}
                                    />
                                </div>

                                <div className='same-row'>
                                    <p className='form-headings-small'>State</p>
                                    <RegionDropdown
                                        country={values.SP_country}
                                        className='country'
                                        name='SP_state'
                                        value={values.SP_state}
                                        onChange={(_, e) => handleChange(e)}
                                        onBlur={handleBlur}
                                    />
                                </div>

                                <Field
                                    className='field'
                                    component={TextField}
                                    multiline
                                    rowsMax={3}
                                    name="SP_address_street1"
                                    type="text"
                                    label="Address  Street-1"
                                    inputProps={{ style: { fontSize: 18 } }}
                                    InputLabelProps={{ style: { fontSize: 18 } }}
                                />

                                <Field
                                    className='field'
                                    component={TextField}
                                    multiline
                                    rowsMax={3}
                                    name="SP_address_street2"
                                    type="text"
                                    label="Address  Street-2"
                                    inputProps={{ style: { fontSize: 18 } }}
                                    InputLabelProps={{ style: { fontSize: 18 } }}
                                />

                                <Field
                                    component={TextField}
                                    type="text"
                                    name="SP_city"
                                    className='field'
                                    label="City"
                                    variant="standard"
                                    margin="normal"
                                    inputProps={{ style: { fontSize: 18 } }} // font size of input text
                                    InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                />

                                <Field
                                    component={TextField}
                                    type="text"
                                    name="SP_zipcode"
                                    className='field'
                                    label="Zip Code"
                                    variant="standard"
                                    margin="normal"
                                    inputProps={{ style: { fontSize: 18 } }} // font size of input text
                                    InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                />

                                <Field
                                    component={TextField}
                                    type="number"
                                    name="SP_phone"
                                    className='field'
                                    label="Phone"
                                    variant="standard"
                                    margin="normal"
                                    inputProps={{ style: { fontSize: 18 } }} // font size of input text
                                    InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                />




                            </div>
                        </div>


                        <div className="form-box2">

                            <div className="form-box2-col1">


                            {values.gst_treatment!=='Overseas' && <Field
                                name="place_of_supply"
                                component={Autocomplete}
                                options={place_of_supply}
                                getOptionLabel={(option) => option}
                                style={{ width: 525 }}
                                renderInput={(params) => (
                                    <TF {...params} label="Place of supply" variant="standard" />
                                )}
                            />}


                                <Field
                                    component={TextField}
                                    type="text"
                                    name="tax_preference"
                                    className='field'
                                    label="Tax preference"
                                    select
                                    variant="standard"
                                    margin="normal"
                                    inputProps={{ style: { fontSize: 18 } }} // font size of input text
                                    InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                >
                                    <MenuItem value='Taxable'>Taxable</MenuItem>
                                    <MenuItem value='Tax-Exempt'>Tax Exempt</MenuItem>

                                </Field>

                                {values.gst_treatment && 
                                values.gst_treatment!=='Consumer' && 
                                values.gst_treatment!=='Unregistered Business' && 
                                values.gst_treatment!=='Overseas' ? 
                                <Field
                                    component={TextField}
                                    type="number"
                                    name="gstin_uni"
                                    className='field'
                                    label="GSTIN/UNI"
                                    variant="standard"
                                    margin="normal"
                                    inputProps={{ style: { fontSize: 18 } }} // font size of input text
                                    InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                />:null}


                            </div>

                            <div className="form-box2-col2">




                            <Field
                                    component={TextField}
                                    type="text"
                                    name="currency"
                                    className='field'
                                    label="Currency"
                                    select
                                    variant="standard"
                                    margin="normal"
                                    inputProps={{ style: { fontSize: 18 } }} // font size of input text
                                    InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                >

                                    {currencyData.map((data, index) => {
                                        return (
                                            <MenuItem  key={index} value={data.split('-')[0]}>{data}</MenuItem>
                                        )
                                    })}

                                </Field>



                                

                                <Field
                                    component={TextField}
                                    type="text"
                                    name="payment_terms"
                                    className='field'
                                    label="Payment Terms"
                                    select
                                    variant="standard"
                                    margin="normal"
                                    inputProps={{ style: { fontSize: 18 } }} // font size of input text
                                    InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                >

                                    {payment_terms_data.map((data, index) => {
                                        return (
                                            <MenuItem  key={index} value={data}>{data}</MenuItem>
                                        )
                                    })}

                                </Field>

                                <Field
                                    component={TextField}
                                    type="number"
                                    name="opening_balance"
                                    className='field'
                                    label="Opening Balance"
                                    variant="standard"
                                    margin="normal"
                                    inputProps={{ style: { fontSize: 18 } }} // font size of input text
                                    InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                />

                            </div>


                            <div className='form-box2-col3'>
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
                                {isEditData ? "Update Customer" : "Add Customer"}
                            </Button>}

                            {isEditData && <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={addbutton_disabled}
                                        onChange={() => toggle_addbutton()}
                                        color="primary"
                                    />
                                }
                                label="Add This As New Customer"
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
                                        Add Customer
                            </Button>
                                </>}
                            </div>



                        </div>
                    </Form>


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



export default AddcustomerForm;
