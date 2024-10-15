Ext.define('Ext.Praxis.view.payments.LoadSalesConciliationForm.Info', {
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
                                            text: 'Load File',
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
//                                                        fieldLabel: '<strong style="font-weight:bold;color:#0B333C;">Update Excel</strong>',
                                                            allowBlank: true,
                                                            accept: '.xlsx, .xls',
                                                            labelWidth: 85,
                                                            width: 400,
                                                            style: 'font-weight:bold;',
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
                                                    text: 'Accounting',
                                                    id: prototype.id + '-lblCONTAB',
                                                    style: 'font-weight:bold;color:#0B333C;',
                                                    hidden: true,
                                                    width: 85,
                                                    margin: '4 0 0 0',
                                                },
                                                {xtype: 'tbspacer', width: 5},
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: prototype.id + '-chkCONTAB',
                                                    hidden: true,
//                                                    margin: '0 0 0 0',
//                                                    checked: true,
                                                    padding: '0px 0px 0px 0px',

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
                                                {xtype: 'tbspacer', width: 20},
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btn-process',
                                                    margin: '6 5 5 0',
                                                    width: 80,
                                                    html: '<strong style="color:black;">Process</strong>',
                                                    style: 'background:#70E3EC;color:white;font-weight:bold;',
                                                    border: true,
                                                    hidden:true,
                                                    listeners: {
                                                        click: 'onProcess'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 409}
                                            ]
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background: transparent;"',
                                    margin: '20 2 2 20',
                                    defaults: {
                                        anchor: '100%',
                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Load Information',
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
                                    margin: '5 0 10 0',
                                    defaults: {
                                        anchor: '100%',
        //                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 27},
                                        {
                                            xtype: 'label',
                                            text: 'Read records',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtQTYREC',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: '10',
                                            editable: false,
                                            enabled: false,
                                            readOnly: false,
                                            width: 100
                                        }
                                        ,
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Load records ',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtQTYUPL',
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
                                            text: 'Not Loaded',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtQTYNOTUPL',
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
                                    margin: '5 0 20 0',
                                    defaults: {
                                        anchor: '100%',
        //                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 27},
                                        {
                                            xtype: 'label',
                                            text: 'Upload user',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtUSCR',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: '10',
                                            editable: false,
                                            enabled: false,
                                            readOnly: false,
                                            width: 100
                                        }
                                        ,
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Loading Date',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtPRDA',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: '8',
                                            width: 100,
//                                            maskRe: /[0-9]/,
                                            editable: false,
                                            enabled: false,
                                            readOnly: false,
        //                                    maskRe: /[a-zA-Z]/
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Report numb',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtTRANL',
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
                                            text: 'Processing Information',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration: underline;',
                                            width: 160,
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
                                    margin: '5 0 50 0',
                                    defaults: {
                                        anchor: '100%',
        //                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 27},
                                        {
                                            xtype: 'label',
                                            text: 'Records',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtQTY',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maxLength: '10',
                                            editable: false,
                                            enabled: false,
                                            readOnly: false,
                                            width: 100
                                        }
                                        ,
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Processed',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtQTYPROCUP',
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
                                            text: 'Not Proces.',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 5},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtQTYNPROCUP',
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
                            ]
                        }
                    ],
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


