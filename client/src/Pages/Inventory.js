import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom';


import AddproductForm from '../Components/AddproductForm';

import UseTable from '../Components/UseTable';
import { fetchdata } from '../Api';
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


export const AddItem = () => {
    const classes = useStyles();
    const [ProductData, setProductData] = useState([])
    const [Value, setValue] = useState()
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [additem_toggle,setAddItem_toggle]=useState(false)
    const [recordEdit,setrecordEdit]=useState(null)
    const [confirmDialog,setConfirmDialog]=useState({isOpen:false,title:'',subTitle:''})
    const [notify,setNotify] = useState({isOpen:false,message:'',type:''})
    
    const history = useHistory();

    const fetchAPI = async () => {
        setProductData(await fetchdata());
        
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
                url:"http://localhost:5000/items/" + id,
                method:"DELETE",
            })
            .then(function(response) {
                console.log(response.data);
                console.log(response.status);
                
                axios({
                    url:"http://localhost:5000/items/",
                    method:"GET"
                })
                .then((res)=>{setProductData(res.data)})
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
        { id: 'sku', label: 'SKU' },
        { id: 'category', label: 'CATEGORY' },
        { id: 'sp', label: 'RATE' },
        { id: 'HSN', label: 'HSN' },
        { id: 'opening_stock', label: 'STOCK ON HAND' },
        { id: 'unit', label: "Unit", disableSorting: true },
        {id:'actions',label:'Actions',disableSorting:true}
    ]


    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = UseTable(ProductData, headCells, filterFn);

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
                    console.log(items.filter(x => x.name.includes('a')))
                    return items.filter(x => x.name.toLowerCase().includes(target));
                }

            }
        })
    }
    const handleAddItem = () => {
        setAddItem_toggle((prev_value)=>(!prev_value))
        setrecordEdit(null)
    }
    const handleEdit = (item) => {
        setrecordEdit(item)
        setAddItem_toggle((prev_value)=>(!prev_value))
    }

    return (
        <>
        {additem_toggle ? <AddproductForm editRecordData={recordEdit} handleAdditemToggle={setAddItem_toggle} updateProductData={setProductData} /> 
            :
            <div className='Table'>
                <div className='Table-head'>
                <TextField
                    className={classes.searchInput}
                    variant='outlined'
                    label='Search Product'
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
                onClick={handleAddItem}>
                
                Add New 
                </Button>
                
                </div>
                    
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map((item,index) => (

                                
                                
                                <TableRow key={index}>
                                    <TableCell >{item.name} </TableCell>
                                    <TableCell>{item.SKU}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell>{item.selling_price}</TableCell>
                                    <TableCell>{item.HSN_Code}</TableCell>
                                    <TableCell>{item.opening_stock}</TableCell>
                                    <TableCell>{item.unit}</TableCell>
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
                                                let path = `/inventory/product/overview/${item._id}`;
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






