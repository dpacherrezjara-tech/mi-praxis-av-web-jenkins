/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.LinkOCRForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #transparent;',
    defaults: {
        bodyStyle: 'background: transparent;',
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
                border: true,
                width: 1250,
                align: 'center',
                bodyStyle: 'background: #E5ECEF'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-pnlImage',
                    layout: 'vbox',
                    margin: '1 0 1 0',
                    height: 400,
                    items: [
                        {
                            xtype: 'image',
                            id: prototype.id + '-imgImage',
                            margin: '20 230 20 230',
                            align: 'center',
                            src: 'resources/img/not_picture.png',
                            style: 'background:#FFFFFF;box-shadow: 0px 0px 2px 0px #777;margin: 1px;border-radius:2px',
                            width: 790,
                            height: 360
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '1 0 1 0',
                    height: 40,
                    defaults: {
                        padding: '8px 5px 5px 5px'
                    },
                    items: [
                        {
                            xtype: 'label',
                            labelAlign: 'left',
                            margin: '2 0 0 2',
                            html: '<strong style="color:#000;">Ticket Number</strong>',
                            width: 120
                        },
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            html: '<strong style="color:#AC4546;">(*)</strong>',
                            width: 30
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtTicket',
                            required: true,
                            disabled: false,
                            readOnly: false,
                            enableKeyEvents: true,
                            fieldLabel: '',
                            width: 110,
                            labelWidth: 0,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            //maxLength: 14,
                            maskRe: /[0-9]/
                        },
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            width: 30
                        },
                        {
                            xtype: 'label',
                            labelAlign: 'right',
                            margin: '2 0 0 2',
                            html: '<strong style="color:#000;">Document</strong>',
                            width: 80
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbType',
                            required: true,
                            disabled: false,
                            fieldLabel: '',
                            width: 100,
                            labelWidth: 0,
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnSave',
                            text: '<strong style="color:white;">Save<strong>',
                            tooltip: 'Save Ticket',
                            cls: 'x-btn-save',
                            overCls: 'x-btn-save-over',
                            width: 80,
                            height: 25,
                            margin: '8px 5px 5px 5px',
                            padding: '4 5 5 2',
                            listeners: {
                                // click: 'onQtyCouponsClick'
                            }

                        },
                        {
                            xtype: 'label',
                            margin: '5 0 0 2',
                            labelAlign: 'right',
                            html: '<strong style="color:#0B333C;">Coupon(1) + Company(3) + Form(4) + Serial Nbr(6)</strong>'
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-imgNext',
                            iconCls: 'prx-icon-pagination-next',
                            tooltip: 'Next',
                            border: false,
                            margin: '8px 5px 5px 5px',
                            padding: '4 5 5 2',
                            style: 'background: #E5ECEF'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '1 0 1 0',
                    height: 40,
                    defaults: {
                        padding: '8px 5px 5px 5px'
                    },
                    items: [
                        {
                            xtype: 'label',
                            labelAlign: 'left',
                            margin: '2 0 0 2',
                            html: '<strong style="color:#000;">Processing Date</strong>',
                            width: 120
                        },
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            html: '<strong style="color:#AC4546;">(*)</strong>',
                            width: 30
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtPRDA',
                            required: true,
                            disabled: false,
                            readOnly: true,
                            fieldLabel: '',
                            width: 110,
                            labelWidth: 0,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            maxLength: 8,
                            maskRe: /[0-9]/,
                            enableKeyEvents: true,
                            listeners: {
                                keyup: 'eventKeySave'
                            }
                        },
                        {
                            xtype: 'label',
                            labelAlign: 'left',
                            margin: '2 0 0 2',
                            html: '<strong style="color:#000;">Flight Date</strong>',
                            width: 80
                        },
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            html: '<strong style="color:#AC4546;">(*)</strong>',
                            width: 30
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtDFLIGHT',
                            required: true,
                            disabled: false,
                            readOnly: false,
                            fieldLabel: '',
                            width: 75,
                            labelWidth: 0,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            maxLength: 8,
                            maskRe: /[0-9]/,
                            enableKeyEvents: true,
                            listeners: {
                                keyup: 'eventKeySave'
                            }
                        },
                        {
                            xtype: 'label',
                            labelAlign: 'left',
                            margin: '2 0 0 2',
                            html: '<strong style="color:#000;">Flight Number</strong>',
                            width: 100
                        },
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            html: '<strong style="color:#AC4546;">(*)</strong>',
                            width: 30
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtNFLIGHT',
                            required: true,
                            disabled: false,
                            readOnly: false,
                            fieldLabel: '',
                            width: 75,
                            labelWidth: 0,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            maxLength: 4,
                            maskRe: /[0-9]/,
                            enableKeyEvents: true,
                            listeners: {
                                keyup: 'eventKeySave',
                                focusleave:'onFocusLeaveOpe'
                            }
                        },
                        {
                            xtype: 'label',
                            labelAlign: 'left',
                            margin: '2 0 0 2',
                            html: '<strong style="color:#000;">Departure</strong>',
                            width: 90
                        },
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            html: '<strong style="color:#AC4546;">(*)</strong>',
                            width: 30
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCDEPART',
                            required: true,
                            disabled: false,
                            readOnly: false,
                            fieldLabel: '',
                            width: 50,
                            labelWidth: 0,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            maxLength: 3,
                            maskRe: /[a-zA-Z]/,
                            enableKeyEvents: true,
                            listeners: {
                                keyup: 'eventKeySave'
                            }
                        },
                        {
                            xtype: 'label',
                            labelAlign: 'left',
                            margin: '2 0 0 2',
                            html: '<strong style="color:#000;">Arrival</strong>',
                            width: 70
                        },
                        {
                            xtype: 'label',
                            labelAlign: 'center',
                            html: '<strong style="color:#AC4546;">(*)</strong>',
                            width: 30
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCARRIVA',
                            required: true,
                            disabled: false,
                            readOnly: false,
                            fieldLabel: '',
                            width: 50,
                            labelWidth: 0,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            maxLength: 3,
                            maskRe: /[a-zA-Z]/,
                            enableKeyEvents: true,
                            listeners: {
                                keyup: 'eventKeySave'
                            }
                        },
                        {
                            xtype: 'label',
                            labelAlign: 'left',
                            margin: '2 0 0 2',
                            html: '<strong style="color:#000;">Paxs</strong>',
                            width: 40
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtQTYPAX',
                            required: true,
                            disabled: false,
                            readOnly: true,
                            fieldLabel: '',
                            width: 50,
                            labelWidth: 0,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            maxLength: 4,
                            maskRe: /[0-9]/,
                            enableKeyEvents: true,
                            listeners: {
                                keyup: 'eventKeySave'
                            }
                            //maskRe: /[a-zA-Z]/
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '1 0 1 0',
                    height: 40,
                    defaults: {
                        padding: '8px 5px 5px 5px'
                    },
                    items: [
                        {
                            xtype: 'label',
                            labelAlign: 'left',
                            margin: '2 0 0 2',
                            html: '<strong style="color:#000;">Fare Basis</strong>',
                            width: 100
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFBASE',
                            required: true,
                            disabled: false,
                            readOnly: false,
                            fieldLabel: '',
                            width: 160,
                            labelWidth: 0,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            maxLength: 15,
                            enableKeyEvents: true,
                            listeners: {
                                keyup: 'eventKeySave'
                            }
                            //maskRe: /[0-9]/
                        },
                        {
                            xtype: 'label',
                            labelAlign: 'left',
                            margin: '2 0 0 2',
                            html: '<strong style="color:#000;">RBD</strong>',
                            width: 110
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCLAS',
                            required: true,
                            disabled: false,
                            readOnly: false,
                            fieldLabel: '',
                            width: 80,
                            labelWidth: 0,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            maxLength: 1,
                            enableKeyEvents: true,
                            listeners: {
                                keyup: 'eventKeySave'
                            }
                            //maskRe: /[0-9]/
                        },
                        {
                            xtype: 'label',
                            labelAlign: 'left',
                            margin: '2 0 0 2',
                            html: '<strong style="color:#000;">Cabin</strong>',
                            width: 125
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCABI',
                            required: true,
                            disabled: false,
                            readOnly: false,
                            fieldLabel: '',
                            width: 80,
                            labelWidth: 0,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            maxLength: 1,
                            enableKeyEvents: true,
                            listeners: {
                                keyup: 'eventKeySave'
                            }
                            //maskRe: /[0-9]/
                        }, {
                            xtype: 'label',
                            id: prototype.id + '-txtCARRLabel',
                            labelAlign: 'left',
                            margin: '2 0 0 2',
                            html: '<strong style="color:#000;">Carrier</strong>',
                            width: 90
                        },
                        {
                            xtype: 'label',
                            id: prototype.id + '-txtCARRLabel2',
                            labelAlign: 'center',
                            html: '<strong style="color:#AC4546;">(*)</strong>',
                            width: 30
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCARR',
                            required: true,
                            disabled: false,
                            readOnly: true,
                            fieldLabel: '',
                            width: 50,
                            labelWidth: 0,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            maxLength: 2,
                            enableKeyEvents: true,
                            listeners: {
                                keyup: 'eventKeySave'
                            }
                            //maskRe: /[a-zA-Z]/
                        },
                        {
                            xtype: 'label',
                            labelAlign: 'right',
                            margin: '2 0 0 2',
                            html: '<strong style="color:#000;">Zulu Date</strong>',
                            width: 100
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFOPERZUL',
                            required: true,
                            disabled: false,
                            readOnly: false,
                            fieldLabel: '',
                            width: 80,
                            labelWidth: 0,
                            labelAlign: 'right',
                            enforceMaxLength: true,
                            maxLength: 8,
                            maskRe: /[0-9]/,
                            enableKeyEvents: true,
                            listeners: {
                                keyup: 'eventKeySave'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '1 0 1 0',
                    height: 40,
                    defaults: {
                        padding: '8px 5px 5px 5px'
                    },
                    items: [
                        {
                            xtype: 'label',
                            labelAlign: 'left',
                            margin: '2 0 0 2',
                            html: '<strong style="color:#000;">Reason SubCode</strong>',
                            width: 150
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtRECODE',
                            required: true,
                            disabled: false,
                            readOnly: true,
                            fieldLabel: '',
                            width: 110,
                            labelWidth: 0,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            maxLength: 3,
                            enableKeyEvents: true,
                            listeners: {
                                keyup: 'eventKeySave'
                            }
                            // maskRe: /[0-9]/
                        },
                        {
                            xtype: 'label',
                            labelAlign: 'left',
                            margin: '2 0 0 2',
                            html: '<strong style="color:#000;">REFIC Code</strong>',
                            width: 110
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtRFIC',
                            required: true,
                            disabled: false,
                            readOnly: true,
                            fieldLabel: '',
                            width: 75,
                            labelWidth: 0,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            maxLength: 1,
                            enableKeyEvents: true,
                            listeners: {
                                keyup: 'eventKeySave'
                            }
                            //maskRe: /[0-9]/
                        },
                        {
                            xtype: 'label',
                            labelAlign: 'left',
                            margin: '2 0 0 2',
                            html: '<strong style="color:#000;">Associate ticket</strong>',
                            width: 130
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtTKTASO',
                            required: true,
                            disabled: false,
                            readOnly: true,
                            fieldLabel: '',
                            width: 110,
                            labelWidth: 0,
                            labelAlign: 'left',
                            enforceMaxLength: true,
                            // maxLength: 14,
                            maskRe: /[0-9]/,
                            enableKeyEvents: true,
                            listeners: {
                                keyup: 'eventKeySave',
                                change: 'onValidarChange'
                            }
                        }
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
}
);

