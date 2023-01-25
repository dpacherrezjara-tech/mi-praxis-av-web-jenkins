/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//console.log(prototype.id); = ParametersNoShowForm

Ext.define('Ext.Praxis.view.discharges.ParametersNoShowForm.CatTickedDesignatorEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id01 + '-dataEntry',
    controller: prototype.id01 + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.discharges.ParametersNoShow.CatTickedDesignatorEntryController',
        'Ext.Praxis.view.discharges.ParametersNoShowForm.InfoGridTicketDesignator'
    ],
    title: 'Catalogo Ticket Designator',
    header: true,
    width: 575,
    height: 510,
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
            id: prototype.id01 + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    border: false,
                    margin: '3 3 3 3',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            items: [
                                {
                                    xtype: 'form',
                                    id: prototype.id01 + '-form',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'filefield',
                                            padding: '2 2 2 2',
                                            id: prototype.id01 + '-file',
                                            name: 'excelfile',
                                            fieldLabel: 'Cargar archivo ', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            allowBlank: false,
                                            accept: '.xlsx',
                                            width: 400,
                                            //buttonText: 'Select logo...',
                                            regex: /(.)+((\.xlsx)|(\.xlsx)(\w)?)$/i,
                                            regexText: 'Only .xlsx formats are accepted',
                                            buttonConfig: {
                                                text: 'Examinar...',
                                                width: 90,
                                                glyph: 'xf3b6@Ionicons'
                                            },
                                            listeners: {
                                                //change: 'onUploadChange'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 250,
                                            padding: '2px 5px 2px 3px',
                                            html: '<strong style="color:#AC4546;font-size:12px;">* Archivo válido: .xlsx </strong>'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'toolbar',
                                    dock: 'bottom',
                                    ui: 'footer',
                                    margin: '2 0 2 0',
                                    layout: {
                                        pack: 'center'
                                    },
                                    fieldStyle: 'text-align:center',
                                    defaults: {
                                        scale: 'medium'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: prototype.id01 + '-btn-upload',
                                            text: 'Upload',
                                            icon: 'resources/img/botones/update.png',
                                            listeners: {
                                                click: 'onbtnClick_upload_file'
                                            }
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            id: prototype.id01 + '-load_opt_chk',
                                            checked: false,                                           
                                            padding: '0px 0px 0px 10px',
                                            boxLabel: 'Mantener registro existente'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id01 + '-grid-excel01',
                            layout: 'fit',
                            width: 550,
                            height: 345,
                            items: [
                                {
                                    xtype: prototype.id01 + '-infoGrid'
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
            border: false,
            ui: 'footer',
            margin: '5 5 7 7', // left/right/top/botton
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Close',
                    id: prototype.id01 + '-btn',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick01'
                    }
                }
            ]
        }
    ]
});




