/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : DataEntryTransaction                              *
 * Created on : 17-10-2016, 14:05:32                              *
 * Author     : Ronald Mayta (rmayta)                             *
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 17-10-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */

/* global Ext */

Ext.define('PXMVCAMHome.view.sales.ConciliationASR.DataEntryTransaction', {
    extend: 'Ext.window.Window',
    title: 'Sabre Interact vs PRAXIS - Update Transaction',
    bodyStyle: 'background: transparent',
    header: true,
    width: 636,
    height: 479,
    border: false,
    resizable: false,
    layout: {
        type: 'border'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: 'vConciliationASR-DataEntryTransaction-center',
            border: false,
            padding: '5px 5px 5px 5px',
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    layout: 'column',
                    border: false,
                    style: {
                        borderStyle: 'solid',
                        borderThickness: '1px',
                        borderColor: '#155D8C'
                    },
                    bodyStyle: {
                        backgroundColor: '#E6F4FF'
                    },
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
                            id: 'vConciliationASR-DataEntryTransaction-txtWKSTAT',
                            fieldLabel: 'Station',
                            width: 82
                        },
                        {
                            xtype: 'textfield',
                            id: 'vConciliationASR-DataEntryTransaction-txtFREPOR',
                            fieldLabel: 'Date',
                            width: 78
                        },
                        {
                            xtype: 'textfield',
                            id: 'vConciliationASR-DataEntryTransaction-txtSEC',
                            fieldLabel: 'Seq A',
                            width: 64
                        },
                        {
                            xtype: 'textfield',
                            id: 'vConciliationASR-DataEntryTransaction-txtBSEC',
                            fieldLabel: 'Seq B',
                            width: 64
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
                    bodyStyle: {
                        backgroundColor: '#E6F4FF'
                    },
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
                            id: 'vConciliationASR-DataEntryTransaction-txtSEQ',
                            fieldLabel: 'Seq',
                            fieldStyle: 'font-size:13px;text-align:center;background:#B4D9B4;',
                            maxLength: 4,
                            maskRe : /[0-9]/,
                            width: 46
                        },
                        {
                            xtype: 'textfield',
                            id: 'vConciliationASR-DataEntryTransaction-txtSTATION',
                            fieldLabel: 'Station',
                            fieldStyle: 'font-size:13px;text-align:center;background:#B4D9B4;',
                            maxLength: 8,
                            maskRe : /[0-9]/,
                            width: 82
                        },
                        {
                            xtype: 'textfield',
                            id: 'vConciliationASR-DataEntryTransaction-txtCODE',
                            fieldLabel: 'Code',
                            fieldStyle: 'font-size:13px;text-align:center;background:#B4D9B4;',
                            maxLength: 5,
                            width: 55
                        },
                        {
                            xtype: 'textfield',
                            id: 'vConciliationASR-DataEntryTransaction-txtOPDT',
                            fieldLabel: 'OP Date',
                            maxLength: 5,
                            width: 55
                        },
                        {
                            xtype: 'textfield',
                            id: 'vConciliationASR-DataEntryTransaction-txtOPTM',
                            fieldLabel: 'OP Time',
                            maxLength: 4,
                            maskRe : /[0-9]/,
                            width: 60
                        },
                        {
                            xtype: 'textfield',
                            id: 'vConciliationASR-DataEntryTransaction-txtST',
                            fieldLabel: 'ST',
                            style: {marginLeft: '17px'},
                            maxLength: 2,
                            width: 40
                        },
                        {
                            xtype: 'textfield',
                            id: 'vConciliationASR-DataEntryTransaction-txtCLDT',
                            fieldLabel: 'CL Date',
                            style: {marginLeft: '32px'},
                            maxLength: 5,
                            width: 55
                        },
                        {
                            xtype: 'textfield',
                            id: 'vConciliationASR-DataEntryTransaction-txtCLTM',
                            fieldLabel: 'CL Time',
                            style: {marginLeft: '25px'},
                            maxLength: 4,
                            maskRe : /[0-9]/,
                            width: 60
                        },
                        {
                            xtype: 'textfield',
                            id: 'vConciliationASR-DataEntryTransaction-txtXTDT',
                            fieldLabel: 'XT Date',
                            maxLength: 5,
                            width: 55
                        },
                        {
                            xtype: 'textfield',
                            id: 'vConciliationASR-DataEntryTransaction-txtXTTM',
                            fieldLabel: 'XT Time',
                            maxLength: 4,
                            maskRe : /[0-9]/,
                            width: 60
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    border: false,
                    items:[
                        {
                            layout: 'column',
                            border: false,
                            style: {
                                borderStyle: 'solid',
                                borderThickness: '1px',
                                borderColor: '#155D8C'
                            },
                            bodyStyle: {
                                backgroundColor: '#E6F4FF'
                            },
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
                                    id: 'vConciliationASR-DataEntryTransaction-rg1',
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
                                        labelStyle: 'font-weight:bold;',
                                        hideLabel: false,
                                        checked: false,
                                        width: 120
                                    },
                                    items: [
                                        {
                                            id: 'vConciliationASR-DataEntryTransaction-rf1',
                                            name: 'rgpState',
                                            boxLabel: 'DIFF',
                                            inputValue: 'D',
                                            disabled: true,
                                            width: 46
                                        },
                                        {
                                            id: 'vConciliationASR-DataEntryTransaction-rf2',
                                            name: 'rgpState',
                                            boxLabel: 'MATCH',
                                            inputValue: 'M',
                                            disabled: true,
                                            width: 46
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
                            bodyStyle: {
                                backgroundColor: '#E6F4FF'
                            },
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
                                    id: 'vConciliationASR-DataEntryTransaction-txtXTST',
                                    fieldLabel: 'Interact',
                                    maxLength: 6,
                                    maskRe : /[0-9]/,
                                    width: 64
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'vConciliationASR-DataEntryTransaction-txtVOIDS',
                                    fieldLabel: 'Voids',
                                    maxLength: 6,
                                    maskRe : /[0-9]/,
                                    width: 64
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'vConciliationASR-DataEntryTransaction-txtTTRANS',
                                    fieldLabel: 'Praxis',
                                    maxLength: 8,
                                    maskRe : /[0-9]/,
                                    width: 82
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'vConciliationASR-DataEntryTransaction-txtDIFFERENCES',
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
                    bodyStyle: {
                        backgroundColor: '#E6F4FF'
                    },
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
                            id: 'vConciliationASR-DataEntryTransaction-txaComment',
                            grow: true,
                            maxLength: 320,
                            width: 595,
                            height: 50
                        }
                    ]
                }
            ],
            bbar: [
                {
                    xtype: 'button',
                    id: 'vConciliationASR-DataEntryTransaction-btnSave',
                    icon: 'resources/img/botones/Save.png',
                    scale: 'medium',
                    text: 'Save',
                    disabled: true,
                    height: 30
                },
                {
                    xtype: 'button',
                    id: 'vConciliationASR-DataEntryTransaction-btnUpdate',
                    icon: 'resources/img/botones/update.png',
                    scale: 'medium',
                    text: 'Update',
                    height: 30
                },
                {
                    xtype: 'button',
                    id: 'vConciliationASR-DataEntryTransaction-btnClose',
                    icon: 'resources/img/botones/cancel.png',
                    scale: 'medium',
                    text: 'Close',
                    height: 30
                }
            ]
        }
    ]
});
