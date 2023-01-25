/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var panelWidth = 900;
Ext.define('Ext.Praxis.view.salesaudit.ITBulkForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.salesaudit.ITBulk.DataEntryITBulkController'
    ],
    title: "IT Fare Detail",
    header: true,
    width: 940,
    height: 800,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
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
                    layout: 'vbox',
                    width: 940,
                    margin: '5 20 5 2',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            margin: '5 0 1 0',
                            border: false,
                            // bodyStyle: 'background: #E3EAF9',
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="Panel 01">
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAF9;',
                                    padding: '1',
                                    margin: '1',
                                    //width: 100,    
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            padding: '1',
                                            margin: '3 0 0 5',
                                            border: true,
                                            width: panelWidth,
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'ID/IT',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-lblid',
                                                    fieldLabel: '',
                                                    width: 120,
                                                    labelWidth: 0,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 20
                                                },
                                                {xtype: 'tbspacer', width: 70},
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    margin: '0 0 0 5',
                                                    text: 'Seq',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-lblseq',
                                                    fieldLabel: '',
                                                    readOnly: true,
                                                    width: 120,
                                                    labelWidth: 0,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true
                                                            //maxLength: 20
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            padding: '1',
                                            margin: '3 0 0 5',
                                            border: true,
                                            width: panelWidth,
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'Family',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-de-lblfam',
                                                    fieldLabel: '',
                                                    width: 120,
                                                    labelWidth: 0,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true
                                                            //maxLength: 20
                                                },
                                                {xtype: 'tbspacer', width: 70},
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    margin: '0 0 0 5',
                                                    text: 'Type',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-de-cmbType',
                                                    editable: false,
                                                    fieldLabel: '',
                                                    width: 120,
                                                    labelWidth: 0,
                                                    labelAlign: 'right',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    valueField: 'code',
                                                    displayField: 'name'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            padding: '1',
                                            margin: '3 0 0 5',
                                            layout: {
                                                type: 'hbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size:13px;',
                                                    text: 'Sub-Family',
                                                    width: 110
                                                },
                                                {
                                                    xtype: 'combo',
                                                    id: prototype.id + '-de-cmbIT',
                                                    editable: false,
                                                    fieldLabel: '',
                                                    width: 120,
                                                    labelWidth: 0,
                                                    labelAlign: 'right',
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    valueField: 'code',
                                                    displayField: 'name'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                // </editor-fold>
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAF9;',
                                    padding: '1',
                                    margin: '5 1 1 1',
                                    // width: panelWidth,
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'tabpanel',
                                            id: prototype.id + '-tabMain',
                                            width: panelWidth,
                                            height: 600,
                                            anchor: '100%',
                                            margin: '1 1 1 1',
                                            autoScroll: true,
                                            bodyStyle: 'background: transparent',
                                            listeners: {
                                                tabchange: 'onChangeTab'
                                            },
                                            items: [
                                                // <editor-fold defaultstate="collapsed" desc="tabAccCode">

                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background: white',
                                                    id: prototype.id + '-tabAccCode',
                                                    title: 'Account Code',
                                                    layout: 'vbox',
                                                    defaults: {
                                                        xtype: 'panel',
                                                        bodyStyle: 'background-color: #E3EAF9;',
                                                        padding: '2',
                                                        margin: '2 0 2 0',
                                                        width: panelWidth,
                                                        layout: 'hbox'
                                                    },
                                                    items: [
                                                        {
                                                            items: [
                                                                {
                                                                    xtype: 'label', text: 'ID/IT', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'
                                                                },
                                                                {
                                                                    xtype: 'textfield', id: prototype.id + '-de-lbltcode', maxLength: 50,
                                                                    width: 120, labelWidth: 0, fieldLabel: '',
                                                                    enableKeyEvents: true, enforceMaxLength: true
                                                                },
                                                                {xtype: 'tbspacer', width: 70},
                                                                {
                                                                    xtype: 'label', text: 'Channel', width: 120, style: 'font-size:13px;', margin: '0 0 0 5'
                                                                },
                                                                {
                                                                    xtype: 'textfield', id: prototype.id + '-de-lblchanl', fieldLabel: '',
                                                                    width: 120, labelWidth: 0,
                                                                    enableKeyEvents: true, enforceMaxLength: true

                                                                }
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Effective From', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbleffrom', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 70},
                                                                {xtype: 'label', text: 'Sub Channel', width: 120, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblsubchn', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Effective Until', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblefuntil', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 70},
                                                                {xtype: 'label', text: 'Booking date From: ', width: 120, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblbookdafr', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Sale Country', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblscountry', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 70},
                                                                {xtype: 'label', text: 'Booking date To: ', width: 120, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblbookdto', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Comment: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textareafield', id: prototype.id + '-de-lblcomme', height: 40, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true, grow: true, },
                                                                {xtype: 'tbspacer', width: 70},
                                                                {xtype: 'label', text: 'Sale Date From:  ', width: 120, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblsaledfrom', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'OW RT', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbltow', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 70},
                                                                {xtype: 'label', text: 'Sale Date To: ', width: 120, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblsaledto', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Source Indicator', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblsrcindi', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 70},
                                                                {xtype: 'label', text: 'Date Flight From ', width: 120, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbldflighf', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Source', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblsource', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 70},
                                                                {xtype: 'label', text: 'Date Flight To ', width: 120, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbldflightt', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Destination indicator', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbldstindi', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 70},
                                                                {xtype: 'label', text: 'Carrier ', width: 120, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblcarrier', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Destination', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbldstino', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 70},
                                                                {xtype: 'label', text: 'Applicable Flights: ', width: 120, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblapplicble', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Booking Class o RBD: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblbookingclass', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 70},
                                                                {xtype: 'label', text: 'GDS:  ', width: 120, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblgds', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'BIN: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblbin', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 70},
                                                                {xtype: 'label', text: 'Passenger Type:', width: 120, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblpssgrtype', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Blackout From: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblblckfrom', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 70},
                                                                {xtype: 'label', text: 'Blackout To:', width: 120, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblblckto', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Q:  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblq', maxLength: 5, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 70},
                                                                {xtype: 'label', text: 'without Q: ', width: 120, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblsinq', fieldLabel: '', maxLength: 8, width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Account Code: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblacco', maxLength: 5, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        }
                                                    ]
                                                }

                                                // </editor-fold>
                                                ,
                                                // <editor-fold defaultstate="collapsed" desc="tabIT">

                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background: white',
                                                    id: prototype.id + '-tabIT',
                                                    title: 'IT',
                                                    layout: 'vbox',
                                                    defaults: {
                                                        xtype: 'panel',
                                                        bodyStyle: 'background-color: #E3EAF9;',
                                                        padding: '2',
                                                        margin: '2 0 2 0',
                                                        width: panelWidth,
                                                        layout: 'hbox'
                                                    },
                                                    items: [
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Tour Code: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbltcodeIT', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Booking Class o RBD: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblRBD', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Stopover: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblstpv', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Effective From: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbleffromit', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Currency: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblcurrency', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Applicable classes: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblapp', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Effective Until:  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblefuntilit', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Fare: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblfare', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Blackout From: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblblckfromit', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Sale Country:   ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblscountryit', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Sale Date From: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblsalefrom', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Blackout To:', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblbkto', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Agency: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblagency', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Sale Date To: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblsaleto', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Pax Type: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblpxtype', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Application date:  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblappdate', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Date Flight From:  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbldateflfr', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Country Exception ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblcntryex', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Apply Commision: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblappcom', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Date Flight to:  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbldateflightto', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: '%Discount:  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblperdisc', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: '%Commision:  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblpercom', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Travel Type:  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbltraveltype', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'NºPax: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblnpax', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Approbed by:   ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblapprobe', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Carrier: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblcarrierit', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Max Stay: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblmaxstay', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Aproving Area:  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblaprovingar', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Applicable Flights: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblappfligh', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'IT2: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblit2', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Comments:  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textareafield', id: prototype.id + '-de-lblcommeitw', height: 40, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true, grow: true, },
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'GDS: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblgdsit', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Cancellation:  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblcance', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'OW RT:  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblow', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Issue IATA: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblissue', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Changes and Charges:  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblCHGCAR', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Origin Indicator:  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbloriginind', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'PNR:', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblpnr', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Currency Change:  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblcurrencychan', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Origin: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblorigin', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Taxes/Fees/Charges:', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbltaxes', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'CDeparture Time: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbldeparturetime', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Destination Indicator: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbldestindica', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Equivalent Fare: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblequival', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Arrival Time: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblarrivaltime', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Destination: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbldestin', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Currency Fare Eq.:  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblcurren', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Min Stay: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblminstay', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Original Route:  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbloriginalrou', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Season: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblseason', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Curr Taxes/Fees/Charges:', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblcurtaxes', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        }
                                                    ]
                                                },
                                                // </editor-fold> 

                                                // <editor-fold defaultstate="collapsed" desc="tabITBulk">
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background: white',
                                                    id: prototype.id + '-tabITBulk',
                                                    title: 'Waiber and Favor',
                                                    layout: 'vbox',
                                                    defaults: {
                                                        xtype: 'panel',
                                                        bodyStyle: 'background-color: #E3EAF9;',
                                                        padding: '2',
                                                        margin: '2 0 2 0',
                                                        width: panelWidth,
                                                        layout: 'hbox'
                                                    },
                                                    items: [
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Tour Code: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbltcodeITw', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Booking Class o RBD: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblRBDw', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true},
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Effective From: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbleffromitw', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Fare: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblfarew', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true},
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Effective Until:  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblefuntilitw', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Sale From: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblsalefromw', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true},
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Sale Country:   ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblscountryitw', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Issue IATA:  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblissuew', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Agency: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblagencyw', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Ticket ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbltickow', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Application date:  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblappdatew', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Fare Basis  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblfbasw', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true},
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Approbed by:   ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblapprobew', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Variable Commission: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblvariablecow', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true},
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Aproving Area:  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblaprovingarw', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Code ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblcodew', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true},
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Comments:  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textareafield', id: prototype.id + '-de-lblcommeit', height: 40, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true, grow: true, },
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Discount UpFront :  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbldiscupw', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true},
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'OW RT:  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbloww', height: 40, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true},
                                                                {xtype: 'tbspacer', width: 50},
                                                                {xtype: 'label', text: 'Applicant    :  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lblsolic', fieldLabel: '', width: 120, labelWidth: 0, enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Origin Indicator:  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbloriginindw', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Origin: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbloriginw', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Destination Indicator: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbldestindicaw', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Destination: ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbldestinw', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        },
                                                        {
                                                            items: [
                                                                {xtype: 'label', text: 'Original Route:  ', width: 130, style: 'font-size:13px;', margin: '0 0 0 5'},
                                                                {xtype: 'textfield', id: prototype.id + '-de-lbloriginalrouw', maxLength: 100, width: 120, labelWidth: 0, fieldLabel: '', enableKeyEvents: true, enforceMaxLength: true}
                                                            ]
                                                        }

                                                    ]
                                                },
                                                // </editor-fold> 



                                                // <editor-fold defaultstate="collapsed" desc="tabReference">
                                                {
                                                    xtype: 'panel',
                                                    bodyStyle: 'background: #E3EAEF',
                                                    id: prototype.id + '-tabReference',
                                                    title: 'Reference',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'center'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'grid',
                                                            padding: '20 0 0 0',
                                                            id: prototype.id + '-gridData02',
                                                            bodyStyle: 'background-color: #E3EAEF;',
                                                            height: 450,
                                                            width: 502,
                                                            columnLines: true,
                                                            resizable: false,
                                                            columns: {
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    resizable: false,
                                                                    align: 'center'
                                                                },
                                                                items: [
                                                                    {text: 'Alter Code', width: 500, dataIndex: 'A2681Reference'}
                                                                ]
                                                            }
                                                        }

                                                    ]
                                                }
                                                // </editor-fold> 
                                            ]
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
            margin: '5 100 10 10',
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Save',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    //hidden: true,
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    //hidden: true,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    //hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});