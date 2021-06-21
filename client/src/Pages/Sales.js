import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom';

import '../Pages/PageStyle.scss';
import AddcustomerForm from '../Components/AddcustomerForm'
import AddInvoiceForm from '../Components/AddInvoiceForm'

import UseTable from '../Components/UseTable';
import { fetchcustomerdata,fetchinvoicedata,fetchvendordata,fetchbilldata } from '../Api';
import '../Pages/PageStyle.scss';


import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Controls from "../Components/controls/Controls";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDialog from '../Components/ConfirmDialog';
import Notification from '../Components/Notification';



import Search from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { CSVLink, CSVDownload } from "react-csv";
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    searchInput: {
        width: '75%'
    }
}))

export const AddCustomer = ({Sales,route}) => {

    const classes = useStyles();
    const [CustomerData, setCustomerData] = useState([])
    const [Value, setValue] = useState()
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [addcustomer_toggle,setAddCustomer_toggle]=useState(false)
    const [recordEdit,setrecordEdit]=useState(null)
    const [confirmDialog,setConfirmDialog]=useState({isOpen:false,title:'',subTitle:''})
    const [notify,setNotify] = useState({isOpen:false,message:'',type:''})
    
    const history = useHistory();

    const fetchAPI = async () => {
        if(Sales){
            setCustomerData(await fetchcustomerdata());
        }
        else{
            setCustomerData(await fetchvendordata());
        }
        
        
    }
  
    useEffect(() => {
        fetchAPI();
    }, []);
    
    const handleDelete = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        })
            axios({
                url:route + id,
                method:"DELETE",
            })
            .then(function(response) {
                console.log(response.data);
                console.log(response.status);
                
                axios({
                    url:route,
                    method:"GET"
                })
                .then((res)=>{setCustomerData(res.data)})
              })
            .catch((err)=>(console.log(err)))

            

            setNotify({
                isOpen:true,
                message:"Deleted Successfully",
                type:'error'
            })
        }




    const headCells = [
        { id: 'name', label: 'NAME' },
        { id: 'companyname', label: 'COMPANY NAME' },
        { id: 'email', label: 'EMAIL' },
        { id: 'workphone', label: 'WORK PHONE',disableSorting: true},
        { id: 'gst_treatment', label: 'GST TREATMENT' },
        { id: 'receivables', label: 'RECEIVABLES' },
        {id:'actions',label:'ACTIONS',disableSorting:true}
    ]


    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = UseTable(CustomerData, headCells, filterFn);

    const handleSearch = (e) => {
        let target = e.target.value;
        console.log(target)
        setValue(target)
        setFilterFn({
            fn: items => {
                if (target.value == "") {
                    return items;
                }

                else {
                    // console.log(items.filter(x => x.display_name.includes('a')))
                    return items.filter(x => x.display_name.toLowerCase().includes(target));
                }

            }
        })
    }
    const handleAddCustomer = () => {
        setAddCustomer_toggle((prev_value)=>(!prev_value))
        setrecordEdit(null)
    }
    const handleEdit = (item) => {
        setrecordEdit(item)
        setAddCustomer_toggle((prev_value)=>(!prev_value))
    }

    return (
        <>
        {addcustomer_toggle ? <AddcustomerForm route={route}isSalesRoute={Sales} editRecordData={recordEdit} handleAddCustomerToggle={setAddCustomer_toggle} updateCustomerData={setCustomerData} /> 
            :
            <div className='Table'>
                <div className='Table-head'>
                <TextField
                    className={classes.searchInput}
                    variant='outlined'
                    label={Sales ? 'Search Customer' : 'Search Vendor'}
                    value={Value}
                    InputProps={{
                        startAdornment: (<InputAdornment position='start'><Search /></InputAdornment>)
                    }}
                    onChange={handleSearch}
                />
                <Button 
                variant="contained" 
                color="primary"
                startIcon={<AddIcon/>}
                onClick={handleAddCustomer}>
                
                {Sales ? 'Add Customer' : 'Add Vendor'} 
                </Button>
                
                </div>
                    
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map((item,index) => (

                                
                                
                                <TableRow key={index}>
                                    <TableCell >{item.display_name} </TableCell>
                                    <TableCell>{item.company_name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.work_number}</TableCell>
                                    <TableCell>{item.gst_treatment}</TableCell>
                                    <TableCell>{item.payment_terms}</TableCell>
                                    <TableCell>

                                        <Controls.ActionButton
                                        color="primary"
                                        >
                                        <EditOutlinedIcon fontSize="small"
                                         onClick={()=>{handleEdit(item)}}
                                        
                                        />
                                        </Controls.ActionButton>

                                        <Controls.ActionButton
                                        color="secondary"
                                        >
                                        <DeleteIcon fontSize="small"
                                        onClick={()=>{
                                            
                                            setConfirmDialog({
                                                isOpen:true,
                                                title:'Are you sure to delete this record?',
                                                subTitle:" You can't undo this operation",
                                                onConfirm:()=>{handleDelete(item._id)}
                                            })
                                        }}
                                        />
                                        </Controls.ActionButton>


                                        <Controls.ActionButton color="primary">
                                            <VisibilityIcon fontSize="small"
                                            onClick={()=>{
                                                let path = Sales ? `/sales/customer/overview/${item._id}` :`/purchase/vendor/overview/${item._id}` 
                                                history.push(path); 
                                            }}
                                            />

                                        </Controls.ActionButton>

                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
                <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
                ></ConfirmDialog>
                <Notification
            notify={notify}
            setNotify={setNotify}
            >
            </Notification>           
            </div>

    }
        </>

    )
}

export const AddInvoice = ({Sales,route}) => {

    const classes = useStyles();
    const [InvoiceData, setInvoiceData] = useState([])
    const [Value, setValue] = useState()
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [addinvoice_toggle,setAddInvoice_toggle]=useState(false)
    const [recordEdit,setrecordEdit]=useState(null)
    const [confirmDialog,setConfirmDialog]=useState({isOpen:false,title:'',subTitle:''})
    const [notify,setNotify] = useState({isOpen:false,message:'',type:''})
    
    const history = useHistory();

    const fetchAPI = async () => {
        if(Sales){
            setInvoiceData(await fetchinvoicedata());
        }
        else{
            setInvoiceData(await fetchbilldata());
        }
    }
  
    useEffect(() => {
        fetchAPI();
    }, []);
    
    const handleDelete = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        })
            axios({
                url:route + id,
                method:"DELETE",
            })
            .then(function(response) {
                console.log(response.data);
                console.log(response.status);
                
                axios({
                    url:route,
                    method:"GET"
                })
                .then((res)=>{setInvoiceData(res.data)})
              })
            .catch((err)=>(console.log(err)))

            

            setNotify({
                isOpen:true,
                message:"Deleted Successfully",
                type:'error'
            })
        }




    const headCells_invoice = [
        // disableSorting:true
        { id: 'invoice_date', label: 'DATE' },
        { id: 'invoice_number', label: 'INVOICE#' },
        { id: 'order_number', label: 'ORDER NUMBER' },
        { id: 'customer_name', label: 'CUSTOMER NAME',},
        { id: 'due_date', label: 'DUE DATE' },
        { id: 'amount', label: 'AMOUNT' },
        {id:'actions',label:'ACTIONS'}
    ]

    const headCells_bill=[
        { id: 'bill_date', label: 'DATE' },
        { id: 'bill_number', label: 'BILL#' },
        { id: 'order_number', label: 'ORDER NUMBER' },
        { id: 'vendor_name', label: 'VENDOR NAME',},
        { id: 'due_date', label: 'DUE DATE' },
        { id: 'amount', label: 'AMOUNT' },
        {id:'actions',label:'ACTIONS'}

    ]
    let headCells;
    if(Sales){
        headCells=headCells_invoice
    }
    else{
        headCells=headCells_bill
    }


    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = UseTable(InvoiceData, headCells, filterFn);

    const handleSearch = (e) => {
        let target = e.target.value;
        console.log(target)
        setValue(target)
        setFilterFn({
            fn: items => {
                if (target.value == "") {
                    return items;
                }

                else {
                    // console.log(items.filter(x => x.customer_name.includes('a')))
                    if(Sales){
                        return items.filter(x => x.customer_name.toLowerCase().includes(target));
                    }
                    else{
                        return items.filter(x => x.vendor_name.toLowerCase().includes(target));
                    }
                }

            }
        })
    }
    const handleAddInvoice = () => {
        setAddInvoice_toggle((prev_value)=>(!prev_value))
        setrecordEdit(null)
    }
    const handleEdit = (item) => {
        setrecordEdit(item)
        setAddInvoice_toggle((prev_value)=>(!prev_value))
    }

    return (
        <>
        {addinvoice_toggle ? <AddInvoiceForm route={route} isSalesRoute={Sales} editRecordData={recordEdit} handleAddInvoiceToggle={setAddInvoice_toggle} updateInvoiceData={setInvoiceData} /> 
            :
            <div className='Table'>
                <div className='Table-head'>
                <TextField
                    className={classes.searchInput}
                    variant='outlined'
                    label={Sales ? 'Search Invoice': 'Search Bills'}
                    value={Value}
                    InputProps={{
                        startAdornment: (<InputAdornment position='start'><Search /></InputAdornment>)
                    }}
                    onChange={handleSearch}
                />
                <Button 
                variant="contained" 
                color="primary"
                startIcon={<AddIcon/>}
                onClick={handleAddInvoice}>
                
                {Sales ? "Add Invoice":"Add Bill"} 
                </Button>
                
                </div>
                    
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map((item,index) => (
                                <>
                                {console.log(item)}
                        
                                <TableRow key={index}>
                                    <TableCell >{Sales ? item.invoice_date:item.bill_date} </TableCell>
                                    <TableCell>{Sales ? item.invoice_number:item.bill_number}</TableCell>
                                    <TableCell>{item.order_number}</TableCell>
                                    <TableCell>{Sales ? item.customer_details.name : item.vendor_details.name}</TableCell>
                                    <TableCell>{Sales ?item.invoice_due_date:item.bill_due_date}</TableCell>
                                    <TableCell>{Sales ? item.invoice_amount:item.bill_amount}</TableCell>
                                    <TableCell>

                                        <Controls.ActionButton
                                        color="primary"
                                        >
                                        <EditOutlinedIcon fontSize="small"
                                         onClick={()=>{handleEdit(item)}}
                                        
                                        />
                                        </Controls.ActionButton>

                                        <Controls.ActionButton
                                        color="secondary"
                                        >
                                        <DeleteIcon fontSize="small"
                                        onClick={()=>{
                                            
                                            setConfirmDialog({
                                                isOpen:true,
                                                title:'Are you sure to delete this record?',
                                                subTitle:" You can't undo this operation",
                                                onConfirm:()=>{handleDelete(item._id)}
                                            })
                                        }}
                                        />
                                        </Controls.ActionButton>


                                        {/* <Controls.ActionButton color="primary">
                                            <VisibilityIcon fontSize="small"
                                            onClick={()=>{
                                                let path = `/sales/customer/overview/${item._id}`;
                                                history.push(path); 
                                            }}
                                            />

                                        </Controls.ActionButton> */}

                                    </TableCell>
                                </TableRow>
                                </>
                            ))
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
                <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
                ></ConfirmDialog>
            <Notification
            notify={notify}
            setNotify={setNotify}
            >
            </Notification>           
            </div>

    }
        </>

    )
}
  
