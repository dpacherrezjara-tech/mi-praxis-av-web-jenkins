Ext.define('Ext.Praxis.view.payments.LoadDebitsConciliationForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background: transparent;"',
    defaults: {
        bodyStyle: 'background: transparent;"',
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
                border: true,
                width: 750,
//                height: 700,
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
                            bodyStyle: 'background: transparent;"',
                            layout: 'vbox',
                            width: 750,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background: transparent;"',
                                    margin: '10 2 2 20',
                                    defaults: {
                                        anchor: '100%',
                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Bank Information',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration: underline;',
                                            width: 130,
                                            height: 25
                                        },
                                        {xtype: 'tbspacer', width: 534}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '5 0 0 0',
                                    defaults: {
                                        anchor: '100%',
        //                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 27},
                                        {
                                            xtype: 'label',
                                            text: 'SAP Doc.',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtBANDOC',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: '10',
                                            editable: true,
                                            enabled: false,
                                            readOnly: false,
                                            width: 100
                                        }
                                        ,
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Bank',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCODEBANK',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: '8',
                                            width: 100,
                                            maskRe: /[0-9]/,
                                            editable: false,
                                            enabled: false,
                                            readOnly: false,
        //                                    maskRe: /[a-zA-Z]/
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Abono Date',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtADATE',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: '8',
                                            width: 100,
                                            maskRe: /[0-9]/,
                                            editable: false,
                                            enabled: false,
                                            readOnly: false,
        //                                    maskRe: /[a-zA-Z]/
                                        },

                                        {xtype: 'tbspacer', width: 409}
                                    ]
                                },
                                
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '5 0 0 0',
                                    defaults: {
                                        anchor: '100%',
        //                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 27},
                                        {
                                            xtype: 'label',
                                            text: 'Merchant',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtMERCHANT',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: '8',
                                            maskRe: /[0-9]/,
                                            editable: false,
                                            enabled: false,
                                            readOnly: false,
                                            width: 100
                                        }
                                        ,
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Country',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSCOUNTRY',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: '2',
                                            width: 100,
//                                            maskRe: /[0-9]/,
                                            editable: false,
                                            enabled: false,
                                            readOnly: false,
                                            maskRe: /[a-zA-Z]/
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Process',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtCOREP',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: '2',
                                            width: 100,
//                                            maskRe: /[0-9]/,
                                            editable: false,
                                            enabled: false,
                                            readOnly: false,
                                            maskRe: /[a-zA-Z]/
                                        },

                                        {xtype: 'tbspacer', width: 409}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '5 0 0 0',
                                    defaults: {
                                        anchor: '100%',
        //                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 27},
                                        {
                                            xtype: 'label',
                                            text: 'Status',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSTVAL',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: '80',
                                            maskRe: /[a-zA-Z]/,
                                            editable: false,
                                            enabled: false,
                                            readOnly: false,
                                            width: 100
                                        }
                                        ,
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Doc.Type',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtTDOC',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: '20',
                                            width: 100,
//                                            maskRe: /[0-9]/,
                                            editable: false,
                                            enabled: false,
                                            readOnly: false,
                                            maskRe: /[a-zA-Z]/
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Qty',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtQTYTRAN1',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
//                                            maxLength: '2',
                                            width: 100,
                                            maskRe: /[0-9]/,
                                            editable: false,
                                            enabled: false,
                                            readOnly: false,
//                                            maskRe: /[a-zA-Z]/
                                        },

                                        {xtype: 'tbspacer', width: 409}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '5 0 0 0',
                                    defaults: {
                                        anchor: '100%',
        //                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 27},
                                        {
                                            xtype: 'label',
                                            text: 'Society',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSOCIETY',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: '4',
                                            maskRe: /[a-zA-Z]/,
                                            editable: false,
                                            enabled: false,
                                            readOnly: false,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Currency',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtSCURRENCY',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: '8',
                                            width: 100,
                                            maskRe: /[0-9]/,
                                            editable: false,
                                            enabled: false,
                                            readOnly: false,
        //                                    maskRe: /[a-zA-Z]/
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Amount',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtAMOUNT',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: '20',
                                            width: 100,
                                            maskRe: /[0-9]/,
                                            editable: false,
                                            enabled: false,
                                            readOnly: false,
        //                                    maskRe: /[a-zA-Z]/
                                        },
                                        {xtype: 'tbspacer', width: 409}
                                    ]
                                },
                                
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
                                    margin: '5 0 0 0',
                                    defaults: {
                                        anchor: '100%',
        //                                        width: 1080
                                    },
                                    items: [
                                        
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtDATECI',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            hidden: true,
                                            maxLength: '8',
//                                            maskRe: /[0-9]/,
                                            editable: false,
                                            enabled: false,
                                            readOnly: false,
                                            width: 100
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtTRANCI',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            hidden: true,
                                            maxLength: '9',
//                                            maskRe: /[0-9]/,
                                            editable: false,
                                            enabled: false,
                                            readOnly: false,
                                            width: 100
                                        }
                                        
                                        ,
                                        
                                        {xtype: 'tbspacer', width: 409}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background: transparent;"',
                                    margin: '10 2 2 20',
                                    defaults: {
                                        anchor: '100%',
                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Load Settlement',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration: underline;',
                                            width: 130,
                                            height: 25
                                        },
                                        {xtype: 'tbspacer', width: 534}
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'vbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
        //                            margin: '5 2 5 30',
                                    defaults: {
                                        anchor: '100%',
        //                                width: 650
                                    },
                                    items: [

                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background:#E5ECEF;',
        //                                    margin: '0 2 4 30',
                                            defaults: {
                                                anchor: '100%',
        //                                        width: 1050
                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 27},
                                                {
                                                    xtype: 'form',
                                                    id: prototype.id + '-form-01',
                                                    border: false,
                                                    bodyStyle: 'background-color: #E3EAF9;',
        //                                            padding: '0 0 5 7',
                                                    items: [{
                                                            xtype: 'filefield',
                                                            id: prototype.id + '-file',
                                                            name: 'excelfile',
                        //                                fieldLabel: '<strong style="font-weight:bold;color:#0B333C;">Update Excel</strong>',
                                                            allowBlank: true,
                                                            accept: '.xlsx, .xls',
                                                            labelWidth: 85,
                                                            width: 400,
                                                            buttonAlign: 'left', 
                                                            buttonText: 'Select excel...',
                                                            regex: /(.)+((\.xlsx)|(\.xls)|(\.csv)(\w)?)$/i,
                                                            regexText: 'Only XLS and XLSX formats are accepted',
                                                            buttonConfig: {
                                                                text: '<strong>Select</strong>',
                                                                width: 80,
                                                                style: 'margin-right: 10px;' // Agregamos un margen derecho al botón
                                                            },
                                                            listeners: {
                                                                //change: 'onUploadChange'
                                                            }
                                                        }]
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'label',
                                                    text: 'Sum Amount',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    width: 85
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-txtSumAmount',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    fieldStyle: 'text-align:center',
                                                    enforceMaxLength: true,
                                                    maxLength: '20',
                                                    width: 100,
                                                    maskRe: /[0-9]/,
                                                    editable: false,
                                                    enabled: false,
                                                    readOnly: false,
                //                                    maskRe: /[a-zA-Z]/
                                                },
                                                {xtype: 'tbspacer', width: 500}

                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background:#E5ECEF;',
                //                                    margin: '0 2 2 30',
                                            defaults: {
                                                anchor: '100%',
                //                                        width: 1080
                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 27},
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btn-upload',
                                                    margin: '6 5 5 0',
                                                    width: 80,
                                                    html: '<strong style="color:black;">Load</strong>',
                                                    style: 'background:#70E3EC;color:white;font-weight:bold;',
                                                    border: true,
                                                    listeners: {
                                                        click: 'onFileLoad'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 409}
                                            ]
                                        },
                                    ]
                                },
                            ]
                        }
                    ],
                    dockedItems: [
                        {   
//                            bodyStyle: 'background-color: #70E3EC;',
                            xtype: 'toolbar',
                            dock: 'bottom',
                            ui: 'footer',
                            margin: '10 0 10 0',
                            layout: {
                                pack: 'center'
                            },
                            fieldStyle: 'text-align:center',
                            defaults: {
                                scale: 'medium'
                            },
                            items: [
                                {
                                    text: 'Update',
                                    id: prototype.id + '-btn-update',
                                    iconCls: 'prx-icon-update',
                                    hidden: true,
                                    listeners: {
                                        click: 'onUpdateClick'
                                    }
                                },
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
    ],
    
}
);


