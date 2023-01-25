Ext.define('Ext.Praxis.view.payments.SalesReconciliAmexForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'panel',
            border: false,
            bodyStyle: 'background: transparent',
            height: 'auto',
            margin: '0 0 0 0 ',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            items: [
                {
                    xtype: 'form',
                    padding: '2px 5px 1px 5px',
                    border: false,
                    bodyStyle: 'background: transparent',
                    margin: '0 0 0 40px',
                    layout: 'column',
                    defaults: {
//                labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '5px 1px 5px 1px',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Search By:</strong>',
                            align: 'left',
                            fieldStyle: 'text-align: left;',
                            padding: '8px 20px 0px 5px',
                            hidden: false
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateSel',
                            triggerAction: 'all',
                            enableKeyEvents: true,
                            readOnly: false,
                            editable: true,
                            valueField: 'code',
                            displayField: 'name',
                            fieldStyle: 'text-align: left;',
                            width: 100,
                            hidden: false
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromYear',
                            fieldLabel: 'From',
                            labelAlign: 'right',
                            queryMode: 'local',
                            editable: false,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            hidden: false,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 60,
                            width: 140,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromMonth',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            hidden: false,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            width: 70,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromDay',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            hidden: false,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            width: 70,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToYear',
                            fieldLabel: 'To',
                            labelAlign: 'right',
                            queryMode: 'local',
                            editable: false,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            hidden: false,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 60,
                            width: 150,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToMonth',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            hidden: false,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            width: 70,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToDay',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            hidden: false,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            width: 70,
                            anchor: '100%'
                        },
                        {xtype: 'tbspacer', width: 30},
                        {
                            xtype: 'radiogroup',
                            id: prototype.id + '-radiogroupType',
                            width: 810,
                            items: [
                                {boxLabel: '<b style="color:#148D28;">Summary</b>', inputValue: 'SU', name: 'rbgType'},
                                {boxLabel: '<b style="color:#148D28;">Settlement</b>', inputValue: 'SE', name: 'rbgType'},
                                {boxLabel: '<b style="color:#148D28;">Adjustment Queue</b>', inputValue: 'AD', name: 'rbgType'},
                                {boxLabel: '<b style="color:#148D28;">Transact. Queue Error</b>', inputValue: 'ER', name: 'rbgType', checked: true},
                                {boxLabel: '<b style="color:#148D28;">Change Payment</b>', inputValue: 'CP', name: 'rbgType'},
                            ],
                            listeners: {
                                change: 'rbChangeType'
                            }
                        }
//                    xtype: 'textfield',
//                    fieldLabel: 'Merchant Number:',
//                    id: prototype.id + '-txtMerchant',
//                    allowBlank: true,
//                    maskRe: /[0-9]/,
//                    enforceMaxLength: true,
//                    maxLength: 20,
//                    labelWidth: 150,
//                    width: 300,
//                    enableKeyEvents: true,
//                    listeners: {
//                        keypress: 'eventKey'
//                    }
//                },                
                    ]
                },
                {
                    xtype: 'form',
                    padding: '2px 5px 1px 5px',
                    id: prototype.id + '-frmFilterSummary',
                    border: false,
                    bodyStyle: 'background: transparent',
                    margin: '0 0 0 40px',
                    hidden: true,
                    layout: 'column',
                    defaults: {
//                labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '5px 1px 5px 1px',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        /*{
                            xtype: 'combo',
                            fieldLabel: 'Reconcil. Summ.',
                            id: prototype.id + '-cmbErrorCodesRecSumm',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'CODE',
                            displayField: 'NAME',
                            emptyText: 'All',
                            //maxLength: 3,
                            labelWidth: 150,
                            width: 300,
                            hiddenLabel: false,
                            value: '',
                            listeners: {
                                //change: 'rbChangeType'
                            }
                        },*/
                        {
                            xtype: 'button',
                            margin: '0 0 0 25',
                            //id: prototype.id + '-btnShowAuditTW',
                            text: 'Integrity Errors',
                            width: 120,
                            listeners: {
                                click: 'onGridDiffTransaction'
                            }

                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Document:',
                            id: prototype.id + '-cmbSummTDOC',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            //maxLength: 3,
                            labelWidth: 80,
                            width: 150,
                            hiddenLabel: false,
                            value: '',
                            listeners: {
                                change: 'onGridDiffTransaction'
                            }
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Zone:',
                            id: prototype.id + '-cmbZONASumm',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'CODE',
                            displayField: 'NAME',
                            readOnly: false,
                            editable: true,
                            emptyText: 'All',
                            //maxLength: 3,
                            labelWidth: 60,
                            width: 120,
                            hiddenLabel: false,
                            value: '',
                            listeners: {                                
                                change: 'obtenerPaisesSumm'
                            }
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Country:',
                            id: prototype.id + '-cmbSCOUNTRYSumm',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'CODE',
                            displayField: 'NAME',
                            readOnly: false,
                            editable: true,
                            emptyText: 'All',
                            //maxLength: 3,
                            labelWidth: 80,
                            width: 140,
                            hiddenLabel: false,
                            value: '',
                            listeners: {
                                //change: 'rbChangeType'
                            }
                        }
                    ]
                },
                {
                    xtype: 'form',
                    padding: '2px 5px 1px 5px',
                    id: prototype.id + '-frmFilterSettlement',
                    border: false,
                    bodyStyle: 'background: transparent',
                    margin: '0 0 0 40px',
                    hidden: true,
                    layout: 'column',
                    defaults: {
//                labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '5px 1px 5px 1px',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        {
                            xtype: 'combo',
                            fieldLabel: 'Rec. Type',
                            id: prototype.id + '-cmbRecType',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            //maxLength: 3,
                            labelWidth: 70,
                            width: 150,
                            hiddenLabel: false,
                            listeners: {
                                change: 'rbChangeType'
                            }
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Reconcil. Sett.',
                            id: prototype.id + '-cmbErrorCodesRecSett',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'CODE',
                            displayField: 'NAME',
                            emptyText: 'All',
                            //maxLength: 3,
                            labelWidth: 100,
                            width: 350,
                            hiddenLabel: false,
                            value: '',
                            listeners: {
                                change: 'rbChangeType'
                            }
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Status Sett vs Sales ',
                            id: prototype.id + '-cmbSTVAL',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            //maxLength: 3,
                            labelWidth: 150,
                            width: 300,
                            hiddenLabel: false,
                            value: '',
                            listeners: {
                                //  change: 'cmbSTVAL_keyDownHandler',
                                change: 'rbChangeType'
                            }
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'label',
                            text: 'PNR:',
                            padding: '8px 1px 2px 1px',
                            width: 40,
//                            autoEl: {
//                                tag: 'label',
//                                'data-qtip': 'Authorization Number'
//                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtPNR',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9a-zA-Z]/,
                            maxLength: 6,
                            width: 80,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'filterPNRSettlement'
                            }
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'label',
                            text: 'Credit Card:',
                            padding: '8px 1px 2px 1px',
                            width: 70
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCC11',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 6,
                            width: 80,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'filterPNRSettlement'
                            }
                        },
                        {
                            xtype: 'label',
                            text: '******',
                            padding: '8px 1px 2px 1px',
                            width: 40
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCC22',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 4,
                            width: 60,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'filterPNRSettlement'
                            }
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'label',
                            text: 'Auth:',
                            padding: '8px 1px 2px 1px',
                            width: 40,
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtAuthS',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 6,
                            width: 60,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'filterPNRSettlement'
                            }
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Document:',
                            id: prototype.id + '-cmbTDOC',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            readOnly: false,
                            editable: true,
                            emptyText: 'All',
                            //maxLength: 3,
                            labelWidth: 80,
                            width: 160,
                            hiddenLabel: false,
                            value: '',
                            listeners: {
                                // change: 'cmbSTVAL_keyDownHandler',
                                change: 'rbChangeType'
                            }
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Zone:',
                            id: prototype.id + '-cmbZONAsett',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'CODE',
                            displayField: 'NAME',
                            readOnly: false,
                            editable: true,
                            emptyText: 'All',
                            //maxLength: 3,
                            labelWidth: 60,
                            width: 120,
                            hiddenLabel: false,
                            value: '',
                            listeners: {                                
                                change: 'obtenerPaisesSett'
                            }
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Country:',
                            id: prototype.id + '-cmbSCOUNTRYSett',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'CODE',
                            displayField: 'NAME',
                            readOnly: false,
                            editable: true,
                            emptyText: 'All',
                            //maxLength: 3,
                            labelWidth: 80,
                            width: 140,
                            hiddenLabel: false,
                            value: '',
                            listeners: {
                                //change: 'rbChangeType'
                            }
                        }
                    ]
                },
                {
                    xtype: 'form',
                    padding: '2px 5px 1px 5px',
                    id: prototype.id + '-frmQueueError',
                    border: false,
                    bodyStyle: 'background: transparent',
                    margin: '0 0 0 40px',
                    hidden: true,
                    layout: 'column',
                    defaults: {
//                labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '5px 1px 5px 1px',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'checkboxfield',
                            hidden: true,
                            id: prototype.id + '-chkWarnings',
                            width: 50,
                            boxLabel: 'Warnings',
                            inputValue: '0',
                            checked: false,
                            listeners: {
                                change: 'chkWarning_Click'
                            }
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbErrorCode',
                            fieldLabel: 'Error Code',
                            triggerAction: 'all',
                            enableKeyEvents: true,
                            readOnly: false,
                            editable: true,
                            valueField: 'CODE',
                            displayField: 'NAME',
                            fieldStyle: 'text-align: left;',
                            labelWidth: 100,
                            width: 350,
                            hidden: false,
                            listeners: {
                                change: 'btnSearch_click'
                            }
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbComplement',
                            fieldLabel: 'Complements',
                            triggerAction: 'all',
                            enableKeyEvents: true,
                            readOnly: false,
                            editable: true,
                            valueField: 'code',
                            displayField: 'name',
                            fieldStyle: 'text-align: left;',
                            labelWidth: 100,
                            width: 250,
                            hidden: false,
                            listeners: {
                                change: 'btnSearch_click'
                            }
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'label',
                            text: 'PNR:',
                            padding: '8px 1px 2px 1px',
                            width: 50
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtPNRError',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9a-zA-Z]/,
                            maxLength: 6,
                            width: 100,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'txtPNR_keyDownHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'label',
                            text: 'Credit Card:',
                            padding: '8px 1px 2px 1px',
                            width: 70
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCC1',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 6,
                            width: 80,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'txtPNR_keyDownHandler'
                            }
                        },
                        {
                            xtype: 'label',
                            text: '******',
                            padding: '8px 1px 2px 1px',
                            width: 40
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCC2',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 4,
                            width: 60,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'txtPNR_keyDownHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'label',
                            text: 'Auth:',
                            padding: '8px 1px 2px 1px',
                            width: 50,
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtAuthE',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 6,
                            width: 100,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'txtPNR_keyDownHandler'
                            }
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Document:',
                            id: prototype.id + '-cmbTDOCError',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            readOnly: false,
                            editable: true,
                            emptyText: 'All',
                            //maxLength: 3,
                            labelWidth: 100,
                            width: 200,
                            hiddenLabel: false,
                            value: '',
                            listeners: {
                                // change: 'cmbSTVAL_keyDownHandler',
                                change: 'btnSearch_click'
                            }
                        },
                        {
                            xtype: 'checkboxfield',
                            hidden: false,
                            id: prototype.id + '-chkVoid',
                            width: 50,
                            boxLabel: 'Void',
                            inputValue: '0',
                            padding: '5px 0px 0px 20px',
                            checked: false,
                            listeners: {
                                change: 'chkVoid_Click'
                            }
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Zone:',
                            id: prototype.id + '-cmbZONAErr',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'CODE',
                            displayField: 'NAME',
                            readOnly: false,
                            editable: true,
                            emptyText: 'All',
                            //maxLength: 3,
                            labelWidth: 60,
                            width: 120,
                            hiddenLabel: false,
                            value: '',
                            listeners: {                                
                                change: 'obtenerPaisesErr'
                            }
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Country:',
                            id: prototype.id + '-cmbSCOUNTRYErr',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'CODE',
                            displayField: 'NAME',
                            readOnly: false,
                            editable: true,
                            emptyText: 'All',
                            //maxLength: 3,
                            labelWidth: 80,
                            width: 140,
                            hiddenLabel: false,
                            value: '',
                            listeners: {
                                //change: 'rbChangeType'
                            }
                        }
                    ]
                },
                {
                    xtype: 'form',
                    padding: '2px 5px 1px 5px',
                    id: prototype.id + '-filterPaymentMSI',
                    border: false,
                    bodyStyle: 'background: transparent',
                    margin: '0 0 0 40px',
                    hidden: true,
                    layout: 'column',
                    defaults: {
//                labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '5px 1px 5px 1px',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        {xtype: 'tbspacer', width: 100},
                        {
                            xtype: 'combo',
                            fieldLabel: 'Status',
                            id: prototype.id + '-cmbSTVALCP',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            //maxLength: 3,
                            labelWidth: 150,
                            width: 250,
                            hiddenLabel: false,
                            value: '',
                            listeners: {
                                //  change: 'cmbSTVAL_keyDownHandler',
                                change: 'rbChangeType'
                            }
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Document:',
                            id: prototype.id + '-cmbTDOCCP',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            readOnly: false,
                            editable: true,
                            emptyText: 'All',
                            //maxLength: 3,
                            labelWidth: 100,
                            width: 200,
                            hiddenLabel: false,
                            value: '',
                            listeners: {
                                // change: 'cmbSTVAL_keyDownHandler',
                                change: 'rbChangeType'
                            }
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
                            text: 'Credit Card:',
                            padding: '8px 1px 2px 1px',
                            width: 70
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCC1_CP',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 6,
                            width: 80,
                            enableKeyEvents: true,
                            
                        },
                        {
                            xtype: 'label',
                            text: '******',
                            padding: '8px 1px 2px 1px',
                            width: 40
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCC2_CP',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 4,
                            width: 60,
                            enableKeyEvents: true,
                            
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'label',
                            text: 'Auth:',
                            padding: '8px 1px 2px 1px',
                            width: 50,
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtAuth_CP',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 6,
                            width: 100,
                            enableKeyEvents: true,
                            
                        },
                    ]
                }
            ]
        }
    ]
});
