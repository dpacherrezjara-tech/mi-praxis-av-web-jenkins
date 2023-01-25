/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.FareBasisForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.sales.FareBasis.DataEntryFareBasisController'
    ],
    title: 'Fare Basis Complete Information ',
    header: true,
    width: 550,
    height: 400,
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
                    width: 550,
                    margin: '5 20 5 2',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            margin: '5 0 10 0',
                            border: false,
                            // bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA721AIRLIN',
                                            fieldLabel: '<strong style="color:#000;">Airline </strong>',
                                            width: 100,
                                            fieldStyle: 'text-align: center;',
                                            labelWidth: 60,
                                            labelAlign: 'left',
                                            padding: '2px 5px 2px 3px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA721AIRLN2',
                                            fieldLabel: '<strong style="color:#000;">Airline Literal </strong>',
                                            labelAlign: 'left',
                                            width: 140,
                                            fieldStyle: 'text-align: center;',
                                            align: 'center',
                                            labelWidth: 90,
                                            padding: '2px 5px 2px 3px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA721FBASIS',
                                            fieldLabel: '<strong style="color:#000;">Farebasis </strong>',
                                            labelAlign: 'left',
                                            width: 160,
                                            fieldStyle: 'text-align: center;',
                                            align: 'center',
                                            labelWidth: 90,
                                            padding: '2px 5px 2px 3px'

                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA721CODIGO',
                                            fieldLabel: '<strong style="color:#000;">Code FB </strong>',
                                            width: 100,
                                            fieldStyle: 'text-align: center;',
                                            labelWidth: 60,
                                            labelAlign: 'left',
                                            padding: '2px 5px 2px 3px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA721CLASE',
                                            fieldLabel: '<strong style="color:#000;">Class</strong>',
                                            labelAlign: 'left',
                                            width: 80,
                                            fieldStyle: 'text-align: center;',
                                            align: 'center',
                                            labelWidth: 50,
                                            padding: '2px 5px 2px 3px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA721TEMPOR',
                                            fieldLabel: '<strong style="color:#000;">Reason </strong>',
                                            labelAlign: 'left',
                                            width: 90,
                                            fieldStyle: 'text-align: center;',
                                            align: 'center',
                                            labelWidth: 60,
                                            padding: '2px 5px 2px 3px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA721SEMANA',
                                            fieldLabel: '<strong style="color:#000;">Week </strong>',
                                            labelAlign: 'left',
                                            width: 80,
                                            fieldStyle: 'text-align: center;',
                                            align: 'center',
                                            labelWidth: 50,
                                            padding: '2px 5px 2px 3px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA721DIA',
                                            fieldLabel: '<strong style="color:#000;">Day </strong>',
                                            labelAlign: 'left',
                                            width: 80,
                                            fieldStyle: 'text-align: center;',
                                            align: 'center',
                                            labelWidth: 50,
                                            padding: '2px 5px 2px 3px'

                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA721CODTRF',
                                            fieldLabel: '<strong style="color:#000;">Code Fare</strong>',
                                            width: 100,
                                            fieldStyle: 'text-align: center;',
                                            labelWidth: 60,
                                            labelAlign: 'left',
                                            padding: '2px 5px 2px 3px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA721CODATP',
                                            fieldLabel: '<strong style="color:#000;">Code ATPCO</strong>',
                                            labelAlign: 'left',
                                            width: 130,
                                            fieldStyle: 'text-align: center;',
                                            align: 'center',
                                            labelWidth: 90,
                                            padding: '2px 5px 2px 3px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA721TIPIAT',
                                            fieldLabel: '<strong style="color:#000;">T.IATA </strong>',
                                            labelAlign: 'left',
                                            width: 110,
                                            fieldStyle: 'text-align: center;',
                                            align: 'center',
                                            labelWidth: 60,
                                            padding: '2px 5px 2px 3px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA721TIPTRF',
                                            fieldLabel: '<strong style="color:#000;">Type Fare </strong>',
                                            labelAlign: 'left',
                                            width: 120,
                                            fieldStyle: 'text-align: center;',
                                            align: 'center',
                                            labelWidth: 70,
                                            padding: '2px 5px 2px 3px'

                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA721CANVLD',
                                            fieldLabel: '<strong style="color:#000;">Qty. Max</strong>',
                                            width: 100,
                                            fieldStyle: 'text-align: center;',
                                            labelWidth: 60,
                                            labelAlign: 'left',
                                            padding: '2px 5px 2px 3px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA721INDVLD',
                                            fieldLabel: '<strong style="color:#000;">Indicator</strong>',
                                            labelAlign: 'left',
                                            width: 130,
                                            fieldStyle: 'text-align: center;',
                                            align: 'center',
                                            labelWidth: 90,
                                            padding: '2px 5px 2px 3px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA721NVLTRF',
                                            fieldLabel: '<strong style="color:#000;">Fare Level</strong>',
                                            labelAlign: 'left',
                                            width: 140,
                                            fieldStyle: 'text-align: center;',
                                            align: 'center',
                                            labelWidth: 90,
                                            padding: '2px 5px 2px 3px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA721GI',
                                            fieldLabel: '<strong style="color:#000;">Glb. Indicator </strong>',
                                            labelAlign: 'left',
                                            width: 110,
                                            fieldStyle: 'text-align: center;',
                                            align: 'center',
                                            labelWidth: 90,
                                            padding: '2px 5px 2px 3px'

                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 100,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:#000;  ">Validity</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA721VIGEN',
                                            fieldLabel: '<strong style="color:#000;">From</strong>',
                                            width: 130,
                                            fieldStyle: 'text-align: center;',
                                            labelWidth: 60,
                                            labelAlign: 'left',
                                            padding: '2px 5px 2px 3px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA721TERMI',
                                            fieldLabel: '<strong style="color:#000;">To</strong>',
                                            labelAlign: 'left',
                                            width: 100,
                                            fieldStyle: 'text-align: center;',
                                            align: 'center',
                                            labelWidth: 30,
                                            padding: '2px 5px 2px 3px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA721RBD',
                                            fieldLabel: '<strong style="color:#000;">RBD</strong>',
                                            labelAlign: 'left',
                                            width: 120,
                                            fieldStyle: 'text-align: center;',
                                            align: 'center',
                                            labelWidth: 80,
                                            padding: '2px 5px 2px 3px'

                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'center',
                                            width: 100,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:#000;  ">Observacion</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtA721OBS',
                                            fieldLabel: '<strong style="color:#000;"></strong>',
                                            width: 200,
                                            fieldStyle: 'text-align: center;',
                                            labelWidth: 0,
                                            labelAlign: 'left',
                                            padding: '2px 5px 2px 3px'

                                        }
                                       
                                    ]
                                },
//                               
//                               
                            ]
                        }
                    ]
                }

                ,
                {
                    xtype: 'fieldset',
                    id: prototype.id + '-ControlData',
                    title: 'Control Data',
                    width: 500,
                    margin: '10 10 0 10',
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
                                    id: prototype.id + '-txtA721REGIST',
                                    fieldLabel: '<strong style="color:#000;">Register By</strong>',
                                    labelWidth: 90,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 150
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtA721FREGIS',
                                    fieldLabel: '<strong style="color:#000;"> Date</strong>',
                                    labelWidth: 70,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 150
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtA721HREGIS',
                                    fieldLabel: '<strong style="color:#000;"> Hour</strong>',
                                    labelWidth: 70,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 150
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
                                    id: prototype.id + '-txtA721REVISA',
                                    fieldLabel: '<strong style="color:#000;">Update By</strong>',
                                    labelWidth: 90,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 150
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtA721FREVIS',
                                    fieldLabel: '<strong style="color:#000;">Date </strong>',
                                    labelWidth: 70,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 150
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtA721HREVIS',
                                    fieldLabel: '<strong style="color:#000;"> Hour</strong>',
                                    labelWidth: 70,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 150
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
            margin: '5 100 10 50',
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
                {
                    text: 'Cancel',
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