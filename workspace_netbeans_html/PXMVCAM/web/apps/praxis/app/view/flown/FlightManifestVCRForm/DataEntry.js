/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.FlightManifestVCRForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.flown.FlightManifestVCR.DataEntryFlightManifestVCRController'
    ],
    title: 'Load Inputs',
    titleAlign: 'center',
    header: true,
    width: 680,
    height: 150,
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
            bodyStyle: 'background: #E3EAF9',
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    width: 680,
                    margin: '0 0 0 0',
                    border: false,
                    bodyStyle: 'background: #E3EAF9',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            width: 680,
                            margin: '0 0 0 0',
                            border: false,
                            bodyStyle: 'background: #E3EAF9',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    width: 690,
                                    margin: '0 0 0 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            html: '<strong style="color:#000;">Date</strong>',
                                            width: 80,
                                            padding: '10px 40px 5px 50px'

                                        },
                                        {
                                            xtype: 'datefield',
                                            format: 'Ymd',
                                            id: prototype.id + '-txtFecha_Texto',
                                            fieldStyle: 'text-align:center',
                                            tooltip: 'YYYYmmdd',
                                            maskRe: /[0-9]/,
                                            maxLength: 8,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            padding: '10px 20px 5px 10px',
                                            width: 120,
                                            listeners: {
                                                keyup: 'onEventKey'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 250},
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btn_Generar',
                                            disabled: true,
                                            text: '<strong style="color:black;">Generate<strong>',
                                            width: 80,
                                            height: 25,
                                            margin: '10px 20px 5px 10px',
                                            padding: '4 5 5 2',
                                            listeners: {
                                                click: 'onGenerarClick'
                                            }
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    width: 690,
                                    margin: '0 0 0 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            html: '<strong style="color:#000;">Ruta</strong>',
                                            width: 80,
                                            padding: '2px 40px 5px 50px'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtRutaTexto',
                                            required: true,
                                            readOnly: true,
                                            fieldLabel: '',
                                            width: 400,
                                            labelWidth: 0,
                                            enableKeyEvents: true,
                                            labelAlign: 'left',
                                            padding: '2px 20px 5px 10px'
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btn_Edit',
                                            icon: 'resources/img/botones/16x16/1326498593_018.png',
                                            style: 'background:#E3EAF9',
                                            border: false,
                                            tooltip: 'Edit',
                                            text: '',
                                            width: 30,
                                            height: 25,
                                            listeners: {
                                                click: 'onEditClick'
                                            }
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-de-labelRuta',
                                    layout: 'hbox',
                                    width: 690,
                                    margin: '0 0 0 0',
                                    border: false,
                                    bodyStyle: 'background: #E3EAF9',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            html: '',
                                            width: 80,
                                            padding: '2px 40px 5px 50px'

                                        },
                                        {
                                            xtype: 'label',
                                            id:prototype.id+'-label',
                                            labelAlign: 'left',
                                            html: '<strong style="color:#000;">Texto</strong>',
                                            //width: 300,
                                            padding: '2px 40px 5px 50px'
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btn_excel',
                                            icon: 'resources/img/botones/16x16/excel.png',
                                            style: 'background:#E3EAF9',
                                            border: false,
                                            tooltip: 'Edit',
                                            text: '',
                                            width: 30,
                                            height: 25

                                        }

                                    ]
                                }
                            ]
                        },
                    ]
                }


            ]
        }
    ]

});