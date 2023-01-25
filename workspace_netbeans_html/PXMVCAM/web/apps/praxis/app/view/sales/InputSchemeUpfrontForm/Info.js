Ext.define('Ext.Praxis.view.sales.InputSchemeUpfrontForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-boxPrincipal',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center'
            },
            items: [
                {
                    region: 'center',
                    id: prototype.id + '-boxMainData',
                    border: false,
                    width: prototype.widthContenedor,
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: true,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridSalesReport">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridSalesReport',
                            width: prototype.widthGrid,
                            height: 490,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'CONTRACT', dataIndex: 'TITLE', width: 200,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'NUMBER', dataIndex: 'A1155CODAC', width: 100
                                    },
                                    {
                                        text: 'VERSION', dataIndex: 'A1155VRSAC', width: 100
                                    },
                                    {
                                        text: 'EFFEC. DATE', dataIndex: 'A1155FINI', width: 110, sortable: false
                                    },
                                    {
                                        text: 'TERM. DATE', dataIndex: 'A1155FFIN', width: 110, sortable: false
                                    },
                                    {
                                        text: 'DATE TYPE', dataIndex: 'A1155FLGFE', width: 150, sortable: false,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            if(value==="E") value ="[E]DATE OF SALE";
                                            if(value==="I") value ="[I]DATE OF INITIAL TRAVEL";
                                            if(value==="F") value ="[F]DATE OF INVOICING";
                                            if(value==="U") value ="[U]DATE OF USE";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'AUTOMATED', dataIndex: 'A1155FLGAU', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            if(value==="S") value ="YES";
                                            if(value==="Y") value ="YES";
                                            if(value==="N") value ="NO";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'STATUS', dataIndex: 'A1155FESTA', width: 140,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            if(value==="R")value ="[R] REGISTERED.";
                                            if(value==="D")value ="[D] DEVELOPMENT.";
                                            if(value==="P")value ="[P] TEST.";
                                            if(value==="U")value ="[U] UPGRADE.";
                                            if(value==="C")value ="[C] CERTIFICATE.";
                                            if(value==="A")value ="[A] CANCELLED.";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'ADDENDUM', dataIndex: 'A1530MDA', width: 100
                                    },
                                    {
                                        text: 'RECEPTION DATE', dataIndex: 'A1155FRECE', width: 140
                                    },
                                    {
                                        text: 'Edit',
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 39,
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
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            width: prototype.widthGrid,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 0px 1px 0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: prototype.widthGrid,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        margin: '3px 0px 0px 5px'
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
                        // </editor-fold>
                    ]
                }
            ]
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
});