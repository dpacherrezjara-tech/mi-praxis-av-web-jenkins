Ext.define('Ext.Praxis.view.sales.ConciliationASRForm.DataEntryTransaction', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryTransactionConciliationASRForm',
    requires:[
        'Ext.Praxis.controller.sales.ConciliationASR.DataEntryTransactionConciliationASRController'
    ],
    controller: 'DataEntryTransactionConciliationASRController',
    title: 'Sabre Interact vs PRAXIS - Update Transaction',
    bodyStyle: 'background: transparent',
    header: true,
    width: 636,
    height: 495,
    border: false,
    resizable: false,
    layout:'fit',
    defaults: {
        border: false
    },
    modal: true,
    items: [
        {
            xtype: 'form',
            border: false,
            height: 413,
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items: [
                { xtype: 'tbspacer', height: 4 },
                {
                    layout: 'column',
                    style: {
                        borderStyle: 'solid',
                        borderThickness: '1px',
                        borderColor: '#155D8C'
                    },
//                    bodyStyle: {
//                        backgroundColor: '#E6F4FF'
//                    },
                    margin: '0px 0px 0px 0px',
                    width: 380,
                    height: 80,
                    defaults: {
                        labelAlign: 'top',
                        readOnly: true,
                        labelSeparator: '',
                        labelStyle: 'color:#155D8C;font-family:Arial;font-weight:bold;font-size:13px;text-align:center;',
                        fieldStyle: 'font-size:13px;text-align:center;background:#F0DE9F;',
                        style: {
                            marginTop: '0px',
                            marginRight: '0px',
                            marginBottom: '0px',
                            marginLeft: '15px'
                        }
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Transaction',
                            style: {
                                color: '#155D8C',
                                backgroundColor: '#A0BFD3',
                                fontFamily: 'Arial',
                                fontWeight: 'bold',
                                paddingTop: '3px',
                                paddingRight: '0px',
                                paddingBottom: '0px',
                                paddingLeft: '3px',
                                borderBottomStyle: 'solid',
                                borderThicknesssTop: '0px',
                                borderThicknesssRight: '0px',
                                borderThicknesssBottom: '1px',
                                borderThicknesssLeft: '0px',
                                borderBottomColor: '#155D8C'
                            },
                            width: 74
//                            height: 23
                        },
                        {
                            xtype: 'image',
                            src: 'resources/img/general/tag.png',
                            width: 20,
//                            height: 23,
                            margin: '0px'
                        },
                        {
                            xtype: 'label',
                            width: 280,
                            height: 23,
                            margin: '0px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtWKSTAT',
                            fieldLabel: 'Station',
                            width: 82
                        },
                        {
                            xtype: 'datefield',
                            id:prototype.id+'-txtFREPOR',
                            fieldStyle: 'text-align:center',
                            format: 'Y/m/d',
                            formatText: '',
                            invalidText: 'Type the date in the format: YYYY/MM/DD',
                            minValue: new Date(1990, 00, 01),
                            fieldLabel: 'Date',
                            maskRe: /[0-9/]/,
                            enforceMaxLength: true,
                            maxLength: 10,
                            width: 78,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Format valid YYYY/MM/DD'
                            },
                            listeners: {
                                focus: function(cmp) {
                                    cmp.expand();
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtSEC',
                            fieldLabel: 'Seq A',
                            width: 64
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtBSEC',
                            fieldLabel: 'Seq B',
                            width: 64
                        }
                    ]
                },
                {
                    layout: 'column',
                    border: true,
                    style: {
                        borderStyle: 'solid',
                        borderThickness: '1px',
                        borderColor: '#155D8C'
                    },
//                    bodyStyle: {
//                        backgroundColor: '#E6F4FF'
//                    },
                    margin: '5px 0px 0px 0px',
                    width: 424,
                    height: 124,
                    defaults: {
                        labelAlign: 'top',
                        readOnly: false,
                        labelSeparator: '',
                        labelStyle: 'color:#155D8C;font-family:Arial;font-weight:bold;font-size:13px;text-align:center;',
                        fieldStyle: 'font-size:13px;text-align:center;background:#F0B69F;',
                        style: {
                            marginTop: '0px',
                            marginRight: '0px',
                            marginBottom: '0px',
                            marginLeft: '15px'
                        }
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Interact',
                            style: {
                                color: '#155D8C',
                                backgroundColor: '#A0BFD3',
                                fontFamily: 'Arial',
                                fontWeight: 'bold',
                                paddingTop: '3px',
                                paddingRight: '0px',
                                paddingBottom: '0px',
                                paddingLeft: '3px',
                                borderBottomStyle: 'solid',
                                borderThicknesssTop: '0px',
                                borderThicknesssRight: '0px',
                                borderThicknesssBottom: '1px',
                                borderThicknesssLeft: '0px',
                                borderBottomColor: '#155D8C'
                            },
                            width: 74,
                            height: 23
                        },
                        {
                            xtype: 'image',
                            src: 'resources/img/general/tag.png',
                            width: 20,
                            height: 23,
                            margin: '0px'
                        },
                        {
                            xtype: 'label',
                            width: 280,
                            height: 23,
                            margin: '0px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtSEQ',
                            fieldLabel: 'Seq',
                            fieldStyle: 'font-size:13px;text-align:center;background:#B4D9B4;',
                            maxLength: 4,
                            selectOnFocus: true,
                            select: true,
                            maskRe : /[0-9]/,
                            width: 46
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtSTATION',
                            fieldLabel: 'Station',
                            fieldStyle: 'font-size:13px;text-align:center;background:#B4D9B4;',
                            maxLength: 8,
                            maskRe : /[0-9]/,
                            width: 82
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCODE',
                            fieldLabel: 'Code',
                            allowBlank: false,
                            fieldStyle: 'font-size:13px;text-align:center;background:#B4D9B4;',
                            validator: function(value){
                                if(value===""){
                                    return "It requires you to enter text";
                                } else return true;
                            },
                            maxLength: 5,
                            minLength: 5,
                            width: 55
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtOPDT',
                            allowBlank: false,
                            validator: function(value){
                                if(value===""){
                                    return "It requires you to enter text";
                                } else return true;
                            },
                            fieldLabel: 'OP Date',
                            maxLength: 5,
                            minLength: 5,
                            width: 55
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtOPTM',
                            fieldLabel: 'OP Time',
                            maxLength: 4,
                            maskRe : /[0-9]/,
                            width: 60
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtST',
                            fieldLabel: 'ST',
                            allowBlank: false,
                            validator: function(value){
                                if(value===""){
                                    return "It requires you to enter text";
                                } else return true;
                            },
                            style: {marginLeft: '17px'},
                            maxLength: 2,
                            width: 40
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCLDT',
                            fieldLabel: 'CL Date',
                            allowBlank: false,
                            validator: function(value){
                                if(value===""){
                                    return "It requires you to enter text";
                                } else return true;
                            },
                            style: {marginLeft: '32px'},
                            maxLength: 5,
                            minLength: 5,
                            width: 55
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCLTM',
                            fieldLabel: 'CL Time',
                            style: {marginLeft: '25px'},
                            maxLength: 4,
                            maskRe : /[0-9]/,
                            width: 60
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtXTDT',
                            fieldLabel: 'XT Date',
                            allowBlank: false,
                            validator: function(value){
                                if(value===""){
                                    return "It requires you to enter text";
                                } else return true;
                            },
                            maxLength: 5,
                            minLength: 5,
                            width: 55
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtXTTM',
                            fieldLabel: 'XT Time',
                            maxLength: 4,
                            maskRe : /[0-9]/,
                            width: 60
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    style: 'margin: 0px;',
                    defaults:{
                        style: 'margin: 3px;',
                        border: false
                    },
                    items:[
                        {
                            layout: 'column',
                            style: {
                                borderStyle: 'solid',
                                borderThickness: '1px',
                                borderColor: '#155D8C'
                            },
//                            bodyStyle: {
//                                backgroundColor: '#E6F4FF'
//                            },
                            margin: '5px 0px 0px 0px',
                            width: 124,
                            height: 82,
                            defaults: {
                                labelAlign: 'top',
                                readOnly: true,
                                labelSeparator: '',
                                labelStyle: 'color:#155D8C;font-family:Arial;font-weight:bold;font-size:13px;text-align:center;',
                                fieldStyle: 'font-size:13px;text-align:center;background:#F0B69F;',
                                style: {
                                    marginTop: '5px',
                                    marginRight: '0px',
                                    marginBottom: '0px',
                                    marginLeft: '25px'
                                }
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Status',
                                    style: {
                                        color: '#155D8C',
                                        backgroundColor: '#A0BFD3',
                                        fontFamily: 'Arial',
                                        fontWeight: 'bold',
                                        paddingTop: '3px',
                                        paddingRight: '0px',
                                        paddingBottom: '0px',
                                        paddingLeft: '3px',
                                        borderBottomStyle: 'solid',
                                        borderThicknesssTop: '0px',
                                        borderThicknesssRight: '0px',
                                        borderThicknesssBottom: '1px',
                                        borderThicknesssLeft: '0px',
                                        borderBottomColor: '#155D8C'
                                    },
                                    width: 44,
                                    height: 23
                                },
                                {
                                    xtype: 'image',
                                    src: 'resources/img/general/tag.png',
                                    width: 20,
                                    height: 23,
                                    margin: '0px'
                                },
                                {
                                    xtype: 'label',
                                    width: 50,
                                    height: 23,
                                    margin: '0px'
                                },
                                {
                                    xtype: 'radiogroup',
                                    id: prototype.id + '-rgpState',
                                    layout: 'vbox',
                                    hideLabel: false,
                                    width: 120,
                                    defaults: {
                                        xtype: 'radiofield',
                                        style: {
                                            color: '#155D8C',
                                            fontFamily: 'Arial',
                                            fontWeight: 'bold',
                                            fontSize: '13px',
                                            textAlign: 'center',
                                            margin: '0px 0px 0px 5px'
                                        },
                                        labelStyle: 'font-weight:bold;text-align:left;',
                                        hideLabel: false,
                                        checked: false,
                                        width: 120
                                    },
                                    items: [
                                        {
                                            id: prototype.id+'-rgpState1',
                                            name: 'rgpState',
                                            boxLabel: 'DIFF',
                                            inputValue: '1',
                                            disabled: true,
                                            width: 55
                                        },
                                        {
                                            id: prototype.id+'-rgpState2',
                                            name: 'rgpState',
                                            boxLabel: 'MATCH',
                                            inputValue: '2',
                                            disabled: true,
                                            width: 55
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            layout: 'column',
                            style: {
                                borderStyle: 'solid',
                                borderThickness: '1px',
                                borderColor: '#155D8C'
                            },
//                            bodyStyle: {
//                                backgroundColor: '#E6F4FF'
//                            },
                            margin: '5px 0px 0px 5px',
                            width: 404,
                            height: 82,
                            defaults: {
                                labelAlign: 'top',
                                readOnly: false,
                                labelSeparator: '',
                                labelStyle: 'color:#155D8C;font-family:Arial;font-weight:bold;font-size:13px;text-align:center;',
                                fieldStyle: 'font-size:13px;text-align:center;background:#F0B69F;',
                                style: {
                                    marginTop: '0px',
                                    marginRight: '0px',
                                    marginBottom: '0px',
                                    marginLeft: '15px'
                                }
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Total Transaction',
                                    style: {
                                        color: '#155D8C',
                                        backgroundColor: '#A0BFD3',
                                        fontFamily: 'Arial',
                                        fontWeight: 'bold',
                                        paddingTop: '3px',
                                        paddingRight: '0px',
                                        paddingBottom: '0px',
                                        paddingLeft: '3px',
                                        borderBottomStyle: 'solid',
                                        borderThicknesssTop: '0px',
                                        borderThicknesssRight: '0px',
                                        borderThicknesssBottom: '1px',
                                        borderThicknesssLeft: '0px',
                                        borderBottomColor: '#155D8C'
                                    },
                                    width: 104,
                                    height: 23
                                },
                                {
                                    xtype: 'image',
                                    src: 'resources/img/general/tag.png',
                                    width: 20,
                                    height: 23,
                                    margin: '0px'
                                },
                                {
                                    xtype: 'label',
                                    width: 270,
                                    height: 23,
                                    margin: '0px'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtXTST',
                                    fieldLabel: 'Interact',
                                    maxLength: 6,
                                    maskRe : /[0-9]/,
                                    width: 64
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtVOIDS',
                                    fieldLabel: 'Voids',
                                    maxLength: 6,
                                    maskRe : /[0-9]/,
                                    width: 64
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtTTRANS',
                                    fieldLabel: 'Praxis',
                                    maxLength: 8,
                                    maskRe : /[0-9]/,
                                    width: 82
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtDIFFERENCES',
                                    fieldLabel: 'Differences',
                                    maxLength: 8,
                                    maskRe : /[0-9]/,
                                    width: 82
                                }
                            ]
                        }
                    ]
                },
                {
                    layout: 'column',
                    border: false,
                    style: {
                        borderStyle: 'solid',
                        borderThickness: '1px',
                        borderColor: '#155D8C'
                    },
//                    bodyStyle: {
//                        backgroundColor: '#E6F4FF'
//                    },
                    margin: '5px 0px 0px 0px',
                    width: 612,
                    height: 89,
                    defaults: {
                        labelAlign: 'top',
                        readOnly: false,
                        labelSeparator: '',
                        labelStyle: 'color:#155D8C;font-family:Arial;font-weight:bold;font-size:13px;text-align:center;',
                        fieldStyle: 'font-size:13px;text-align:left;background:#F0DE9F;',
                        style: {
                            marginTop: '5px',
                            marginRight: '5px',
                            marginBottom: '5px',
                            marginLeft: '5px'
                        }
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Comment',
                            style: {
                                color: '#155D8C',
                                backgroundColor: '#A0BFD3',
                                fontFamily: 'Arial',
                                fontWeight: 'bold',
                                paddingTop: '3px',
                                paddingRight: '0px',
                                paddingBottom: '0px',
                                paddingLeft: '3px',
                                borderBottomStyle: 'solid',
                                borderThicknesssTop: '0px',
                                borderThicknesssRight: '0px',
                                borderThicknesssBottom: '1px',
                                borderThicknesssLeft: '0px',
                                borderBottomColor: '#155D8C'
                            },
                            width: 74,
                            height: 23
                        },
                        {
                            xtype: 'image',
                            src: 'resources/img/general/tag.png',
                            width: 20,
                            height: 23,
                            margin: '0px'
                        },
                        {
                            xtype: 'label',
                            width: 280,
                            height: 23,
                            margin: '0px'
                        },
                        {
                            xtype: 'textarea',
                            id: prototype.id + '-txaComment',
                            grow: true,
                            maxLength: 320,
                            width: 595,
                            height: 50
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '5 0 10 0',
            layout:{
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults:{
                scale: 'medium'
            },
            items:[
                {
                    text: 'Save',
                    id:prototype.id+'-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners:{
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id:prototype.id+'-btn-update',
                    iconCls: 'prx-icon-update',
                    disabled: true,
                    listeners:{
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id:prototype.id+'-btn-delete',
                    iconCls: 'prx-icon-delete',
                    disabled: true,
                    listeners:{
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id:prototype.id+'-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners:{
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});
