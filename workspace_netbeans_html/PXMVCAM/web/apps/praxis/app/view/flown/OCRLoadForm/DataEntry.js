Ext.define('Ext.Praxis.view.flown.OCRLoadForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryOCRLoadForm',

    controller: 'DataEntryOCRLoadController',

    requires: [
        'Ext.Praxis.controller.flown.OCRLoad.DataEntryOCRLoadController'
    ],

    title: 'OCR Ticket - Data Entry Form',
    header: true,
    height: 640,
    width: 865,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.id + '-formDataEntry',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype : 'image',
                            id:prototype.id+'-imgImage',
                            src : 'resources/img/not_picture.png',
                            width: 816,
                            height: 366
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype: 'label',
                            text: 'Ticket Number',
                            style: 'font-weight:bold;color:#000;',
                            width: 110,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'CCIA(3) + FORMA(4) + SERIE(6) + CUPON (1)'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtTicket',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            readOnly: true,
                            maxLength: 14,
                            maskRe: /[0-9]/,
                            allowBlank: false,
                            width: 100,
                            validator: function(value){
                                if (value!==''&&value.length!==14)
                                    return "The value entered is too small.";
                                else return true;
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            text: 'Check Digit',
                            style: 'font-weight:bold;color:#000;',
                            width: 85
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtDCHEQ',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            allowBlank: false,
                            maxLength: 1,
                            width: 35,
                            maskRe: /[0-9]/,
                            validator: function(value){
                                if (value==="0")
                                    return "The value entered is too small.";
                                else return true;
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            text: 'Sequence',
                            style: 'font-weight:bold;color:#000;',
                            width: 85
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtSEQ',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            allowBlank: false,
                            readOnly: true,
                            maxLength: 2,
                            width: 45
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            text: 'Accounting Date',
                            style: 'font-weight:bold;color:#000;',
                            width: 120,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Accounting Date (YYYYMM)'
                            }
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFCONT',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            allowBlank: false,
                            readOnly: true,
                            maxLength: 6,
                            width: 80
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'column',
                    width: 835,
                    margin: '2 0 2 7',
                    border: false,
                    bodyStyle:{
                        "background-color":"rgb(229, 236, 239)"
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            defaults:{
                                style: 'margin: 3px;',
                                border: false
                            },
                            bodyStyle:{
                                "background-color":"rgb(229, 236, 239)"
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    bodyStyle:{
                                        "background-color":"rgb(229, 236, 239)"
                                    },
                                    items:[
                                        {
                                            xtype: 'label',
                                            html: '<strong style="color:#000; text-decoration: underline; ">Flight Information</strong>'
                                        },
                                        {xtype: 'tbspacer', width: 521},
                                        {
                                            xtype: 'label',
                                            text: 'Currency',
                                            hidden: true,
                                            style: 'font-weight:bold;color:#000;',
                                            width: 85
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            hidden: true,
                                            id: prototype.id + '-txtMDACP',
                                            enforceMaxLength: true,
//                                            readOnly: true,
                                            maxLength: 3,
                                            width: 100
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    bodyStyle:{
                                        "background-color":"rgb(229, 236, 239)"
                                    },
                                    items:[
//                                        {xtype: 'tbspacer', width: 90},
                                        {
                                            xtype: 'label',
                                            text: 'Departure',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 85
                                        },
                                        {
                                            xtype: 'label',
                                            text: '(*)',
                                            style: 'font-weight:bold;color:red;',
                                            width: 20,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Mandatory Field'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCDEPART',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            minLength: 3,
                                            width: 100,
                                            validator: function(value){
                                                if(value===""){
                                                    return "It requires you to enter a Departure City";
                                                } else return true;
                                            },
                                            listeners:{
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Arrival',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 100
                                        },
                                        {
                                            xtype: 'label',
                                            text: '(*)',
                                            style: 'font-weight:bold;color:red;',
                                            width: 20,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Mandatory Field'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCARRIVA',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            minLength: 3,
                                            width: 100,
                                            validator: function(value){
                                                if(value===""){
                                                    return "It requires you to enter a Arrival City";
                                                } else return true;
                                            },
                                            listeners:{
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Zone',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 85
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtZONE',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            maxLength: 3,
                                            width: 80,
                                            listeners:{
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Value',
                                            hidden: true,
                                            style: 'font-weight:bold;color:#000;',
                                            width: 85
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            hidden: true,
                                            id: prototype.id + '-txtVCPN',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
//                                            readOnly: true,
                                            maskRe: /[0-9.]/,
                                            maxLength: 15,
                                            width: 100,
                                            validator: function(value){
                                                if(value!==''&&value.length<15){
                                                    return "The value entered is too small.";
                                                } else return true;
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    bodyStyle:{
                                        "background-color":"rgb(229, 236, 239)"
                                    },
                                    items:[
//                                        {xtype: 'tbspacer', width: 70},
                                        {
                                            xtype: 'label',
                                            text: 'Flight Date',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 85,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'YYYYMMDD'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            text: '(*)',
                                            style: 'font-weight:bold;color:red;',
                                            width: 20,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Mandatory Field'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-txtDFLIGHT',
                                            fieldStyle: 'text-align:left',
                                            format: 'Ymd',
                                            formatText: '',
                                            invalidText: 'Type the date in the format: YYYYMMDD',
                                            allowBlank: false,
                                            enforceMaxLength: true,
                                            maxLength: 8,
                                            maskRe: /[0-9]/,
                                            width: 100,
                                            hideTrigger: true
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Flight Number',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 100
                                        },
                                        {
                                            xtype: 'label',
                                            text: '(*)',
                                            style: 'font-weight:bold;color:red;',
                                            width: 20,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Mandatory Field'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtNFLIGHT',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            allowBlank: false,
                                            maxLength: 4,
                                            maskRe: /[0-9]/,
                                            width: 100,
                                            validator: function(value){
                                                if(value!==''&&value.length<4){
                                                    return "The value entered is too small.";
                                                } else return true;
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Plane Nbr',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 85
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtNPLANE',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            readOnly: true,
                                            maxLength: 10,
                                            width: 80,
                                            listeners:{
                                                change: 'onUpperValue'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Commission',
                                            hidden: true,
                                            style: 'font-weight:bold;color:#000;',
                                            width: 85
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            hidden: true,
                                            id: prototype.id + '-txtCOMISI',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
//                                            readOnly: true,
                                            maxLength: 15,
                                            width: 100
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    bodyStyle:{
                                        "background-color":"rgb(229, 236, 239)"
                                    },
                                    items:[
//                                        {xtype: 'tbspacer', width: 70},
                                        {
                                            xtype: 'label',
                                            text: 'Status',
                                            hidden: true,
                                            style: 'font-weight:bold;color:#000;',
                                            width: 105
                                        },
//                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype:'combo',
                                            hidden: true,
                                            id: prototype.id + '-cmbSTVAL',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["", ""],
                                                    ["1", "Error"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            readOnly: true,
                                            editable: false,
                                            valueField: 'code',
                                            displayField: 'name',
                                            width: 100
                                        },
//                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Leg Sequence',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 105
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtLEGSEQ',
                                            fieldStyle: 'text-align:left',
                                            enforceMaxLength: true,
                                            maxLength: 4,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Source',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 100
                                        },
                                        {
                                            xtype: 'label',
                                            text: '(*)',
                                            style: 'font-weight:bold;color:red;',
                                            width: 20,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Mandatory Field'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype:'combo',
                                            id: prototype.id + '-cmbFTE',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["", ""],
                                                    ["B", "BSP"],
                                                    ["A", "ARC"],
                                                    ["S", "ASR"],
                                                    ["T", "TCN"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            readOnly: true,
                                            editable: false,
                                            valueField: 'code',
                                            displayField: 'name',
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Tax',
                                            hidden: true,
                                            style: 'font-weight:bold;color:#000;',
                                            width: 85
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            hidden: true,
                                            id: prototype.id + '-txtVTAX',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
//                                            readOnly: true,
                                            maxLength: 15,
                                            width: 100
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    bodyStyle:{
                                        "background-color":"rgb(229, 236, 239)"
                                    },
                                    items:[
//                                        {xtype: 'tbspacer', width: 70},
                                        {
                                            xtype: 'label',
                                            text: 'Associate ticket',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 105
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtTKTASO',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
//                                            readOnly: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 14,
                                            width: 100
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'Qty Pax',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 120
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtQTYPAX',
                                            fieldStyle: 'text-align:right',
                                            enforceMaxLength: true,
//                                            readOnly: true,
                                            maxLength: 3,
                                            width: 80
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'label',
                                            text: 'Type',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 85
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype:'combo',
                                            id: prototype.id + '-cmbType',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["T", "Ticket"],
                                                    ["F", "FIM"],
                                                    ["M", "MCO/EMD"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            readOnly: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 100,
                                            typeAhead: true,
                                            valueField: 'code',
                                            emptyText: 'Ticket',
                                            displayField: 'name',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            hideTrigger: false,
                                            listeners:{
                                                focus: function(combo) {
                                                    combo.expand();
                                                },
                                                change: 'onCmbTypeChange'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
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
                    text: 'Save',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                },
                {xtype: 'tbspacer', width: 30},
                {
                    xtype: 'label',
                    text: '(*) Required Fields',
                    style: 'font-weight:bold;color:red;',
                    width: 120
                },
                {xtype: 'tbspacer', width: 30},
                {
                    xtype: 'button',
                    id: prototype.id + '-btn-prev',
                    icon: 'resources/img/botones/prev.png',
                    tooltip: 'View Previous Flight Manifest',
                    border: false,
                    listeners: {
                        click: 'onPrevClick'
                    }
                },
                {
                    xtype: 'button',
                    id: prototype.id + '-btn-next',
                    icon: 'resources/img/botones/next2.png',
                    tooltip: 'View Next Flight Manifest',
                    border: false,
                    listeners: {
                        click: 'onNextClick'
                    }
                }
            ]
        }
    ]
});