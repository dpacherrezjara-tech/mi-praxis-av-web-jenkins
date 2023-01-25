/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.FptfBestPracticeForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.sales.FptfBestPractice.DataEntryFptfBestPracticeController'
    ],
    //title: 'Minimun Rule - Data Entry',
//    header: true,
    width: 700,
    height: 500,
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
                    xtype: 'fieldset',
                    layout: 'vbox',
                    title: '<strong style="color:#000;text-decoration: underline">Form for Passenger Traffic File </strong>',
//                    width: 400,
                    margin: '5 20 5 15',
                    border: true,
                    bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
//                            width: 400,
                            margin: '5 0 10 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A722AIRLIN',
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Airline </strong>',
                                            width: 150,
                                            labelWidth: 80,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '5px 30px 0px 5px'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A722FORMA',
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Form </strong>',
                                            width: 140,
                                            labelWidth: 70,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '5px 20px 0px 5px'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA722UFORMA',
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Use Form </strong>',
                                            width: 140,
                                            labelWidth: 70,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '5px 5px 0px 5px'
                                        }
                                        ,
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtds_A722UFORMA',
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 120,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '5px 20px 0px 5px'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA722FTEVTA',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Sale Source </strong>',
                                            width: 140,
                                            labelWidth: 80,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '1px 5px 5px 5px'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtds_A722FTEVTA',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 300,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '1px 5px 5px 5px',
                                        }


                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtstrFormatDate',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Date From</strong>',
                                            width: 150,
                                            labelWidth: 80,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '1px 30px 5px 5px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtstrFormatDate2',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Date To</strong>',
                                            width: 150,
                                            labelWidth: 80,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '1px 5px 5px 5px'

                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA722TFORM1',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Form 1</strong>',
                                            width: 150,
                                            labelWidth: 80,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '1px 30px 5px 5px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA722TFORM2',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Form2</strong>',
                                            width: 150,
                                            labelWidth: 80,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '1px 5px 5px 5px'

                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA722TFORM3',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Form 3 </strong>',
                                            width: 140,
                                            labelWidth: 80,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '1px 5px 5px 5px'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtds_A722TFORM3',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 300,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '1px 5px 5px 5px',
                                        }


                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA722VFORMA',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Sale Form Code</strong>',
                                            width: 240,
                                            labelWidth: 145,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '1px 50px 5px 5px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtstrA722VFORMA',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Sale Form Name</strong>',
                                            width: 300,
                                            labelWidth: 140,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '1px 5px 5px 5px'

                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA722METODO',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Check Mehod Code</strong>',
                                            width: 240,
                                            labelWidth: 145,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '1px 50px 5px 5px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtstrA722METODO',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Check Method Name</strong>',
                                            width: 300,
                                            labelWidth: 140,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '1px 5px 5px 5px'

                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA722INDSCN',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">SCN Indicators Code</strong>',
                                            width: 240,
                                            labelWidth: 145,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '1px 50px 5px 5px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtstrA722INDSCN',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">SCN Indicators  Name</strong>',
                                            width: 300,
                                            labelWidth: 140,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '1px 5px 5px 5px'

                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA722DIGSER',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Digital Serial</strong>',
                                            width: 150,
                                            labelWidth: 100,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '1px 30px 5px 5px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA722EMTCUP',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Coupon Issue </strong>',
                                            width: 140,
                                            labelWidth: 100,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '1px 5px 5px 5px'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtds_A722EMTCUP',
                                            required: true,
                                            //readOnly:true,
                                            disabled: false,
                                            fieldLabel: '',
                                            width: 250,
                                            labelWidth: 0,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '1px 5px 5px 5px',
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA722TOTCUP',
                                            required: true,
                                            disabled: false,
                                            fieldLabel: '<strong style="color:#000;">Total Coupon</strong>',
                                            width: 150,
                                            labelWidth: 100,
                                            labelAlign: 'center',
                                            fieldStyle: ' text-align:center ',
                                            padding: '1px 30px 5px 5px'
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
                    width: 660,
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
                                    labelWidth: 100,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-FECR',
                                    fieldLabel: '<strong style="color:#000;">Creation Date</strong>',
                                    labelWidth: 100,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-HOCR',
                                    fieldLabel: '<strong style="color:#000;">Creation Time</strong>',
                                    labelWidth: 100,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 200
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
                                    labelWidth: 100,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-FEUP',
                                    fieldLabel: '<strong style="color:#000;">Update Date</strong>',
                                    labelWidth: 100,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-HOUP',
                                    fieldLabel: '<strong style="color:#000;">Update Time</strong>',
                                    labelWidth: 100,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 200
                                }
                            ]
                        }
                    ]
                }
///

            ]
        }



    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '5 100 5 200',
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
//                {
//                    text: 'Save',
//                    id: prototype.id + '-btn-save',
//                    iconCls: 'prx-icon-save',
//                    hidden: true,
//                    listeners: {
//                        click: 'onSaveClick'
//                    }
//                },
//                {
//                    text: 'Update',
//                    id: prototype.id + '-btn-update',
//                    iconCls: 'prx-icon-update',
//                    //hidden: true,
//                    listeners: {
//                        click: 'onUpdateClick'
//                    }
//                },
//                {
//                    text: 'Delete',
//                    id: prototype.id + '-btn-delete',
//                    iconCls: 'prx-icon-delete',
//                    //hidden: true,
//                    listeners: {
//                        click: 'onDeleteClick'
//                    }
//                },
//                {
//                    text: 'Cancel',
//                    id: prototype.id + '-btn-cancel',
//                    iconCls: 'prx-icon-cancel',
//                    listeners: {
//                        click: 'onCancelClick'
//                    }
//                }
            ]
        }
    ]
});