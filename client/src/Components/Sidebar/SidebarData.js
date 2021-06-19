import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io5'
import * as RiIcons from 'react-icons/ri'
import * as GrIcons from 'react-icons/gr'
export const SidebarData =[
    {
        title:'Inventory',
        path:"inventory",
        icon:<IoIcons.IoBagHandleSharp/>,
        iconClosed:<RiIcons.RiArrowDownSFill/>,
        iconOpened:<RiIcons.RiArrowUpSFill/>,
        subNav:[
            {
                title:' Add Product',
                path:'/inventory/addproduct',
                icon:<IoIcons.IoBagAdd/>
            },
        ]

    },

    {
        title:'Sales',
        path:'sales',
        icon:<RiIcons.RiShoppingCartFill/>,
        iconClosed:<RiIcons.RiArrowDownSFill/>,
        iconOpened:<RiIcons.RiArrowUpSFill/>,
        subNav:[
            {
                title:'Add Customer',
                path:'/sales/addcustomer',
                icon:<AiIcons.AiOutlineUserAdd/>
            },
            {
                title:'Invoices',
                path:'/sales/addinvoice',
                icon:<AiIcons.AiOutlineForm/>
            }
        ]

    },

    {
        title:'Purchases',
        path:'purchase',
        icon:<IoIcons.IoBagRemoveOutline/>,
        iconClosed:<RiIcons.RiArrowDownSFill/>,
        iconOpened:<RiIcons.RiArrowUpSFill/>,
        subNav:[
            {
                title:'Add vendors',
                path:'/purchase/addvendor',
                icon:<AiIcons.AiOutlineUserAdd/>
            },
            {
                title:'Bills',
                path:'/purchase/addbill',
                icon:<AiIcons.AiOutlineForm/>
            }
        ]

    }


]