/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




Ext.define('Ext.Praxis.view.flown.MultilegTableForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.flown.MultilegTable.DataEntryMultilegTableController'
    ],
    title: 'MultiLeg Table - Data Entry',
    header: true,
    width: 1100,
    height: 550,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        aling: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.id + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'column',
                    width: 1100,
                    margin: '20 20 0 20',
                    border: false,
                    // bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'datefield',
                            format: 'Ymd',
                            id: prototype.id + '-flightDate',
                            readOnly: false,
                            //disabled: true,
                            required: true,
                            fieldLabel: '<strong style="color:#000;">Flight Date</strong><strong style="color:red;font-size:13px;">*</strong>',
                            labelWidth: 100,
                            labelAlign: 'left',
                            padding: '5px 5px 5px 5px',
                            enforceMaxLength: true,
                            maxLength: 8,
                            minLength: 8
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-flightNumber',
                            readOnly: false,
                            //disabled: true,
                            required: true,
                            fieldLabel: '<strong style="color:#000;">Flight Number</strong><strong style="color:red;font-size:13px;">*</strong>',
                            labelWidth: 100,
                            labelAlign: 'left',
                            padding: '5px 5px 5px 40px',
                            enforceMaxLength: true,
                            maxLength: 4,
                            minLength: 1,
                            listeners: {
                                focusleave: 'onFocusLeaveFlightNumber'
                            }


                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-legSeq',
                            readOnly: false,
                            //disabled: true,
                            required: true,
                            fieldLabel: '<strong style="color:#000;">Leg Seq</strong>',
                            labelWidth: 80,
                            labelAlign: 'left',
                            padding: '5px 5px 5px 40px',
                            enforceMaxLength: true,
                            maxLength: 2,
                            minLength: 1
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    layout: 'column',
                    title: '<strong style="color:#000;text-decoration: underline">Sale Information</strong>',
                    width: 1050,
                    margin: '5 20 5 20',
                    border: true,
                    //bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-origin',
                            required: true,
                            //readOnly:true,
                            disabled: false,
                            fieldLabel: '<strong style="color:#000;">Origin </strong><strong style="color:red;font-size:13px;">*</strong>',
                            labelWidth: 70,
                            labelAlign: 'left',
                            padding: '5px 20px 5px 25px',
                            enforceMaxLength: true,
                            maxLength: 3,
                            minLength: 3,
                            listeners: {
                                change: 'onUpperValue',
                                focusleave: 'onFocusLeaveAirport'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-destination',
                            required: true,
                            //readOnly:true,
                            disabled: false,
                            fieldLabel: '<strong style="color:#000;">Destination</strong><strong style="color:red;font-size:13px;">*</strong>',
                            labelWidth: 80,
                            labelAlign: 'left',
                            padding: '5px 5px 5px 40px',
                            enforceMaxLength: true,
                            maxLength: 3,
                            minLength: 3,
                            listeners: {
                                change: 'onUpperValue',
                                focusleave: 'onFocusLeaveAirport'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-mileage',
                            required: true,
                            //readOnly:true,
                            disabled: false,
                            fieldLabel: '<strong style="color:#000;">Mileage</strong>',
                            labelWidth: 70,
                            labelAlign: 'left',
                            padding: '5px 5px 5px 40px',
                            enforceMaxLength: true,
                            maxLength: 3,
                            maskRe: /[0-9]/,
                            listeners: {
                                change: 'onUpperValue'
                            }
                        }

                    ]
                }
                ,
                {
                    xtype: 'fieldset',
                    layout: 'vbox',
                    title: '<strong style="color:#000;text-decoration: underline">LEG Information</strong>',
                    width: 1050,
                    margin: '5 0 5 20',
                    padding: '0 0 10 5',
                    border: true,
                    //bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            width: 1050,
                            margin: '5 0 5 0',
                            border: false,
                            //bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    width: 515,
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            width: 515,
                                            margin: '1 0 1 0',
                                            border: false,
                                            bodyStyle: 'background: #E5ECEF',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    labelAlign: 'center',
                                                    padding: '1px 5px 0px 250px',
                                                    html: '<strong style="color:#000; text-decoration: underline; ">Leg 1</strong>'
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'column',
                                                    width: 515,
                                                    margin: '1 0 1 0',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg1Origin',
                                                            width: 105,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Origin</strong>',
                                                            labelWidth: 55,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 3,
                                                            minLength: 3,
                                                            maskRe: /[a-zA-Z]/,
                                                            listeners: {
                                                                change: 'onUpperValue',
                                                                focusleave: 'onFocusLeaveAirport'
                                                            }
                                                        }
                                                        ,
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg1Destination',
                                                            width: 130,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Destination</strong>',
                                                            labelWidth: 80,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 3,
                                                            minLength: 3,
                                                            maskRe: /[a-zA-Z]/,
                                                            listeners: {
                                                                change: 'onUpperValue',
                                                                focusleave: 'onFocusLeaveAirport'
                                                            }
                                                        }
                                                        ,
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg1Mileage',
                                                            width: 110,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Mileage</strong>',
                                                            labelWidth: 60,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 5,
                                                            minLength: 1,
                                                            maskRe: /[0-9]/
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg1Carrier',
                                                            width: 110,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Carrier</strong>',
                                                            labelWidth: 60,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 2,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            listeners: {
                                                                change: 'onUpperValue'
                                                            }
                                                        }
                                                    ]

                                                }
                                            ]

                                        }
                                    ]

                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    width: 515,
                                    margin: '1 0 1 5',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            width: 515,
                                            margin: '1 0 1 0',
                                            border: false,
                                            bodyStyle: 'background: #E5ECEF',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    labelAlign: 'center',
                                                    padding: '1px 5px 0px 250px',
                                                    html: '<strong style="color:#000; text-decoration: underline; ">Leg 2</strong>'
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'column',
                                                    width: 515,
                                                    margin: '1 0 1 0',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg2Origin',
                                                            width: 105,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Origin</strong>',
                                                            labelWidth: 55,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 3,
                                                            minLength: 3,
                                                            maskRe: /[a-zA-Z]/,
                                                            listeners: {
                                                                change: 'onUpperValue',
                                                                focusleave: 'onFocusLeaveAirport'
                                                            }
                                                        }
                                                        ,
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg2Destination',
                                                            width: 130,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Destination</strong>',
                                                            labelWidth: 80,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 3,
                                                            minLength: 3,
                                                            maskRe: /[a-zA-Z]/,
                                                            listeners: {
                                                                change: 'onUpperValue',
                                                                focusleave: 'onFocusLeaveAirport'
                                                            }
                                                        }
                                                        ,
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg2Mileage',
                                                            width: 110,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Mileage</strong>',
                                                            labelWidth: 60,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 5,
                                                            minLength: 1,
                                                            maskRe: /[0-9]/
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg2Carrier',
                                                            width: 110,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Carrier</strong>',
                                                            labelWidth: 60,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 2,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            listeners: {
                                                                change: 'onUpperValue'
                                                            }
                                                        }
                                                    ]

                                                }
                                            ]

                                        }
                                    ]

                                }



                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            width: 1050,
                            margin: '0 0  0',
                            border: false,
                            //bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    width: 515,
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            width: 515,
                                            margin: '1 0 1 0',
                                            border: false,
                                            bodyStyle: 'background: #E5ECEF',
                                            items: [
                                                {
                                                    xtype: 'label', labelAlign: 'center',
                                                    padding: '1px 5px 0px 250px', html: ' <strong style="color:#000; text-decoration: underline; ">Leg 3</strong>'},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'column',
                                                    width: 515,
                                                    margin: '1 0 1 0',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg3Origin',
                                                            width: 105,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Origin</strong>',
                                                            labelWidth: 55,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 3,
                                                            minLength: 3,
                                                            maskRe: /[a-zA-Z]/,
                                                            listeners: {
                                                                change: 'onUpperValue',
                                                                focusleave: 'onFocusLeaveAirport'
                                                            }
                                                        }
                                                        ,
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg3Destination',
                                                            width: 130,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Destination</strong>',
                                                            labelWidth: 80,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 3,
                                                            minLength: 3,
                                                            maskRe: /[a-zA-Z]/,
                                                            listeners: {
                                                                change: 'onUpperValue',
                                                                focusleave: 'onFocusLeaveAirport'
                                                            }
                                                        }
                                                        ,
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg3Mileage',
                                                            width: 110,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Mileage</strong>',
                                                            labelWidth: 60,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 5,
                                                            minLength: 1,
                                                            maskRe: /[0-9]/
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg3Carrier',
                                                            width: 110,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Carrier</strong>',
                                                            labelWidth: 60,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 2, maskRe: /[a-zA-Z0-9]/,
                                                            listeners: {
                                                                change: 'onUpperValue'
                                                            }
                                                        }
                                                    ]

                                                }
                                            ]

                                        }
                                    ]

                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    width: 515,
                                    margin: '1 0 1 5',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            width: 515,
                                            margin: '1 0 1 0',
                                            border: false,
                                            bodyStyle: 'background: #E5ECEF',
                                            items: [
                                                {
                                                    xtype: 'label', labelAlign: 'center',
                                                    padding: '1px 5px 0px 250px', html: ' <strong style="color:#000; text-decoration: underline; ">Leg 4</strong>'},
                                                {
                                                    xtype: 'panel',
                                                    layout: 'column',
                                                    width: 515,
                                                    margin: '1 0 1 0',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg4Origin',
                                                            width: 105,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Origin</strong>',
                                                            labelWidth: 55,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 3,
                                                            minLength: 3,
                                                            maskRe: /[a-zA-Z]/,
                                                            listeners: {
                                                                change: 'onUpperValue',
                                                                focusleave: 'onFocusLeaveAirport'
                                                            }
                                                        }
                                                        ,
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg4Destination',
                                                            width: 130,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Destination</strong>',
                                                            labelWidth: 80,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 3,
                                                            minLength: 3,
                                                            maskRe: /[a-zA-Z]/,
                                                            listeners: {
                                                                change: 'onUpperValue',
                                                                focusleave: 'onFocusLeaveAirport'
                                                            }
                                                        }
                                                        ,
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg4Mileage',
                                                            width: 110,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Mileage</strong>',
                                                            labelWidth: 60,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 5,
                                                            minLength: 1,
                                                            maskRe: /[0-9]/
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg4Carrier',
                                                            width: 110,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Carrier</strong>',
                                                            labelWidth: 60,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 2, maskRe: /[a-zA-Z0-9]/,
                                                            listeners: {
                                                                change: 'onUpperValue'
                                                            }
                                                        }
                                                    ]

                                                }
                                            ]

                                        }
                                    ]

                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            width: 1050,
                            margin: '0 0  0',
                            border: false,
                            //bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    width: 515,
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            width: 515,
                                            margin: '1 0 1 0',
                                            border: false,
                                            bodyStyle: 'background: #E5ECEF',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    labelAlign: 'center',
                                                    padding: '1px 5px 0px 250px',
                                                    html: '<strong style="color:#000; text-decoration: underline; ">Leg 5</strong>'
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'column',
                                                    width: 515,
                                                    margin: '1 0 1 0',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg5Origin',
                                                            width: 105,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Origin</strong>',
                                                            labelWidth: 55,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 3,
                                                            minLength: 3,
                                                            maskRe: /[a-zA-Z]/,
                                                            listeners: {
                                                                change: 'onUpperValue',
                                                                focusleave: 'onFocusLeaveAirport'
                                                            }
                                                        }
                                                        ,
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg5Destination',
                                                            width: 130,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Destination</strong>',
                                                            labelWidth: 80,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 3,
                                                            minLength: 3,
                                                            maskRe: /[a-zA-Z]/,
                                                            listeners: {
                                                                change: 'onUpperValue',
                                                                focusleave: 'onFocusLeaveAirport'
                                                            }
                                                        }
                                                        ,
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg5Mileage',
                                                            width: 110,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Mileage</strong>',
                                                            labelWidth: 60,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 5,
                                                            minLength: 1,
                                                            maskRe: /[0-9]/
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg5Carrier',
                                                            width: 110,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Carrier</strong>',
                                                            labelWidth: 60,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 2,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            listeners: {
                                                                change: 'onUpperValue'
                                                            }
                                                        }
                                                    ]

                                                }
                                            ]

                                        }
                                    ]

                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    width: 515,
                                    margin: '1 0 1 5',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            width: 515,
                                            margin: '1 0 1 0',
                                            border: false,
                                            bodyStyle: 'background: #E5ECEF',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    labelAlign: 'center',
                                                    padding: '1px 5px 0px 250px',
                                                    html: '<strong style="color:#000; text-decoration: underline; ">Leg 6</strong>'
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'column',
                                                    width: 515,
                                                    margin: '1 0 1 0',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg6Origin',
                                                            width: 105,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Origin</strong>',
                                                            labelWidth: 55,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 3,
                                                            minLength: 3,
                                                            maskRe: /[a-zA-Z]/,
                                                            listeners: {
                                                                change: 'onUpperValue',
                                                                focusleave: 'onFocusLeaveAirport'
                                                            }
                                                        }
                                                        ,
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg6Destination',
                                                            width: 130,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Destination</strong>',
                                                            labelWidth: 80,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 3,
                                                            minLength: 3,
                                                            maskRe: /[a-zA-Z]/,
                                                            listeners: {
                                                                change: 'onUpperValue',
                                                                focusleave: 'onFocusLeaveAirport'
                                                            }
                                                        }
                                                        ,
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg6Mileage',
                                                            width: 110,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Mileage</strong>',
                                                            labelWidth: 60,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 5,
                                                            minLength: 1,
                                                            maskRe: /[0-9]/
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg6Carrier',
                                                            width: 110,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Carrier</strong>',
                                                            labelWidth: 60,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 2,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            listeners: {
                                                                change: 'onUpperValue'
                                                            }
                                                        }
                                                    ]

                                                }
                                            ]

                                        }
                                    ]

                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            width: 1050,
                            margin: '0 0  0',
                            border: false,
                            //bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    width: 515,
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'vbox',
                                            width: 515,
                                            margin: '1 0 1 0',
                                            border: false,
                                            bodyStyle: 'background: #E5ECEF',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    labelAlign: 'center',
                                                    padding: '1px 5px 0px 250px',
                                                    html: '<strong style="color:#000; text-decoration: underline; ">Leg 7</strong>'
                                                },
                                                {
                                                    xtype: 'panel',
                                                    layout: 'column',
                                                    width: 515,
                                                    margin: '1 0 1 0',
                                                    border: false,
                                                    bodyStyle: 'background: #E5ECEF',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg7Origin',
                                                            width: 105,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Origin</strong>',
                                                            labelWidth: 55,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 3,
                                                            minLength: 3,
                                                            maskRe: /[a-zA-Z]/,
                                                            listeners: {
                                                                change: 'onUpperValue',
                                                                focusleave: 'onFocusLeaveAirport'
                                                            }
                                                        }
                                                        ,
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg7Destination',
                                                            width: 130,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Destination</strong>',
                                                            labelWidth: 80,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 3,
                                                            minLength: 3,
                                                            maskRe: /[a-zA-Z]/,
                                                            listeners: {
                                                                change: 'onUpperValue',
                                                                focusleave: 'onFocusLeaveAirport'
                                                            }
                                                        }
                                                        ,
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg7Mileage',
                                                            width: 110,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Mileage</strong>',
                                                            labelWidth: 60,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 5,
                                                            minLength: 1,
                                                            maskRe: /[0-9]/
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-leg7Carrier',
                                                            width: 110,
                                                            required: true,
                                                            //readOnly:true,
                                                            disabled: false,
                                                            fieldLabel: '<strong style="color:#000;">Carrier</strong>',
                                                            labelWidth: 60,
                                                            labelAlign: 'left',
                                                            padding: '5px 5px 1px 5px',
                                                            enforceMaxLength: true,
                                                            maxLength: 2,
                                                            maskRe: /[a-zA-Z0-9]/,
                                                            listeners: {
                                                                change: 'onUpperValue'
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












                    ]
                },
                {
                    xtype: 'fieldset',
                    id: prototype.id + '-ControlData',
                    title: 'Control Data',
                    width: 1100,
                    margin: '1 20 0 20',
                    defaults: {
                        border: false
                    },
                    border: true,
                    hidden: false,
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-USCR',
                                    fieldLabel: '<strong style="color:#000;">Creator User</strong>',
                                    labelWidth: 150,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 250
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-FECR',
                                    fieldLabel: '<strong style="color:#000;">Creation Date</strong>',
                                    labelWidth: 150,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 250
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-HOCR',
                                    fieldLabel: '<strong style="color:#000;">Creation Time</strong>',
                                    labelWidth: 150,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 250
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
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-USUP',
                                    fieldLabel: '<strong style="color:#000;">user Update</strong>',
                                    labelWidth: 150,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 250
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-FEUP',
                                    fieldLabel: '<strong style="color:#000;">Update Date</strong>',
                                    labelWidth: 150,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 250
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-HOUP',
                                    fieldLabel: '<strong style="color:#000;">Update Time</strong>',
                                    labelWidth: 150,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 250
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
            margin: '5 100 10 450',
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
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
                    hidden: true,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
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
                {
                    xtype: 'label',
                    html: '<strong style="color:red;">(*)Required Fields</strong>',
                    align: 'center',
                    margin: '0 0 0 8'

                }
            ]
        }
    ]
});