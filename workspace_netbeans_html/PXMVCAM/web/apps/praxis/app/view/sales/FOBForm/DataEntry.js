/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.FOBForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.sales.FOB.DataEntryFOBController'
    ],
    title: 'FOB Information',
    header: true,
    width: 1120,
    height: 720,
    //height: 780,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.id + '-de' + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    margin: '1 1 1 0',
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="Encabezado">
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            margin: '2 0 1 0',
                            width: 1100,
                            border: false,
                            bodyStyle: 'background: #E3EAEF',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 150,
                                            padding: '0px 0px 0px 10px',
                                            html: '<strong style="color:#0B333C;  ">IATA </strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de' + '-txtIata',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 100,
                                            labelWidth: 0,
                                            padding: '0px 0px 0px 3px'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de' + '-txtNameIATA',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 250,
                                            labelWidth: 0,
                                            padding: '0px 0px 0px 3px'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'rigth',
                                            width: 120,
                                            padding: '0px 0px 0px 10px',
                                            html: '<strong style="color:#0B333C;;float:right;  ">Lote </strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de' + '-txtLote',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 150,
                                            labelWidth: 0,
                                            padding: '0px 0px 0px 3px'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'right',
                                            width: 60,
                                            padding: '0px 0px 0px 10px',
                                            html: '<strong style="color:#0B333C;  ">Source </strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de' + '-txtSource',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 80,
                                            labelWidth: 0,
                                            padding: '0px 0px 0px 3px'

                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 150,
                                            padding: '0px 0px 0px 10px',
                                            html: '<strong style="color:#0B333C;  ">Send to FOB </strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de' + '-txtPreFac',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 100,
                                            labelWidth: 0,
                                            padding: '0px 0px 0px 3px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de' + '-txtPreFactura',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 100,
                                            labelWidth: 0,
                                            padding: '0px 0px 0px 3px'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 270,
                                            padding: '0px 0px 0px 10px',
                                            html: '<strong style="color:#0B333C;float:right;">Received From FOB </strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de' + '-txtFacRec',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 70,
                                            labelWidth: 0,
                                            padding: '0px 0px 0px 3px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de' + '-txtFacturaRecibida',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 90,
                                            labelWidth: 0,
                                            padding: '0px 0px 0px 3px'

                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 150,
                                            padding: '0px 0px 0px 10px',
                                            html: '<strong style="color:#0B333C;  ">Fare/Ancillaries </strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de' + '-txtFare',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            fieldStyle: 'text-align:right',
                                            width: 100,
                                            labelWidth: 0,
                                            padding: '0px 0px 0px 3px'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 80,
                                            padding: '0px 0px 0px 10px',
                                            html: '<strong style="color:#0B333C;float:right;">Commission </strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de' + '-txtCommission',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 80,
                                            fieldStyle: 'text-align:right',
                                            labelWidth: 0,
                                            padding: '0px 0px 0px 3px'
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 40,
                                            padding: '0px 0px 0px 10px',
                                            html: '<strong style="color:#0B333C;">IVA </strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de' + '-txtIVA',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            fieldStyle: 'text-align:right',
                                            width: 60,
                                            labelWidth: 0,
                                            padding: '0px 0px 0px 3px'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 106,
                                            padding: '0px 0px 0px 10px',
                                            html: '<strong style="color:#0B333C;">Comm. + IVA </strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de' + '-txtCommIVA',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            fieldStyle: 'text-align:right',
                                            width: 80,
                                            labelWidth: 0,
                                            padding: '0px 0px 0px 3px'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 50,
                                            padding: '0px 0px 0px 10px',
                                            html: '<strong style="color:#0B333C;">Cash</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de' + '-txtCash',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 100,
                                            fieldStyle: 'text-align:right',
                                            labelWidth: 0,
                                            padding: '0px 0px 0px 3px'

                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 100,
                                            padding: '0px 0px 0px 10px',
                                            html: '<strong style="color:#0B333C;">Cash - Comm</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de' + '-txtCashComm',
                                            required: true,
                                            disabled: false,
                                            readOnly: true,
                                            width: 100,
                                            fieldStyle: 'text-align:right',
                                            labelWidth: 0,
                                            padding: '0px 0px 0px 3px'

                                        }
                                    ]
                                }
                            ]
                        },
                        // </editor-fold>
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '1 0 0 0',
                            border: true,
                            width: 250,
                            items: [
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    width: 200,
                                    padding: '2px 2px 2px 5px',
                                    html: '<strong style="color:#000; ">Determination Commission</strong>'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            margin: '0 0 1 0',
                            padding: '0px 0px 0px 0px',
                            width: 1100,
                            border: true,
                            items: [
                                //opciones                                                               
                                // <editor-fold defaultstate="collapsed" desc="OPCIONES">
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'end'
                                    },
                                    margin: '0 5 1 0',
                                    width: 1100,                                    
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-de' + '-cmbOptionTKT',
                                            fieldLabel: 'Search By',
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: 'All',
                                            labelWidth: 65,
                                            width: 180,
                                            padding: '5px 2px 5px 2px',
                                            anchor: '100%'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de' + '-txtTKTNumber',
                                            required: true,
                                            editable: true,
                                            fieldLabel: '',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 13,
                                            width: 100,
                                            labelWidth: 0,
                                            fieldStyle: 'text-align: center;',
                                            labelAlign: 'left',
                                            padding: '5px 2px 5px 2px',
                                            listeners: {
                                                keypress: 'txtTKTNumber_onTextKeypress'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 400},
                                        {
                                            xtype: 'panel',
                                            width: 100,
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'toolbar',
                                                    cls: 'x-toolbar-pag',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-de' + '-btn-pag-first',
                                                            iconCls: 'prx-icon-pagination-first',
                                                            tooltip: 'First Page'

                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-de' + '-btn-pag-previous',
                                                            iconCls: 'prx-icon-pagination-previous',
                                                            tooltip: 'Previous Page'

                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-de' + '-btn-pag-next',
                                                            iconCls: 'prx-icon-pagination-next',
                                                            tooltip: 'Next Page'

                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-de' + '-btn-pag-last',
                                                            iconCls: 'prx-icon-pagination-last',
                                                            tooltip: 'Last Page'

                                                        }
                                                        , {
                                                            xtype: 'pagingtoolbar',
                                                            id: prototype.id + '-de' + '-paggin',
                                                            pageSize: 10,
                                                            border: false,
                                                            displayInfo: false,
                                                            hidden: true
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-de' + '-BtnSendMailFOB',
                                            text: '<strong style="color:white;">Send<strong>',
                                            cls: 'x-btn-sent',
                                            overCls: 'x-btn-sent-over',
                                            width: 70,
                                            height: 25,
                                            padding: '4 5 5 2',
                                            listeners: {
                                                // click: 'onQtyCouponsClick'
                                            }

                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-de' + '-BtnAcuseFOB',
                                            text: '<strong style="color:white;">ACK<strong>',
                                            cls: 'x-btn-sent',
                                            overCls: 'x-btn-sent-over',
                                            width: 70,
                                            height: 25,
                                            padding: '4 5 5 2',
                                            listeners: {
                                                // click: 'onQtyCouponsClick'
                                            }

                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'panel',
                                            border: true,
                                            items: [
                                                {
                                                    xtype: 'toolbar',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-de' + '-btnSearch',
                                                            iconCls: 'prx-icon-search',
                                                            tooltip: 'Search'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-de' + '-btnFilter',
                                                            iconCls: 'prx-icon-filter',
                                                            tooltip: 'Display filter'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-de' + '-btnExcel',
                                                            iconCls: 'prx-icon-excel',
                                                            tooltip: 'Export to Excel'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-de' + '-btnClear',
                                                            iconCls: 'prx-icon-clear',
                                                            tooltip: 'Clear Options'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-de' + '-btnBack',
                                                            iconCls: 'prx-icon-back',
                                                            tooltip: 'Back'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                // </editor-fold>

                                // <editor-fold defaultstate="collapsed" desc="GridData">                                
                                {
                                    xtype: 'grid',
                                    padding: '0 0 0 0',
                                    id: prototype.id + '-de' + '-gridData',
                                    height: 530,
                                    border: false,
                                    width: '100%',
                                    columnLines: true,
                                    resizable: false,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Ticket', width: 90, dataIndex: 'TKT'},
                                            {text: 'Trans.<br> Type', width: 60, dataIndex: 'A1729TRNCU'},
                                            {text: 'CPN', width: 50, dataIndex: 'A1729CUPON'},
                                            {text: 'CNJ', width: 50, dataIndex: 'A1729FLAG'},
                                            {text: 'Issue <br> Date', width: 50, dataIndex: 'A1729FECVT'},
                                            {text: 'Carr', width: 50, dataIndex: 'A1729CARR'},
                                            {text: 'Fare <br> Fasis', width: 50, dataIndex: 'A1729FBAS'},
                                            {text: 'Class', width: 50, dataIndex: 'A1729CLAS'},
                                            {text: 'IT Tour<br> Code', width: 70, dataIndex: 'A1729CODIT'},
                                            {text: 'FOP', width: 50, dataIndex: 'A1729CFOP'},
                                            {text: 'Station <br>IATA', width: 60, dataIndex: 'A1729IATAE'},
                                            {
                                                text: 'Coupon',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'CPN <br>Fare', dataIndex: 'A1729VCPN', width: 60,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:4px;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Comm.', width: 60, dataIndex: 'A1729ACSC',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:4px;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Agr.<br> Code', width: 60, dataIndex: 'A1729CCST'},
                                                    {text: '%', width: 60, dataIndex: 'A1729PCSC',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:4px;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Ancillaries/Charge',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Amount', dataIndex: 'A1729OCANR', width: 60,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:4px;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Comm.', width: 56, dataIndex: 'A1729COCAR',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:4px;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: 'Agr.<br> Code', width: 55, dataIndex: 'A1729AGRAN',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:4px;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {text: '%', width: 55, dataIndex: 'A1729POCAN',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:4px;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                /** PAGINATION LABELS **/
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-de' + '-pie',                                    
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    border: true,
                                    height: 25,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                    defaults: {
                                        border: true,
                                        padding: '0px 1px 0px 1px'
                                    },
                                    padding: '0px 0px 0px 0px',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: '100%',
                                            height: 25,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'center'
                                            },
                                            defaults: {
                                                xtype: 'label',
                                                margin: '1px 0px 0px 1px'
                                            },
                                            items: [
                                                {
                                                    text: 'Page',
                                                    width: 50
                                                },
                                                {
                                                    id: prototype.id + '-de' + '-lbl-currentPage',
                                                    text: '1',
                                                    width: 50
                                                },
                                                {
                                                    text: 'Of',
                                                    width: 50
                                                },
                                                {
                                                    id: prototype.id + '-de' + '-lbl-pageCount',
                                                    text: '0',
                                                    width: 50
                                                },
                                                {xtype: 'tbspacer', width: 100},
                                                {
                                                    text: 'Total found',
                                                    width: 80
                                                },
                                                {
                                                    id: prototype.id + '-de' + '-lbl-total',
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
                }

            ]
        }
    ]

});