/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : DataEntry                                         *                
 * Created on : 19/02/2018, 17:28:00                              *          
 * Author     : Gregory Sánchez (gsanchez)                        *          
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 20-09-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */

Ext.define('Ext.Praxis.view.flown.SSIMDuplicatedForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntrySSIMDuplicatedForm',

    controller: 'DataEntrySSIMDuplicatedController',

    requires:[
        'Ext.Praxis.controller.flown.SSIMDuplicated.DataEntrySSIMDuplicatedController'
    ],

    title:'Flight Manifest - Data Entry Form',
    header:true,
//    bodyStyle: 'background: transparent',
    height:500,
    width:920,
    border:false,
    resizable:false,
    layout:'fit',
    modal:true,
//    padding: '30px',

    defaults:{
        border: false
    },

    items:[
        {
            xtype: 'form',
            id: prototype.id01 + '-form',
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Flight Date',
                            style: 'font-weight:bold;color:#000;',
                            width: 110,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'YYYYMMDD'
                            }
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id01+'-txtA1691-DFLIGHT',
                            readOnly: true,
                            enforceMaxLength: true,
                            maxLength: 8,
                            width: 100
                        },
                        { xtype: 'tbspacer', width: 30 },
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
                            width: 20
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id01+'-txtA1691-NFLIGHT',
                            readOnly: true,
                            enforceMaxLength: true,
                            maxLength: 5,
                            width: 100
                        },
                        { xtype: 'tbspacer', width: 30 },
                        {
                            xtype: 'label',
                            text: 'Status',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'combobox',
                            id: prototype.id01+'-cmbA1691-STVAL',
                            store: Ext.create('Ext.Praxis.store.flown.SSIMDuplicated.ComboBoxStatus'),
                            queryMode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            value: '2',
                            emptyText: '[select]',
                            width: 100
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Departure',
                            style: 'font-weight:bold;color:#000;',
                            width: 110,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Departure City'
                            }
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id01+'-txtA1691-CDEPART',
                            readOnly: true,
                            enforceMaxLength: true,
                            maxLength: 3,
                            width: 100
                        },
                        { xtype: 'tbspacer', width: 30 },
                        {
                            xtype: 'label',
                            text: 'Arrival',
                            style: 'font-weight:bold;color:#000;',
                            width: 100,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Arrival City'
                            }
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id01+'-txtA1691-CARRIVA',
                            readOnly: true,
                            enforceMaxLength: true,
                            maxLength: 3,
                            width: 100
                        },
                        { xtype: 'tbspacer', width: 30 },
                        {
                            xtype: 'label',
                            text: 'Zone',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id01+'-txtA1691-ZONE',
                            readOnly: true,
                            enforceMaxLength: true,
                            maxLength: 3,
                            width: 100
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Carrier Operator',
                            style: 'font-weight:bold;color:#000;',
                            width: 110
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            width: 20
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id01+'-txtA1691-CARRI',
                            enforceMaxLength: true,
                            maxLength: 2,
                            width: 100
                        },
                        { xtype: 'tbspacer', width: 30 },
                        {
                            xtype: 'label',
                            text: 'Leg Sequence',
                            style: 'font-weight:bold;color:#000;',
                            width: 120
                        },
                        { xtype: 'tbspacer', width: 10 },
                        {
                            xtype: 'textfield',
                            id:prototype.id01+'-txtA1691-LEGSEQ',
                            enforceMaxLength: true,
                            maxLength: 2,
                            width: 100
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    border: false,
                    bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '0 0 10 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    html: '<strong style="color:#000; text-decoration: underline; ">SSIM File Information</strong>'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            layout: 'column',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Received Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'YYYYMMDD'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id01+'-txtA1691-FSENDSS',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Flag SSIM',
                                    style: 'font-weight:bold;color:#000;text-align:center;',
                                    width: 120
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id01+'-cmbA1691-FSTASS',
                                    store: Ext.create('Ext.Praxis.store.flown.SSIMDuplicated.ComboBoxFlagSSIM'),
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    forceSelection: true,
                                    caseSensitive: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    value: '',
                                    emptyText: '[select]',
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Flag Flown',
                                    style: 'font-weight:bold;color:#000;text-align:center;',
                                    width: 120
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id01+'-cmbA1691-FFLOW',
                                    store: Ext.create('Ext.Praxis.store.flown.SSIMDuplicated.ComboBoxFlagFlow'),
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    forceSelection: true,
                                    caseSensitive: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    value: '',
                                    emptyText: '[select]',
                                    width: 100
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Plane Nbr',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id01+'-txtA1691-NPLANE',
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Type Operator',
                                    style: 'font-weight:bold;color:#000;text-align: center',
                                    width: 120
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id01+'-cmbA1691-TOPER',
                                    store: Ext.create('Ext.Praxis.store.flown.SSIMDuplicated.ComboBoxTOper'),
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    disabled: true,
                                    forceSelection: true,
                                    caseSensitive: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    value: '',
                                    emptyText: '[select]',
                                    width: 100
                                }
                            ]
                        }
                    ]

                },
                {
                    xtype: 'panel',
                    layout: 'column',
                    border: false,
                    bodyStyle: 'background: #EFE9E5',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'column',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    padding: '0px 80px 0px 0px',
                                    html: '<strong style="color:#000; text-decoration: underline; ">ODS File Information</strong>'
                                },
                                { xtype: 'tbspacer', width: 300 },
                                {
                                    xtype: 'label',
                                    id:prototype.id01+'-txtA1691-DESCRIP-label',
                                    html: '<strong style="color:red;">(*)</strong>',
                                    hidden: true
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id01+'-txtA1691-DESCRIP',
                                    enforceMaxLength: true,
                                    maxLength: 50,
                                    inputAttrTpl: "data-qtip='Enter an observation if is needed'",
                                    width: 400,
                                    hidden: true
                                }
                            ]
                        },
                        
                        {
                            xtype: 'panel',
                            layout: 'column',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Received Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'YYYYMMDD'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id01+'-txtA1691-FSENDOD',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    width: 100
                                },
                                {
                                    xtype: 'button',
                                    text: 'Qty Coupons',
                                    tooltip: 'Qty ODS Coupons',
                                    listeners:{
                                        click: 'onQtyCouponsClick'
                                    },
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id01+'-txtA1691-QCPNOD',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Flag ODS',
                                    style: 'font-weight:bold;color:#000;text-align:center;',
                                    width: 120
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id01+'-cmbA1691-FSTAOD',
                                    store: Ext.create('Ext.Praxis.store.flown.SSIMDuplicated.ComboBoxFlagODS'),
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    forceSelection: true,
                                    caseSensitive: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    value: '',
                                    emptyText: '[select]',
                                    width: 100
                                }
                            ]

                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            border: false,
                            bodyStyle: 'background: #EFE9E5',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Zulu Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'YYYYMMDD'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id01+'-txtA1691-FOPERZUL',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    text: 'Qty in Transit',
                                    style: 'font-weight:bold;color:#000;text-align:center;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id01+'-txtA1691-QCPTRA',
                                    value: '0',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    width: 100
                                }
                            ]
                        }
                    ]

                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle:{"background-color":"rgb(229, 236, 239)"},
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'VCR File Information',
                            style: 'font-weight:bold;color:#000;text-decoration: underline;',
                            width: 145
                        },
                        { xtype: 'tbspacer', width: 30 },
                        {
                            xtype: 'label',
                            text: 'Received Date',
                            style: 'font-weight:bold;color:#000;',
                            width: 100,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'YYYYMMDD'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id01+'-txtA1691-FSENDVC',
                            readOnly: true,
                            enforceMaxLength: true,
                            maxLength: 8,
                            width: 90
                        },
                        { xtype: 'tbspacer', width: 30 },
                        {
                            xtype: 'label',
                            text: 'Qty Coupons',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id01+'-txtA1691-QCPNVC',
                            readOnly: true,
                            fieldStyle: 'text-align:right',
                            enforceMaxLength: true,
                            maxLength: 5,
                            width: 90
                        },
                        { xtype: 'tbspacer', width: 30 },
                        {
                            xtype: 'label',
                            text: 'Flag',
                            style: 'font-weight:bold;color:#000;',
                            width: 60
                        },
                        {
                            xtype: 'combobox',
                            id: prototype.id01+'-cmbA1691-FSTAVC',
                            store: Ext.create('Ext.Praxis.store.flown.SSIMDuplicated.ComboBoxFlag'),
                            queryMode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            value: '',
//                            emptyText: '[select]',
                            width: 110
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle:{"background-color":"rgb(239, 233, 229)"},
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Other Information',
                            style: 'font-weight:bold;color:#000;text-decoration: underline;',
                            width: 145
                        },
                        { xtype: 'tbspacer', width: 30 },
                        {
                            xtype: 'label',
                            text: 'Qty OCR',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id01+'-txtA1691-QCPNOCR',
                            readOnly: true,
                            fieldStyle: 'text-align:right',
                            enforceMaxLength: true,
                            maxLength: 3,
                            width: 90
                        },
                        { xtype: 'tbspacer', width: 30 },
                        {
                            xtype: 'label',
                            text: 'Qty Manual',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id01+'-txtA1691-QCPNMA',
                            readOnly: true,
                            fieldStyle: 'text-align:right',
                            enforceMaxLength: true,
                            maxLength: 3,
                            width: 90
                        },
                        { xtype: 'tbspacer', width: 30 },
                        {
                            xtype: 'label',
                            text: 'Total',
                            style: 'font-weight:bold;color:#000;',
                            width: 60
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id01+'-txtA1691-QCPNTOT',
                            readOnly: true,
                            fieldStyle: 'text-align:right',
                            enforceMaxLength: true,
                            maxLength: 3,
                            width: 110
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle:{"background-color":"rgb(229, 236, 239)"},
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Accounting Information',
                            style: 'font-weight:bold;color:#000;text-decoration: underline;',
                            width: 145
                        },
                        { xtype: 'tbspacer', width: 30 },
                        {
                            xtype: 'label',
                            text: 'Policy Date',
                            style: 'font-weight:bold;color:#000;',
                            width: 100,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'YYYYMMDD'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id01+'-txtA1691-FCLOSE',
                            readOnly: true,
                            enforceMaxLength: true,
                            maxLength: 8,
                            width: 90
                        },
                        { xtype: 'tbspacer', width: 30 },
                        {
                            xtype: 'label',
                            text: 'Qty Coupons',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id01+'-txtA1691-QCPNVAL',
                            readOnly: true,
                            fieldStyle: 'text-align:right',
                            enforceMaxLength: true,
                            maxLength: 5,
                            width: 90
                        },
                        { xtype: 'tbspacer', width: 30 },
                        {
                            xtype: 'label',
                            text: 'Flag',
                            style: 'font-weight:bold;color:#000;',
                            width: 60
                        },
                        {
                            xtype: 'combobox',
                            id: prototype.id01+'-cmbA1691-FSTAPO',
                            store: Ext.create('Ext.Praxis.store.flown.SSIMDuplicated.ComboBoxFlag2'),
                            queryMode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            caseSensitive: true,
                            disabled: true,
                            valueField: 'code',
                            displayField: 'name',
                            value: '',
                            emptyText: '[select]',
                            width: 110
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle:{"background-color":"rgb(239, 233, 229)"},
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Physical Flight Manifest',
                            style: 'font-weight:bold;color:#000;text-decoration: underline;',
                            width: 145
                        },
                        { xtype: 'tbspacer', width: 30 },
                        {
                            xtype: 'label',
                            text: 'Received Date',
                            style: 'font-weight:bold;color:#000;',
                            width: 100,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'YYYYMMDD'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id01+'-txtA1691-FSENDFI',
                            enforceMaxLength: true,
                            maxLength: 8,
                            width: 90
                        },
                        { xtype: 'tbspacer', width: 30 },
                        {
                            xtype: 'label',
                            text: 'Qty Coupons',
                            style: 'font-weight:bold;color:#000;',
                            width: 100
                        },
                        {
                            xtype: 'textfield',
                            id:prototype.id01+'-txtA1691-QCPNFI',
                            fieldStyle: 'text-align:right',
                            enforceMaxLength: true,
                            maxLength: 5,
                            width: 90
                        },
                        { xtype: 'tbspacer', width: 30 },
                        {
                            xtype: 'label',
                            text: 'Flag',
                            style: 'font-weight:bold;color:#000;',
                            width: 60
                        },
                        {
                            xtype: 'combobox',
                            id: prototype.id01+'-cmbA1691-FSTAFI',
                            store: Ext.create('Ext.Praxis.store.flown.SSIMDuplicated.ComboBoxFlightMF'),
                            queryMode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            value: '',
                            emptyText: '[select]',
                            width: 110
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: prototype.id01+'-ControlData',
                    title: 'Control Data',
                    margin: '15 0 8 0',
                    border: true,
                    defaults:{
                        style: 'margin: 3px;',
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items:[
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Creator User',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id01+'-txt-USCR',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 70 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id01+'-txt-FECR',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 70 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id01+'-txt-HOCR',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items:[
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id01+'-txt-USUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 70 },
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id01+'-txt-FEUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 70 },
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id01+'-txt-HOUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
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
            layout:{
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults:{
                scale: 'medium'
            },
//            style: 'background-color: #E3EAF9; padding: 5px;',
            items:[
                {
                    text: 'Save',
                    id:prototype.id01+'-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners:{
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id:prototype.id01+'-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners:{
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id:prototype.id01+'-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners:{
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id:prototype.id01+'-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners:{
                        click: 'onCancelClick'
                    }
                },
                { xtype: 'tbspacer', width: 30 },
                {
                    xtype: 'label',
                    text: '(*) Required Fields',
                    style: 'font-weight:bold;color:red;',
                    width: 120
                },
                { xtype: 'tbspacer', width: 30 },
                {
                    xtype: 'button',
                    id:prototype.id01+'-btn-prev',
                    icon: 'resources/img/botones/prev.png',
                    tooltip: 'View Previous Flight Manifest',
                    border: false,
                    listeners:{
                        click: 'onPrevClick'
                    }
                },
                {
                    xtype: 'button',
                    id:prototype.id01+'-btn-next',
                    icon: 'resources/img/botones/next2.png',
                    tooltip: 'View Next Flight Manifest',
                    border: false,
                    listeners:{
                        click: 'onNextClick'
                    }
                }
            ]
        }
    ]

});