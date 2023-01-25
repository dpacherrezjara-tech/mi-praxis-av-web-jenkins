Ext.define('Ext.Praxis.view.payments.SalesAdjustmentForm.Filters', {
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
                        fieldStyle: 'text-align: center;',
                        padding: '5px 1px 5px 1px',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'center',
                        hidden: false
                    },
                    items: [
                        
                        {xtype: 'tbspacer', width: 250},
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
                        {xtype: 'tbspacer', width: 20},
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
                            width: 300,
                            hidden: true,
                            listeners: {
                                change: 'btnSearch_click'
                            }
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
                            text: 'PNR:',
                            padding: '8px 1px 2px 1px',
                            width: 50
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtPNR',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[a-zA-Z]/,
                            maxLength: 6,
                            width: 100,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'txtPNR_keyDownHandler'
                            }
                        },
                    ]
                },
                {
                    xtype: 'form',
                    padding: '2px 5px 1px 5px',
                    id: prototype.id + '-frmQueueError',
                    border: false,
                    bodyStyle: 'background: transparent',
                    margin: '0 0 0 40px',
                    hidden: false,
                    layout: 'column',
                    defaults: {
                        fieldStyle: 'text-align: center;',
                        padding: '5px 1px 5px 1px',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        {xtype: 'tbspacer', width: 20},
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
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'label',
                            text: 'Auth:',
                            padding: '8px 1px 2px 1px',
                            width: 50,
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtAuth',
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
                            id: prototype.id + '-cmbTDOC',
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
                            hidden: true,
                            value: '',
                            listeners: {
                                change: 'btnSearch_click'
                            }
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Refund Bank:',
                            id: prototype.id + '-cmbSTRFND',
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
                                change: 'btnSearch_click'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
