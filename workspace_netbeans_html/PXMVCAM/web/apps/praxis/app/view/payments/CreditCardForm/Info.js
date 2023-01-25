Ext.define('Ext.Praxis.view.payments.CreditCardForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1400,
                height: 700,
                align: 'center'
            },
            
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '1',
                    margin: '1',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        // --------------------------   GRID MAIN DATA---------------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            border:true,
//                            margin: '1',
                             height: 550,
                             width: 1300,  
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id+'-gridDataAirport',
                                    height: 510,
                                    width: 1300,
                                    hidden: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'

                                        },
                                        items: [
                                            {text: 'Nbr', dataIndex: 'RN', width: 40},
                                            {text: 'Credit Card',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'CODE', width: 50 },
                                                    {text: 'Name', dataIndex: 'NAME', width: 160, align: 'left'}
//                                                    {text: 'Ctry', dataIndex: 'COUNTRY', width: 50 }
                                                ]
                                            },
//                                            {text: 'Curr.', dataIndex: 'CURRENC', width: 50},
                                            {text: 'Bank',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Country', dataIndex: 'COUNTRY', width: 70, align: 'center'},
                                                    {text: 'Code', dataIndex: 'CODEBANK', width: 70, align: 'center'},
                                                    {text: 'Name', dataIndex: 'NAMEBANK', width: 140, align: 'center'}
                                                ]
                                            },
                                            {text: 'Currency', dataIndex: 'CURRENC', width: 70}
                                            ,
                                            {text: 'Commision',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Rate Normal', dataIndex: 'RATECON', width: 100, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Rate Promotional 1', dataIndex: 'RATECOP1', width: 130, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Rate Promotional 2', dataIndex: 'RATECOP2', width: 130, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
//                                            {text: 'National Card Rate',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: true,
//                                                    align: 'center'
//                                                },
//                                                columns: [
//                                                    
//                                                    {text: 'Credit', dataIndex: 'RATCNAC', width: 100, align: 'center',
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;";
//                                                            return value;
//                                                        }
//                                                    },
//                                                    {text: 'Debit', dataIndex: 'RATDNAC', width: 130, align: 'center',
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;";
//                                                            return value;
//                                                        }
//                                                    }                                                ]
//                                            },
                                            {
                                             text: 'Rate',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'IVA', dataIndex: 'RATEIVA', width: 50, align: 'right'}
                                                ]   
                                            },
                                            {text: 'Cliente', dataIndex: 'CLIENTE', width: 95},
                                            {text: 'Status', dataIndex: 'FSTAT', width: 50},
                                            {
                                             text: 'Equivalent',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'CODEQUIV', width: 100}
                                                ]   
                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 40,
                                                text: 'Edit',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Edit',
                                                        handler: 'onEditClick'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                { xtype: 'tbspacer', width: 7, height: 10},
                                {
                                    xtype: 'panel',
                                    id: prototype.id +'-pie',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    border: true,
                                    width: 1300,
                                    height: 25,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
//                                    defaults: {
//                                        border: true,
//                                        padding: '0px 5px 0px 5px'
//                                    },
                                    padding: '1px 5px 1px 0px',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: 1300,
                                            height: 25,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'center'
                                            },
                                            defaults: {
                                                xtype: 'label',
//                                                margin: '3px 0px 0px 5px'
                                            },
                                            items: [
                                                {
                                                    text: 'Page',
                                                    width: 50
                                                },
                                                {
                                                    id: prototype.id + '-lbl-currentPage',
                                                    text: '1',
                                                    width: 50
                                                },
                                                {
                                                    text: 'Of',
                                                    width: 50
                                                },
                                                {
                                                    id: prototype.id + '-lbl-pageCount',
                                                    text: '0',
                                                    width: 50
                                                },
                                                {xtype: 'tbspacer', width: 100},
                                                {
                                                    text: 'Total found',
                                                    width: 80
                                                },
                                                {
                                                    id: prototype.id + '-lbl-total',
                                                    text: '0',
                                                    width: 50
                                                }
                                             ]
                                        }
                                    ]
                                }
                            ]  
                        }
                   ]                             
        },
        
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 1px;',
                bodyStyle: 'background: transparent;',
                border: false
            }
          }
        ]
      }
    ] 
  }   
);


